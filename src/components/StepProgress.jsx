import React from "react";

const StepProgress = (props) => {
  return (
    <div className="stepProgress">
      <div className="stepBarOutline">
        <div className={`stepBar ${props.isPage2Visible ? "stepHalf" : props.isPage3Visible ? "stepFull" : null}`}></div>
      </div>
      <div onClick={props.handleLoadPage1} className={`step ${props.isPage1Visible || props.isPage2Visible || props.isPage3Visible ? "complete" : null}`}>1</div>
      <div onClick={props.handleLoadPage2} className={`step ${props.isPage2Visible || props.isPage3Visible ? "complete" : null}`}>2</div>
      <div onClick={
        props.isFixedRate
        ? props.handleFixedPaymentSchedule
        : props.handlePaymentSchedule
      } className={`step ${props.isPage3Visible ? "complete" : null}`}>3</div>
    </div>
  );
};

export default StepProgress;