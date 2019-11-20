import React from "react"
import { graphql, StaticQuery } from "gatsby"

const Sidebar = ({ data }) => {
  console.log(data)
  return <p>I'm a Sidebar Item</p>
}

export default Sidebar

export const homeSidebarQuery = graphql`
  query homeBlockContent {
    allBlockContentGatsbyHomeBlock {
      nodes {
        body {
          processed
        }
      }
    }
  }
`
