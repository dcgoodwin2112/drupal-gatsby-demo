import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
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
      <p className="create">{created}</p>
      {format === "plain_text" ? (
        <BodyContentPlain content={content} />
      ) : (
        <BodyContentHtml content={content} />
      )}
      <Comments nid={nid} />
      <hr />
    </Layout>
  )
}

const BodyContentPlain = ({ content }) => (
  <article>
    {content.split("\n\n").map(paragraph => (
      <p>{paragraph}</p>
    ))}
  </article>
)

const BodyContentHtml = ({ content }) => {
  return <article dangerouslySetInnerHTML={{ __html: content }} />
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
