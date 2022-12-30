import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );


  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  const handleReport = async (commentId, reportedBy) => {
    try {
      if(window.confirm("Papaya? Lapuka?")) {
        await makeRequest.post("/comments/report", {commentId, reportedBy})
        alert("Bananaa!")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleDelete = (commentId) => {
    // console.log("comment id = " + commentId)
    try {
      if(window.confirm("Papaya? Lapuka?")) {
        deleteMutation.mutate(commentId)
        alert("Bananaa!")
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name} <span className="smallSpan">{comment.label}</span>
                {
                  comment.userId != currentUser.id &&
                    <button className="report" onClick={() => handleReport(comment.id, currentUser.id)}>Report</button>
                  }
                {
                  comment.userId == currentUser.id &&
                    <button className="report" onClick={() => handleDelete(comment.id)}>Delete</button>
                }
                </span>
                <p>{comment.descr}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
