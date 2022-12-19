import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./dirdetails.scss"

const DirDetails = () => {
    const [year, setYear] = useState("")

    const lvl = useLocation().pathname.split("/")[2].replace("-", " ")

    const handleChange = (e) => {
        setYear(e.target.value)
    }

    return (
        <div className="dirdet">
            <h1>Directory Details</h1>
            <div className="vm-down">
                <div className="title">
                    <h2>Sort Data</h2>
                </div>
                <div className="selection">
                    <label>
                        <select id="year-dirdet" onChange={handleChange}>
                            <option selected="selected">Year</option>
                            <option value={"2020"}>2020</option>
                            <option value={"2021"}>2021</option>
                            <option value={"2022"}>2022</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="vm">
                <h2>{lvl} {year}</h2>
                <div class="table-wrapper" id="1">
                    <table class="fl-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        {
                            (year == null || year == "Year") ?
                            <tbody>
                                <tr>
                                    <td>Please</td>
                                    <td>Select Year</td>
                                    <td>First!</td>
                                </tr> 
                            </tbody> :
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
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DirDetails
