const result= document.getElementById('result');
const passLength = document.getElementById('length');
const passLengthResult = document.getElementById('length-result'); 
const includeUpperCase = document.getElementById('uppercase');
const includeLowerCase = document.getElementById('lowercase');
const includeNumbers = document.getElementById('numbers');
const includeSymbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');

const copyPass = document.getElementById('copy');

//Data
const dataLowercase = "azertyuiopqsdfghjklmwxcvbn".split("");
const dataUppercase = "AZERTYUIOPQSDFGHJKLMWXCVBN".split("");
const dataNumbers = "0123456789".split("");
const dataSymbols = "!@#$%^&*-_=+\|:;’,.>/?~".split("");

//Colors
const tooWeakColor = '#F64A4A';
const weakColor = '#FB7C58';
const mediumColor = '#F8CD65';
const strongColor = '#A4FFAF';

const rectangle1 = document.getElementById('rectangle1');
const rectangle2 = document.getElementById('rectangle2');
const rectangle3 = document.getElementById('rectangle3');
const rectangle4 = document.getElementById('rectangle4');

const passwordStrength = document.getElementById('passwordStrength');
const copyText = document.getElementById('textCopy');
const copySVG = document.getElementById('svgCopyID');


passLength.addEventListener("input", (event) => {

  passLengthResult.innerText = event.target.value;
  const progress = (event.target.value / passLength.max) * 100;

  var style = document.createElement("style");
  style.innerHTML = `
    input[type="range"]::-webkit-slider-runnable-track {
      background: linear-gradient(to right, #A4FFAF ${progress}%, #18171F ${progress}%);
    }
  `;
  document.head.appendChild(style);

});


copyPass.addEventListener("click", () => {
  copy(result.textContent);
});


function passwordGenerate(){
  copySVG.style.fill = "#FFFFFF";
  copyText.style.color ="#24232C";

  const data = [].concat(
      includeLowerCase.checked ? dataLowercase : [],
      includeUpperCase.checked ? dataUppercase : [],
      includeNumbers.checked ? dataNumbers : [],
      includeSymbols.checked ? dataSymbols : []
  );
  let passwordLength = passLength.value;
  let newPassword = "";
  if (data.length === 0) {
      result.textContent = " ";
      alert('Please check at least one criteria');
      return result.textContent = "";
  }

  for (let i = 0; i < passwordLength; i++) {
      newPassword += data[Math.floor(Math.random() * data.length)];
  }
  updatePasswordStrength(newPassword);
  result.textContent = newPassword;
  result.style.opacity = "1";
}


function copy(text) {
  copyText.style.color ="#A4FFAF";
  copySVG.style.fill = "#A4FFAF";
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  let copiedResult = document.execCommand("copy");
  document.body.removeChild(input);
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.textContent = "Copied!";
  document.body.appendChild(alert);
  setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
      document.body.removeChild(alert);
  }, 1000);
  return result;
}


function updatePasswordStrength(password) {
  const strength = calculatePasswordStrength(password);

  if(strength === 0){
    rectangle1.style.background = tooWeakColor;
    rectangle2.style.background = "#18171F";
    rectangle3.style.background = "#18171F";
    rectangle4.style.background = "#18171F";
    passwordStrength.textContent = "TOO WEAK!";
  } else if (strength === 1) {
    rectangle1.style.background = weakColor;
    rectangle2.style.background = weakColor;
    rectangle3.style.background = "#18171F";
    rectangle4.style.background = "#18171F";
    passwordStrength.textContent = "WEAK";

  } else if (strength === 2) {
    rectangle1.style.background = mediumColor;
    rectangle2.style.background = mediumColor;
    rectangle3.style.background = mediumColor;
    rectangle4.style.background = "#18171F";
    passwordStrength.textContent = "MEDIUM";

  } else if (strength === 3) {
    rectangle1.style.background = strongColor;
    rectangle2.style.background = strongColor;
    rectangle3.style.background = strongColor;
    rectangle4.style.background = strongColor;
    passwordStrength.textContent = "STRONG";

  }
}

function calculatePasswordStrength(password) {
  // Less than 7 characters is weak, between 6 and 10 characters is medium, 
  // and more than 15 characters is strong.
  /*
  if (password.length <= 3) {
    return 0;
  } else if (password.length <= 7) {
    return 1;
  }
  else if (password.length <= 11) {
    return 2;
  } else {
    return 3;
  }*/
  let checkboxes = document.querySelectorAll('input[name="checkBox"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });

  if (values.length <= 1) {
    return 0;
  } else if (values.length == 2) {
    return 1;
  }
  else if (values.length == 3) {
    return 2;
  } else {
    return 3;
  }

}
