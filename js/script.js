'use-strict'

const mybtnEl = document.querySelector('.myBtn');
const titleEl = document.querySelector('#title');
const descEl = document.querySelector('#Description');
const tableBodyEl = document.querySelector('#tableBody');
const clearBtnEl = document.querySelector('.clearBtn');

function updateList() {

    if (localStorage.getItem('itemsJson') != null) {
        itemsJsonArray = [];
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        let str = "";
        for (let i = 0; i < itemsJsonArray.length; i++) {
            str += `
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${itemsJsonArray[i][0]}</td>
                <td>${itemsJsonArray[i][1]}</td>
                <td><button class="btn btnsm btn-primary" onclick = "deleteItem(${i})">Delete</button></td>
                </tr>
                `
        }
        tableBodyEl.innerHTML = str;
    }
}


function getupdateList() {
    let titletext = titleEl.value;
    let desc = descEl.value;

    if (titletext.length === 0) {
        alert("Type Your Title please !!! ");
    } else if (desc.length === 0) {
        alert("Type Your Description please !!!");
    } else {
        if (localStorage.getItem('itemsJson') == null) {
            itemsJsonArray = [];
            itemsJsonArray.push([titletext, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        } else {
            itemsJsonArrayStr = localStorage.getItem('itemsJson');
            itemsJsonArray = JSON.parse(itemsJsonArrayStr);
            itemsJsonArray.push([titletext, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
            //console.log(itemsJsonArray);
        }
        let str = "";
        for (let i = 0; i < itemsJsonArray.length; i++) {
            str += `
                    <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${itemsJsonArray[i][0]}</td>
                    <td>${itemsJsonArray[i][1]}</td>
                    <td><button class="btn btnsm btn-primary" onclick = "deleteItem(${i})">Delete</button></td>
                    </tr>
                    `
        }
        tableBodyEl.innerHTML = str;
    }

}

updateList();
mybtnEl.addEventListener("click", function() {
    getupdateList();
});

function deleteItem(indexItem) {
    itemsJsonArray = [];
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    itemsJsonArray.splice(indexItem, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    updateList();
    if (itemsJsonArray.length === 0) {
        localStorage.clear();
    }

}

clearBtnEl.addEventListener("click", () => {
    itemsJsonArray = [];
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    if (localStorage.getItem('itemsJson') == null || itemsJsonArray.length === 0) {
        alert("You don't Have items in Your Todo List.!!!");
        localStorage.clear();
    } else {
        if (confirm("Are You Sure ?")) {
            itemsJsonArray.splice(0, itemsJsonArray.length);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
            updateList();
            localStorage.clear();
        }
    }



});