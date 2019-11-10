const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const PostTemplate = path.resolve(`src/templates/post.js`)

  return graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allNodeArticle(limit: $limit) {
          edges {
            node {
              path {
                alias
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create post pages.
    result.data.allNodeArticle.edges.forEach(edge => {
      createPage({
        // Path for this page — required
        path: `${edge.node.path.alias}`,
        component: PostTemplate,
        context: {},
      })
    })
  })
}
