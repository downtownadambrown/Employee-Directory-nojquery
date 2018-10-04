const clearFields = function() {
    let fields = document.querySelectorAll('input');
    for (let i = 0; i < fields.length; i++) fields[i].value = "";
};

const locateUserByName = function(){
    username = $('#nameField').val();

    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].name === username) {
            return i;// returns index location of the user in employeeList
        }
    }
    return -1; // -1 is returned when the user does not exist
};

const addUser = function () {
    const newName = $('#nameField').val();
    const newOfficeNum = $('#officePhoneField').val();
    const newPhoneNum = $('#phoneNumField').val();
    
    const newUser = {
        name: newName,
        officeNum: newOfficeNum,
        phoneNum: newPhoneNum
    };
    employeeList.push(newUser);
    renderView();
    clearFields();
    hideBars();
};

const verifyUser = function () {
    let verifyName = $('#nameField').val();

    // User does not exist -> Returns false
    if (locateUserByName(verifyName) === -1) {
        contentRef.html(`<p>Sorry -- ${verifyName} does not exist.  Please check to see that you typed their name correctly.</p>`);
    }
    // User exists
    else {
        contentRef.html(`<p>Yes -- ${verifyName} exists</p>`);
        hideBars();
    }
};

const updateUser = function () {
    const updateName = $('#nameField').val();
    const updateOfficeNumber = $('#officePhoneField').val();
    const updatePhoneNumber = $('#phoneNumField').val();
    //Check first to escape out with an alert if the user does not exist
    if (locateUserByName(updateName) === -1) {
        alert(`User does not exist`);
    }
    else {
        //Make updates to this persons' officeNum and phoneNum in the employeeList
        employeeList[locateUserByName(updateName)].officeNum = updateOfficeNumber;
        employeeList[locateUserByName(updateName)].phoneNum = updatePhoneNumber;
        renderView();
        clearFields();
        hideBars();
    }
};

const deleteUser = function() {
    const removeName = $('#nameField').val();
    const userindex = locateUserByName();

    if (userindex === -1){
        contentRef.html = `Sorry -- that user does not exist`;
    }
    else {
        employeeList.splice(userindex, 1);
        renderView();
        clearFields();
        hideBars();
    }
};

const renderView = function() {
    let finalHTML = ``;

    for (let i = 0; i < employeeList.length; i++) {
        finalHTML += `<div class="user"><h2>Name: ${employeeList[i].name}</h2><h2>Office #: ${employeeList[i].officeNum}</h2><h2>Phone #: ${employeeList[i].phoneNum}</h2></div>`;
    }

    contentRef.html(finalHTML);
};

const renderminiView = function() {
    let finalHTML = `<br>`;

    for (let i = 0; i < employeeList.length; i++) {
        finalHTML += `<div class="user"><h2>Name: ${employeeList[i].name}</h2></div>`;
    }

    contentRef.append(finalHTML);
};

const hideBars = function() {
    document.getElementById("nameField").style.display = "none";
    document.getElementById("officePhoneField").style.display = "none";
    document.getElementById("phoneNumField").style.display = "none";
    document.getElementById("buttondiv").style.display = "none";
}

const showBars = function() {
    document.getElementById("nameField").style.display = "inline";
    document.getElementById("officePhoneField").style.display = "inline";
    document.getElementById("phoneNumField").style.display = "inline";
    document.getElementById("buttondiv").style.display = "inline";
}


function setSearchButton(cb){
    clearFields();
    $('#buttondiv').empty(); //delete the existing button and event listener if there is one
    const buttonHTML = `<button id="queryButton"><img src="search.png" width="16px" height="16px"></button>`;
    $('#buttondiv').html(buttonHTML);
    $('#queryButton').on('click', cb);
}

function eventHandler(e) {
    let state = e.target.id;
    contentRef.html('');
    clearFields();

    if (state === 'view') {
        hideBars();
        renderView();
    }
    else if (state === 'add') {
        showBars();
        setSearchButton(addUser);        
    }
    else if (state === 'verify') {
        document.getElementById("nameField").style.display = "inline";
        document.getElementById("officePhoneField").style.display = "none";
        document.getElementById("phoneNumField").style.display = "none";
        document.getElementById("buttondiv").style.display = "inline";
        setSearchButton(verifyUser);
    }
    else if (state === 'update') {
        showBars();
        setSearchButton(updateUser);
        contentRef.html('<p>Please enter the name of whom you would like to update.  Then enter their new Office # and Phone #</p>');
        renderminiView();
    }
    else if (state === 'delete') {
        document.getElementById("nameField").style.display = "inline";
        document.getElementById("officePhoneField").style.display = "none";
        document.getElementById("phoneNumField").style.display = "none";
        document.getElementById("buttondiv").style.display = "inline";
        setSearchButton(deleteUser);
        contentRef.html('<p>Please enter the name of whom you would like to DELETE.</p>');
        renderminiView();
    }
}

const navList = document.querySelectorAll('li');
const nameQuery = $('#nameField');
const officePhoneQuery = $('#officePhoneField');
const phoneNumQuery = $('#phoneNumField');
const queryButtonRef = $('#queryButton');
const contentRef = $('main');

$('#navList').on('click', eventHandler, false);