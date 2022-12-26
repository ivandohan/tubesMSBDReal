import { Link, useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./schdetail.scss"

const SchDetail = () => {
    const schId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["schdet"], () =>
        makeRequest.get("/school/vission-mission/" + schId).then((res) => {
            return res.data;
        })
    );

    return (
        <div className="schdetail">
            {error ? "something went wrong" : isLoading ? "loading..." : 
                <>
                    <h1>{data.level}</h1>
                    <div className="vm">
                        <h2>Vision</h2>
                        <p>{data.vission}</p>
                    </div>
                    <div className="vm">
                        <h2>Mission</h2>
                        <p>{data.mission}</p>
                        {/* <span>{data.userId}</span> */}
                    </div>
                    <div className="vm">
                        <h2>Management Structure</h2>
                        <div class="table-wrapper" id="1">
                            <table class="fl-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Content 1</td>
                                        <td>Content 1</td>
                                    </tr>
                                    <tr>
                                        <td>Content 2</td>
                                        <td>Content 2</td>
                                    </tr>
                                    <tr>
                                        <td>Content 3</td>
                                        <td>Content 3</td>
                                    </tr>
                                    <tr>
                                        <td>Content 4</td>
                                        <td>Content 4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default SchDetail
