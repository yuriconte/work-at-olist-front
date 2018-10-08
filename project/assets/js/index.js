window.onload = function() {
    document.getElementById("fullName").onchange = function() {validateFieldFilledIn(this)};
    document.getElementById("email").onkeyup = function() {validateEmail(this)};
    document.getElementById("password").onfocus = function() {showValidationDescription()};
    document.getElementById("password").onblur = function() {hideValidationDescription(this)};
    document.getElementById("password").onkeyup = function() {validatePassword(this)};
    document.getElementById("passwordConfirm").onkeyup = function() {validatePasswordConfirm(this)};
}

//default classes to clear fields
var defaultClasses = ['input-error', 'input-success'];
//regex to validate email
var regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//regex to validade if password have at least one capital letter
var regexCapitalLetter = /^[A-Z]/;
//regex to validate if password have at least one number
var regexNumber = /^\d+$/;
//name, email, password, confirm password
var checklistArray = [false, false, false, false]

function clearFieldClass(field, classesToRemove) {
    if (field && classesToRemove && classesToRemove.length > 0) {
        for (var i = 0; i < classesToRemove.length; i++) {
            field.classList.remove(classesToRemove[i]);
        }
    }
}

function addSuccesClass(field) {
    field.classList.add("input-success");
}

function addErrorClass(field) {
    field.classList.add("input-error");
}

function validateFieldFilledIn(field) {
    clearFieldClass(field, defaultClasses);
    if (field.value !== undefined && field.value.length > 0) {
        addSuccesClass(field);
        checklistArray[0] = true;
    } else {
        addErrorClass(field);
        checklistArray[0] = false;
    }
    checklist();
}

function validateEmail(field) {
    clearFieldClass(field, defaultClasses);
    if (regexEmail.test(field.value)) {
        addSuccesClass(field);
        checklistArray[1] = true;
    } else {
        addErrorClass(field);
        checklistArray[1] = false;
    }
    checklist();
}

function showValidationDescription() {
    var element = document.getElementsByClassName('password-strength-box');
    element[0].classList.remove('hide');
    element = document.getElementsByClassName('password-description-box');
    element[0].classList.remove('hide');
}

function hideValidationDescription(field) {
    if (field.value === undefined || field.value.length === 0) {
        var element = document.getElementsByClassName('password-strength-box');
        element[0].classList.add('hide');
        element = document.getElementsByClassName('password-description-box');
        element[0].classList.add('hide');
    }
}

function validatePassword(field) {
    clearFieldClass(field, defaultClasses);
    var bars = [document.getElementById("bar1"), document.getElementById("bar2"), document.getElementById("bar3")];
    var opts = [document.getElementById("opt1"), document.getElementById("opt2"), document.getElementById("opt3")];
    clearFieldClass(opts[0], ['ok', 'not-ok']);
    clearFieldClass(opts[1], ['ok', 'not-ok']);
    clearFieldClass(opts[2], ['ok', 'not-ok']);
    clearFieldClass(bars[0], ['weak', 'medium', 'strong']);
    clearFieldClass(bars[1], ['weak', 'medium', 'strong']);
    clearFieldClass(bars[2], ['weak', 'medium', 'strong']);
    var optsStatus = [false, false, false];
    if (field.value !== undefined && field.value.length > 0) {
        var value = field.value;
        //first validation - at least six characters
        if (value.length < 6) {
            opts[0].classList.add('not-ok')
        } else {
            opts[0].classList.add('ok')
            optsStatus[0] = true;
        }
        var valueArray = value.split('');
        //second validation - at least one capital letter
        for (var i = 0; i < valueArray.length; i++) {
            if (regexCapitalLetter.test(valueArray[i])) {
                opts[1].classList.add('ok')
                optsStatus[1] = true;
                break;
            }
        }
        if (!optsStatus[1]) {
            opts[1].classList.add('not-ok')
        }
        //third validation - at least one number
        for (var i = 0; i < valueArray.length; i++) {
            if (regexNumber.test(valueArray[i])) {
                opts[2].classList.add('ok')
                optsStatus[2] = true;
                break;
            }
        }
        if (!optsStatus[2]) {
            opts[2].classList.add('not-ok')
        }
    }
    var countOk = 0;
    for (var i = 0; i < optsStatus.length; i++) {
        if (optsStatus[i]) {
            countOk++;
        }
    }
    checklistArray[2] = false;
    switch(countOk) {
        case 1:
            bars[0].classList.add('weak');            
            addErrorClass(field);
            break;
        case 2:
            bars[0].classList.add('medium');
            bars[1].classList.add('medium');
            addErrorClass(field);
            break;
        case 3:
            bars[0].classList.add('strong');
            bars[1].classList.add('strong');
            bars[2].classList.add('strong');
            addSuccesClass(field);
            checklistArray[2] = true;
            break;
    }
    checklist();
}

function validatePasswordConfirm(field) {
    clearFieldClass(field, defaultClasses);
    if (field.value !== undefined && field.value.length > 0) {
        var password = document.getElementById("password").value;
        if (password === field.value) {
            addSuccesClass(field);
            checklistArray[3] = true;
        } else {
            addErrorClass(field);
            checklistArray[3] = false;
        }
    }
    checklist();
}
  
function checklist() {
    for (var i = 0; i < checklistArray.length; i++) {
        if (!checklistArray[i]) {
            document.getElementById("submit-button").disabled = true;
            return false;
        }
    }
    document.getElementById("submit-button").disabled = false;
}

function onSubmit() {
    checklist();
    //fake method to show loading in button
    if (!document.getElementById("submit-button").disabled) {
        document.getElementById("text-button").classList.add("hide");
        document.getElementById("loading").classList.remove("hide");
        setTimeout(function(){ 
            document.location.href = 'success.html';
        }, 4000);
    }
    return false;
}