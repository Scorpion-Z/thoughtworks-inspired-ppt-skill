#!/usr/bin/env node
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const input = args[0];
const outFlagIndex = args.indexOf('--out');
const outDir = path.resolve(outFlagIndex >= 0 ? args[outFlagIndex + 1] : 'tmp/visual-check');

if (!input) {
  console.error('Usage: node scripts/visual-check-deck.mjs <path/to/index.html> [--out tmp/visual-check]');
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Run `npm install`, then retry the visual check.');
  process.exit(2);
}

const inputPath = path.resolve(input);
const inputDir = path.dirname(inputPath);
const runId = `${Date.now()}-${process.pid}`;
const runDir = path.join(outDir, runId);
const screenshotDir = path.join(runDir, 'screenshots');
mkdirSync(screenshotDir, { recursive: true });

function pathExists(candidate) {
  try {
    statSync(candidate);
    return true;
  } catch {
    return false;
  }
}

function isSubpath(parent, child) {
  const rel = path.relative(parent, child);
  return rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function linkIfPresent(source, target) {
  if (!pathExists(source) || pathExists(target)) return;
  mkdirSync(path.dirname(target), { recursive: true });
  symlinkSync(source, target, 'junction');
}

function materializeTemplateDeck() {
  const visualRoot = path.join(runDir, 'template-root');
  mkdirSync(visualRoot, { recursive: true });
  writeFileSync(path.join(visualRoot, 'index.html'), readFileSync(inputPath, 'utf8'));
  for (const dir of ['styles', 'assets', 'scripts', 'images']) {
    linkIfPresent(path.join(repoRoot, dir), path.join(visualRoot, dir));
  }
  return { serverRoot: visualRoot, routePath: '/index.html' };
}

function resolveServingTarget() {
  const inputHtml = readFileSync(inputPath, 'utf8');
  const isTemplateSeed = path.basename(inputPath) === 'index.html'
    && path.basename(inputDir) === 'templates'
    && !pathExists(path.join(inputDir, 'styles'));

  if (isTemplateSeed) return materializeTemplateDeck();

  if (pathExists(path.join(inputDir, 'styles'))) {
    return { serverRoot: inputDir, routePath: '/index.html' };
  }

  if (isSubpath(repoRoot, inputPath) && /\.\.\//.test(inputHtml)) {
    return { serverRoot: repoRoot, routePath: `/${path.relative(repoRoot, inputPath).split(path.sep).join('/')}` };
  }

  return { serverRoot: inputDir, routePath: '/index.html' };
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.js' || ext === '.mjs') return 'text/javascript; charset=utf-8';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.json') return 'application/json; charset=utf-8';
  return 'application/octet-stream';
}

