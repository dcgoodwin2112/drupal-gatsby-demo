import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const edges = data.allNodeArticle.edges
  return (
    <Layout>
      <SEO title="Recent Articles" />
      {edges &&
        edges.map(edge => {
          console.log(edge)
          let {
            node: {
              drupal_internal__nid: nid,
              title,
              created,
              body: { summary },
              path: { alias },
            },
          } = edge

          return (
            <PostExcerpt
              nid={nid}
              alias={alias}
              title={title}
              created={created}
              summary={summary}
            />
          )
        })}
    </Layout>
  )
}

const PostExcerpt = ({ nid, alias, title, created, summary }) => (
  <>
    <div className="post-excerpt" key={nid}>
      <h2>
        <Link to={alias}>{title}</Link>
      </h2>
      <div className="created">{created}</div>
      <div className="summary">
        <p>
          {summary.substring(0, 250)}... [<Link to={alias}>Read More</Link>]
        </p>
      </div>
    </div>
    <hr />
  </>
)

export const query = graphql`
  query IndexQuery {
    allNodeArticle(sort: { fields: created, order: DESC }, limit: 200) {
      edges {
        node {
          body {
            summary
          }
          title
          drupal_internal__nid
          path {
            alias
          }
          status
          created(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`

export default IndexPage
