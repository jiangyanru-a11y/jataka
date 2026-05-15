(function () {
  function init() {
    var layer = document.getElementById("stage-bg-layer");
    if (!layer && document.body) {
      layer = document.createElement("div");
      layer.id = "stage-bg-layer";
      layer.className = "stage-bg-layer";
      layer.setAttribute("aria-hidden", "true");
      layer.innerHTML = '<div class="stage-bg-vignette"></div>';
      document.body.insertBefore(layer, document.body.firstChild);
      layer = document.getElementById("stage-bg-layer");
    }
    if (!layer) return;

    var chapter = document.body.getAttribute("data-chapter") || "crow";
    var base = document.body.getAttribute("data-stage-bg-base") || "../assets/bg/";

    function urlFor(stageId) {
      return 'url("' + base + chapter + "/" + stageId + '.png")';
    }

    window.setStageBackground = function (stageId) {
      if (!stageId) return;
      layer.classList.add("is-fading");
      var img = new Image();
      img.onload = img.onerror = function () {
        layer.style.setProperty("--stage-bg-image", urlFor(stageId));
        requestAnimationFrame(function () {
          layer.classList.remove("is-fading");
        });
      };
      img.src = base + chapter + "/" + stageId + ".png";
      document.body.setAttribute("data-stage", stageId);
    };

    var pending = document.body.getAttribute("data-stage-pending");
    if (pending) {
      window.setStageBackground(pending);
      document.body.removeAttribute("data-stage-pending");
    }
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
