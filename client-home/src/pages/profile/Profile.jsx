import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmptyProf from "../../assets/profile.png";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { useState } from "react";
import Share from "../../components/share/Share";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["userProf"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      console.log("Prof data = ")
      console.log(res.data)
      return res.data;
    })
  );

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            {data.coverPic ? <img src={"/upload/" + data.coverPic} alt="" className="cover" /> : 
            <img src={"/upload/coverpic.png"} alt="" className="cover" />}
            {data.profilePic ? <img src={"/upload/" + data.profilePic} alt="" className="profilePic" /> : 
            <img src={EmptyProf} alt="" className="profilePic" />}
            {/* <img src={"/upload/"+ data.profilePic} alt="" className="profilePic" /> */}
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                </div>
                {userId === currentUser.id && (
                  <button onClick={() => setOpenUpdate(!openUpdate)}>update</button>
                )}
              </div>
            </div>
            {
              (data.id == currentUser.id) &&
              <Share />
            }
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}; 

export default Profile;
