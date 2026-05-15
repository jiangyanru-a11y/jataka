/**
 * 存档：记录上次所在页面（URL）与各章内进度，供首页「继续」与读档恢复。
 * 依赖 localStorage：siddharthaJourneyProgress（原有）、siddharthaJourneyBookmark、siddharthaJourneyStages
 */
(function (w) {
  var BK = "siddharthaJourneyBookmark";
  var ST = "siddharthaJourneyStages";
  var PR = "siddharthaJourneyProgress";

  w.siddharthaJourneyPaths = {
    prologue: "prologue/index.html",
    crow: "qvan/执水之鸦.html",
    flower: "qvan/花染衣-咒缚之华-全篇文字游戏.html",
    moon: "qvan/月兔之誓.html",
    ending: "ending/end.html"
  };

  function parseStages() {
    try {
      return JSON.parse(localStorage.getItem(ST) || "{}");
    } catch (e) {
      return {};
    }
  }

  function writeStages(o) {
    try {
      localStorage.setItem(ST, JSON.stringify(o));
    } catch (e) {}
  }

  w.journeyGetProgress = function () {
    var n = 0;
    try {
      n = parseInt(localStorage.getItem(PR) || "0", 10) || 0;
    } catch (e) {}
    return n;
  };

  /** 当前所在章节（用于首页跳转） */
  w.journeyNotifyPage = function (pageId, optSearch) {
    try {
      var q =
        optSearch != null
          ? String(optSearch).replace(/^\?/, "")
          : w.location.search
            ? w.location.search.slice(1)
            : "";
      localStorage.setItem(BK, JSON.stringify({ page: pageId, search: q, t: Date.now() }));
    } catch (e) {}
  };

  w.journeySaveStage = function (pageId, stageVal) {
    var o = parseStages();
    o[pageId] = stageVal;
    writeStages(o);
  };

  w.journeyGetStage = function (pageId) {
    return parseStages()[pageId];
  };

  w.journeyGetBookmark = function () {
    try {
      var s = localStorage.getItem(BK);
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  };

  /** 从站点根（定稿版文件夹）起的相对前缀，如 "./" 或 "../" */
  w.journeyContinueUrl = function (rootPrefix) {
    var b = w.journeyGetBookmark();
    if (!b || !b.page || !w.siddharthaJourneyPaths[b.page]) return null;
    var path = w.siddharthaJourneyPaths[b.page];
    var q = b.search || "";
    return rootPrefix + path + (q ? "?" + q : "");
  };

  /** 是否应对当前页恢复关卡内进度（与进度数值一致时才恢复，避免已通关后重玩被拉回旧档） */
  w.journeyShouldRestore = function (pageId) {
    var p = w.journeyGetProgress();
    if (pageId === "prologue") return p < 1;
    if (pageId === "crow") return p === 1;
    if (pageId === "flower") return p === 2;
    if (pageId === "moon") return p === 3;
    if (pageId === "ending") return p >= 4;
    return false;
  };

  /** 结局「重新开始旅程」：清空进度与存档 */
  w.journeyFullReset = function () {
    try {
      localStorage.removeItem(BK);
      localStorage.removeItem(ST);
      localStorage.setItem(PR, "0");
    } catch (e) {}
  };
})(typeof window !== "undefined" ? window : this);
