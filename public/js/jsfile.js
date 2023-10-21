
 check=-2;
 check2=0;
 check3=0;
 let pass1 = "";
 let pass2 = "";
let letters = /[a-zA-Z]/;
let both =  /^[a-z0-9]+$/i;
let special = /^(?=.*\d)(?=.*[/*-+!@#$^&*])(?=.*[A-Z]).{8,}$/;
let upper = /[A-Z]/;


document.getElementById("username").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget
    let username = userInput.value
    if(username.length > 3){
        userInput.classList.add("valid-text");
        userInput.classList.remove("invalid-text");
        check1 = 1;

    } else {
        check1 = 0;
    }
    if(username.match(both)){
        check5 = 1;
    } else {

        check5=0;
    }
    if(username[0].match(letters)){
        check4 = 1;

    } else {
        check4=0;

    }
if (check4 == 1 && check1 == 1 && check5 == 1) {
    check = 1;
    userInput.classList.remove("invalid-text");
    userInput.classList.add("valid-text");
} else{
    check = 0;
    userInput.classList.remove("valid-text");
    userInput.classList.add("invalid-text");
}

});

document.getElementById("password").addEventListener("input", function (ev) {
    let userInput = ev.currentTarget
    let password = userInput.value
  pass1 = password
    if(password.length >= 8) {
        check6 = 1;

    } else {
        check6 = 0;
    }

    if (password.match(special)) {
        check7 = 1;
        pass1 = password;
    } else {
        check7 = 0;
    }

    if (password.match(upper)) {
        check8 = 1;
        pass1 = password;
    } else {
        check8 = 0;
    }

    if (check6 == 1 && check7 == 1 && check8 == 1) {
        check2 = 1;
        userInput.classList.remove("invalid-text");
        userInput.classList.add("valid-text");
    } else{
        check2 = 0;
        userInput.classList.remove("valid-text");
        userInput.classList.add("invalid-text");
    }
});

 document.getElementById("passwordconfirm").addEventListener("input", function (ev) {
     let userInput = ev.currentTarget
     let passwordconfirm = userInput.value
     if (pass1 == passwordconfirm) {
         userInput.classList.remove("invalid-text");
         userInput.classList.add("valid-text");
         check3 = 1;
     } else {
         userInput.classList.remove("valid-text");
         userInput.classList.add("invalid-text");
         check3 = 0;
     }

 });



 document.getElementById("form").addEventListener("submit", function (ev) {
     ev.preventDefault();
     if(check2==0 || check == 0 || check3==0){
    return false
     } else{
         ev.currentTarget.submit();
     }
     console.log(ev)
 });
