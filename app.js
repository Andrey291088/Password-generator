const button = document.querySelector(".generate-btn");
const sliderlength = document.querySelector(".pass-length input");
const chekBokses = document.querySelectorAll(".option input");
const copyButton = document.querySelector(".input-box span");
const passwordFild = document.querySelector(".input-box input");
const indicate = document.querySelector(".pass-indicator");

const lettersLower = "abcdefghijklmnopqrstuvwxyz";
const letterUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numers = "0123456789";
const symbols = "^!$%&|[](){}:;.,*+-#@<>~";

const generatePassword = () => {
  let alawetChars = ""; // строка где будут все разрешенные символы
  let password = ""; // строка где будет готовый пароль
  let length = sliderlength.value; // длинна пароля выбранного на ползунке
  let exclud = false;
  // собираем разрешенные символы
  chekBokses.forEach(function (elem) {
    if (elem.checked) {
      if (elem.id === "lowercase") alawetChars += lettersLower;
      if (elem.id === "uppercase") alawetChars += lettersUpper;
      if (elem.id === "numbers") alawetChars += numers;
      if (elem.id === "symbols") alawetChars += symbols;
      if (elem.id === "spaces") alawetChars += ` ${alawetChars}`;
      if (elem.id === "exc-duplicate") exclud = true;
    }
  });
  // создаем пароль
  for (let i = 0; i < length; i++) {
    let randomChar =
      alawetChars[Math.floor(Math.random() * alawetChars.length)];

    if (exclud) {
      !password.includes(randomChar) || randomChar == " "
        ? (password += randomChar)
        : i--;
    } else {
      password += randomChar;
    }
  }
  passwordFild.value = password;
};

button.addEventListener("click", generatePassword);
//функция для индикации надежнсоти
const updateIndicater = () => {
  if (sliderlength.value <= 8) indicate.id = "weak";
  else if (sliderlength.value <= 16) indicate.id = "medium";
  else indicate.id = "strong";
};

//функциф для обновления полунка

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = sliderlength.value;
  generatePassword();
  updateIndicater();
};

updateIndicater();

sliderlength.addEventListener("input", updateSlider);

//функция копирования пароля
const copyPassword = () => {
  navigator.clipboard.writeText(passwordFild.value);
  copyButton.innerText = "check";
  copyButton.style.color = "blue";
  setTimeout(function () {
    copyButton.innerText = "copy_all";
    copyButton.style.color = "gray";
  }, 1500);
};

copyButton.addEventListener("click", copyPassword);
