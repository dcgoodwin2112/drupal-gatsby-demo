import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query SidebarBlockQuery {
      allBlockContentGatsbySidebarBlock {
        nodes {
          title: info
          body {
            processed
          }
          nid: drupal_internal__id
        }
      }
    }
  `)
  return (
    <>
      {data.allBlockContentGatsbySidebarBlock.nodes.map(node => (
        <SidebarBlock
          key={node.nid}
          title={node.title}
          content={node.body.processed}
        />
      ))}
    </>
  )
}

const SidebarBlock = ({ title, content }) => (
  <div
    className="sidebar-block"
    style={{
      backgroundColor: `#0678be`,
      color: `#fff`,
      padding: `1rem`,
      marginBottom: `1.85rem`,
    }}
  >
    <h3>{title}</h3>
    <div
      className="block-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
)

export default Sidebar
