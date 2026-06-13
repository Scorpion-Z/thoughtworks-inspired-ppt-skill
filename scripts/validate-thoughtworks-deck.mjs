#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const allowTemplatePlaceholders = process.argv.includes('--allow-template-placeholders');

if (!file) {
  console.error('Usage: node scripts/validate-thoughtworks-deck.mjs <index.html> [--allow-template-placeholders]');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const htmlWithoutComments = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

const allowedLayouts = new Set(Array.from({ length: 14 }, (_, i) => `T${String(i + 1).padStart(2, '0')}`));
const allowedAnimateRecipes = new Set(['cascade', 'hero', 'quote', 'directional', 'loop', 'timeline', 'matrix-scan', 'loop-trace', 'spotlight']);
const allowedAnimTokens = new Set(['', 'up', 'left', 'right', 'line', 'card', 'row', 'node']);
const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...htmlWithoutComments.matchAll(slideRe)].map((match, index) => ({
  index: index + 1,
  html: match[0],
  tag: match[0].match(/<section\b[^>]*>/)?.[0] ?? '',
}));

if (!slides.length) {
  errors.push('No <section class="slide"> pages found.');
}

const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const officialAssetRe = /(thoughtworks\.com\/content\/dam|thoughtworks\.com\/.*(?:logo|brand)|tw_guide_brand|download your brand assets|official\s+logo)/i;
const deprecatedObliqueRe = /\boblique\b|oblique-shape|flamingo\s+pink\s+oblique/i;
const tinyFontRe = /font-size\s*:\s*(?:10|11|12|13)px/i;
const badEffectRe = /box-shadow\s*:|border-radius\s*:\s*(?!0\b)/i;
const placeholderRe = /(\[必填\]|TODO|FIXME|Lorem|Click to add)/i;
const weakTitleRe = /^(背景介绍|项目背景|工作安排|目录|现状介绍|问题分析|解决方案|实施计划|总结)$/;

const layoutCounts = new Map();
const themeClasses = [];
const templateSuiteSequence = ['T01', 'T02', 'T05', 'T06', 'T08', 'T09', 'T11', 'T04', 'T14'];

function attr(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '';
}

function visibleText(fragment) {
  return fragment
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

const title = htmlWithoutComments.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
if (!allowTemplatePlaceholders && placeholderRe.test(title)) {
  errors.push('Document <title> still contains a placeholder. Replace it with the deck title.');
}

if (!allowTemplatePlaceholders && placeholderRe.test(htmlWithoutComments)) {
  errors.push('Deck contains placeholder text such as [必填], TODO, Lorem, or Click to add.');
}

const bodyTag = htmlWithoutComments.match(/<body\b[^>]*>/i)?.[0] ?? '';
const bodyThemes = (attr(bodyTag, 'class').match(/\btheme-[\w-]+\b/g) ?? []);
if (bodyThemes.length !== 1) {
  errors.push(`Body must include exactly one theme-* class; found ${bodyThemes.length}.`);
}

if (!/\bclass="[^"]*\bcontrol-help\b/i.test(htmlWithoutComments)) {
  errors.push('Deck must include .control-help for keyboard, swipe, and B static/dynamic guidance.');
}

if (!/\bclass="[^"]*\bambient-canvas\b/i.test(htmlWithoutComments)) {
  errors.push('Deck must include .ambient-canvas for the shared Boge ambience runtime.');
}

if (!/boge-deck-runtime\.js/.test(htmlWithoutComments)) {
  errors.push('Deck must load scripts/boge-deck-runtime.js instead of duplicating inline runtime code.');
}

