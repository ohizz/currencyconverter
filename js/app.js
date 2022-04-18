const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
btn = document.querySelector("form button"),
txt = document.querySelector("form .txt"),
amount = document.querySelector(".amount input");

window.addEventListener("load", () => {
    getExchangeRate()
})

for(let i=0;i<dropList.length;i++){
    for(currency in country_list){

        let selected;
        if(i == 0){
            selected = currency == "USD" ? "selected" : "";
        } else if(i == 1){
            selected = currency == "NGN" ? "selected" : ""; 
        }
        let optionTag = `<option value="${currency}" ${selected}>${currency}</option>`;

        dropList[i].insertAdjacentHTML("beforeend", optionTag);
        dropList[i].addEventListener("change", e => {
            loadFlag(e.target);
        })
    }
}


const loadFlag =(e)=> {
    for(code in  country_list){
        if(code == e.value){
            let imgTag = e.parentElement.querySelector("img");
            imgTag.src = `https://countryflagsapi.com/png/${country_list[code]}`;
        }
    }
}
const apiKey = config.SECRET_API_KEY;

let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;


const getExchangeRate =() => {
    let amountVal = amount.value;
    if(amountVal == 0 || amount.value == ""){
        amountVal = 1;
        amount.value = "1";
    }

    txt.innerText = 'getting exchange rate..';

    fetch(url).then(response => response.json())
    .then(result => {
        console.log(result)
   
        const totalExchangeRate = result.conversion_rates[toCurrency.value];
        const exchangeRate = (amountVal * totalExchangeRate).toFixed(2);
        txt.innerText = `${amountVal} ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        txt.innerText = 'something went wrong';
    })  
}


btn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
})