import React from "react";
import PropTypes from "prop-types";

const ErrorIndicator = (props) => {
  const error = props.error || 'Error!';
  return <div><h2 className='error'>{error}</h2></div>;
};
ErrorIndicator.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorIndicator;