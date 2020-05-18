// Parameters element objects
const amountToConvert = document.getElementById('amount-to-convert');
const firstCurrency = document.getElementById('first-currency');
const secondCurrency = document.getElementById('second-currency');
const swapCurrencies = document.getElementById('swap-currencies');

// Results element objects
const conversionFrom = document.getElementById('conversion-from');
const conversionTo = document.getElementById('conversion-to');
const conversionRate = document.getElementById('conversion-rate');

// Fetch Exchange Rate API in order to update the DOM
function calculate() {
  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency.value}`)
    .then(res => res.json()).then(data => {
      const swapRate = data.rates[secondCurrency.value];

      conversionFrom.innerText = `${amountToConvert.value} ${firstCurrency.value} =`;
      conversionTo.innerText = `${(amountToConvert.value * swapRate).toFixed(3)} ${secondCurrency.value}`;
      conversionRate.innerText = `1 ${firstCurrency.value} = ${swapRate} ${secondCurrency.value}`;
    });
}

// Add Event Listeners
amountToConvert.addEventListener('input', calculate);
firstCurrency.addEventListener('change', calculate);
secondCurrency.addEventListener('change', calculate);
swapCurrencies.addEventListener('click', () => {
  const auxCurrency = firstCurrency.value;
  firstCurrency.value = secondCurrency.value;
  secondCurrency.value = auxCurrency;
  calculate();
});

calculate();