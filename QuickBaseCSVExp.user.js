// ==UserScript==
// @name         QuickBase CSV Export
// @namespace    QuickBaseTamperMonkey
// @version      0.6
// @description  Exports Quick Base reports to CSV
// @author       Justin Torrence
// @match        ://*.quickbase.com/db/*?a=q*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickBaseCSVExp.user.js
// ==/UserScript==

const originalFunction = vpInitTable;

function wrapperInitFunction(){
    var value = originalFunction.apply(null, arguments);

    gVPviews.forEach(e=> e.qbCanExp = true);

    return value;
}

vpInitTable = wrapperInitFunction;