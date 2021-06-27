
// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits

    // code inspired from http://www.authorcode.com/how-to-validate-phone-number-in-javascript/

    var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
    
    if (reg.exec(a)) {
        return true;
    }
    else {
        return false;
    }
}
function validateAll(){
    var a= document.getElementById("nameInput").value;
    var b = document.getElementById("phone").value;
    var c = document.getElementById("credit").value;

    if (!validateCard("credit") ||!validatePhone("phone") || a == ""){
        if (!validateCard("credit")){
            //alert("Wrong format for credit card");
            $("#credit").val("xxxx xxxx xxxx xxxx");
            $("#credit").addClass("error");
        }
        if (!validatePhone("phone")){
           // alert("Wrong format for phone");
            $("#phone").val("(xxx)");
            $("#phone").addClass("error");
        }
        
        var s2 = document.getElementById(sl1);
        var div= document.createElement('div');
        s2.appendChild(div);

        div.className= "alert alert-danger";
        var x = document.createElement("STRONG");
        div.appendChild(x);
        var t = document.createTextNode("Booking was unsucessful, please ensure all fields are valid");
        x.appendChild(t);


    }else{
        var s2 = document.getElementById("sl1");
        var div= document.createElement('div');
        s2.appendChild(div);

        div.className= "alert alert-success";
        var x = document.createElement("STRONG");
        div.appendChild(x);
        var t = document.createTextNode("Booking was sucessful, hope to see you soon");
        x.appendChild(t);

    }


   

}

function validateCard(txtCard) {
    var b = document.getElementById(txtCard).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits

    // code inspired from https://www.w3resource.com/javascript/form/credit-card-validation.php
     
    var cardno = /^\d{4}?(\s)\d{4}?[ ]\d{4}?[ ]\d{4}$/
    
    if (cardno.exec(b)) {
        return true;
    }
    else {
        return false;
    }
}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["06/29/2021","07/07/2021","07/10/2021"]


const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    var stylist= document.getElementById("sel2").value;

    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0 ||date.getDay()== 6 )
        return [false];
    if( date.getDay()==1 && stylist=="Jasmine"){ // Jasmine doesnt work mondays
        return [false];
    }
    if( date.getDay()==3 && stylist=="Halo"){ // Halo doesnt work wednesdays
        return [false];
    }
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) == -1 ]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#credit").on("change", function(){
        if (!validateCard("credit")){
            alert("Wrong format for credit card");
            $("#credit").val("xxxx xxxx xxxx xxxx");
            $("#credit").addClass("error");
        }
        else {
            $("#credit").removeClass("error");
        }
    });

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for phone");
            $("#phone").val("(xxx)");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

   



    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $( "#datetimepicker1").datepicker(

        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/27/2021'),  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }   
    );
    $( "#datetimepicker1").datepicker(

        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/27/2021'),  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }   
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put 
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });
  
    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
          "ui-tooltip": "highlight"
        }
      });


});