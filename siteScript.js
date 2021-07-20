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

function validateForm(form, button){
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
    } else {
        validatePhone(form.elements["phone"]);
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

    document.getElementById("thankMsg").innerHTML= 
        "Thanks for your feedback " + form.elements["name"].value + "!";
    document.getElementById("youMsg").innerHTML= 
        "Come back soon to see how this site improves!";
    form.reset();
    form.style.display="none";
    button.style.display="block";
    form.elements["name"].focus();
}

function revealForm(form, button){
    form.style.display="block";
    button.style.display="none";
    document.getElementById("thankMsg").innerHTML="";
    document.getElementById("youMsg").innerHTML="";
    form.elements["name"].focus();
    window.scrollTo(0,document.body.scrollHeight);
}