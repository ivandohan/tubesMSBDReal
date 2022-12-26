import { useContext } from "react";
import Events from "../../components/schoolEvents/Events"
import { AuthContext } from "../../context/authContext";
import "./schoolevents.scss"

const SchoolEvents = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="schevents">
            <h1>School Events</h1>
            <Events />
        </div>
    )
}

export default SchoolEvents