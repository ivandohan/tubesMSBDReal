import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { Link } from "react-router-dom";

const LeftBar = () => {

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {/* <Link to={'/student-directory'} className="link">
            <div className="item">
              <img src={Friends} alt="" />
              <span>Student Directory</span>
            </div>
          </Link> */}
          <Link to={'/community'} className="link">
            <div className="item">
              <img src={Groups} alt="" />
              <span>Community</span>
            </div>
          </Link>
          <Link to={'/about-school'} className="link">
            <div className="item">
              <img src={Market} alt="" />
              <span>About School</span>
            </div>
          </Link>
          {/* <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div> */}
        </div>
        <hr />
        <div className="menu">
          <span>Updates on School</span>
          <Link to={'/school-events'} className="link">
            <div className="item">
              <img src={Events} alt="" />
              <span>Events</span>
            </div>
          </Link>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <Link to={'/craft-market'} className="link">
            <div className="item">
              <img src={Fund} alt="" />
              <span>Craft Market</span>
            </div>
          </Link>
          <Link to={'/achievement'} className="link">
            <div className="item">
              <img src={Tutorials} alt="" />
              <span>Achievements</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
