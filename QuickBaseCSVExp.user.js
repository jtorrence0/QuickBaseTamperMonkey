// ==UserScript==
// @name         Quick Base CSV Export
// @namespace    QuickBaseTamperMonkey
// @version      0.3
// @description  Exports Quick Base reports to CSV
// @author       Justin Torrence
// @match        ://*.quickbase.com/*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/blob/master/QuickBaseCSVExp.user.js
// ==/UserScript==

const originalFunction = vpInitTable;

function wrapperInitFunction(){
    var value = originalFunction.apply(null, arguments);

    gVPviews.forEach(e=> e.qbCanExp = true);

    return value;
}

vpInitTable = wrapperInitFunction;