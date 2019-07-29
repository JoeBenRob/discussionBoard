
function makeRequest(requestType, url, whatToSend) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.onload = () => {
            if (req.status === 200) {
                resolve(req);
            } else {
                const reason = new Error("Rejected");
                reject(reason);
            }
        };
        req.open(requestType, url);
        req.send(whatToSend);
    });
}


function removeAllChildren(id) {
    let result = document.getElementById(id);
    while (result.hasChildNodes()) {
        result.removeChild(result.firstChild);
    }

}

//read
const readAll = () => {
    // removes any existing tables
    const tableContainer = document.getElementById('table');
    if (tableContainer.rows.length > 1) {
        let tableSize = tableContainer.rows.length;
        for (let i = tableSize; i > 1; i--) {
            tableContainer.deleteRow(i - 1);
        }
    }
    makeRequest("GET", `${itemURL}all`)
        .then((req) => {
            let data = JSON.parse(req.responseText);
            console.table(data);

            const tableContainer = document.getElementById('table');
            tableContainer.className = "table table-hover";

            // creating table rows and adding data into the rows
            for (let i = 0; i < data.length; i++) {
                let aRow = document.createElement('tr')
                tableContainer.appendChild(aRow);
                addToTable(data[i], aRow);
            }
        }).catch((error) => { console.log(error.message) });

}


function addToTable(newEntry, aRow) {
    let itemUsername = document.createElement('td');
    itemUsername.innerHTML = newEntry.itemUsername;
    let itemContent = document.createElement('td');
    itemContent.innerHTML = newEntry.itemContent;
    let deleteButton = document.createElement('td');
    deleteButton.innerHTML = `<button type="button" class="btn btn-secondary" onclick='destroy(${newEntry.poseID})' > Delete</button >`;

    aRow.appendChild(itemUsername);
    aRow.appendChild(itemContent);
    aRow.appendChild(deleteButton);
}


//delete
function destroy(id) {
    makeRequest("DELETE", `${itemURL}delete/${id}`).then(() => {
        readAll();
    });
}


//constructor
function itemMaker(itemUsername, itemContent) {
    const anItem = {
        username: itemUsername.value,
        content: itemContent.value
    };
    return anItem;
}


//create
function create() {
    let aPost = poseMaker(postUsername, postContent);
    console.log(aPost);
    makeRequest("POST", `${itemURL}create`, JSON.stringify(aPost)).then(() => {
    }).catch((error) => { console.log(error.message) }).then(readAll());
}

