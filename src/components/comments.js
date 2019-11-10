import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

const Comments = ({ nid }) => {
  let [comments, setComments] = useState()

  useEffect(() => {
    const getComments = async () => {
      const response = await axios(
        `http://gatsby-demo.dd:8083/node/article/${nid}/comments`
      )

      setComments(
        response.data.map(comment => (
          <>
            <p>
              <strong>Subject:</strong> {comment.subject}
            </p>
            <p>
              <span
                dangerouslySetInnerHTML={{ __html: comment.comment_body }}
              />
            </p>
          </>
        ))
      )
    }
    getComments()
  }, [nid])

  return (
    <div className="comments">
      {comments ? <p>{comments}</p> : <p>Loading...</p>}
    </div>
  )
}

Comments.propTypes = {
  nid: PropTypes.number.isRequired
}

export default Comments
