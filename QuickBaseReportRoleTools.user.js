// ==UserScript==
// @name         QuickBase Report Role Tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Resizes the Role list in reports to make it easier to navigate and find Roles and lets you check and uncheck all roles at once.
// @author       mkarrlp
// @match        ://*.quickbase.com/db/*?a=viewbuild&qid*
// @match        ://*.quickbase.com/db/*?a=ViewBuild&uid*
// @grant        none
// @updateURL    ://github.com/mkarrlp/QuickBaseReportRoleViewResizer/raw/master/QuickBaseReportRoleResizer.user.js
// ==/UserScript==


// This should happen after the document loads
(function() {
    'use strict';

    document.getElementById("whichRoles1").style["min-height"] = "500px"
})();


function checkAllBoxes(){
    var uncheckedBoxes = document.querySelectorAll("#whichRoles1 > input[type=checkbox]:not(:checked)")
    for(let i=0;i<uncheckedBoxes.length;i++){
        uncheckedBoxes[i].click()
    }
}

function uncheckAllBoxes(){
    var checkedBoxes = document.querySelectorAll("#whichRoles1 > input[type=checkbox]:checked")
    for(let i=0;i<checkedBoxes.length;i++){
        checkedBoxes[i].click()
    }
}

function checkButtons(){
    if (!document.getElementById("customSearchGroup")) {
        let searchGroup = document.createElement("div");
        searchGroup.id = "customSearchGroup";

        // input
        let uncheckAll = document.createElement("button");
        uncheckAll.classList.add("Vibrant");
        uncheckAll.classList.add("Primary");
        uncheckAll.classList.add("Secondary");
        uncheckAll.onclick = uncheckAllBoxes;
        uncheckAll.innerText = "Uncheck All Roles";

        // search button
        let checkAll = document.createElement("button");
        checkAll.classList.add("Vibrant");
        checkAll.classList.add("Primary");
        checkAll.classList.add("Secondary");
        checkAll.onclick = checkAllBoxes;
        checkAll.innerText = "Check All Roles";

        searchGroup.appendChild(checkAll);
        searchGroup.appendChild(uncheckAll);

        if(!nav){
            let nav = document.getElementById("pageNavBarActions");
        }
        nav.appendChild(searchGroup);
    }
}

let searchButton = document.createElement("button");
searchButton.classList.add("Vibrant");
searchButton.onclick = checkButtons;
searchButton.innerText = "Check/Uncheck Roles Buttons";

let nav = document.getElementById("pageNavBarActions");
nav.appendChild(searchButton);
