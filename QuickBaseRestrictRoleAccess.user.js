// ==UserScript==
// @name         QuickBase Restrict Role Access
// @namespace    QuickBaseRestrictRoleAccess
// @version      0.1
// @description  Change all permission values at once
// @author       Justin Torrence
// @match        ://*.quickbase.com/db/*a=mf*
// @match        ://*.quickbase.com/db/*a=genModFieldForm*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickBaseRestrictRoleAccess.user.js
// ==/UserScript==

function changeToView() {
    let roleRows = document.getElementsByClassName("m");
    for (let i = 0; i < roleRows.length; i++) {
        $(roleRows[i].childNodes[1].childNodes[0]).val('1');
    }
    return;
}

function changeToModify() {
    let roleRows = document.getElementsByClassName("m");
    for (let i = 0; i < roleRows.length; i++) {
        $(roleRows[i].childNodes[1].childNodes[0]).val('5');
    }
    return;
}

function changeToNone() {
    let roleRows = document.getElementsByClassName("m");
    for (let i = 0; i < roleRows.length; i++) {
        $(roleRows[i].childNodes[1].childNodes[0]).val('0');
    }
    return;
}

function changeUI() {
    if (!document.getElementById("customChangeGroup")) {
        let changeGroup = document.createElement("div");
        changeGroup.id = "customChangeGroup";

        // view button
        let customViewButton = document.createElement("div");
        customViewButton.classList.add("Vibrant");
        customViewButton.classList.add("Primary");
        customViewButton.classList.add("Secondary");
        customViewButton.onclick = changeToView;
        customViewButton.innerText = "Set All to View";

        // modify button
        let customModifyButton = document.createElement("div");
        customModifyButton.classList.add("Vibrant");
        customModifyButton.classList.add("Primary");
        customModifyButton.classList.add("Secondary");
        customModifyButton.onclick = changeToModify;
        customModifyButton.innerText = "Set All to Modify";

        // none button
        let customNoneButton = document.createElement("div");
        customNoneButton.classList.add("Vibrant");
        customNoneButton.classList.add("Primary");
        customNoneButton.classList.add("Secondary");
        customNoneButton.onclick = changeToNone;
        customNoneButton.innerText = "Set All to None";

        changeGroup.appendChild(customViewButton);
        changeGroup.appendChild(customModifyButton);
        changeGroup.appendChild(customNoneButton);

        let introText = document.getElementById("accessReset");
        introText.appendChild(changeGroup);
    }

}

let roleToolButton = document.createElement("button");
roleToolButton.classList.add("Vibrant");
roleToolButton.onclick = changeUI;
roleToolButton.innerText = "Role Tool";

let nav = document.getElementById("pageNavBarActions");
nav.appendChild(roleToolButton);
