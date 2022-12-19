import { Link, useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./commudetail.scss"

const CommuDetail = () => {
    const communityId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["commus"], () =>
        makeRequest.get("/communities/detail/" + communityId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className="commudet">
            {data.map((detail) => (
                <>
                    <h1>{detail.fullname} {detail.year}</h1>
                    <div className="vm">
                        <h2>Vission</h2>
                        <p>{detail.vission}</p>
                    </div>
                    <div className="vm">
                        <h2>Mission</h2>
                        <p>{detail.mission}</p>
                    </div>
                    <div className="vm">
                        <h2>Members</h2>
                        <div class="table-wrapper" id="1">
                            <table class="fl-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Content 1</td>
                                        <td>Content 1</td>
                                        <td>Content 1</td>
                                    </tr>
                                    <tr>
                                        <td>Content 2</td>
                                        <td>Content 2</td>
                                        <td>Content 2</td>
                                    </tr>
                                    <tr>
                                        <td>Content 3</td>
                                        <td>Content 3</td>
                                        <td>Content 3</td>
                                    </tr>
                                    <tr>
                                        <td>Content 4</td>
                                        <td>Content 4</td>
                                        <td>Content 4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ))}

        </div>
    )
}

export default CommuDetail
