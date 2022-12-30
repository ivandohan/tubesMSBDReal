import "./leftBar.scss";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Events from "../../assets/6.png";
import Tutorials from "../../assets/11.png";
import Fund from "../../assets/13.png";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
  const {currentUser} = useContext(AuthContext)

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
          <Link to={'/achievement'} className="link">
            <div className="item">
              <img src={Tutorials} alt="" />
              <span>Achievements</span>
            </div>
          </Link>

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

        </div>
        <hr />
        {
          currentUser.userLevel == "admin" &&
            <div className="menu">
              <span>Admin Menu</span>
              <Link className="link">
                <div className="item">
                  <AddCircleOutlineOutlinedIcon />
                  <span>Add Products</span>
                </div>
              </Link>
              <Link to={'/manage-order'} className="link">
                <div className="item">
                  <ShoppingCartOutlinedIcon />
                  <span>Manage Order Items</span>
                </div>
              </Link>
              <Link to={'/registration-request'} className="link">
                <div className="item">
                  <VpnKeyOutlinedIcon />
                  <span>Registration Request</span>
                </div>
              </Link>
              <Link to={'/reported-post'} className="link">
                <div className="item">
                  <ReportProblemOutlinedIcon />
                  <span>Reported Posts</span>
                </div>
              </Link>
              <div className="item">
                <ReportProblemOutlinedIcon />
                <span>Reported Comments</span>
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default LeftBar;
