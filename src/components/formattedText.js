import React from "react"
import PropTypes from "prop-types"
import FormattedTextHtml from "./formattedTextHtml"
import FormattedTextPlain from "./formattedTextPlain"

const FormattedText = ({ content, format }) => (
  <>
    {format === "plain_text" ? (
      <FormattedTextPlain content={content} />
    ) : (
      <FormattedTextHtml content={content} />
    )}
  </>
)

FormattedText.propTypes = {
  format: PropTypes.string,
  content: PropTypes.string
}

FormattedText.defaultProps = {
  format: "plain_text",
  content: ""
}

export default FormattedText
