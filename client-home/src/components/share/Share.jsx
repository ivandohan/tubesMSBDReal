import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import EmptyProf from "../../assets/profile.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [isEvent, setIsEvent] = useState(false);
  const [isAchievement, setIsAchievement] = useState(false);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
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
    let imgUrl = "";
    let category = isEvent ? "event" : (isAchievement ? "achievement" : "story")
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl, category});
    setIsEvent(false)
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          {
              error ? "Something Wrong" : isLoading ? "Loading.." : (
                data.profilePic ?
                <img
                  src={"/upload/" + data.profilePic}
                  alt=""
                /> :
                <img
                  src={EmptyProf}
                  alt=""
                />
              )
          }
            <input
              type="text"
              placeholder={`What's going on ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <span>Marked as <strong>{isEvent ? "Event" : "Story"}</strong></span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <button onClick={() => setIsEvent(!isEvent)}>Mark As {isEvent ? "Story" : "Event"}</button>
            </div>
            {
              !isEvent && 
              <>
                <div className="item">
                  <span>Is an Achievement ?</span>
                </div>
                <div className="item">
                  <button onClickCapture={() => setIsAchievement(!isAchievement)}>{isAchievement ? "Yes" : "No"}</button>
                </div>
              </>
            }
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
