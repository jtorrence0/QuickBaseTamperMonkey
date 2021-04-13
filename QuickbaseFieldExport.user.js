844508// ==UserScript==
// @name         QuickBase Restrict Role Access
// @namespace    QuickBaseRestrictRoleAccess
// @version      0.1
// @description  Change all permission values at once
// @author       Justin Torrence
// @match        ://*.quickbase.com/db/*a=listfields*
// @grant        none
// @updateURL    https://github.com/jtorrence0/QuickBaseTamperMonkey/raw/master/QuickbaseFieldExport.user.js
// ==/UserScript==

let $ = window.jQuery;
let importButton = document.getElementById("pageNavBarActions");

// download button
let downloadButton = document.createElement("div");
downloadButton.classList.add("Vibrant");
downloadButton.classList.add("Primary");
downloadButton.classList.add("Secondary");
downloadButton.onclick = downloadCSV;
downloadButton.innerText = "Download Fields";

importButton.prepend(downloadButton);

function downloadCSV() {
    var rows = $('tr[role="row"]').not(".jqgfirstrow")
    var csv = "label, comments, type, relationship, reportable, searchable, info, id\n";

    for (let i = 0; i < rows.length; i++) {
        row = [
            $(rows[i]).find('td[aria-describedby="fieldsTable_label"]').children('span').not('.Icon').children('a').html(),
            "\"" +$(rows[i]).find('td[aria-describedby="fieldsTable_comments"]').text().replace(/(\r\n|\n|\r)/gm, "") + "\"",
            $(rows[i]).find('td[aria-describedby="fieldsTable_richType"]').text(),
            getRelationship(rows[i]),
            $(rows[i]).find('td[aria-describedby="fieldsTable_reportable"]').find('[data-checked="1"]').length > 0,
            $(rows[i]).find('td[aria-describedby="fieldsTable_searchable"]').find('[data-checked="1"]').length > 0,
            "\"" + $(rows[i]).find('td[aria-describedby="fieldsTable_info"]').text() + "\"",
            $(rows[i]).find('td[aria-describedby="fieldsTable_id"]').text()
        ]
        
        csv += row.join(',');
        csv += "\r\n";

    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + escape(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'fields.csv';
    hiddenElement.click();
}



function getRelationship(row) {
    rel = ""
    if ($(row).find('td[aria-describedby="fieldsTable_whichRel"]').find('span').not('.Icon').length > 0) {
        rel = $(row).find('td[aria-describedby="fieldsTable_whichRel"]').find('span').not('.Icon')[0].innerText
            + " - " + $(row).find('td[aria-describedby="fieldsTable_whichRel"]').find('span').not('.Icon')[1].innerText;
    }
    return rel
}

