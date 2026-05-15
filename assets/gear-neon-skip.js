/* 破解版：右下角「跳过」— 每次点击只推进一小步（一景 / 一子谜题 / 河内一阶段等）；各章 HTML 暴露 window.__* 钩子；其余用 godForceClick / 放宽按钮扫描。 */
(function () {
  "use strict";

  function interactable(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.disabled || el.getAttribute("disabled") != null) return false;
    if (el.hidden) return false;
    if (typeof el.closest === "function" && el.closest("[hidden]")) return false;
    var st = window.getComputedStyle(el);
    if (st.display === "none" || st.visibility === "hidden") return false;
    return true;
  }

  function canProgrammaticActivate(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.disabled || el.getAttribute("disabled") != null) return false;
    if (el.hidden) return false;
    if (typeof el.closest === "function" && el.closest("[hidden]")) return false;
    var st = window.getComputedStyle(el);
    if (st.display === "none") return false;
    return true;
  }

  /** 临时解除 hidden / disabled / display:none，触发原生 click，再还原（用于「继续」等默认隐藏的按钮）。 */
  function godForceClick(el) {
    if (!el || el.nodeType !== 1) return false;
    var hadHiddenAttr = el.hasAttribute("hidden");
    var prevHiddenProp = el.hidden;
    var hadDisabled = el.disabled === true;
    var prevDisabledAttr = el.getAttribute("disabled");
    var prevDisplay = el.style.display;
    var prevVisibility = el.style.visibility;
    var prevAriaHidden = el.getAttribute("aria-hidden");
    try {
      el.removeAttribute("hidden");
      el.hidden = false;
      el.disabled = false;
      el.removeAttribute("disabled");
      el.style.display = "inline-block";
      el.style.visibility = "visible";
      el.removeAttribute("aria-hidden");
      el.click();
      return true;
    } catch (e0) {
      return false;
    } finally {
      if (hadHiddenAttr) el.setAttribute("hidden", "");
      else el.removeAttribute("hidden");
      el.hidden = prevHiddenProp;
      if (hadDisabled) {
        el.disabled = true;
        if (prevDisabledAttr != null) el.setAttribute("disabled", prevDisabledAttr);
      } else {
        el.disabled = false;
        if (prevDisabledAttr == null) el.removeAttribute("disabled");
      }
      el.style.display = prevDisplay;
      el.style.visibility = prevVisibility;
      if (prevAriaHidden == null) el.removeAttribute("aria-hidden");
      else el.setAttribute("aria-hidden", prevAriaHidden);
    }
  }

  function fireClick(el) {
    if (!interactable(el)) return false;
    try {
      el.click();
    } catch (e) {
      return false;
    }
    return true;
  }

  function tryGodClickId(id) {
    var el = document.getElementById(id);
    if (!el) return false;
    return godForceClick(el) || fireClickAdv(el);
  }

  function tryId(id) {
    return tryGodClickId(id);
  }

  function blurInputs() {
    var a = document.activeElement;
    if (!a || !a.tagName) return;
    var tag = a.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      try {
        a.blur();
      } catch (e1) {}
    }
  }

  function isBackToStart(t) {
    t = String(t || "").replace(/\s+/g, " ").trim();
    return /回到开篇/.test(t);
  }

  function isAdvanceLabel(t) {
    t = String(t || "").replace(/\s+/g, " ").trim();
    return /下一节|继续|衔接|进入关卡|进入第一关|下一关|下一章|进入结局|下一页|确定进入|下一张|进入关卡1|继续（|进入下一页|开始.*关|开始.*层|开始四层|开始第二关/.test(t);
  }

  function pickAdvanceButton(root) {
    if (!root) return null;
    var list = root.querySelectorAll("button,a.button,a[role=\"button\"]");
    var i;
    var el;
    var t;
    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (!canProgrammaticActivate(el)) continue;
      t = el.textContent || "";
      if (isBackToStart(t)) continue;
      if (el.classList && el.classList.contains("outline") && /回到|开篇/.test(t)) continue;
      if (isAdvanceLabel(t)) return el;
    }
    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (!canProgrammaticActivate(el)) continue;
      t = el.textContent || "";
      if (isBackToStart(t)) continue;
      if (el.classList && el.classList.contains("btn-wg")) return el;
      if (el.classList && el.classList.contains("btn-continue")) return el;
      if (el.classList && el.classList.contains("btn") && el.hasAttribute("data-go")) return el;
    }
    return null;
  }

  function tryAllDataGo(root) {
    if (!root) return false;
    var nodes = root.querySelectorAll("button[data-go], a[data-go]");
    var k;
    var el;
    var t;
    for (k = 0; k < nodes.length; k++) {
      el = nodes[k];
      if (!canProgrammaticActivate(el)) continue;
      t = el.textContent || "";
      if (isBackToStart(t)) continue;
      if (fireClickAdv(el)) return true;
    }
    return false;
  }

  function fireClickAdv(el) {
    if (!canProgrammaticActivate(el)) return false;
    try {
      el.click();
    } catch (e2) {
      return false;
    }
    return true;
  }

  function advanceInRoot(root) {
    if (!root) return false;
    if (tryAllDataGo(root)) return true;
    var dg = pickAdvanceButton(root);
    if (dg) return fireClickAdv(dg);
    return false;
  }

  function activeStageRoot() {
    return (
      document.querySelector(".gear-neon-game-frame .shell section.stage.active") ||
      document.querySelector(".gear-neon-game-frame .shell .stage.active") ||
      document.querySelector(".shell section.stage.active") ||
      document.querySelector(".shell .stage.active") ||
      document.querySelector("section.stage.active") ||
      document.querySelector(".stage.active")
    );
  }

  function activeSceneRoot() {
    return (
      document.querySelector(".gear-neon-game-frame .wg-wrap section.scene.active") ||
      document.querySelector(".wg-wrap section.scene.active") ||
      document.querySelector("section.scene.active")
    );
  }

  function tryPrologueTerminalAdvance() {
    var nextBtn = document.getElementById("next");
    if (!nextBtn || !document.querySelector(".terminal-window")) return false;
    if (nextBtn && !nextBtn.disabled && interactable(nextBtn) && fireClick(nextBtn)) return true;
    var sj = document.getElementById("startJourney");
    if (sj && !sj.hidden && interactable(sj) && fireClick(sj)) return true;
    var img = document.querySelector(".terminal-window .panel-wrap img");
    if (img && interactable(img) && fireClick(img)) return true;
    return false;
  }

  function tryPanelImageAdvance() {
    var img = document.querySelector(".terminal-window .panel-wrap img");
    if (img && interactable(img)) {
      return fireClick(img);
    }
    return false;
  }

  function tryGodMoon() {
    if (document.body.getAttribute("data-chapter") !== "moon") return false;
    var active = document.querySelector(".shell section.stage.active");
    if (!active) return false;
    var sid = active.id;
    if (sid === "stage-highlight") {
      return tryGodClickId("btn-highlight-next");
    }
    if (sid === "stage-prologue") {
      if (typeof window.__moonGoStage === "function") {
        window.__moonGoStage("beasts");
        return true;
      }
      return tryGodClickId("btn-prologue-next");
    }
    if (sid === "stage-beasts") return tryGodClickId("btn-beasts-next");
    if (sid === "stage-tour") return tryGodClickId("btn-tour-next");
    if (sid === "stage-choice") {
      var bB = document.querySelector("#stage-choice .choice-opt[data-choice=\"B\"]");
      return godForceClick(bB) || fireClickAdv(bB);
    }
    if (sid === "stage-sasassa") {
      var g = document.getElementById("guess-animal");
      var fin = document.getElementById("finale");
      var finOn = fin && fin.classList.contains("is-visible");
      var fb1 = document.getElementById("fb-sg-1");
      var fb1Ok = fb1 && !fb1.hidden && fb1.classList.contains("ok");
      if (finOn) return tryGodClickId("btn-finale-to-ending");
      if (!fb1Ok) {
        if (g && !String(g.value || "").trim()) {
          g.value = "兔";
          return true;
        }
        return tryGodClickId("btn-check-sg-1");
      }
      var r = document.querySelector('input[name="sasassa-mean"][value="poss"]');
      if (r && !r.checked) {
        r.checked = true;
        return true;
      }
      return tryGodClickId("btn-check-sg-2");
    }
    if (sid === "stage-ending") {
      if (tryGodClickId("btn-ending-next-page")) return true;
      var bf = document.getElementById("btn-go-ending-final");
      if (bf) {
        var cs = window.getComputedStyle(bf);
        if (cs.display !== "none" && cs.visibility !== "hidden") return tryGodClickId("btn-go-ending-final");
      }
      var ba = document.getElementById("btn-after-transition3end");
      if (ba && !ba.hidden) return tryGodClickId("btn-after-transition3end");
      if (typeof window.__moonSkipEndingTyping === "function") {
        window.__moonSkipEndingTyping();
        return true;
      }
      return false;
    }
    return false;
  }

  var FLOWER_FLOW = [
    "scene-verse",
    "scene-act1a",
    "scene-mantra",
    "scene-act1b",
    "scene-act2",
    "scene-act3a",
    "scene-garden",
    "scene-act3b",
    "scene-act4a",
    "scene-gatha",
    "scene-act4b",
    "scene-act5"
  ];

  function tryGodFlower() {
    if (document.body.getAttribute("data-chapter") !== "flower") return false;
    var active =
      document.querySelector(".wg-wrap section.scene.active") || document.querySelector("section.scene.active");
    if (!active) return false;
    var id = active.id;
    if (id === "scene-garden") {
      var gc = document.getElementById("wg-garden-continue");
      if (gc && !gc.hidden) return tryGodClickId("wg-garden-continue");
    }
    if (id === "scene-act5") return tryGodClickId("btn-go-level3");
    var i = FLOWER_FLOW.indexOf(id);
    if (i < 0 || i >= FLOWER_FLOW.length - 1) return false;
    var nextId = FLOWER_FLOW[i + 1];
    if (typeof window.__flowerShowScene === "function") {
      window.__flowerShowScene(nextId);
      return true;
    }
    var btn = document.querySelector("[data-go=\"" + nextId + "\"]");
    return godForceClick(btn) || fireClickAdv(btn);
  }

  var CROW_ORDER = ["poem", "grove", "buddha", "sweet", "bridge", "latin", "versegame", "finale"];

  function tryGodCrow() {
    if (document.body.getAttribute("data-chapter") !== "crow") return false;
    var active = document.querySelector(".shell section.stage.active");
    if (!active) return false;
    var m = /^stage-(.+)$/.exec(active.id || "");
    var key = m ? m[1] : "";
    var idx = CROW_ORDER.indexOf(key);
    if (key === "bridge") {
      var bwn = document.getElementById("bridge-win-next");
      if (bwn && !bwn.hidden) return tryGodClickId("btn-go-latin");
      if (typeof window.__siddharthaGodCrowHanoiSkipOneStep === "function") {
        return window.__siddharthaGodCrowHanoiSkipOneStep();
      }
      return false;
    }
    if (key === "latin") {
      var lwn = document.getElementById("latin-win-next");
      if (lwn && !lwn.hidden) return tryGodClickId("btn-go-verse");
      if (typeof window.__siddharthaGodCrowSkipSnakeLadder === "function") {
        window.__siddharthaGodCrowSkipSnakeLadder();
        return true;
      }
      return false;
    }
    if (key === "versegame") {
      if (typeof window.__siddharthaGodCrowSkipVerse === "function") window.__siddharthaGodCrowSkipVerse();
      else if (typeof window.crowAfterVerseWin === "function") window.crowAfterVerseWin();
      return true;
    }
    if (key === "finale") {
      if (tryGodClickId("btn-finale-enter-next")) return true;
      return tryGodClickId("btn-go-level2");
    }
    if (idx >= 0 && idx < CROW_ORDER.length - 1 && typeof window.__crowGo === "function") {
      window.__crowGo(CROW_ORDER[idx + 1]);
      return true;
    }
    return false;
  }

  function dispatchNavKeys() {
    var keys = [
      { key: " ", code: "Space", keyCode: 32, which: 32 },
      { key: "Enter", code: "Enter", keyCode: 13, which: 13 },
      { key: "ArrowRight", code: "ArrowRight", keyCode: 39, which: 39 },
      { key: "Tab", code: "Tab", keyCode: 9, which: 9 }
    ];
    var targets = [window, document, document.body, document.documentElement].filter(Boolean);
    var ti;
    var ki;
    var opts;
    for (ti = 0; ti < targets.length; ti++) {
      for (ki = 0; ki < keys.length; ki++) {
        opts = Object.assign({ bubbles: true, cancelable: true }, keys[ki]);
        try {
          targets[ti].dispatchEvent(new KeyboardEvent("keydown", opts));
        } catch (e1) {}
      }
    }
  }

  function godSkipAdvanceOnce() {
    blurInputs();

    if (tryGodMoon()) return true;
    if (tryGodFlower()) return true;
    if (tryGodCrow()) return true;

    var ia = document.getElementById("introAnim");
    if (ia && !ia.hidden) {
      if (tryId("skipIntroAnim")) return true;
    }

    var tr = document.getElementById("transition01");
    if (tr && !tr.hidden) {
      if (tryId("confirmTransition01")) return true;
    }

    function overlayShown(id) {
      var el = document.getElementById(id);
      return !!(el && !el.hidden);
    }

    if (overlayShown("transition12-overlay")) {
      if (tryId("btn-go-level2")) return true;
    }
    if (overlayShown("transition23-overlay")) {
      if (tryId("btn-go-level3")) return true;
    }
    if (overlayShown("transition3end-overlay")) {
      if (tryId("btn-after-transition3end")) return true;
    }

    if (tryPrologueTerminalAdvance()) return true;

    var nextBtn = document.getElementById("next");
    if (nextBtn && !nextBtn.disabled) {
      if (godForceClick(nextBtn) || fireClickAdv(nextBtn)) return true;
    }

    if (tryId("startJourney")) return true;

    var extraIds = ["btn-go-level2", "btn-go-level3", "btn-go-ending-final", "btn-finale-to-ending", "hn-btnFormal"];
    var j;
    for (j = 0; j < extraIds.length; j++) {
      if (tryGodClickId(extraIds[j])) return true;
    }

    var moonChoice = document.querySelector("#stage-choice.stage.active");
    if (moonChoice) {
      var bB2 = moonChoice.querySelector('button[data-choice="B"]');
      if (godForceClick(bB2) || fireClickAdv(bB2)) return true;
    }

    var scene = activeSceneRoot();
    if (advanceInRoot(scene)) return true;

    var st = activeStageRoot();
    if (advanceInRoot(st)) return true;

    if (tryPanelImageAdvance()) return true;

    var es = document.getElementById("endingStage");
    if (es && !document.body.classList.contains("easter-only")) {
      if (godForceClick(es) || fireClickAdv(es)) return true;
    }

    var cta = document.querySelector("body.arcade-landing a.cta");
    if (cta && cta.getAttribute("href")) {
      window.location.href = cta.getAttribute("href");
      return true;
    }

    dispatchNavKeys();
    return false;
  }

  function godSkipAdvance() {
    godSkipAdvanceOnce();
  }

  function init() {
    if (document.getElementById("god-skip-float")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "god-skip-float";
    btn.textContent = "跳过";
    btn.setAttribute("aria-label", "跳过本页，进入下一页");
    btn.title = "跳过本页，进入下一页";
    btn.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        godSkipAdvance();
      },
      true
    );
    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  window.addEventListener("load", function () {
    if (!document.getElementById("god-skip-float")) init();
  });
})();
