// ==UserScript==
// @name         QuickBase Dynamic Rule Role Search
// @namespace    QuickBaseDynamicRuleRoleSearch
// @version      0.1
// @description  Search Dynamic Form Rules for role usage
// @author       Justin Torrence
// @match        ://*.quickbase.com/db/*DformProps*
// @match        ://*.quickbase.com/db/*dformprops*
// @match        ://*.quickbase.com/db/*DFormProps*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickBaseDynamicRuleRoleSearch.user.js
// ==/UserScript==

function getRoles() {
    let numberOfRules = gRulesTable.rows.length;
    let roleSelect = document.getElementById("roleSelect");
    let displayElem = document.getElementById("displayElem");
    let selectedRole = roleSelect.options[roleSelect.selectedIndex].value;
    let rulesUsingRole = [];
    for (let i = 0; i < numberOfRules; i++) {
        let ruleUsesRole = false;
        let ruleObj = RuleFromRow(i);
        if (ruleObj.hasOwnProperty("conditions")) {
            for (let j = 0; j < ruleObj.conditions.length; j++) {
                let conditionValue = ruleObj.conditions[j].val;
                if (conditionValue == selectedRole) {
                    ruleUsesRole = true;
                }
            }
        }
        if (ruleUsesRole) {
            rulesUsingRole.push(i);
        }
    }
    displayElem.innerText = "Form Rules: " + rulesUsingRole;
}

function getRolesInRules() {
    let roles = [];
    let numberOfRules = gRulesTable.rows.length;
    for (let i = 0; i < numberOfRules; i++) {
        let ruleObj = RuleFromRow(i);
        if (ruleObj.hasOwnProperty("conditions")) {
            for (let j = 0; j < ruleObj.conditions.length; j++) {
                let conditionValue = ruleObj.conditions[j].val;
                if (conditionValue.includes("_role_") && !roles.includes(conditionValue)) {
                    roles.push(conditionValue);
                }
            }
        }
    }
    return roles;
}


function roleSearchUI() {
    if (!document.getElementById("roleSearchGroup")) {
        let searchGroup = document.createElement("div");
        searchGroup.id = "roleSearchGroup";

        // dropdoewn
        let select = document.createElement("select");
        let roleOptions = getRolesInRules();
        for (let i = 0; i < roleOptions.length; i++) {
            let option = document.createElement("option");
            option.innerText = GetRoleName(roleOptions[i].replace("_role_", ""));
            option.value = roleOptions[i];
            select.appendChild(option);
        }
        select.id = "roleSelect";

        // search button
        let confirmSearch = document.createElement("button");
        confirmSearch.classList.add("Vibrant");
        confirmSearch.classList.add("Primary");
        confirmSearch.classList.add("Secondary");
        confirmSearch.onclick = getRoles;
        confirmSearch.innerText = "Search";

        // display text
        let displayText = document.createElement("div");
        displayText.id = "displayElem";

        searchGroup.appendChild(select);
        searchGroup.appendChild(confirmSearch);
        searchGroup.appendChild(displayText);

        let introText = document.getElementById("introText");
        introText.appendChild(searchGroup);
    }

}


let roleSearchButton = document.createElement("button");
roleSearchButton.classList.add("Vibrant");
roleSearchButton.onclick = roleSearchUI;
roleSearchButton.innerText = "Role Rule Search";

let nav = document.getElementById("pageNavBarActions");
nav.appendChild(roleSearchButton);