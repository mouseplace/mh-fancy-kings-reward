// ==UserScript==
// @name         🐭️ Mousehunt - Fancy King's Reward
// @version      2.1.0
// @description  Clicks the 'Resume Hunting' button after solving a King's Reward.
// @license      MIT
// @author       bradp
// @namespace    bradp
// @match        https://www.mousehuntgame.com/*
// @icon         https://i.mouse.rip/mouse.png
// @grant        none
// @run-at       document-end
// @require      https://cdn.jsdelivr.net/npm/mousehunt-utils@1.5.2/mousehunt-utils.js
// @require      https://cdn.jsdelivr.net/npm/script-migration@1.1.1
// ==/UserScript==

((function () {
  'use strict';

  onAjaxRequest((req) => {
    if (req.success && req.puzzle_reward) {
      const resume = document.querySelector('.puzzleView__resumeButton');
      if (resume) {
        resume.click();
      }
    }
  }, 'managers/ajax/users/puzzle.php', true);

  migrateUserscript('🐭️ MouseHunt - Fancy King\'s Reward', 'https://greasyfork.org/en/scripts/459629-mousehunt-fancy-king-s-reward');
})());
