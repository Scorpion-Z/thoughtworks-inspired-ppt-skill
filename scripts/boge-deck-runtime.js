(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const nav = document.getElementById("nav");
  const counter = document.getElementById("counter");
  const controlHelp = document.getElementById("controlHelp");
  const lowPowerKey = "boge-ppt-low-power";
  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains("active")));
  let wheelLock = false;
  let touchStartX = null;
  let lowPower = localStorage.getItem(lowPowerKey) === "1"
    || (localStorage.getItem(lowPowerKey) === null && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const activeAnimations = new Set();
  const motionAnimate = window.Motion?.animate;

  function fit() {
    const chromeX = 56;
    const chromeY = 104;
    const availableWidth = Math.max(320, window.innerWidth - chromeX);
    const availableHeight = Math.max(220, window.innerHeight - chromeY);
    const scale = Math.max(0.1, Math.min(availableWidth / 1280, availableHeight / 720));
    const scaledWidth = 1280 * scale;
    const scaledHeight = 720 * scale;
    const gapX = Math.max(0, (window.innerWidth - scaledWidth) / 2);
    const gapY = Math.max(0, (window.innerHeight - scaledHeight) / 2);
    const shellBottom = Math.max(14, Math.min(22, gapY - 30));
    const root = document.documentElement;
    root.style.setProperty("--deck-scale", String(scale));
    root.style.setProperty("--deck-left-gap", `${gapX.toFixed(2)}px`);
    root.style.setProperty("--deck-right-gap", `${gapX.toFixed(2)}px`);
    root.style.setProperty("--deck-top-gap", `${gapY.toFixed(2)}px`);
    root.style.setProperty("--deck-bottom-gap", `${gapY.toFixed(2)}px`);
    root.style.setProperty("--chrome-bottom", `${shellBottom.toFixed(2)}px`);
    document.body.classList.toggle("chrome-tight", gapY < 48);
  }

  function updateControlHelp() {
    if (!controlHelp) return;
    controlHelp.textContent = `←/→ 翻页 · 滚轮/滑动 · B ${lowPower ? "动态" : "静态"}`;
  }

  function cancelActiveAnimations() {
    activeAnimations.forEach((animation) => {
      try {
        animation.cancel?.();
        animation.stop?.();
      } catch {
        // Best effort: animation controls vary between Motion and WAAPI.
      }
    });
    activeAnimations.clear();
  }

  function createAmbientBackground() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) {
      document.body.dataset.ambientRunning = "0";
      return { update() {}, stop() {} };
    }

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) {
      document.body.dataset.ambientRunning = "0";
      return { update() {}, stop() {} };
    }

    const vertexSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_dark;

      float line(float value, float width) {
        return smoothstep(width, 0.0, abs(value));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float t = u_time * 0.00028;
        float wave = sin((uv.x * 8.0) + t * 4.0 + sin(uv.y * 5.0 + t * 2.3)) * 0.5 + 0.5;
        float gridX = line(fract(uv.x * 12.0) - 0.5, 0.012);
        float gridY = line(fract(uv.y * 7.0) - 0.5, 0.010);
        float pulse = 0.5 + 0.5 * sin(t * 7.0 + uv.x * 4.0 - uv.y * 3.0);
        vec3 waveTone = mix(vec3(0.00, 0.24, 0.31), vec3(0.95, 0.38, 0.48), wave);
        vec3 darkTone = mix(vec3(0.01, 0.04, 0.05), vec3(0.00, 0.24, 0.31), wave);
        vec3 color = mix(waveTone, darkTone, u_dark);
        float alpha = 0.07 + 0.06 * pulse + 0.035 * max(gridX, gridY);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    }

    const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      document.body.dataset.ambientRunning = "0";
      return { update() {}, stop() {} };
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      document.body.dataset.ambientRunning = "0";
      return { update() {}, stop() {} };
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const darkLocation = gl.getUniformLocation(program, "u_dark");
    let frame = 0;
    let running = false;
    let darkTone = 0;

    function resize() {
      const width = Math.max(1, Math.floor(window.innerWidth * window.devicePixelRatio));
      const height = Math.max(1, Math.floor(window.innerHeight * window.devicePixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function draw(time) {
      if (!running) return;
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(darkLocation, darkTone);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      document.body.dataset.ambientRunning = "1";
      frame = requestAnimationFrame(draw);
    }

    function shouldRun(slide) {
      if (!slide || lowPower) return false;
      return slide.classList.contains("split")
        || slide.classList.contains("wave")
        || slide.classList.contains("dark")
        || slide.classList.contains("accent")
        || slide.dataset.layout === "T03"
        || slide.dataset.layout === "T14";
    }

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      running = false;
      document.body.classList.remove("ambient-on");
      document.body.dataset.ambientRunning = "0";
    }

    function update(slide) {
      darkTone = slide?.classList.contains("dark") ? 1 : 0;
      if (!shouldRun(slide)) {
        stop();
        return;
      }
      document.body.classList.add("ambient-on");
      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    }

    window.addEventListener("resize", resize);
    return { update, stop };
  }

  const ambient = createAmbientBackground();

  function setLowPower(value) {
    lowPower = Boolean(value);
    document.body.classList.toggle("low-power", lowPower);
    localStorage.setItem(lowPowerKey, lowPower ? "1" : "0");
    updateControlHelp();
    cancelActiveAnimations();
    if (lowPower) {
      ambient.stop();
      revealSlide(current);
    } else {
      playSlide(current);
      ambient.update(slides[current]);
    }
  }

  function updateNav() {
    if (!nav) return;
    nav.innerHTML = "";
    slides.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Go to slide ${index + 1}`);
      button.className = index === current ? "active" : "";
      button.addEventListener("click", () => show(index));
      nav.appendChild(button);
    });
  }

  function step(delta) {
    show(current + delta);
  }

  function show(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === current);
    });
    if (counter) {
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }
    updateNav();
    const layout = slides[current].dataset.layout || `slide-${current + 1}`;
    history.replaceState(null, "", `#${layout}`);
    ambient.update(slides[current]);
    window.setTimeout(() => playSlide(current), 80);
  }

  function initialTransform(kind) {
    if (kind === "left") return "translateX(-22px)";
    if (kind === "right") return "translateX(22px)";
    if (kind === "line") return "scaleX(.1)";
    if (kind === "node") return "translateY(12px) scale(.96)";
    if (kind === "card") return "translateY(18px) scale(.98)";
    return "translateY(14px)";
  }

  function motionOffset(kind) {
    if (kind === "left") return { x: -22, y: 0, scale: 1 };
    if (kind === "right") return { x: 22, y: 0, scale: 1 };
    if (kind === "line") return { x: 0, y: 0, scale: 0.96 };
    if (kind === "node") return { x: 0, y: 12, scale: 0.96 };
    if (kind === "card") return { x: 0, y: 18, scale: 0.98 };
    return { x: 0, y: 14, scale: 1 };
  }

  function revealSlide(index) {
    const slide = slides[index];
    if (!slide) return;
    slide.getAnimations?.().forEach((animation) => animation.cancel());
    slide.querySelectorAll("[data-anim]").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
      element.style.transformOrigin = "";
    });
  }

  function finalizeElement(element) {
    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.transformOrigin = "";
  }

  function animateElement(element, delay, options = {}) {
    const kind = element.dataset.anim || "up";
    const duration = options.duration || 560;

    if (motionAnimate) {
      const offset = motionOffset(kind);
      element.style.transform = "none";
      const controls = motionAnimate(
        element,
        {
          opacity: [0, 1],
          x: [offset.x, 0],
          y: [offset.y, 0],
          scale: [offset.scale, 1],
        },
        {
          duration: duration / 1000,
          delay: delay / 1000,
          easing: [0.2, 0, 0.2, 1],
          fill: "both",
        }
      );
      activeAnimations.add(controls);
      const finish = () => {
        finalizeElement(element);
        activeAnimations.delete(controls);
      };
      const finished = controls.finished && typeof controls.finished.then === "function"
        ? controls.finished
        : (typeof controls.then === "function" ? controls : null);
      if (finished) {
        finished.then(finish).catch(() => activeAnimations.delete(controls));
      } else {
        window.setTimeout(finish, delay + duration + 80);
      }
      return;
    }

    const animation = element.animate(
      {
        opacity: [0, 1],
        transform: [options.from || initialTransform(kind), "translateX(0) translateY(0) scale(1)"],
      },
      {
        duration,
        delay,
        easing: "cubic-bezier(.2, 0, .2, 1)",
        fill: "both",
      }
    );
    activeAnimations.add(animation);
    animation.onfinish = () => {
      finalizeElement(element);
      activeAnimations.delete(animation);
    };
  }

  function splitBy(slide, selector) {
    return Array.from(slide.querySelectorAll(selector)).filter((element) => element.matches("[data-anim]"));
  }

  function playSlide(index) {
    const slide = slides[index];
    if (!slide) return;
    cancelActiveAnimations();

    if (lowPower || (!motionAnimate && !("animate" in Element.prototype))) {
      revealSlide(index);
      return;
    }

    document.body.classList.add("motion-ready");
    slide.getAnimations?.().forEach((animation) => animation.cancel());
    const animated = Array.from(slide.querySelectorAll("[data-anim]"));
    if (!animated.length) return;

    animated.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = initialTransform(element.dataset.anim || "up");
      if (element.dataset.anim === "line") element.style.transformOrigin = "left center";
    });

    const recipe = slide.dataset.animate || "cascade";
    if (recipe === "hero") {
      animated.forEach((element, itemIndex) => animateElement(element, 140 + itemIndex * 120, { duration: 720 }));
      return;
    }

    if (recipe === "quote") {
      const lines = animated.filter((element) => element.dataset.anim === "line");
      const others = animated.filter((element) => element.dataset.anim !== "line");
      others.forEach((element, itemIndex) => animateElement(element, 120 + itemIndex * 90));
      lines.forEach((element, itemIndex) => animateElement(element, 380 + itemIndex * 260, { duration: 700 }));
      return;
    }

    if (recipe === "directional") {
      const left = animated.filter((element) => element.dataset.anim === "left");
      const right = animated.filter((element) => element.dataset.anim === "right");
      const rest = animated.filter((element) => !["left", "right"].includes(element.dataset.anim));
      rest.forEach((element, itemIndex) => animateElement(element, 90 + itemIndex * 80));
      left.forEach((element, itemIndex) => animateElement(element, 220 + itemIndex * 110));
      right.forEach((element, itemIndex) => animateElement(element, 300 + itemIndex * 110));
      return;
    }

    if (recipe === "loop" || recipe === "loop-trace") {
      animated.forEach((element, itemIndex) => animateElement(element, 140 + itemIndex * 150, { duration: 620 }));
      return;
    }

    if (recipe === "timeline") {
      const intro = animated.filter((element) => ["up", "line"].includes(element.dataset.anim));
      const stages = splitBy(slide, ".roadmap-stage");
      const outputs = splitBy(slide, ".roadmap-output");
      const used = new Set([...intro, ...stages, ...outputs]);
      intro.forEach((element, itemIndex) => animateElement(element, 100 + itemIndex * 90, { duration: 680 }));
      stages.forEach((element, itemIndex) => animateElement(element, 320 + itemIndex * 170, { duration: 680 }));
      outputs.forEach((element, itemIndex) => animateElement(element, 540 + itemIndex * 170, { duration: 520 }));
      animated.filter((element) => !used.has(element)).forEach((element, itemIndex) => animateElement(element, 620 + itemIndex * 90));
      return;
    }

    if (recipe === "matrix-scan") {
      animated.forEach((element, itemIndex) => animateElement(element, 120 + itemIndex * 95, { duration: 500 }));
      return;
    }

    if (recipe === "spotlight") {
      animated.forEach((element, itemIndex) => animateElement(element, 120 + itemIndex * 130, { duration: 650 }));
      return;
    }

    animated.forEach((element, itemIndex) => animateElement(element, 120 + itemIndex * 95));
  }

  window.addEventListener("resize", fit);
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") step(1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") step(-1);
    if (event.key.toLowerCase() === "b") setLowPower(!lowPower);
  });

  window.addEventListener("wheel", (event) => {
    if (wheelLock || Math.abs(event.deltaY) < 18) return;
    wheelLock = true;
    step(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock = false;
    }, 520);
  }, { passive: true });

  window.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  window.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
    touchStartX = null;
  }, { passive: true });

  document.body.classList.toggle("low-power", lowPower);
  window.__bogeDeck = {
    get current() {
      return current;
    },
    get lowPower() {
      return lowPower;
    },
    setLowPower,
    show,
  };
  fit();
  updateControlHelp();
  show(current);
})();
