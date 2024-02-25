const inputSlider = document.querySelector("#lengthSlider")
const lengthDisplay = document.querySelector("#lengthNumber")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#Numbers")
const symbolsCheck = document.querySelector("#Symbols")
const indicator = document.querySelector("#indicator")
const genrateBtn = document.querySelector(".Generate-button")
const allCheckBox = document.querySelector("input[type=checkbox]")
const symbols = '~`!@#$%^&*()_-+={[}]\|;:"<,>.?/'
const displayLabel = document.querySelector("#display")

let password = ""
let passwordLength = 10;
let checkCount = 0;
handleSlider(passwordLength)
calcStrength()
setIndicator('#808080')
//set strength circle to grey

//set passwoed length
function handleSlider(passwordLength){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function checkValidity(){
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider(passwordLength);
    }
}

uppercaseCheck.addEventListener('click', () => {
    if(uppercaseCheck.checked){
        checkCount++;
    }else{
        checkCount--;
    }
    calcStrength()
    checkValidity()
})
lowercaseCheck.addEventListener('click', () => {
    if(lowercaseCheck.checked){
        checkCount++;
    }else{
        checkCount--;
    }
    calcStrength()
    checkValidity()
})
numbersCheck.addEventListener('click', () => {
    if(numbersCheck.checked){
        checkCount++;
    }else{
        checkCount--;
    }
    calcStrength()
    checkValidity()
})
symbolsCheck.addEventListener('click', () => {
    if(symbolsCheck.checked){
        checkCount++;
    }else{
        checkCount--;
    }
    calcStrength()
    checkValidity()
})

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // document.getElementById("#indicator").style.boxShadow = "0px 0px 220px yellow";
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min) ) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
  return  String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,91))
}

function generateSymbole(){
    return symbols[getRndInteger(0,symbols.length)]
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasLower && hasUpper && (hasNum || hasSym) && passwordLength>=12){
        setIndicator("#0f0"); // green light
    }else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator("#ff0"); // yellow light
    }else{
        setIndicator("#f00"); // red light
    }
}

async function copyContent(){
    try{
        let clb = await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied!"; 
    }catch(e){
        copyMsg.innerText = "failed!";
    }
    
    //to make copy wala span visible
    copyMsg.classList.add("active")

    setTimeout(() => {
        copyMsg.classList.remove("active") 
    },2000);
}

inputSlider.addEventListener('input',() => {
    passwordLength = inputSlider.value;
    lengthDisplay.innerText = passwordLength;
    calcStrength();
    checkValidity();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
})

genrateBtn.addEventListener('click',() => {
            if(checkCount<1)return;

    // finding new password

    // removing old password
    password = "";
    arr = []

    // let's put he suff mention by checkboxes

    if(uppercaseCheck.checked) {
        arr.push(generateUpperCase);
        // password += generateUpperCase();
    }
    if(lowercaseCheck.checked) {
        arr.push(generateLowerCase);
        // password += generateLowerCase();
    }
    if(numbersCheck.checked) {
        arr.push(generateRandomNumber)
        // password += generateRandomNumber();
    }
    if(symbolsCheck.checked) {
        arr.push(generateSymbole);
        // password += generateSymbole();
    }
    while(password.length < passwordLength - checkCount){
        let index = getRndInteger(0,arr.length);
        password += arr[index]();
    }

    for(let i = 0; i<arr.length; i++){
        let ch = arr[i]();
        index = getRndInteger(0, password.length+1);
        password = password.slice(0, index) + ch + password.slice(index);
    }
        passwordDisplay.value = password;
})


// let arr = new Array()

// let's put he suff mention by checkboxes

// if(uppercaseCheck.checked) arr.push(generateUpperCase());
// if(lowercaseCheck.checked) arr.push(generateLowerCase());
// if(numbersCheck.checked) arr.push(generateRandomNumber());
// if(symbolsCheck.checked) arr.push(generateSymbole());
