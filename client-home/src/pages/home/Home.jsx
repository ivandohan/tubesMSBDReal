import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./home.scss"

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      {currentUser.userLevel == "viewer" ?
        <h1>News</h1> :
        <Share/>
      }
      <Posts/>
    </div>
  )
}

export default Home