slides.forEach((slide) => {
  const layout = slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1];
  const recipe = slide.tag.match(/\bdata-animate="([^"]+)"/)?.[1];
  const className = slide.tag.match(/\bclass="([^"]+)"/)?.[1] ?? '';
  const slideText = visibleText(slide.html);

  if (!layout) {
    errors.push(`Slide ${slide.index}: missing data-layout. Use one registered Txx layout from references/layouts.md.`);
  } else if (!allowedLayouts.has(layout)) {
    errors.push(`Slide ${slide.index}: data-layout="${layout}" is not registered. Allowed layouts are T01-T14.`);
  } else {
    layoutCounts.set(layout, (layoutCounts.get(layout) ?? 0) + 1);
  }

  if (!/\b(light|mist|dark|wave|accent|split)\b/.test(className)) {
    errors.push(`Slide ${slide.index}: class should include one visual theme: light, mist, dark, wave, accent, or split.`);
  } else {
    themeClasses.push(className.match(/\b(light|mist|dark|wave|accent|split)\b/)?.[1]);
  }

  if (recipe && !allowedAnimateRecipes.has(recipe)) {
    errors.push(`Slide ${slide.index}: data-animate="${recipe}" is not registered. Allowed recipes are cascade, hero, quote, directional, loop, timeline, matrix-scan, loop-trace, spotlight.`);
  }

  if (layout === 'T08') {
    if (!/\bcontent-center\b/.test(className)) {
      errors.push(`Slide ${slide.index}: T08 roadmap must use .content-center so the body sits visually between title and footer safe areas.`);
    }
    if (!/\bdata-animate="timeline"/.test(slide.tag)) {
      errors.push(`Slide ${slide.index}: T08 roadmap must use data-animate="timeline".`);
    }
    if (!/\bclass="[^"]*\broadmap-track\b/i.test(slide.html)) {
      errors.push(`Slide ${slide.index}: T08 roadmap must use .roadmap-track instead of the legacy .timeline-only structure.`);
    }
  }

  const animTags = [...slide.html.matchAll(/<[^>]+\bdata-anim(?:="([^"]*)")?[^>]*>/gi)];
  animTags.forEach((match, animIndex) => {
    const token = match[1] ?? '';
    if (!allowedAnimTokens.has(token)) {
      errors.push(`Slide ${slide.index}: data-anim token ${animIndex + 1}="${token}" is not registered. Allowed tokens are up, left, right, line, card, row, node.`);
    }
  });

  if (!/<h[12]\b[^>]*class="[^"]*\btitle\b/i.test(slide.html) && !/\bquote\b/.test(slide.html)) {
    errors.push(`Slide ${slide.index}: missing a title or quote block that carries the page's core message.`);
  }

  const titleFragment = slide.html.match(/<h[12]\b[^>]*class="[^"]*\btitle\b[^"]*"[^>]*>[\s\S]*?<\/h[12]>/i)?.[0];
  if (titleFragment) {
    const titleText = visibleText(titleFragment);
    if (weakTitleRe.test(titleText)) {
      errors.push(`Slide ${slide.index}: weak title "${titleText}". Use a conclusion sentence instead.`);
    }
  }

  if (!allowTemplatePlaceholders && placeholderRe.test(slideText)) {
    errors.push(`Slide ${slide.index}: contains placeholder text.`);
  }

  if (!/\bclass="[^"]*\bfooter\b/i.test(slide.html)) {
    errors.push(`Slide ${slide.index}: missing footer. Keep page numbering/source area stable.`);
  }

  if (officialAssetRe.test(slide.html)) {
    errors.push(`Slide ${slide.index}: appears to reference Thoughtworks official assets or brand-pack material. Do not use official logos, templates, screenshots, or proprietary assets.`);
  }

  if (deprecatedObliqueRe.test(slide.html)) {
    errors.push(`Slide ${slide.index}: uses oblique-like decoration. The public guidelines restrict the oblique to official logo use; use block grids or flat panels instead.`);
  }

  if (emojiRe.test(slide.html)) {
    errors.push(`Slide ${slide.index}: contains emoji. Use text labels or vector icons instead.`);
  }

  if (tinyFontRe.test(slide.html)) {
    errors.push(`Slide ${slide.index}: inline font-size under 14px detected. Presentation text must remain readable.`);
  }

  if (badEffectRe.test(slide.html)) {
    errors.push(`Slide ${slide.index}: inline shadow or rounded corner detected. Use flat rectangular Boge PPT blocks.`);
  }

  const accentCardCount = (slide.html.match(/class="[^"]*\bcard\b[^"]*\baccent\b[^"]*"/g) ?? []).length;
  if (accentCardCount > 1) {
    errors.push(`Slide ${slide.index}: uses ${accentCardCount} accent cards. Use at most one .card.accent per slide.`);
  }

  const cardBodyMatches = [...slide.html.matchAll(/<p\b[^>]*class="[^"]*\bcard-body\b[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)];
  cardBodyMatches.forEach((match, bodyIndex) => {
    const bodyText = visibleText(match[1]);
    if (bodyText.length > 92) {
      errors.push(`Slide ${slide.index}: card body ${bodyIndex + 1} is too long (${bodyText.length} chars). Split or shorten it for presentation readability.`);
    }
  });

  const imageTags = [...slide.html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  imageTags.forEach((imgTag, imageIndex) => {
    const src = attr(imgTag, 'src');
    const alt = imgTag.match(/\balt="([^"]*)"/)?.[1];
    if (alt === undefined || alt.trim() === '') {
      errors.push(`Slide ${slide.index}: image ${imageIndex + 1} missing non-empty alt text.`);
    }
    if (/(^|\/)images\//.test(src) && !/\bdata-image-slot="/.test(imgTag)) {
      errors.push(`Slide ${slide.index}: local image ${imageIndex + 1} under images/ missing data-image-slot such as t12-photo-16x10 or t13-diagram-16x9.`);
    }
  });

  const matrix = slide.html.match(/<table\b[^>]*class="[^"]*\bmatrix\b[^"]*"[\s\S]*?<\/table>/i)?.[0];
  if (matrix) {
    const rowCount = (matrix.match(/<tr\b/gi) ?? []).length;
    const headerCount = (matrix.match(/<th\b/gi) ?? []).length;
    if (rowCount > 5 || headerCount > 4) {
      errors.push(`Slide ${slide.index}: matrix exceeds the 4x4 presentation limit. Split dense material into cards or appendix pages.`);
    }
  }
});

