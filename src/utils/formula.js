function loanAmount(price, deposit) {
  let loan = price - deposit;
  return (Math.round(loan * 100) / 100).toFixed(2);
}

function calculateMonthlyPayment(loan, rate, period) {
  let i = rate / 100 / 12;
  let n = period * 12;
  let pmt = i !== 0 ? (loan * i) / (1 - Math.pow(1 + i, -n)) : loan / n;
  return (Math.round(pmt * 100) / 100).toFixed(2);
}

function calculateInterestPortion(loan, rate) {
  let i = rate / 100 / 12;
  let n = 1;
  let interestPortion = loan * i * n;
  return (Math.round(interestPortion * 100) / 100).toFixed(2);
}

function calculateCapitalPortion(payment, interest) {
  let capitalPortion = payment - interest;
  return (Math.round(capitalPortion * 100) / 100).toFixed(2);
}

function calculateOutstandingAmount(loan, capital) {
  let balance = loan - capital;
  return (Math.round(balance * 100) / 100).toFixed(2);
}

function createStandardPaymentArray(price, deposit, rate, periodInYears) {
  let newArray = [];
  let loan = loanAmount(price, deposit);
  //add loan amount to payment array before rest of payments are added
  newArray.push({
    paymentNumber: 0,
    paymentAmount: 0,
    interest: 0,
    principal: 0,
    loanOutstanding: parseFloat(loan),
  });
  let outstandingAmount = loan;
  for (let i = 1; i <= periodInYears * 12; i++) {
    // eslint-disable-next-line
    function createRowObject(loan, rate, periodInYears) {
      let monthlyPayment = calculateMonthlyPayment(loan, rate, periodInYears);
      let interestPortion = calculateInterestPortion(outstandingAmount, rate);
      let capitalPortion = calculateCapitalPortion(
        monthlyPayment,
        interestPortion
      );
      outstandingAmount = calculateOutstandingAmount(
        outstandingAmount,
        capitalPortion
      );

      return {
        paymentNumber: i,
        paymentAmount: parseFloat(monthlyPayment),
        interest: parseFloat(interestPortion),
        principal: parseFloat(capitalPortion),
        loanOutstanding: parseFloat(outstandingAmount),
      };
    }
    newArray.push(createRowObject(loan, rate, periodInYears));
    // for initial fixed interest rate - do previous calculation with initial fixed rate
    // add from here calculation for the remainder of the period with standard interest rate
  }
  return newArray;
}

function createFixedPaymentArray(
  price,
  deposit,
  rate,
  periodInYears,
  fixedRate,
  fixedPeriod
) {
  let newArray = [];
  let loan = loanAmount(price, deposit);
  //add loan amount to payment array before rest of payments are added
  newArray.push({
    paymentNumber: 0,
    paymentAmount: 0,
    interest: 0,
    principal: 0,
    loanOutstanding: parseFloat(loan),
  });
  let outstandingAmount = loan;
  for (let i = 1; i <= fixedPeriod * 12; i++) {
    // eslint-disable-next-line
    function createRowObject(loan, fixedRate, periodInYears) {
      let monthlyPayment = calculateMonthlyPayment(
        loan,
        fixedRate,
        periodInYears
      );
      let interestPortion = calculateInterestPortion(
        outstandingAmount,
        fixedRate
      );
      let capitalPortion = calculateCapitalPortion(
        monthlyPayment,
        interestPortion
      );
      outstandingAmount = calculateOutstandingAmount(
        outstandingAmount,
        capitalPortion
      );

      return {
        paymentNumber: i,
        paymentAmount: parseFloat(monthlyPayment),
        interest: parseFloat(interestPortion),
        principal: parseFloat(capitalPortion),
        loanOutstanding: parseFloat(outstandingAmount),
      };
    }
    newArray.push(createRowObject(loan, fixedRate, periodInYears));
  }

  //'loan' gets reset to last outstanding amount (at end of fixed period) before starting next loop
  loan = outstandingAmount;
  let remainingPeriod = periodInYears - fixedPeriod;

  for (let i = fixedPeriod * 12 + 1; i <= periodInYears * 12; i++) {
    // eslint-disable-next-line
    function createRowObject(loan, rate, remainingPeriod) {
      let monthlyPayment = calculateMonthlyPayment(loan, rate, remainingPeriod);
      let interestPortion = calculateInterestPortion(outstandingAmount, rate);
      let capitalPortion = calculateCapitalPortion(
        monthlyPayment,
        interestPortion
      );
      outstandingAmount = calculateOutstandingAmount(
        outstandingAmount,
        capitalPortion
      );

      return {
        paymentNumber: i,
        paymentAmount: parseFloat(monthlyPayment),
        interest: parseFloat(interestPortion),
        principal: parseFloat(capitalPortion),
        loanOutstanding: parseFloat(outstandingAmount),
      };
    }
    newArray.push(createRowObject(loan, rate, remainingPeriod));
  }
  return newArray;
}

function annualPaymentArr(paymentArray, period) {
  let annualPayments = [];
  for (let i = 1; i < period * 12; i += 12) {
    annualPayments.push([
      parseFloat(
        paymentArray
          .slice(i, i + 12)
          .reduce((a, b) => a + b.principal, 0)
          .toFixed(2)
      ),
      parseFloat(
        paymentArray
          .slice(i, i + 12)
          .reduce((a, b) => a + b.interest, 0)
          .toFixed(2)
      ),
    ]);
  }
  return annualPayments;
}

export {
  calculateMonthlyPayment,
  calculateInterestPortion,
  calculateCapitalPortion,
  calculateOutstandingAmount,
  loanAmount,
  createStandardPaymentArray,
  createFixedPaymentArray,
  annualPaymentArr,
};
