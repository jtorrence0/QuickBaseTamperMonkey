// ==UserScript==
// @name         Quick Base Form Checker
// @namespace    QuickBaseFormChecker
// @version      0.6
// @description  Returns the Rule #s of the rules that use the provided field id
// @author       Justin Torrence
// @match        ://*.quickbase.com/*/*?a=dformprops*
// @match        ://*.quickbase.com/*/*?a=DFormProps*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickBaseFormChecker.user.js
// ==/UserScript==

function getRules() {
    let numberOfRules = gRulesTable.rows.length;
    let fieldID = prompt("Field ID?");
    let rulesUsing = [];
    let valueCom = "_afid_" + fieldID;
    for (let i = 0; i < numberOfRules; i++) {
        let ruleUsesField = false;
        let ruleObj = RuleFromRow(i);

        if (ruleObj.trigFid == fieldID || ruleObj.trigVal == valueCom) {
            ruleUsesField = true;
        }
        for (let j = 0; j < ruleObj.numActions; j++) {
            if (ruleObj.actions[j].fid == fieldID || ruleObj.actions[j].val == valueCom) {
                ruleUsesField = true;
            }
        }
        for (let j = 0; j < ruleObj.numConditions.length; j++) {
            if (ruleObj.conditions[j].fid == fieldID || ruleObj.conditions[j].val == valueCom) {
                ruleUsesField = true;
            }
        }

        if (ruleUsesField) {
            rulesUsing.push(i);
        }
    }
    alert(rulesUsing)
}

let rulesButton = document.createElement("button");
rulesButton.classList.add("Vibrant");
rulesButton.onclick = getRules;
rulesButton.innerText = "Get Rules";

let nav = document.getElementById("pageNavBarActions");
nav.appendChild(rulesButton);