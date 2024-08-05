// ==UserScript==
// @name         YouTube Redirect to invidious
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Redirect various YouTube URLs to invidious
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @match        *://youtu.be/*
// @match        *://m.youtube.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    const currentUrl = new URL(window.location.href);
    const baseUrl = 'https://yewtu.be';
    let newUrl = baseUrl;
    if (currentUrl.hostname === 'youtu.be') {
        newUrl += `/${currentUrl.pathname.substring(1)}`;
    } else if (['www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(currentUrl.hostname)) {
        newUrl += currentUrl.pathname === '/' ? '/' : `${currentUrl.pathname}${currentUrl.search}`;
    } 
    window.location.href = newUrl;
})();
