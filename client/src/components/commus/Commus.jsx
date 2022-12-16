import Commu from "../commu/Commu";
import "./commus.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId="+userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="commus">
        <Commu />
    </div>
  );
};

export default Posts;
