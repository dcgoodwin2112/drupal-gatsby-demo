import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

const Comments = ({ nid }) => {
  let [comments, setComments] = useState(null)

  useEffect(() => {
    async function getComments() {
      const response = await axios(
        `http://gatsby-demo.dd:8083/node/article/${nid}/comments`
      )

      if (!response.data[0]["subject"]) {
        setComments(<>This post has no comments yet</>)
      } else {
        setComments(
          response.data.map(comment => {
            return (
              <div
                className="comment"
                key={`${comment.created}${comment.subject}`}
                style={{
                  border: `1px solid #ccc`,
                  margin: `1rem 0`,
                  padding: `1rem`,
                }}
              >
                <div
                  className="comment-subject"
                  style={{ marginBottom: `1rem` }}
                >
                  <strong>Subject:</strong> {comment.subject}
                </div>
                <div className="comment-body">
                  <span
                    dangerouslySetInnerHTML={{ __html: comment.comment_body }}
                  />
                </div>
              </div>
            )
          })
        )
      }
    }
    getComments()
  }, [nid])

  return (
    <div className="comments">
      <h3>Comments</h3>
      {comments ? <>{comments}</> : <p>Loading...</p>}
    </div>
  )
}

Comments.propTypes = {
  nid: PropTypes.number.isRequired,
}

export default Comments
