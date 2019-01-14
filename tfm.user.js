// ==UserScript==
// @name         tecmint focus mode
// @version      0.2
// @description  Add a toggle switch for focus mode on tecmint.com. Focus mode gets rid of all distractions and applies a dark theme.
// @author       makl11
// @match        https://www.tecmint.com/*
// @updateURL	 https://github.com/makl11/tecmint-focus-mode-userscript/raw/master/tfm.user.js
// @downloadURL	 https://github.com/makl11/tecmint-focus-mode-userscript/raw/master/tfm.user.js
// @copyright	 2019+, makl11
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const toRemove = ["#nav-topbar", "#header .pad", "#footer", ".add-box", ".fixedBar", ".ads-inner-mobile",
                  ".after-post-box", ".post-tags", ".author-bio", ".sharrre-container", ".grid.one-fourth", ".post-nav",
                  ".heading", ".related-posts", "#comments", ".comments", ".sidebar", ".hr", "#quickiebarpro"];

const darkmodeStyle =
`<style id="tfmDark">
  .entry .wp-caption-text { color: #121212 }^^
  .entry .wp-caption { background-color: #ccc }
  .entry p strong, .entry b { color: #aaa }
  .entry,.page-title h2, h2 { color: #ccc }
  .col-2cl .main-inner, body, .page-title { background-color: #121212 }
  .col-2cl .content { box-shadow: none }
  #exam_announcement { background-color: #212121; border-color: #000000; border-color-left: #000000 }
  #page { margin-top: 0px }
</style>`;

const switchHTML = `<style>
  #tfmContainer {
    transform: scale(0.7);
    position: fixed;
    z-index: 999;
    top: 9px;
    left: 0px
  }
  #tfmContainer .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  #tfmContainer .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  #tfmContainer .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }

  #tfmContainer .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }

  #tfmContainer input:checked + .slider {
    background-color: #2196F3;
  }

  #tfmContainer input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  </style>
  <label class="switch"><input type="checkbox" ${GM_getValue("hide") ? "checked" : ""}><span class="slider"></span></label>`;

(function() {
    'use strict';
    let container = document.createElement("div");
    container.id = "tfmContainer";
    container.innerHTML = switchHTML;
    container.addEventListener("change", (e) => printView(e.srcElement.checked));
    document.body.appendChild(container);
    if (GM_getValue("hide")) {
        printView(true);
    }
})();

function printView(checked) {
    if (checked) {
        toRemove.forEach((query) => document.querySelectorAll(query).forEach(elem => { elem.style.display="none" }));
        document.querySelector("#exam_announcement") ? document.querySelector("#exam_announcement").style.display="none": null;
        document.querySelector("#header").style.padding = "0px";
        document.querySelector(".main-inner").style.paddingRight = "0px";
        document.head.insertAdjacentHTML('beforeend', darkmodeStyle);
        GM_setValue("hide", true);
    } else {
        toRemove.forEach((query) => document.querySelectorAll(query).forEach(elem => { elem.style.display=null }));
        document.querySelector("#exam_announcement") ? document.querySelector("#exam_announcement").style.display=null: null;
        document.querySelector("#header").style.padding = null;
        document.querySelector(".main-inner").style.paddingRight = null;
        document.getElementById("tfmDark").remove();
        GM_setValue("hide", false);
    }
};


