import React from "react";

const ErrorIndicator = (props) => {
  const error = props.error || 'Error!';
  return <div><h2 className='error'>{error}</h2></div>;
};

export default ErrorIndicator;