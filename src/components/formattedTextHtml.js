import React from "react"
import PropTypes from "prop-types"
import FormattedTextPlain from "./formattedTextPlain"

const FormattedTextHtml = ({ content }) => (
  <div
    className="formatted-text"
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

FormattedTextPlain.propTypes = {
  content: PropTypes.string,
}

export default FormattedTextHtml
