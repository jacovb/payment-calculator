import React from "react";
import BarChart from "./BarChart";

const FormDisplay = (props) => {
  return (
    <div>
      <div className="mortgage-info">
        <h3>Mortgage Information</h3>
        <label>Property Purchase Price:</label>
        <span className="tab">£ {props.price}</span>
        <label>Deposit:</label>
        <span className="tab">£ {props.deposit}</span>
        <label>Loan Amount:</label>
        <span className="tab">£ {props.price - props.deposit}</span>
        <label>Interest Rate:</label>
        <span className="tab">{props.rate} %</span>
        <label>Mortgage Term:</label>
        <span className="tab">{props.periodInYears} Years</span>
      </div>
      <BarChart
        data1={props.totalAnnualPayments}
        data2={props.paymentSchedule}
        w="800"
        h="500"
        heightPadding="70"
        widthPadding="80"
        time={props.periodInYears}
      />

      <ul className="tableBorder">
        <h3>Payment Schedule</h3>
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="smallCellStyle">Payment Number</th>
              <th className="cellStyle">Payment Amount</th>
              <th className="cellStyle interestHeading">Interest</th>
              <th className="cellStyle principalHeading">Principal</th>
              <th className="cellStyle outstandingHeading">
                Amount Outstanding
              </th>
            </tr>
          </thead>
        </table>
        {props.paymentSchedule.map((item, i) => (
          <li key={i}>
            <table className="tableStyle">
              <tbody>
                <tr>
                  <td className="smallCellStyle">{item.paymentNumber}</td>
                  <td className="cellStyle">
                    £ {item.paymentAmount.toFixed(2)}
                  </td>
                  <td className="cellStyle">£ {item.interest.toFixed(2)}</td>
                  <td className="cellStyle">£ {item.principal.toFixed(2)}</td>
                  <td className="cellStyle">
                    £ {item.loanOutstanding.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDisplay;