const activeSlideCount = slides.filter((slide) => /\bclass="[^"]*\bactive\b/.test(slide.tag)).length;
if (activeSlideCount !== 1) {
  errors.push(`Deck must have exactly one active slide in the initial state; found ${activeSlideCount}.`);
}

if (slides.length >= 8) {
  const hasDark = themeClasses.some((theme) => theme === 'dark' || theme === 'wave' || theme === 'accent' || theme === 'split');
  const hasSection = slides.some((slide) => slide.tag.includes('data-layout="T03"'));
  const layoutSequence = slides.map((slide) => slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1] ?? '');
  const isDefaultTemplateSuite = layoutSequence.length === templateSuiteSequence.length
    && layoutSequence.every((layout, index) => layout === templateSuiteSequence[index]);
  if (!hasDark) warnings.push('Deck has 8+ slides but no dark/wave/accent breathing page.');
  if (!hasSection && !isDefaultTemplateSuite) warnings.push('Deck has 8+ slides but no T03 section divider.');
}

let repeatRun = 1;
for (let i = 1; i < themeClasses.length; i += 1) {
  repeatRun = themeClasses[i] === themeClasses[i - 1] ? repeatRun + 1 : 1;
  if (repeatRun >= 5) {
    warnings.push(`Slides ${i - repeatRun + 2}-${i + 1}: five consecutive pages use the same theme class.`);
    break;
  }
}

for (const [layout, count] of layoutCounts) {
  if (count >= 4) {
    warnings.push(`${layout} is used ${count} times. Confirm the deck is not visually repetitive.`);
  }
}

if (warnings.length) {
  console.warn('Warnings:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error('Boge PPT deck validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Boge PPT deck validation passed: ${slides.length} slide(s).`);
