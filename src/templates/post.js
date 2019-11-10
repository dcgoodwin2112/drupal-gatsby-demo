import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FormattedText from "../components/formattedText"
import Comments from "../components/comments"

export default ({ data }) => {
  const {
    nodeArticle: {
      title,
      created,
      nid,
      body: { value: content, format },
    },
  } = data

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <p className="created">{created}</p>
      <FormattedText content={content} format={format} />
      <Comments nid={nid} />
      <hr />
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($path: String!) {
    nodeArticle(path: { alias: { eq: $path } }) {
      title
      created(formatString: "MMMM DD, YYYY")
      nid: drupal_internal__nid
      body {
        value
        format
      }
    }
  }
`
