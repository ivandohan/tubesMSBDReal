import Achievement from "../achievement/Achievement";
import "./achievements.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Achievements = ({userId}) => {
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("/posts/achievement-posts?userId="+userId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className="achs">
            {error
            ? "Something went wrong!"
            : isLoading
            ? "loading"
            : data.map((post) => <Achievement post={post} key={post.id} />)
            }
        </div>
    );
};

export default Achievements;