const itemURL = "http://localhost:5000/item/";


const makeRequest = (method, url, body) => {
    return new Promise(
        function (res, rej) {
            const req = new XMLHttpRequest();
            req.onload = () => {
                if (req.status === 200) {
                    res(req.response);
                } else {
                    const reason = new Error('Error');
                    rej(reason);
                }
            }
            req.open(method, url)
            req.send(body);
        }
    )
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
    let username = document.createElement('td');
    username.innerHTML = newEntry.username;
    let content = document.createElement('td');
    content.innerHTML = newEntry.content;
    let deleteButton = document.createElement('td');
    deleteButton.innerHTML = `<button type="button" class="btn btn-secondary" onclick='destroy(${newEntry.poseID})' > Delete</button >`;

    aRow.appendChild(username);
    aRow.appendChild(content);
    aRow.appendChild(deleteButton);
}


//delete
function destroy(id) {
    makeRequest("DELETE", `${itemURL}delete/${id}`).then(() => {
        readAll();
    });
}


//constructor
function itemMaker(username, content) {
    const anItem = {
        username: username.value,
        content: content.value
    };
    return anItem;
}


//create
function create() {
    let aPost = itemMaker(username, content);
    console.log(aPost);
    makeRequest("POST", `${itemURL}create`, JSON.stringify(aPost)).then(() => {
    }).catch((error) => { console.log(error.message) }).then(readAll());
}


readAll();
