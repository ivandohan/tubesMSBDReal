import Commu from "../commu/Commu";
import "./commus.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Commus = () => {
  const { isLoading, error, data } = useQuery(["commus"], () =>
    makeRequest.get("/communities").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="commus">
        {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((commu) => <Commu commu={commu} key={commu.id} />)}
    </div>
  );
};

export default Commus;
