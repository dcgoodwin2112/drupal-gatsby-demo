import React from "react"
import PropTypes from "prop-types"

const FormattedTextPlain = ({ content }) => (
  <div className="formatted-text">
    {content.split("\n\n").map(paragraph => (
      <p>{paragraph}</p>
    ))}
  </div>
)

FormattedTextPlain.propTypes = {
  content: PropTypes.string
}

export default FormattedTextPlain
