import React from "react"
import Img from "gatsby-image"

/**
 * Non-Stretched Image Hack taken from Gatsby Docs.
 * https://www.gatsbyjs.org/packages/gatsby-image/#avoiding-stretched-images-using-the-fluid-type
 *
 * @param {*} props
 */
const NonStretchedImage = props => {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: "0 auto", // Used to center the image
      },
    }
  }
  return <Img {...normalizedProps} />
}

export default NonStretchedImage
