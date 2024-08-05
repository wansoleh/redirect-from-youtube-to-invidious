// ==UserScript==
// @name         YouTube Redirect to Piped
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Redirect various YouTube URLs to piped.video
// @match        *://www.youtube.com/*
// @match        *://youtube.com/*
// @match        *://youtu.be/*
// @match        *://m.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const currentUrl = new URL(window.location.href);
    let newUrl;

    if (currentUrl.hostname === 'youtu.be') {
        const linkId = currentUrl.pathname.substring(1); 
        newUrl = linkId ? `https://piped.video/${linkId}` : 'https://piped.video/trending';

        } else if (currentUrl.hostname === 'www.youtube.com' || currentUrl.hostname === 'youtube.com' || currentUrl.hostname === 'm.youtube.com') {

        const pathMappings = {
            '/watch': '/watch',
            '/shorts': '/shorts',
            '/playlist': '/playlist',
            '/channel/': '/channels',
            '/@': '/@',
            '/results': '/results',
            '/embed': '/embed'
        };

        let foundMapping = false;

        for (const [key, value] of Object.entries(pathMappings)) {
            if (currentUrl.pathname.startsWith(key)) {
                newUrl = `https://piped.video${value}${currentUrl.pathname.substring(key.length)}${currentUrl.search}`;
                foundMapping = true;
                break;
            }
        }

        if (!foundMapping) {
            newUrl = 'https://piped.video/trending';
        }
    }

    if (newUrl) {
        window.location.href = newUrl;
    }
})();
