// ==UserScript==
// @name         🐭️ Mousehunt - Fancy King's Reward
// @version      1.2.1
// @description  Makes the King's Reward look nicer and automatically goes back to the page you were on after solving the puzzle.
// @license      MIT
// @author       bradp
// @namespace    bradp
// @match        https://www.mousehuntgame.com/*
// @icon         https://i.mouse.rip/mouse.png
// @grant        none
// @run-at       document-end
// @require      https://cdn.jsdelivr.net/npm/mousehunt-utils@1.2.0/mousehunt-utils.js
// ==/UserScript==

((function () {
  'use strict';

  addStyles(`.mousehuntPage-puzzle-form-description,
  .mousehuntPage-puzzle-form-title,
  .mousehuntPage-puzzle-form-subtitle,
  .mousehuntPage-puzzle-form-newCode b {
    display: none;
  }

  .mousehuntPage-puzzle.active {
    position: relative;
    margin-top: 50px;
    background: none;
    border: none;
    box-shadow: none;
  }

  .mousehuntPage-puzzle-formContainer {
    padding: 0 20px 0 75px;
    background: none;
    background-image: url(https://www.mousehuntgame.com/images/ui/newsposts/np_border.png);
    background-repeat: repeat-y;
    background-size: 100%;
  }

  .mousehuntPage-puzzle-form-captcha-image-container {
    display: block;
    width: 100%;
    height: 90px;
    margin: 20px auto;
    text-align: center;
  }

  .mousehuntPage-puzzle-form-code-container {
    display: block;
    width: 300px;
    margin: 0 auto;
    border: none;
    box-shadow: none;
  }

  .mousehuntPage-puzzle-form-newCode {
    display: block;
    float: none;
    width: 100%;
    margin: 0;
    text-align: center;
  }

  input.mousehuntPage-puzzle-form-code-button {
    width: 100%;
    padding: 10px 50px;
    font-size: 1.5em;
    color: #000;
    text-align: center;
    background: linear-gradient(to bottom, #fff600, #f4e830);
    border: 1px solid #000;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px #d6d13b inset;
  }

  .mousehuntPage-puzzle-form-code-border {
    width: 100%;
    height: 90px;
    margin-bottom: 29px;
    overflow: hidden;
    border-radius: 5px;
  }

  .mousehuntPage-puzzle-form-state.hasPuzzle {
    display: flex;
    align-items: flex-end;
  }

  .mousehuntPage-puzzle-form-title {
    position: relative;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 412px;
    height: 99px;
    margin: 20px auto 0;
    font-size: 16px;
    color: #7d3b0a;
    text-align: center;
    text-shadow: 1px 1px 1px #e9d5a2;
    background: url(https://www.mousehuntgame.com/images/ui/larry_gifts/ribbon.png?asset_cache_version=2) no-repeat;
  }

  .mousehuntPage-puzzle-formContainer.hasPuzzle::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 690px;
    height: 100px;
    margin: 0 auto;
    content: '';
    background-image: url(https://www.mousehuntgame.com/images/ui/newsposts/np_header.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }

  form.mousehuntPage-puzzle-formContainer.hasPuzzle::after {
    position: absolute;
    right: 0;
    left: 0;
    width: 690px;
    height: 126px;
    margin: 0 auto;
    content: '';
    background-image: url(https://www.mousehuntgame.com/images/ui/newsposts/np_footer.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }

  input.mousehuntPage-puzzle-form-code {
    height: 90px;
    padding-left: 10px !important;
    font-size: 60px;
    text-align: left;
    background: #e2e2e2;
  }

  .mousehuntPage-puzzle-form-captcha-image-loading {
    background: none;
    border: none;
    box-shadow: none;
  }

  .mousehuntPage-puzzle-form-captcha-image img {
    width: 300px;
    border: 1px solid #666;
    border-radius: 3px;
  }

  input.mousehuntPage-puzzle-form-code-button:hover,
  input.mousehuntPage-puzzle-form-code-button:focus {
    background: linear-gradient(to bottom, #f4e830, #fff600);
    box-shadow: none;
  }
  `);

  const init = () => {
    if ('puzzle' !== getCurrentPage()) {
      return;
    }

    const kingsRewardInput = document.querySelector('.mousehuntPage-puzzle-form-code');
    if (! kingsRewardInput) {
      return;
    }

    kingsRewardInput.spellcheck = false;

    kingsRewardInput.focus();
  };

  init();

  onPageChange({ change: init });

  onAjaxRequest((req) => {
    init();

    // If we solved it, refresh the page.
    if (req.success && req.puzzle_reward) {
      window.location.reload();
    }
  }, 'managers/ajax/users/solvePuzzle.php', true);
})());
