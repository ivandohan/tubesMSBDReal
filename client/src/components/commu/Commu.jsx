import { Link } from "react-router-dom";
import "./commu.scss";

const Commu = ({ commu }) => {
    return (
        <div class="courses-container">
            <div class="course">
                <div class="course-preview">
                    <h6>Community</h6>
                    <h2>{commu.fullname}</h2>
                    <Link to={"/community/" + commu.userId} className="vm">Vission and Mission {'>'}</Link>
                </div>
                <div class="course-info">
                    <div class="progress-container">
                        <div class="progress"></div>
                        <span class="progress-text">
                        </span>
                    </div>
                    <h6>{commu.year}</h6>
                    <h2>{commu.motto}</h2>
                    <button class="btn">Member Info</button>
                </div>
            </div>
        </div>
    )
}

export default Commu
