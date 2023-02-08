// ==UserScript==
// @name         🐭️ Mousehunt - Fancy King's Reward
// @version      1.0.0
// @description  Makes the King's Reward look nicer and automatically goes back to the page you were on after solving the puzzle.
// @license      MIT
// @author       bradp
// @namespace    bradp
// @match        https://www.mousehuntgame.com/*
// @icon         https://brrad.com/mouse.png
// @grant        none
// @run-at       document-end
// ==/UserScript==

((function () {
	'use strict';

	/**
	 * Add styles to the page.
	 *
	 * @param {string} styles The styles to add.
	 */
	const addStyles = (styles) => {
		const existingStyles = document.getElementById('mh-mouseplace-custom-styles');

		if (existingStyles) {
			existingStyles.innerHTML += styles;
			return;
		}

		const style = document.createElement('style');
		style.id = 'mh-mouseplace-custom-styles';
		style.innerHTML = styles;
		document.head.appendChild(style);
	};

	/**
	 * Do something when ajax requests are completed.
	 *
	 * @param {Function} callback    The callback to call when an ajax request is completed.
	 * @param {string}   url         The url to match. If not provided, all ajax requests will be matched.
	 * @param {boolean}  skipSuccess Skip the success check.
	 */
	const onAjaxRequest = (callback, url = null, skipSuccess = false) => {
		const req = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function () {
			this.addEventListener('load', function () {
				if (this.responseText) {
					let response = {};
					try {
						response = JSON.parse(this.responseText);
					} catch (e) {
						return;
					}

					if (response.success || skipSuccess) {
						if (! url) {
							callback(response);
							return;
						}

						if (this.responseURL.indexOf(url) !== -1) {
							callback(response);
						}
					}
				}
			});
			req.apply(this, arguments);
		};
	};

	addStyles(`.mousehuntPage-puzzle-form-description, .mousehuntPage-puzzle-form-title, .mousehuntPage-puzzle-form-subtitle {
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

	.mousehuntPage-puzzle-form-description, .mousehuntPage-puzzle-form-subtitle {
		display: none;
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

	.mousehuntPage-puzzle-form-newCode b {
		display: none;
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
		position: relative;margin-bottom: 150px;
	}

	.mousehuntPage-puzzle-form-state.hasPuzzle {
		display: flex;
	}

	.mousehuntPage-puzzle-form-state.hasPuzzle {
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

	onAjaxRequest((req) => {
		// If we solved it, refresh the page.
		if (req.success && req.puzzle_reward) {
			window.location.reload();
		}
	}, 'managers/ajax/users/solvePuzzle.php', true );
})());
