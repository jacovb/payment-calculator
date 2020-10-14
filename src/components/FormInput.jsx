import React from "react";
import { calculateMonthlyPayment } from "../utils/formula";

const FormInput = (props) => {
  return (
    <div className="input-container">
      <form>
        <label>
          <input
            type="radio"
            value="true"
            name="isFixedRate"
            checked={props.isFixedRate === true}
            onChange={props.handleRadio}
          />
          Initial Fixed Rate
        </label>
        <label>
          <input
            type="radio"
            value="false"
            name="isFixedRate"
            checked={props.isFixedRate === false}
            onChange={props.handleRadio}
          />
          Standard Variable Rate
        </label>

        <label>Property Price </label>
        <div className="input-currency">
          £
          <input
            type="number"
            value={props.price}
            name="price"
            onChange={props.handleChange}
          />
        </div>
        <label>Deposit </label>
        <div className="input-currency">
          £
          <input
            type="number"
            value={props.deposit}
            name="deposit"
            onChange={props.handleChange}
          />
        </div>
        <label>Initial Fixed Rate </label>
        <div className="input-interest">
          <input
            type="number"
            value={props.fixedRate}
            name="fixedRate"
            disabled={props.isFixedRate ? "" : "disabled"}
            onChange={props.handleChange}
          />
          %
        </div>
        <div className="input-years">
          <input
            type="number"
            value={props.fixedPeriod}
            name="fixedPeriod"
            disabled={props.isFixedRate ? "" : "disabled"}
            onChange={props.handleChange}
          />
          Years
        </div>
        <label>Standard Variable Rate </label>
        <div className="input-interest">
          <input
            type="number"
            value={props.rate}
            name="rate"
            // disabled={"disabled"}
            onChange={props.handleChange}
          />
          %
        </div>
        <label>Payment Period (in years) </label>
        <div className="input-years">
          <input
            type="number"
            value={props.periodInYears}
            name="periodInYears"
            onChange={props.handleChange}
          />
          Years
        </div>
        <hr />
        <p>Monthly Amount Paid: </p>
        <span className="input-tab">
          £{" "}
          {calculateMonthlyPayment(
            props.price - props.deposit,
            props.isFixedRate ? props.fixedRate : props.rate, //rate depends of whether fixed rate is chose or not
            props.periodInYears
          )}
        </span>
      </form>
    </div>
  );
};

export default FormInput;
