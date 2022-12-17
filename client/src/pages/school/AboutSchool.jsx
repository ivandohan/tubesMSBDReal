import { useContext } from "react";
import AboutS from "../../components/aboutSchool/SchoolInfo"
import { AuthContext } from "../../context/authContext";
import "./aboutsch.scss"

const AboutSchool = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="aboutsch">
            <h1>About School</h1>
            <AboutS />
        </div>
    )
}

export default AboutSchool