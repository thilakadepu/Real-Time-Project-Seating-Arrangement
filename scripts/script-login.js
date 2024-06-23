import { credential } from "../data/credential.js";

document.querySelector('.login-button')
  .addEventListener('click', () => {
    validate();
  }
);


function validate () {
  const userName = document.querySelector('.user-name-input').value;
  const password = Number(document.querySelector('.password-input').value);
   if (userName === credential.userName && password === credential.password) {
    window.location.href = "/website.html";
  } else {
    const errorElement = document.querySelector('.invalid-info-js');
    errorElement.classList.add('invalid-info-visible');
    setTimeout( () => {
      errorElement.classList.remove('invalid-info-visible');
    }, 3000);
  }
}