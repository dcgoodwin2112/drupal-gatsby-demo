import React from "react"
import { graphql } from "gatsby"
import NonStretchedImage from "../components/nonStretchedImage"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "../components/comments"

export default ({ data }) => {
  const {
    nodeArticle: {
      title,
      created,
      nid,
      body: { processed: content },
    },
  } = data

  const image =
    data.nodeArticle.relationships.field_image.localFile.childImageSharp

  return (
    <Layout>
      <SEO title={title} />
      <article>
        {image !== null && (
          <div className="article-image" style={{ marginBottom: `1.45rem` }}>
            <NonStretchedImage {...image} />
          </div>
        )}
        <h1>{title}</h1>
        <div className="created">{created}</div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <Comments nid={nid} key={nid} />
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
        processed
      }
      relationships {
        field_image {
          localFile {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`
