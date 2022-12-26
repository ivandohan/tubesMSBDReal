import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EmptyProf from "../../assets/profile.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res) => {
      return res.data;
    })
  );

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      logout();
      window.location.reload(false);
    } catch (err) {
      console.log(err.response.data);
    }
  }
  

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span>Nurcahaya Media</span>
        </Link>
        <HomeOutlinedIcon className="pointer" />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} className="pointer"/>
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="pointer"/>
        )}
        {/* <GridViewOutlinedIcon /> */}
        {/* <div className="search">
          <SearchOutlinedIcon className="pointer"/>
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        {/* <PersonOutlinedIcon className="pointer"/> */}
        <LogoutOutlinedIcon onClick={handleLogout} className="pointer"/>
        {
          (currentUser.levelUser == "admin" || currentUser.levelUser == "community") &&
          <SendOutlinedIcon className="pointer"/>
        }
        <Link to={`/profile/${currentUser.id}`} className="link">
          <div className="user pointer">
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
            {isLoading ? (
              "loading"
            ) : (
              <span>{data.name}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
