import React from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const edges = data.allNodeArticle.edges
  return (
    <Layout isIndex={true}>
      <SEO title="Recent Articles" />
      {edges &&
        edges.map(edge => {
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
              key={nid}
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

const PostExcerpt = ({ alias, title, created, summary }) => (
  <>
    <div className="post-excerpt">
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

PostExcerpt.propTypes = {
  nid: PropTypes.number.isRequired,
  alias: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  summary: PropTypes.string,
}

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
