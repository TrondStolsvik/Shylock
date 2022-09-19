//Get the values from the page
function getValues() {
  //Clear the dom
  document.getElementById("results").innerHTML = "";

  //Get the value from loan amount and store it in a variable
  let loanAmount = document.getElementById("loanAmount").value;

  //Get the value from term and store it in a variable
  let term = document.getElementById("term").value;

  //Get the value from interest rate and store it in a variable
  let interestRate = document.getElementById("interestRate").value;

  //Parse loanAmount, term and interestRate to integers and/or float
  loanAmount = parseFloat(loanAmount);
  term = parseInt(term);
  interestRate = parseFloat(interestRate);

  //Declare a variable currentTerm and initialize to 0
  let currentTerm = 0;

  //Declare a variable totalInterest and initialize to 0
  let totalInterest = 0;

  //Declare a variable totalPrincipal and initialize to 0
  let totalPrincipal = 0;

  //Declare a variable mPayments and initialize to 0
  let mPayments = 0;

  //Declare a variable as previousBalance and initialize to 0
  let previousBalance = loanAmount;

  //If-statement to check if previous balance is equal to 0
  if (previousBalance == loanAmount) {
    //If true, for-loop through the length of term
    for (let i = 0; i < term; i++) {
      //Increment currentTerm += 1
      currentTerm += 1;

      //Call monthlyInterest() and store it's data in a variable called interestMonth,
      //using previous balance and interest rate as the parameters
      let interestMonth = monthlyInterest(previousBalance, interestRate);

      //Increment totalInterest += interestMonth
      totalInterest += interestMonth;

      //Call monthlyPayments() and store it's data in a variable called paymentsMonth,
      //using loan amount, term and interest rate as the parameters
      let paymentsMonth = monthlyPayments(loanAmount, term, interestRate);

      //Replace mPayments with new monthly payment amount
      mPayments = paymentsMonth;

      //Declare a variable priPay and store the result of monthlyPayments - monthlyInterest
      let priPay = paymentsMonth - interestMonth;

      //Increment totalPrincipal += priPay
      totalPrincipal += priPay;

      //Update previousBalance to be the result of previous balance - priPay
      previousBalance = previousBalance - priPay;

      //Call displayLoan() using
      //term, currentTerm, paymentsMonth, priPay, interestMonth, totalInterest and previousBalance
      displayLoan(
        currentTerm,
        paymentsMonth,
        priPay,
        interestMonth,
        totalInterest,
        previousBalance
      );
    }
    let totalCost = totalPrincipal + totalInterest;
    //Call displayTotals to display the totals at the top of the page
    displayTotals(mPayments, totalPrincipal, totalInterest, totalCost);
  } else {
    return 0;
  }
}

//Calculate monthly interest
function monthlyInterest(previousBalance, interestRate) {
  //Declare variable intPay as "previousBalance * (interest rate / 1200)"
  let intPay = previousBalance * (interestRate / 1200);

  //return intPay
  return intPay;
}

//Calculate montly payments
function monthlyPayments(loanAmount, term, interestRate) {
  //Declare variable monthPay as
  //"(loan amount) * (interest rate / 1200) / (1 - (1 + (interest rate / 1200)**(-term)"
  let monthPay =
    (loanAmount * (interestRate / 1200)) /
    (1 - (1 + interestRate / 1200) ** -term);

  //return monthPay
  return monthPay;
}

//Display the header totals and table
function displayLoan(
  currentTerm,
  paymentsMonth,
  priPay,
  interestMonth,
  totalInterest,
  previousBalance
) {
  //Get tableBody element
  let tableBody = document.getElementById("results");

  //Get templateRow element from template
  let templateRow = document.getElementById("loanTemplate");

  //Declare a variable tableRow and store the content from the template row
  let tableRow = document.importNode(templateRow.content, true);

  //Declare a variable rowCols and store only the "td" elements
  let rowCols = tableRow.querySelectorAll("td");

  //Model the row one column at a time and store the data from the parameters in sequence
  rowCols[0].textContent = currentTerm;
  rowCols[1].textContent = `$${paymentsMonth.toFixed(2)}`;
  rowCols[2].textContent = `$${priPay.toFixed(2)}`;
  rowCols[3].textContent = `$${interestMonth.toFixed(2)}`;
  rowCols[4].textContent = `$${totalInterest.toFixed(2)}`;
  rowCols[5].textContent = `$${Math.abs(previousBalance.toFixed(2))}`;

  //Append the tableRow to the tableBody
  tableBody.appendChild(tableRow);
}

//Display totals
function displayTotals(mPayments, totalPrincipal, totalInterest, totalCost) {
  //Clear the html
  document.getElementById("mPayments").innerHTML = "";
  document.getElementById("totalPrincipal").innerHTML = "";
  document.getElementById("totalInterest").innerHTML = "";
  document.getElementById("totalCost").innerHTML = "";

  //Display the totals at the top of the page
  document.getElementById("mPayments").innerHTML = `$${mPayments.toFixed(2)}`;
  document.getElementById(
    "totalPrincipal"
  ).innerHTML = `$${totalPrincipal.toFixed(2)}`;
  document.getElementById(
    "totalInterest"
  ).innerHTML = `$${totalInterest.toFixed(2)}`;
  document.getElementById("totalCost").innerHTML = `$${totalCost.toFixed(2)}`;
}
