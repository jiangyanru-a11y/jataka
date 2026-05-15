/* 四角像素齿轮：包在「主对话框」外框四角，而非视口四角。配合 gear-neon-shell.css */
(function () {
  if (document.getElementById("gear-neon-corners-mount")) return;

  var GEAR_INNER =
    '<svg aria-hidden="true" width="0" height="0" style="position:absolute;overflow:hidden;pointer-events:none" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="gear-pixel-neon" viewBox="0 0 32 32">\n            <g shape-rendering="crispEdges">\n              <rect x="15" y="2" width="3" height="1" fill="#fff566"/><rect x="15" y="3" width="3" height="1" fill="#fff566"/><rect x="8" y="4" width="3" height="1" fill="#fff566"/><rect x="15" y="4" width="3" height="1" fill="#fff566"/><rect x="22" y="4" width="3" height="1" fill="#fff566"/><rect x="8" y="5" width="3" height="1" fill="#fff566"/><rect x="15" y="5" width="3" height="1" fill="#fff566"/><rect x="22" y="5" width="3" height="1" fill="#fff566"/><rect x="9" y="6" width="3" height="1" fill="#fff566"/><rect x="15" y="6" width="3" height="1" fill="#fff566"/><rect x="21" y="6" width="3" height="1" fill="#fff566"/><rect x="10" y="7" width="3" height="1" fill="#fff566"/><rect x="15" y="7" width="3" height="1" fill="#fff566"/><rect x="20" y="7" width="3" height="1" fill="#fff566"/><rect x="10" y="8" width="3" height="1" fill="#fff566"/><rect x="15" y="8" width="3" height="1" fill="#fff566"/><rect x="20" y="8" width="3" height="1" fill="#fff566"/><rect x="3" y="9" width="4" height="1" fill="#fff566"/><rect x="11" y="9" width="11" height="1" fill="#fff566"/><rect x="27" y="9" width="3" height="1" fill="#fff566"/><rect x="5" y="10" width="3" height="1" fill="#fff566"/><rect x="11" y="10" width="11" height="1" fill="#fff566"/><rect x="25" y="10" width="4" height="1" fill="#fff566"/><rect x="5" y="11" width="4" height="1" fill="#fff566"/><rect x="10" y="11" width="13" height="1" fill="#fff566"/><rect x="24" y="11" width="4" height="1" fill="#fff566"/><rect x="7" y="12" width="19" height="1" fill="#fff566"/><rect x="9" y="13" width="6" height="1" fill="#fff566"/><rect x="18" y="13" width="6" height="1" fill="#fff566"/><rect x="9" y="14" width="5" height="1" fill="#fff566"/><rect x="19" y="14" width="5" height="1" fill="#fff566"/><rect x="9" y="15" width="4" height="1" fill="#fff566"/><rect x="20" y="15" width="4" height="1" fill="#fff566"/><rect x="1" y="16" width="12" height="1" fill="#fff566"/><rect x="20" y="16" width="12" height="1" fill="#fff566"/><rect x="9" y="17" width="4" height="1" fill="#fff566"/><rect x="20" y="17" width="4" height="1" fill="#fff566"/><rect x="9" y="18" width="5" height="1" fill="#fff566"/><rect x="19" y="18" width="5" height="1" fill="#fff566"/><rect x="9" y="19" width="6" height="1" fill="#fff566"/><rect x="18" y="19" width="6" height="1" fill="#fff566"/><rect x="8" y="20" width="17" height="1" fill="#fff566"/><rect x="6" y="21" width="21" height="1" fill="#fff566"/><rect x="5" y="22" width="3" height="1" fill="#fff566"/><rect x="11" y="22" width="11" height="1" fill="#fff566"/><rect x="25" y="22" width="3" height="1" fill="#fff566"/><rect x="3" y="23" width="4" height="1" fill="#fff566"/><rect x="11" y="23" width="11" height="1" fill="#fff566"/><rect x="26" y="23" width="4" height="1" fill="#fff566"/><rect x="11" y="24" width="3" height="1" fill="#fff566"/><rect x="15" y="24" width="3" height="1" fill="#fff566"/><rect x="20" y="24" width="3" height="1" fill="#fff566"/><rect x="10" y="25" width="3" height="1" fill="#fff566"/><rect x="15" y="25" width="3" height="1" fill="#fff566"/><rect x="20" y="25" width="3" height="1" fill="#fff566"/><rect x="9" y="26" width="4" height="1" fill="#fff566"/><rect x="15" y="26" width="3" height="1" fill="#fff566"/><rect x="21" y="26" width="3" height="1" fill="#fff566"/><rect x="9" y="27" width="3" height="1" fill="#fff566"/><rect x="15" y="27" width="3" height="1" fill="#fff566"/><rect x="22" y="27" width="3" height="1" fill="#fff566"/><rect x="8" y="28" width="3" height="1" fill="#fff566"/><rect x="15" y="28" width="3" height="1" fill="#fff566"/><rect x="22" y="28" width="3" height="1" fill="#fff566"/><rect x="15" y="29" width="3" height="1" fill="#fff566"/><rect x="15" y="30" width="3" height="1" fill="#fff566"/><rect x="15" y="13" width="1" height="1" fill="#12082a"/><rect x="16" y="13" width="1" height="1" fill="#12082a"/><rect x="17" y="13" width="1" height="1" fill="#12082a"/><rect x="14" y="14" width="1" height="1" fill="#12082a"/><rect x="15" y="14" width="1" height="1" fill="#12082a"/><rect x="16" y="14" width="1" height="1" fill="#12082a"/><rect x="17" y="14" width="1" height="1" fill="#12082a"/><rect x="18" y="14" width="1" height="1" fill="#12082a"/><rect x="13" y="15" width="1" height="1" fill="#12082a"/><rect x="14" y="15" width="1" height="1" fill="#12082a"/><rect x="15" y="15" width="1" height="1" fill="#12082a"/><rect x="16" y="15" width="1" height="1" fill="#12082a"/><rect x="17" y="15" width="1" height="1" fill="#12082a"/><rect x="18" y="15" width="1" height="1" fill="#12082a"/><rect x="19" y="15" width="1" height="1" fill="#12082a"/><rect x="13" y="16" width="1" height="1" fill="#12082a"/><rect x="14" y="16" width="1" height="1" fill="#12082a"/><rect x="15" y="16" width="1" height="1" fill="#12082a"/><rect x="16" y="16" width="1" height="1" fill="#12082a"/><rect x="17" y="16" width="1" height="1" fill="#12082a"/><rect x="18" y="16" width="1" height="1" fill="#12082a"/><rect x="19" y="16" width="1" height="1" fill="#12082a"/><rect x="13" y="17" width="1" height="1" fill="#12082a"/><rect x="14" y="17" width="1" height="1" fill="#12082a"/><rect x="15" y="17" width="1" height="1" fill="#12082a"/><rect x="16" y="17" width="1" height="1" fill="#12082a"/><rect x="17" y="17" width="1" height="1" fill="#12082a"/><rect x="18" y="17" width="1" height="1" fill="#12082a"/><rect x="19" y="17" width="1" height="1" fill="#12082a"/><rect x="14" y="18" width="1" height="1" fill="#12082a"/><rect x="15" y="18" width="1" height="1" fill="#12082a"/><rect x="16" y="18" width="1" height="1" fill="#12082a"/><rect x="17" y="18" width="1" height="1" fill="#12082a"/><rect x="18" y="18" width="1" height="1" fill="#12082a"/><rect x="15" y="19" width="1" height="1" fill="#12082a"/><rect x="16" y="19" width="1" height="1" fill="#12082a"/><rect x="17" y="19" width="1" height="1" fill="#12082a"/>\n            </g>\n          </symbol></defs></svg><div class="gear-corner tl" aria-hidden="true"><span class="spin"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><use href="#gear-pixel-neon" /></svg></span></div><div class="gear-corner tr" aria-hidden="true"><span class="spin"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><use href="#gear-pixel-neon" /></svg></span></div><div class="gear-corner bl" aria-hidden="true"><span class="spin"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><use href="#gear-pixel-neon" /></svg></span></div><div class="gear-corner br" aria-hidden="true"><span class="spin"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><use href="#gear-pixel-neon" /></svg></span></div>';

  var mount = document.createElement("div");
  mount.id = "gear-neon-corners-mount";
  mount.className = "gear-neon-corners";
  mount.setAttribute("aria-hidden", "true");
  mount.innerHTML = GEAR_INNER;

  var frame = document.createElement("div");
  frame.className = "gear-neon-game-frame";

  var mission = document.getElementById("mission-bar");
  var shellByMission =
    mission && mission.nextElementSibling && mission.nextElementSibling.classList.contains("shell")
      ? mission.nextElementSibling
      : null;

  if (mission && shellByMission) {
    var p = mission.parentNode;
    p.insertBefore(frame, mission);
    frame.appendChild(mission);
    frame.appendChild(shellByMission);
    frame.appendChild(mount);
    return;
  }

  var single =
    document.querySelector(".terminal-window") ||
    document.querySelector(".ending-stage") ||
    document.querySelector("body > .wg-wrap") ||
    document.querySelector(".wg-wrap") ||
    document.querySelector(".arcade-landing-inner");

  if (!single) return;

  var parent = single.parentNode;
  if (!parent) return;

  parent.insertBefore(frame, single);
  frame.appendChild(single);
  frame.appendChild(mount);
})();
