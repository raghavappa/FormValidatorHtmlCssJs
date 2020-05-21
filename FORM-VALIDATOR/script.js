const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//functions
// outline the input control with red by adding error class
//TESTING PENDING
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  // using the query selector
  const small = formControl.querySelector("small");
  small.innerText = message;
}
//show success outlin
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //test method is implemented in RegEx.
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email not valid");
  }
}

// Instead of validating each field in if block
// let us create a method for validation
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      //observe the back ticks used to get value of input.id
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });

  // checks min and max length entered by user

  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} char length`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} char length`
      );
    } else {
      showSuccess(input);
    }
  }

  function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
      // show the error in second field
      showError(input2, 'password didnt match ');
    }
  }
  // function returns the id of the element with first
  // character capital
  function getFieldName(input) {
    // convert first char capital, add remaining char later
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
}

//listen for submit
// event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  /*  if (username.value === "") {
    showError(username, "username is required");
  } else {
    showSuccess(username);
  }

  if (email.value === "") {
    showError(email, "email is required");
  } else if (!isValidEmail(email.value)) {
    showError(email, "email is not valid");
  } else {
    showSuccess(email);
  }

  if (password.value === "") {
    showError(password, "password is required");
  } else {
    showSuccess(password);
  }

  if (password2.value === "") {
    showError(password2, "password is required");
  } else {
    showSuccess(password2);
  }*/

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);

  console.log("msg on submit button event");
  console.log(username.value);
});
