$(document).ready(function(){
 console.log("I Jquery");
 //On button click get json from
 $("#loginbtn").click(function(event){

 //Get the email from login.ejs
 var email = document.getElementById("email").value;

 //Get password from login.ejs
 var formpassword = document.getElementById("password").value;

 console.log("Email from input  "+email);
 console.log("Password from input  "+formpassword);


     $.each(dummydata, function (data) {
         $.each(data.user, function (key, val) {
             var dummymail = this.mail;
             var dummypassword = this.password;

             if (email === dummymail)
             {
                 if (formpassword === dummypassword)
                 {


                 }

                 else
                 {
                     document.getElementById("err").innerHTML = "Login was unsuccessful, please check your password";
                 }
             }

             else
             {
                 document.getElementById("err").innerHTML = "Login was unsuccessful, please check your username";
                 event.preventDefault();
             }



         });
     });


});

});