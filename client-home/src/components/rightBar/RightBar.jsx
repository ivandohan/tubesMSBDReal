import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import moment from "moment";
import "./rightBar.scss";
import { useState } from "react";

const RightBar = () => {

  const { currentUser } = useContext(AuthContext);
  const [logPost, setLogPost] = useState([])
  const { isLoading, error, data } = useQuery(["upcoming"], () =>
    makeRequest.get("/posts/event-posts?userId=undefined").then((res) => {
        return res.data;
    })
  );

  const { isLoading2, error2, data2 } = useQuery(["log-post"], () =>
    makeRequest.get("/posts/log-posts").then((res) => {
        // console.log(res.data)
        setLogPost(res.data);
        console.log(logPost);
        return res.data;
    })
  );

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Upcoming Events </span>
          {
            error ? "something went wrong" : isLoading ? "loading..." :
            <div className="upcoming">
              <h2>{data[0].descr}</h2>
              {
                data[0].img &&
                <img src={"/upload/" + data[0].img} alt="" />
              }
            </div>
          }
        </div>
        <div className="item">
          <span>Latest Activities</span>
          {
            error2 ? "something went wrong" : isLoading2 ? "loading" : 
            (
              logPost.slice(0, 5).map((log) => (
                <div className="user">
                  <div className="userInfo">
                    {/* <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    /> */}
                    <NotificationsActiveIcon />
                    <p>
                      {log.descr}
                    </p>
                  </div>
                  <span>{moment(log.insertedAt).fromNow()}</span>
                </div>
              ))
            )
          }
        </div>
        <div className="item">
          <span>Quotes of the Month</span>
          <div className="upcoming">
            <h3>“ Hiduplah seolah-olah kamu akan mati besok. Belajarlah seolah-olah Anda akan hidup selamanya” - Mahatma Gandhi.</h3>
            <img src="/upload/rickandmorty.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
