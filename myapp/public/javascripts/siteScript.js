//var events = require('events');
//var evetEmitter = new events.EventEmitter();

/*const nodemailer = require('nodejs-nodemailer-outlook');
nodeoutlook.sendEmail({
    auth: {
        user: "renee.davis@siu.edu",
        pass: "Is this long enough!"
    },
    from: 'renee.davis@siu.edu',
    to: 'naenae99rd@gmail.com', 
    subject: 'TEST EMAIL', 
    text: 'testing, testing, 1, 2, 3. Is this thing on?',
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
});

//create an evvent handler
var myEventHandler = function () {
    console.log('Feedback form was shbmitted');
  }
  
  //Assign the event handler to an event:
  eventEmitter.on('sumbit', myEventHandler);
*/

function sendEmail(event){
    event.preventDefault();
}

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

    document.getElementById("thankMsg").innerHTML= 
        "Thanks for your feedback " + form.elements["name"].value + "!";
    document.getElementById("youMsg").innerHTML= 
        "Come back soon to see how this site improves!";
    form.submit();
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