function startServer(root) {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1');
    const requestPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const filePath = path.resolve(root, `.${requestPath}`);

    if (filePath !== root && !isSubpath(root, filePath)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    try {
      const data = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType(filePath), 'Cache-Control': 'no-store' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

function intersects(a, b) {
  return a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function sanitize(value) {
  return String(value || 'slide').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '');
}

async function runViewportSmokeChecks(browser, url) {
  const viewports = [
    { name: 'chrome-wide-1792', width: 1792, height: 947 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-768', width: 768, height: 1024 },
  ];
  const results = [];

  for (const viewport of viewports) {
    const smokePage = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    try {
      await smokePage.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await smokePage.waitForTimeout(1200);
      const state = await smokePage.evaluate(() => {
        function rectOf(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
        }

        return {
          activeRect: rectOf(document.querySelector('.slide.active')),
          navRect: rectOf(document.querySelector('#nav')),
          counterRect: rectOf(document.querySelector('#counter')),
          controlHelpRect: rectOf(document.querySelector('#controlHelp')),
          controlHelpText: document.querySelector('#controlHelp')?.textContent || '',
          activeTextLength: (document.querySelector('.slide.active')?.innerText || '').replace(/\s+/g, ' ').trim().length,
          viewport: { width: window.innerWidth, height: window.innerHeight },
        };
      });
      results.push({ ...viewport, ...state });
    } finally {
      await smokePage.close().catch(() => {});
    }
  }

  return results;
}

const { serverRoot, routePath } = resolveServingTarget();
const { server, port } = await startServer(serverRoot);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
const errors = [];
const warnings = [];
const slides = [];

try {
  const url = `http://127.0.0.1:${port}${routePath}`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1700);

  const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  if (!totalSlides) errors.push('No slides found in visual check.');

  for (let index = 0; index < totalSlides; index += 1) {
    if (index > 0) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(1700);
    }

    const state = await page.evaluate((slideIndex) => {
      function rectOf(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
      }

      function visibleText(el) {
        return (el?.innerText || '').replace(/\s+/g, ' ').trim();
      }

      const activeSlides = [...document.querySelectorAll('.slide.active')];
      const active = activeSlides[0] || null;
      const footer = active?.querySelector('.footer') || null;
      const nav = document.querySelector('#nav');
      const counter = document.querySelector('#counter');
      const controlHelp = document.querySelector('#controlHelp');
      const contentSelectors = [
        '.title', '.subtitle', '.lead', '.grid-2', '.grid-3', '.grid-4', '.matrix',
        '.architecture', '.timeline', '.roadmap-track', '.priority-matrix', '.panel-50', '.diagram-row',
        '.quote', '.quote-source', '.image-frame', '.visual-panel', '.text-panel',
        '.concept-map', '.compare-board', '.loop-diagram', '.gallery-grid', '.spotlight-panel',
        '.immersive-anchor', '.closing-actions', '.priority-items'
      ];
      const contentRects = contentSelectors
        .flatMap((selector) => [...(active?.querySelectorAll(selector) || [])])
        .filter((el) => !el.closest('.footer'))
        .map((el) => ({ selector: el.className || el.tagName, rect: rectOf(el), text: visibleText(el).slice(0, 60) }));

      return {
        expectedIndex: slideIndex + 1,
        activeCount: activeSlides.length,
        layout: active?.getAttribute('data-layout') || '',
        className: active?.getAttribute('class') || '',
        textLength: visibleText(active).length,
        activeRect: rectOf(active),
        footerRect: rectOf(footer),
        navRect: rectOf(nav),
        counterRect: rectOf(counter),
        counterText: counter?.textContent || '',
        controlHelpRect: rectOf(controlHelp),
        controlHelpText: controlHelp?.textContent || '',
        ambientRunning: document.body.dataset.ambientRunning || '0',
        navButtons: document.querySelectorAll('#nav button').length,
        unrevealedAnimCount: [...(active?.querySelectorAll('[data-anim]') || [])].filter((el) => {
          const style = getComputedStyle(el);
          return Number(style.opacity) < 0.95 || style.visibility === 'hidden';
        }).length,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        contentRects,
        t08Balance: active?.getAttribute('data-layout') === 'T08' ? {
          titleRect: rectOf(active.querySelector('.title')),
          bodyRect: rectOf(active.querySelector('.roadmap-track') || active.querySelector('.timeline')),
          footerRect: rectOf(footer),
          usesContentCenter: active.classList.contains('content-center'),
          usesRoadmapTrack: Boolean(active.querySelector('.roadmap-track')),
        } : null,
      };
    }, index);

    const slideLabel = `${String(index + 1).padStart(2, '0')}-${sanitize(state.layout)}`;
    const screenshotPath = path.join(screenshotDir, `${slideLabel}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    if (state.activeCount !== 1) errors.push(`Slide ${index + 1}: expected one active slide, found ${state.activeCount}.`);
    if (state.navButtons !== totalSlides) errors.push(`Slide ${index + 1}: nav button count ${state.navButtons} does not match slide count ${totalSlides}.`);
    if (!state.counterText.includes(String(index + 1).padStart(2, '0'))) errors.push(`Slide ${index + 1}: counter text "${state.counterText}" does not include expected slide number.`);
    if (!state.controlHelpText.includes('B 静态') && !state.controlHelpText.includes('B 动态')) errors.push(`Slide ${index + 1}: control help does not include B static/dynamic guidance.`);
    if (state.textLength < 30) errors.push(`Slide ${index + 1}: visible text is very short; page may be blank.`);
    if (!state.activeRect || state.activeRect.width < 1000 || state.activeRect.height < 560) errors.push(`Slide ${index + 1}: active slide bounds look wrong.`);
    if (state.unrevealedAnimCount > 0) errors.push(`Slide ${index + 1}: ${state.unrevealedAnimCount} animated element(s) are still hidden after the settle wait.`);

    const rect = state.activeRect;
    if (rect && (rect.left < -2 || rect.top < -2 || rect.right > state.viewport.width + 2 || rect.bottom > state.viewport.height + 2)) {
      errors.push(`Slide ${index + 1}: active slide extends outside viewport bounds.`);
    }

    if (intersects(state.footerRect, state.navRect)) errors.push(`Slide ${index + 1}: footer overlaps navigation dots.`);
    if (intersects(state.footerRect, state.counterRect)) errors.push(`Slide ${index + 1}: footer overlaps counter.`);
    if (intersects(state.footerRect, state.controlHelpRect)) errors.push(`Slide ${index + 1}: footer overlaps control help.`);

    for (const item of [
      { name: 'navigation dots', rect: state.navRect },
      { name: 'counter', rect: state.counterRect },
      { name: 'control help', rect: state.controlHelpRect },
    ]) {
      if (intersects(state.activeRect, item.rect)) {
        errors.push(`Slide ${index + 1}: ${item.name} overlaps the active slide.`);
      }
    }

    if (state.layout === 'T08') {
      if (!state.t08Balance?.usesContentCenter) errors.push(`Slide ${index + 1}: T08 roadmap is missing .content-center.`);
      if (!state.t08Balance?.usesRoadmapTrack) errors.push(`Slide ${index + 1}: T08 roadmap is missing .roadmap-track.`);
      const body = state.t08Balance?.bodyRect;
      const title = state.t08Balance?.titleRect;
      const footer = state.t08Balance?.footerRect;
      if (body && title && footer) {
        const safeTop = title.bottom + 20;
        const safeBottom = footer.top - 16;
        const safeHeight = Math.max(1, safeBottom - safeTop);
        const bodyCenter = (body.top + body.bottom) / 2;
        if (bodyCenter < safeTop + safeHeight * 0.38) {
          errors.push(`Slide ${index + 1}: T08 roadmap body is too high in the title/footer safe area.`);
        }
      }
    }

    for (const item of state.contentRects) {
      if (intersects(item.rect, state.footerRect)) {
        errors.push(`Slide ${index + 1}: content overlaps footer (${item.text || item.selector}).`);
        break;
      }
    }

    slides.push({ ...state, screenshot: path.relative(process.cwd(), screenshotPath) });
  }

  const alreadyLowPower = await page.evaluate(() => document.body.classList.contains('low-power'));
  if (!alreadyLowPower) await page.keyboard.press('b');
  await page.waitForTimeout(180);
  const lowPowerState = await page.evaluate(() => {
    const active = document.querySelector('.slide.active');
    const controlHelp = document.querySelector('#controlHelp');
    return {
      enabled: document.body.classList.contains('low-power'),
      controlHelpText: controlHelp?.textContent || '',
      ambientRunning: document.body.dataset.ambientRunning || '0',
      hiddenAnimated: [...(active?.querySelectorAll('[data-anim]') || [])].filter((el) => {
        const style = getComputedStyle(el);
        return Number(style.opacity) < 0.95 || style.visibility === 'hidden';
      }).length,
    };
  });

  if (!lowPowerState.enabled) errors.push('Low-power mode did not activate after pressing B.');
  if (!lowPowerState.controlHelpText.includes('B 动态')) errors.push('Control help did not switch to "B 动态" after low-power mode activated.');
  if (lowPowerState.ambientRunning === '1') errors.push('Low-power mode did not stop the WebGL ambient background.');
  if (lowPowerState.hiddenAnimated > 0) errors.push(`Low-power mode left ${lowPowerState.hiddenAnimated} animated element(s) hidden.`);

  const viewportChecks = await runViewportSmokeChecks(browser, url);
  for (const check of viewportChecks) {
    const active = check.activeRect;
    const minWidth = check.width * 0.82;
    if (!active || active.width < minWidth || active.height < 120) {
      errors.push(`${check.name}: active slide is not visibly scaled into the viewport.`);
    } else if (active.left < -2 || active.top < -2 || active.right > check.width + 2 || active.bottom > check.height + 2) {
      errors.push(`${check.name}: active slide extends outside the viewport.`);
    }
    if (!check.navRect || check.navRect.left < 0 || check.navRect.right > check.width || check.navRect.bottom > check.height) {
      errors.push(`${check.name}: navigation dots are outside the viewport.`);
    }
    if (!check.controlHelpRect || check.controlHelpRect.left < 0 || check.controlHelpRect.right > check.width || check.controlHelpRect.bottom > check.height) {
      errors.push(`${check.name}: control help is outside the viewport.`);
    }
    if (!check.controlHelpText.includes('B 静态') && !check.controlHelpText.includes('B 动态')) {
      errors.push(`${check.name}: control help does not include B static/dynamic guidance.`);
    }
    if (intersects(active, check.navRect) || intersects(active, check.controlHelpRect) || intersects(active, check.counterRect)) {
      errors.push(`${check.name}: viewport controls overlap the scaled slide.`);
    }
    if (check.activeTextLength < 30) {
      errors.push(`${check.name}: active slide text is not visible enough in the scaled preview.`);
    }
  }

  const report = {
    input: inputPath,
    servedFrom: serverRoot,
    outputDir: runDir,
    slideCount: totalSlides,
    lowPowerState,
    viewportChecks,
    errors,
    warnings,
    slides,
  };

  writeFileSync(path.join(runDir, 'report.json'), JSON.stringify(report, null, 2));

  if (warnings.length) {
    console.warn('Warnings:');
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  }

  if (errors.length) {
    console.error('Boge PPT visual check failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    console.error(`Report: ${path.relative(process.cwd(), path.join(runDir, 'report.json'))}`);
    process.exitCode = 1;
  } else {
    console.log(`Boge PPT visual check passed: ${totalSlides} slide(s).`);
    console.log(`Screenshots: ${path.relative(process.cwd(), screenshotDir)}`);
    console.log(`Report: ${path.relative(process.cwd(), path.join(runDir, 'report.json'))}`);
  }
} finally {
  await browser.close().catch(() => {});
  await new Promise((resolve) => server.close(resolve));
  rmSync(path.join(runDir, 'template-root'), { recursive: true, force: true });
}
