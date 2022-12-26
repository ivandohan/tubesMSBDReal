import { useContext } from "react";
import Commus from "../../components/commus/Commus"
import { AuthContext } from "../../context/authContext";
import "./community.scss"

const Community = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="community">
            <h1>Community</h1>
            <Commus />
        </div>
    )
}

export default Community