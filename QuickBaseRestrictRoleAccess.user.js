// ==UserScript==
// @name         QuickBase Restrict Role Access
// @namespace    QuickBaseRestrictRoleAccess
// @version      0.1
// @description  Change all permission values at once
// @author       Justin Torrence
// @match        ://*.quickbase.com/db/*a=mf*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickBaseRestrictRoleAccess.user.js
// ==/UserScript==

function changeAllRoleRows(value) {
    let roleRows = document.getElementsByClassName("m");
    for (let i = 0; i < roleRows.length; i++) {
        $(roleRows[i].childNodes[1].childNodes[0]).val(value);
        
    }
}

function changeUI() {
    if (!document.getElementById("customChangeGroup")) {
        let changeGroup = document.createElement("div");
        changeGroup.id = "customChangeGroup";

        // view button
        let customViewButton = document.createElement("button");
        customViewButton.classList.add("Vibrant");
        customViewButton.classList.add("Primary");
        customViewButton.classList.add("Secondary");
        customViewButton.onclick = changeAllRoleRows('1');
        customViewButton.innerText = "Set All to View";

        // modify button
        let customModifyButton = document.createElement("button");
        customModifyButton.classList.add("Vibrant");
        customModifyButton.classList.add("Primary");
        customModifyButton.classList.add("Secondary");
        customModifyButton.onclick = changeAllRoleRows('5');
        customModifyButton.innerText = "Set All to Modify";

        // none button
        let customNoneButton = document.createElement("button");
        customNoneButton.classList.add("Vibrant");
        customNoneButton.classList.add("Primary");
        customNoneButton.classList.add("Secondary");
        customNoneButton.onclick = changeAllRoleRows('0');
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
roleToolButton.onclick = searchUI;
roleToolButton.innerText = "Role Tool";

let nav = document.getElementById("pageNavBarActions");
nav.appendChild(roleToolButton);