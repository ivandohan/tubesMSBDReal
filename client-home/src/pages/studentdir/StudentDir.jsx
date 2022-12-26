import { useContext } from "react";
import StudentD from "../../components/student/StudentD"
import { AuthContext } from "../../context/authContext";
import "./studentdir.scss"

const StudentDir = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="studentdir">
            <h1>Student Directory</h1>
            <StudentD />
        </div>
    )
}

export default StudentDir