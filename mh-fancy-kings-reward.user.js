// ==UserScript==
// @name         🐭️ Mousehunt - Fancy King's Reward
// @version      1.2.0
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
  .mousehuntPage-puzzle-form-description,
  .mousehuntPage-puzzle-form-subtitle,
  .mousehuntPage-puzzle-form-newCode b {
    display: none;
  }

  .mousehuntPage-puzzle.active {
    background: none;
    border: none;
    box-shadow: none;
    margin-top: 50px;
  }

  .mousehuntPage-puzzle-formContainer {
    background: none;
    padding-left: 75px;
  }
  .mousehuntPage-puzzle-formContainer {
    padding: 0;
    background: none;
    background-image: url(https://www.mousehuntgame.com/images/ui/newsposts/np_border.png);
    background-repeat: repeat-y;
    background-size: 100%;
    padding: 0 20px;
  }

  .mousehuntPage-puzzle-form-captcha-image-container {
    display: block;
    width: 100%;
    text-align: center;
    height: 90px;
    margin: 20px auto;
  }

  .mousehuntPage-puzzle-form-code-container {
    width: 300px;
    display: block;
    margin: 0 auto;
    border: none;
    box-shadow: none;
  }

  .mousehuntPage-puzzle-form-newCode {
    display: block;
    float: none;
    margin: 0;
    text-align: center;
    width: 100%;
  }

  input.mousehuntPage-puzzle-form-code-button {
    background: linear-gradient(to bottom,#fff600, #f4e830);
    box-shadow: 0 0 10px 1px #d6d13b inset;
    font-size: 1.5em;
    padding: 10px 50px;
    border: 1px solid #000;
    border-radius: 5px;
    color: #000;
    text-align: center;
    width: 100%;
  }

  .mousehuntPage-puzzle-form-code-border {
    overflow: hidden;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 29px;
    height: 90px;
  }

  .mousehuntPage-puzzle.active {
    position: relative;
    margin-bottom: 150px;
  }

  .mousehuntPage-puzzle-form-state.hasPuzzle {
    display: flex;
  }

  .mousehuntPage-puzzle-form-state.hasPuzzle {
    display: -ms-grid;
    display: grid;
    align-items: flex-end;
  }

  .mousehuntPage-puzzle-form-title {
    background: url(https://www.mousehuntgame.com/images/ui/larry_gifts/ribbon.png?asset_cache_version=2) no-repeat;
    width: 412px;
    height: 99px;
    text-align: center;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 0 auto;
    color: #7d3b0a;
    text-shadow: 1px 1px 1px #e9d5a2;
    position: relative;
    bottom: 20px;
  }

  .mousehuntPage-puzzle-formContainer.hasPuzzle:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background-image: url(https://www.mousehuntgame.com/images/ui/newsposts/np_header.png);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 100px;
    width: 690px;
    margin: 0 auto;
    top: 0;
  }

  form.mousehuntPage-puzzle-formContainer.hasPuzzle:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background-image: url(https://www.mousehuntgame.com/images/ui/newsposts/np_footer.png);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 126px;
    width: 690px;
    margin: 0 auto;
  }

  input.mousehuntPage-puzzle-form-code {
    font-size: 60px;
    height: 90px;
    background: #e2e2e2;
    text-align: left;
    padding-left: 10px !important;
  }

  .mousehuntPage-puzzle-form-captcha-image-loading {
    background: none;
    border: none;
    box-shadow: none;
  }

  .mousehuntPage-puzzle-form-captcha-image img {
    border: 1px solid #666;
    border-radius: 3px;
    width: 300px;
  }

  input.mousehuntPage-puzzle-form-code-button:hover {
    background: linear-gradient(to bottom, #f4e830, #fff600);
    box-shadow: none;
  }`);

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
