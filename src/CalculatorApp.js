import React from "react";
import "./CalculatorApp.css";
import FormInput from "./components/FormInput";
import Address from "./components/Address";
import FormDisplay from "./components/FormDisplay";
import {
  createStandardPaymentArray,
  createFixedPaymentArray,
  annualPaymentArr,
} from "./utils/formula";
import StepProgress from "./components/StepProgress";

class CalculatorApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingName: "",
      streetNumber: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      price: "100000",
      deposit: "10000",
      rate: 3.6,
      fixedRate: 2,
      isFixedRate: false,
      periodInYears: 25,
      fixedPeriod: 2,
      totalAnnualPayments: null,
      isPage1Visible: true,
      isPage2Visible: false,
      isPage3Visible: false,
      paymentSchedule: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaymentSchedule = this.handlePaymentSchedule.bind(this);
    this.handleFixedPaymentSchedule = this.handleFixedPaymentSchedule.bind(
      this
    );
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleLoadPage1 = this.handleLoadPage1.bind(this);
    this.handleLoadPage2 = this.handleLoadPage2.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRadio(e) {
    const isFixedRate = e.currentTarget.value === "true" ? true : false;
    this.setState({ isFixedRate });
  }

  handlePaymentSchedule() {
    const paymentArray = createStandardPaymentArray(
      this.state.price,
      this.state.deposit,
      this.state.rate,
      this.state.periodInYears
    );

    const annualPayments = annualPaymentArr(
      paymentArray,
      this.state.periodInYears
    );

    this.setState({
      paymentSchedule: paymentArray,
      totalAnnualPayments: annualPayments,
      isPage1Visible: false,
      isPage2Visible: false,
      isPage3Visible: true,
    });
    console.log(paymentArray);
  }

  handleFixedPaymentSchedule() {
    const paymentArray = createFixedPaymentArray(
      this.state.price,
      this.state.deposit,
      this.state.rate,
      this.state.periodInYears,
      this.state.fixedRate,
      this.state.fixedPeriod
    );

    const annualPayments = annualPaymentArr(
      paymentArray,
      this.state.periodInYears
    );

    this.setState({
      paymentSchedule: paymentArray,
      totalAnnualPayments: annualPayments,
      isPage1Visible: false,
      isPage2Visible: false,
      isPage3Visible: true,
    });
    console.log(paymentArray);
  }

  handleLoadPage1() {
    this.setState({
      isPage1Visible: true,
      isPage2Visible: false,
      isPage3Visible: false,
    });
  }

  handleLoadPage2() {
    this.setState({
      isPage1Visible: false,
      isPage2Visible: true,
      isPage3Visible: false,
    });
  }

  handlePlaceSelect(place) {
    let streetNumFilt = place.address_components
      .filter((element) => element.types.includes("street_number"))
      .map((element) => {
        return element.long_name;
      });

    let routeFilt = place.address_components
      .filter((element) => element.types.includes("route"))
      .map((element) => {
        return element.long_name;
      });

    let cityFilt = place.address_components
      .filter((element) => element.types.includes("postal_town"))
      .map((element) => {
        return element.long_name;
      });

    let postFilt = place.address_components
      .filter((element) => element.types.includes("postal_code"))
      .map((element) => {
        return element.long_name;
      });

    this.setState({
      streetNumber: streetNumFilt[0],
      streetAddress: routeFilt[0],
      city: cityFilt[0],
      postalCode: postFilt[0],
    });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  // }

  render() {
    return (
      <div className="container">
        <h1 className="header">Mortgage Calculator</h1>
        <StepProgress
          isPage1Visible={this.state.isPage1Visible}
          isPage2Visible={this.state.isPage2Visible}
          isPage3Visible={this.state.isPage3Visible}
          handleLoadPage1={this.handleLoadPage1}
          handleLoadPage2={this.handleLoadPage2}
          handlePaymentSchedule={this.handlePaymentSchedule}
          handleFixedPaymentSchedule={this.handleFixedPaymentSchedule}
          isFixedRate={this.state.isFixedRate}
        />
        {this.state.isPage1Visible && (
          <Address
            // handleSubmit={this.handleSubmit}
            handlePlaceSelect={this.handlePlaceSelect}
            handleChange={this.handleChange}
            buildingName={this.state.buildingName}
            streetNumber={this.state.streetNumber}
            streetAddress={this.state.streetAddress}
            city={this.state.city}
            postalCode={this.state.postalCode}
          />
        )}
        {this.state.isPage1Visible && (
          <div className="buttonContainer">
            <button onClick={this.handleLoadPage2}>Next</button>
          </div>
        )}
        {this.state.isPage2Visible && (
          <FormInput
            price={this.state.price}
            deposit={this.state.deposit}
            rate={this.state.rate}
            fixedRate={this.state.fixedRate}
            fixedPeriod={this.state.fixedPeriod}
            periodInYears={this.state.periodInYears}
            isFixedRate={this.state.isFixedRate}
            handleChange={this.handleChange}
            handleRadio={this.handleRadio}
          />
        )}
        {this.state.isPage2Visible && (
          <div className="buttonContainer">
            <button onClick={this.handleLoadPage1}>Back</button>
            <button
              onClick={
                this.state.isFixedRate
                  ? this.handleFixedPaymentSchedule
                  : this.handlePaymentSchedule
              }
            >
              Payment Schedule &#8594;
            </button>
          </div>
        )}
        <div className="buttonContainer">
          {this.state.isPage3Visible && (
            <button onClick={this.handleLoadPage2}>Back</button>
          )}
          {this.state.isPage3Visible && (
            <button onClick={this.handleLoadPage1}>Edit Address</button>
          )}
        </div>
        {this.state.isPage3Visible && (
          <FormDisplay
            buildingName={this.state.buildingName}
            streetNumber={this.state.streetNumber}
            streetAddress={this.state.streetAddress}
            city={this.state.city}
            postalCode={this.state.postalCode}
            price={this.state.price}
            deposit={this.state.deposit}
            rate={this.state.rate}
            fixedRate={this.state.fixedRate}
            fixedPeriod={this.state.fixedPeriod}
            periodInYears={this.state.periodInYears}
            paymentSchedule={this.state.paymentSchedule}
            totalAnnualPayments={this.state.totalAnnualPayments}
          />
        )}
      </div>
    );
  }
}

export default CalculatorApp;

// 7. Add Overpayments
