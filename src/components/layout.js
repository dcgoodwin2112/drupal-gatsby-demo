/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Sidebar from "./sidebar"
import "./layout.css"
import "./layout-custom.css"

const Layout = ({ children, isIndex }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <DelayToggle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <div className="flex-container">
          <main>{children}</main>
          {/* <aside>{isIndex === true ? <IndexSidebar /> : <PostSidebar />}</aside> */}
        </div>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a> &amp;{" "}
          <a href="https://drupal.org">Drupal</a>
        </footer>
      </div>
    </>
  )
}

const DelayToggle = () => {
  let delay = window.localStorage.getItem("fetchDelay")

  if (delay == null) {
    delay = 0
  }

  const timeStates = {
    slow: {
      delay: 500,
      label: "Slow Time",
    },
    normal: {
      delay: 0,
      label: "Normal Time",
    },
  }

  const initTime = delay > 0 ? timeStates.slow : timeStates.normal

  const [timeState, setTimeState] = useState(initTime)

  const setTime = e => {
    setTimeState(timeStates[e.target.name])
    window.localStorage.setItem("fetchDelay", timeStates[e.target.name]["delay"])
  }

  return (
    <div className="fetch-delay-toggle" style={{ position: `absolute` }}>
      <button
        name="slow"
        disabled={timeState.delay > 0 && true}
        onClick={setTime}
      >
        {timeStates.slow.label}
      </button>
      <button
        name="normal"
        disabled={timeState.delay === 0 && true}
        onClick={setTime}
      >
        {timeStates.normal.label}
      </button>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
