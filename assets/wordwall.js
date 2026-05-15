(function () {
  const WORDS = [
    "Buddha", "Dhamma", "Saṅgha", "Karuṇā", "Mettā", "Sati", "Anicca", "Dukkha",
    "Paññā", "Nibbāna", "Sīla", "Samādhi", "Bhāvanā", "Kamma", "Paṭicca", "Anattā",
    "Taṇhā", "Upekkhā", "Muditā", "Sacca", "Magga", "Phala", "Sotāpanna", "Arahant",
    "无常", "慈悲", "正念", "因缘", "觉醒", "空性", "寂静", "中道", "明心"
  ];

  function pick() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  const TEXT_COLORS = ["#ff5ca8", "#ffd166", "#7df9ff", "#b8ff6a", "#c39bff", "#ff8f5a"];
  const BORDER_COLORS = ["#7df9ff", "#ff5ca8", "#ffd166", "#4de2b3", "#ff8f5a", "#c39bff"];

  function pickColor(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function addBrick(wall, text, left, top, w, h, vertical) {
    const brick = document.createElement("span");
    brick.className = "wordwall-brick" + (vertical ? " is-vertical" : "");
    brick.textContent = text;
    brick.style.left = `${left}px`;
    brick.style.top = `${top}px`;
    brick.style.width = `${w}px`;
    brick.style.height = `${h}px`;
    brick.style.color = pickColor(TEXT_COLORS);
    brick.style.borderColor = pickColor(BORDER_COLORS);
    wall.appendChild(brick);
  }

  function ringTop(wall, width, depth, unit) {
    let x = 0;
    while (x < width) {
      const len = Math.max(2, Math.floor(Math.random() * 5) + 2);
      const bw = Math.min(unit * len, width - x);
      const bh = unit;
      const top = Math.floor(Math.random() * Math.max(1, depth - unit));
      addBrick(wall, pick(), x, top, bw, bh, false);
      x += bw;
    }
  }

  function ringBottom(wall, width, height, depth, unit) {
    let x = 0;
    while (x < width) {
      const len = Math.max(2, Math.floor(Math.random() * 5) + 2);
      const bw = Math.min(unit * len, width - x);
      const bh = unit;
      const jitter = Math.floor(Math.random() * Math.max(1, depth - unit));
      const top = height - depth + jitter;
      addBrick(wall, pick(), x, top, bw, bh, false);
      x += bw;
    }
  }

  function ringLeft(wall, height, depth, unit) {
    let y = depth;
    const end = height - depth;
    while (y < end) {
      const len = Math.max(2, Math.floor(Math.random() * 4) + 2);
      const bh = Math.min(unit * len, end - y);
      const bw = unit;
      const left = Math.floor(Math.random() * Math.max(1, depth - unit));
      addBrick(wall, pick(), left, y, bw, bh, true);
      y += bh;
    }
  }

  function ringRight(wall, width, height, depth, unit) {
    let y = depth;
    const end = height - depth;
    while (y < end) {
      const len = Math.max(2, Math.floor(Math.random() * 4) + 2);
      const bh = Math.min(unit * len, end - y);
      const bw = unit;
      const jitter = Math.floor(Math.random() * Math.max(1, depth - unit));
      const left = width - depth + jitter;
      addBrick(wall, pick(), left, y, bw, bh, true);
      y += bh;
    }
  }

  function buildWall() {
    const old = document.querySelector(".wordwall-bg");
    if (old) old.remove();

    const wall = document.createElement("div");
    wall.className = "wordwall-bg";
    wall.setAttribute("aria-hidden", "true");

    const w = Math.max(window.innerWidth, 320);
    const h = Math.max(window.innerHeight, 320);
    const unit = 20;
    const depth = 64;

    ringTop(wall, w, depth, unit);
    ringBottom(wall, w, h, depth, unit);
    ringLeft(wall, h, depth, unit);
    ringRight(wall, w, h, depth, unit);

    document.body.classList.add("wordwall-enabled");
    document.body.prepend(wall);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWall, { once: true });
  } else {
    buildWall();
  }

  let timer = null;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(buildWall, 160);
  });
})();
