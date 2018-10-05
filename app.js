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

const locateUserByNameSpecial = function(username){

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

    // User does not exist -> Returns -1
    if (locateUserByName(verifyName) === -1) {
        contentRef.html(`<p>Sorry -- ${verifyName} does not exist.  Please check to see that you typed their name correctly.</p>`);
    }
    // User exists -> Returns the index
    else {
        contentRef.html(`<p>Yes -- ${verifyName} exists</p><div class="user"><h2>Name: ${employeeList[locateUserByName(verifyName)].name}</h2><h2>Office #: ${employeeList[locateUserByName(verifyName)].officeNum}</h2><h2>Phone #: ${employeeList[locateUserByName(verifyName)].phoneNum}</h2></div>`);
        hideBars();
    }
};

function function_opacity(opacity_value, fade_in_or_fade_out) { // fade_in_or_out - 0 = fade in, 1 = fade out
    const userIndex = locateUserByNameSpecial(activeName);
    const specialName = `user${userIndex}`;
    let fading_div = document.getElementById(specialName);

    fading_div.style.opacity = opacity_value / 100;
    fading_div.style.filter = 'alpha(opacity=' + opacity_value + ')';
    if (fade_in_or_fade_out == 'in' && opacity_value == 100) {
        fading_div.style.display = 'block';
    }
    if (fade_in_or_fade_out == 'in' && opacity_value == 1) {
        done = true;
    }
    if (fade_in_or_fade_out == 'out' && opacity_value == 100) {
        fading_div.style.display = 'none';
        done = true;
    }
    
}

function flashUser() {
    const userName = $('#nameField').val();
    const userIndex = `user` + locateUserByNameSpecial(activeName);
    let fading_div = document.getElementById(userIndex);
    const tempOpac = document.getElementById(userIndex).style.opacity;

    done = false;
    for (var i = 100; i >= 1; i--) {
        setTimeout((function(x){
           return function(){
              function_opacity(x, 'in');
           };
        })(i), (i - 100) * -1 * 5);
     }
     console.log(userIndex);
     //document.getElementById(userIndex).style.opacity = tempOpac;
     setTimeout(function(){
        document.getElementById(userIndex).style.opacity = 1;
        document.getElementById(userIndex).style.display = 'block';
     }, 500);
 
}

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
        activeName = $('#nameField').val();
        flashUser();
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
        finalHTML += `<div class="user" id="user${i}"><h2>Name: ${employeeList[i].name}</h2><h2>Office #: ${employeeList[i].officeNum}</h2><h2>Phone #: ${employeeList[i].phoneNum}</h2></div>`;
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

//Global Variables
const navList = document.querySelectorAll('li');
const nameQuery = $('#nameField');
const officePhoneQuery = $('#officePhoneField');
const phoneNumQuery = $('#phoneNumField');
const queryButtonRef = $('#queryButton');
const contentRef = $('main');
let done = true; //used for fadeout
var activeName = "";

$('#navList').on('click', eventHandler, false);