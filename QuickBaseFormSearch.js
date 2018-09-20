// ==UserScript==
// @name         SearchOptions
// @namespace    QuickBaseFormSearch
// @version      0.1
// @description  Search form editor for selected values
// @author       Justin Torrence
// @match        ://*.quickbase.com/*/*?a=dformprops*
// @match        ://*.quickbase.com/*/*?a=DFormProps*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickBaseFormSearch.js
// ==/UserScript==

(function () {
    'use strict';

    let lastSearch = "";

    function searchForm() {
        let searchString = document.getElementById("customSearchInput").value.toLowerCase();

        let matches = [];

        for (let i = 0; i < selElems.length; i++) {
            let optionText = selElems[i].options[selElems[i].selectedIndex].text.toLowerCase();
            if(optionText.includes(searchString))
                matches.push(i)
        }

        let currentIndex = matches.indexOf(GetFirstSelectedRow());
        let nextIndex = currentIndex += 1;

        if (lastSearch == searchString && matches.length > currentIndex)
            showTheElement(matches[nextIndex]);
        else
            showTheElement(matches[0]);

        lastSearch = searchString;
    }

    function searchUI() {
        if (!document.getElementById("customSearchGroup")) {
            let searchGroup = document.createElement("div");
            searchGroup.id = "customSearchGroup";

            // input
            let input = document.createElement("input");
            input.classList.add("UserInput");
            input.classList.add("WithPadding");
            input.placeholder = "Search Form Elements";
            input.id = "customSearchInput";

            // search button
            let confirmSearch = document.createElement("button");
            confirmSearch.classList.add("Vibrant");
            confirmSearch.classList.add("Primary");
            confirmSearch.classList.add("Secondary");
            confirmSearch.onclick = searchForm;
            confirmSearch.innerText = "Search";

            searchGroup.appendChild(input);
            searchGroup.appendChild(confirmSearch);

            let introText = document.getElementById("introText")
            introText.appendChild(searchGroup);
        }

    }

    function showTheElement(index) {
        selElems[index].click();
        selElems[index].scrollIntoView();
    }


    let searchButton = document.createElement("button");
    searchButton.classList.add("Vibrant");
    searchButton.onclick = searchUI;
    searchButton.innerText = "Search Form";

    let nav = document.getElementById("pageNavBarActions");
    nav.appendChild(searchButton);
})();