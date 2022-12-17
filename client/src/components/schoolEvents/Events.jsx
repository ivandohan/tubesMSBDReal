import Event from "../SchEvent/Event";
import "./events.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Events = ({userId}) => {
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeRequest.get("/posts?userId="+userId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className="eventss">
            {error
            ? "Something went wrong!"
            : isLoading
            ? "loading"
            : data.map((post) => <Event post={post} key={post.id} />)
            }
        </div>
    );
};

export default Events;