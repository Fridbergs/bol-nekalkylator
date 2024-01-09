document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById(
    "calculateBtn"
  ) as HTMLButtonElement;

  if (calculateBtn) {
    calculateBtn.addEventListener("click", collectInput);
  }
});

function collectInput() {
  const lengthOfCashInput = document.getElementById(
    "lengthOfCash"
  ) as HTMLInputElement;
  const sumOfCashInput = document.getElementById(
    "sumOfCash"
  ) as HTMLInputElement;
  const interestRateInput = document.getElementById(
    "interestRate"
  ) as HTMLInputElement;

  let lengthOfCash = parseFloat(lengthOfCashInput.value);
  let sumOfCash = parseFloat(sumOfCashInput.value);
  let annualInterestRate = parseFloat(interestRateInput.value);

  calculateInterestPmt(lengthOfCash, sumOfCash, annualInterestRate);
}

function calculateInterestPmt(
  lengthOfCash: number,
  sumOfCash: number,
  annualInterestRate: number
) {
  let totalPayments: number = lengthOfCash * 12;
  let principal: number = sumOfCash;
  let monthlyInterestRate: number = annualInterestRate / 12 / 100;

  // Clear previous results
  const h2Header = document.getElementById("h2Header") as HTMLHeadingElement;

  const monthContainer = document.getElementById(
    "monthContainer"
  ) as HTMLDivElement;
  const interestContainer = document.getElementById(
    "interestContainer"
  ) as HTMLDivElement;
  const principalContainer = document.getElementById(
    "principalContainer"
  ) as HTMLDivElement;

  const monthlyPaymentContainer = document.getElementById(
    "monthlyPaymentContainer"
  ) as HTMLDivElement;
  const remainingDebtContainer = document.getElementById(
    "remainingDebtContainer"
  ) as HTMLDivElement;

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

  let monthlyPayment: number =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  for (let month = 1; month <= totalPayments; month++) {
    let interestPayment = principal * monthlyInterestRate;
    let principalPayment = monthlyPayment - interestPayment;
    let remainingDebt = principal - principalPayment;

    // Append values to the respective containers
    monthContainer.innerHTML += `<div>${month}</div>`;
    interestContainer.innerHTML += `<div>${interestPayment.toFixed(
      1
    )} kr</div>`;
    principalContainer.innerHTML += `<div>${principalPayment.toFixed(
      1
    )} kr</div>`;

    monthlyPaymentContainer.innerHTML += `<div>${monthlyPayment.toFixed(
      1
    )} kr</div>`;
    remainingDebtContainer.innerHTML += `<div>${remainingDebt.toFixed(
      1
    )} kr</div>`;

    principal -= principalPayment; // Update the remaining principal for the next iteration
  }
}
