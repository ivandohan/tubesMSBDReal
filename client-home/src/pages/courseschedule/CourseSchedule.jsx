import { useContext } from "react";
import Schedule from "../../components/schedule/Schedule"
import { AuthContext } from "../../context/authContext";
import "./coursesched.scss"

const CourseSchedule = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="csched">
            <h1>Course Schedule</h1>
            <Schedule />
        </div>
    )
}

export default CourseSchedule