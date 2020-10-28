import React from "react";

const AddressDisplay = (props) => {
  return (
    <div>
      <p>{props.buildingName}</p>
      <p>
        {props.streetNumber} {props.streetAddress}
      </p>
      <p>{props.city}</p>
      <p>{props.postalCode}</p>
    </div>
  );
};

export default AddressDisplay;
