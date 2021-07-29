function validatePhone(number){
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(number.value.match(regex)){
        return true;
    } else {
        alert("Please enter valid phone number.");
        return false;
    }
}
function validateEmail(address){
    var regex = /^[^\s@]+@[^\s@]+\.[^\s]+$/;
    if(address.value.match(regex)){
        return true;
    } else {
        alert("Please enter valid email address.");
        return false;
    }
}

function validateForm(form){
    if(form.elements["name"].value == ""){
        alert("Please enter your name.");
        return false;
    }
    if(form.elements["address"].value == ""){
        alert("Please enter your address.");
        return false;
    }
    if(form.elements["phone"].value == ""){
        alert("Please enter your phone number.");
        return false;
    }else if(!validatePhone(form.elements["phone"])){
        return false;
    }
    if(form.elements["email"].value == ""){
        alert("Please enter your email.");
        return false;
    } else if(!validateEmail(form.elements["email"])){
        return false;
    }
    if(form.elements["comment"].value == ""){
        alert("Please enter your comments.");
        return false;
    }

    form.submit();
    form.reset();
    form.elements["name"].focus();
}