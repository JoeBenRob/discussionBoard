const itemURL = "http://localhost:5000/item/";


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
            for (let i = data.length - 1; i > -1; i--) {
                let aRow = document.createElement('tr')
                tableContainer.appendChild(aRow);
                addToTable(data[i], aRow);
            }
        }).catch((error) => { console.log(error.message) });

}


function addToTable(newEntry, aRow) {
    let username = document.createElement('td');
    username.innerHTML = newEntry.username;
    let content = document.createElement('td');
    content.innerHTML = newEntry.content;
    let deleteButton = document.createElement('td');
    deleteButton.id = newEntry._id;
    deleteButton.innerHTML = `<button type="button" class="btn btn-secondary" > Delete</button >`;
    deleteButton.onclick = destroy;
    aRow.appendChild(username);
    aRow.appendChild(content);
    aRow.appendChild(deleteButton);
}


//delete

function destroy() {

    let body = {
        "id": event.target.offsetParent.id
    }

    let req = new XMLHttpRequest();
    req.onload = () => {
        if (req.status === 200) {
            console.log(req);
        } else {
            const reason = new Error("Rejected");
            console.log(reason);
        }
    };

    req.open("DELETE", "http://localhost:5000/item/delete");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(body));
    readAll();
};



//constructor
function itemMaker(username, content) {
    const anItem = {
        username: username.value,
        content: content.value
    };
    return anItem;
}


// //create
// function create() {
//     let aPost = itemMaker(username, content);
//     console.log(aPost);

//     makeRequest("POST", `${itemURL}create`, aPost).then(() => {
//     }).catch((error) => { console.log(error.message) }).then(readAll());
// }


// create
function create() {
    let item = itemMaker(username, content);

    let req = new XMLHttpRequest();
    req.onload = () => {
        if (req.status === 200) {
            console.log(req);
        } else {
            const reason = new Error("Rejected");
            console.log(reason);
        }
    };

    req.open("POST", "http://localhost:5000/item/create");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(item));
    readAll();
}

readAll();
