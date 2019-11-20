import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

const Comments = ({ nid }) => {
  let [comments, setComments] = useState(null)

  async function getComments() {
    let delay = window.localStorage.getItem("fetchDelay")
    console.log(delay)

    const response = await axios(
      `http://gatsby-demo.dd:8083/node/article/${nid}/comments`
    )

    setComments(
      response.data.map(comment => (
        <div className="comment" style={{border: `1px solid #ccc`, margin: `1rem 0`, padding: `1rem`}}>
          <div className="comment-subject">
            <strong>Subject:</strong> {comment.subject}
          </div>
          <div className="comment-body">
            <span dangerouslySetInnerHTML={{ __html: comment.comment_body }} />
          </div>
        </div>
      ))
    )
  }

  useEffect(() => {
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
