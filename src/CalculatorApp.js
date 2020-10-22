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
      isAddressInputVisible: true,
      isInputVisible: false,
      isDisplayVisible: false,
      paymentSchedule: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaymentSchedule = this.handlePaymentSchedule.bind(this);
    this.handleFixedPaymentSchedule = this.handleFixedPaymentSchedule.bind(
      this
    );
    this.handleAddressInputVisibility = this.handleAddressInputVisibility.bind(
      this
    );
    this.handleInputVisibility = this.handleInputVisibility.bind(this);
    this.handleDisplayVisibility = this.handleDisplayVisibility.bind(this);
    this.handleBackAddressButton = this.handleBackAddressButton.bind(this);
    this.handleEditAddressVisibility = this.handleEditAddressVisibility.bind(
      this
    );
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
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
      isInputVisible: !this.state.isInputVisible,
      isDisplayVisible: !this.state.isDisplayVisible,
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
      isInputVisible: !this.state.isInputVisible,
      isDisplayVisible: !this.state.isDisplayVisible,
    });
    console.log(paymentArray);
  }

  handleAddressInputVisibility() {
    this.setState({
      isAddressInputVisible: !this.state.isAddressInputVisible,
      isInputVisible: !this.state.isInputVisible,
    });
  }

  handleInputVisibility() {
    this.setState({
      isInputVisible: !this.state.isInputVisible,
    });
  }

  handleDisplayVisibility() {
    this.setState({
      isDisplayVisible: !this.state.isDisplayVisible,
      isInputVisible: !this.state.isInputVisible,
    });
  }

  handleBackAddressButton() {
    this.setState({
      isAddressInputVisible: !this.state.isAddressInputVisible,
      isInputVisible: !this.state.isInputVisible,
    });
  }

  handleEditAddressVisibility() {
    this.setState({
      isDisplayVisible: !this.state.isDisplayVisible,
      isAddressInputVisible: !this.state.isAddressInputVisible,
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

        {this.state.isAddressInputVisible && (
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
        {this.state.isAddressInputVisible && (
          <div className="buttonContainer">
            <button onClick={this.handleAddressInputVisibility}>Next</button>
          </div>
        )}
        {this.state.isInputVisible && (
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
            handlePaymentSchedule={this.state.handlePaymentSchedule}
            handleBackAddressButton={this.handleBackAddressButton}
          />
        )}
        {this.state.isInputVisible && (
          <div className="buttonContainer">
            <button onClick={this.handleBackAddressButton}>Back</button>
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
          {this.state.isDisplayVisible && (
            <button onClick={this.handleDisplayVisibility}>Back</button>
          )}
          {this.state.isDisplayVisible && (
            <button onClick={this.handleEditAddressVisibility}>
              Edit Address
            </button>
          )}
        </div>
        {this.state.isDisplayVisible && (
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

// 5. Add comments to explain whats happening where (thank me later)
// 7. Add Overpayments

//BUGS to FIX:
// - 0% interest doesn't work -> outputs 'NaN'
