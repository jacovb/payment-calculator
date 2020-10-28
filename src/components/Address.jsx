import React from "react";
import Autocomplete from "react-google-autocomplete";

const Address = (props) => {
  return (
    <form>
      <label>Property Address: </label>
      <Autocomplete
        className="input-address"
        placeholder="Enter an Address..."
        onPlaceSelected={(place) => {
          props.handlePlaceSelect(place);
          console.log(place);
        }}
        types={["address"]}
        componentRestrictions={{ country: "gb" }}
      />

      <label>Flat Number / Building Name:</label>
      <input
        className="input-address"
        type="text"
        name="buildingName"
        value={props.buildingName}
        onChange={props.handleChange}
      />

      <label>Street Number:</label>
      <input
        className="input-address"
        type="text"
        name="streetNumber"
        value={props.streetNumber}
        onChange={props.handleChange}
      />

      <label>Street Name:</label>
      <input
        className="input-address"
        type="text"
        name="streetAddress"
        value={props.streetAddress}
        onChange={props.handleChange}
      />

      <label>City:</label>
      <input
        className="input-address"
        type="text"
        name="city"
        value={props.city}
        onChange={props.handleChange}
      />

      <label>Postal Code:</label>
      <input
        className="input-address"
        type="text"
        name="postalCode"
        value={props.postalCode}
        onChange={props.handleChange}
      />
    </form>
  );
};

export default Address;
