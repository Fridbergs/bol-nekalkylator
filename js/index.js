"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
        calculateBtn.addEventListener("click", collectInput);
    }
});
function collectInput() {
    const lengthOfCashInput = document.getElementById("lengthOfCash");
    const sumOfCashInput = document.getElementById("sumOfCash");
    const interestRateInput = document.getElementById("interestRate");
    let lengthOfCash = parseFloat(lengthOfCashInput.value);
    let sumOfCash = parseFloat(sumOfCashInput.value);
    let annualInterestRate = parseFloat(interestRateInput.value);
    calculateInterestPmt(lengthOfCash, sumOfCash, annualInterestRate);
}
function calculateInterestPmt(lengthOfCash, sumOfCash, annualInterestRate) {
    let totalPayments = lengthOfCash * 12;
    let principal = sumOfCash;
    let monthlyInterestRate = annualInterestRate / 12 / 100;
    // Clear previous results
    const h2Header = document.getElementById("h2Header");
    const monthContainer = document.getElementById("monthContainer");
    const interestContainer = document.getElementById("interestContainer");
    const principalContainer = document.getElementById("principalContainer");
    const monthlyPaymentContainer = document.getElementById("monthlyPaymentContainer");
    const remainingDebtContainer = document.getElementById("remainingDebtContainer");
    // Clear previous content
    h2Header.textContent = "";
    monthContainer.innerHTML = "";
    interestContainer.innerHTML = "";
    principalContainer.innerHTML = "";
    monthlyPaymentContainer.innerHTML = "";
    remainingDebtContainer.innerHTML = "";
    // Set the h2Header content
    h2Header.textContent = "Amortiseringstabell";
    // Append headers to the respective containers
    monthContainer.innerHTML += "<h3>Månad</h3>";
    interestContainer.innerHTML += "<h3>Räntekostnad</h3>";
    principalContainer.innerHTML += "<h3>Amortering</h3>";
    monthlyPaymentContainer.innerHTML += "<h3>Total månadskostnad</h3>";
    remainingDebtContainer.innerHTML += "<h3>Kvarvarande skuld</h3>";
    let monthlyPayment = (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    for (let month = 1; month <= totalPayments; month++) {
        let interestPayment = principal * monthlyInterestRate;
        let principalPayment = monthlyPayment - interestPayment;
        let remainingDebt = principal - principalPayment;
        // Append values to the respective containers
        monthContainer.innerHTML += `<div>${month}</div>`;
        interestContainer.innerHTML += `<div>${interestPayment.toFixed(1)} kr</div>`;
        principalContainer.innerHTML += `<div>${principalPayment.toFixed(1)} kr</div>`;
        monthlyPaymentContainer.innerHTML += `<div>${monthlyPayment.toFixed(1)} kr</div>`;
        remainingDebtContainer.innerHTML += `<div>${remainingDebt.toFixed(1)} kr</div>`;
        principal -= principalPayment; // Update the remaining principal for the next iteration
    }
}
