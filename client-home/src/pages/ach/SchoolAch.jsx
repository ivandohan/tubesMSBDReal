import { useContext } from "react";
import Achievements from "../../components/achievements/Achievements";
import { AuthContext } from "../../context/authContext";
import "./schoolachievement.scss"

const SchoolAch = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="schach">
            <h1>School Achievements</h1>
            <Achievements />
        </div>
    )
}

export default SchoolAch