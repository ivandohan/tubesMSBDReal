import { useState } from "react";
import { Link } from "react-router-dom";
import "./sched.scss";

const Schedule = () => {
    const [isOpenSched, setOpenSched] = useState(false)
    const [schLevel, setSchLevel] = useState("")

    const handleSched = (id) => {
        setOpenSched(!isOpenSched);

        switch(id) {
            case 1:
                setSchLevel("Elementary School")
                break;
            case 2:
                setSchLevel("Junior High School")
                break;
            case 3:
                setSchLevel("Senior High School")
                break;
            case 4:
                setSchLevel("Vocational High School")
                break;
        }
    }

    return (
        <div className="schedsingl">
            <div class="schdropdown">
                <nav>
                    <label for="touch"><span>Choose School Level</span></label>               
                    <input type="checkbox" id="touch" /> 
                    <ul class="slide">
                        <li><a href="#1" onClick={() => {handleSched(1)}}>Elementary School</a></li> 
                        <li><a href="#1" onClick={() => {handleSched(2)}}>Junior High School</a></li>
                        <li><a href="#1" onClick={() => {handleSched(3)}}>Senior High School</a></li>
                        <li><a href="#1" onClick={() => {handleSched(4)}}>Vocational High School</a></li>
                    </ul>
                </nav>
            </div>
            {
                isOpenSched && 
                <div class="table-wrapper" id="1">
                    <h2>{schLevel}</h2>
                    <table class="fl-table">
                        <thead>
                            <tr>
                                <th>Header 1</th>
                                <th>Header 2</th>
                                <th>Header 3</th>
                                <th>Header 4</th>
                                <th>Header 5</th>
                                <th>Header 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Content 1</td>
                                <td>Content 1</td>
                                <td>Content 1</td>
                                <td>Content 1</td>
                                <td>Content 1</td>
                                <td>Content 1</td>
                            </tr>
                            <tr>
                                <td>Content 2</td>
                                <td>Content 2</td>
                                <td>Content 2</td>
                                <td>Content 2</td>
                                <td>Content 2</td>
                                <td>Content 2</td>
                            </tr>
                            <tr>
                                <td>Content 3</td>
                                <td>Content 3</td>
                                <td>Content 3</td>
                                <td>Content 3</td>
                                <td>Content 3</td>
                                <td>Content 3</td>
                            </tr>
                            <tr>
                                <td>Content 4</td>
                                <td>Content 4</td>
                                <td>Content 4</td>
                                <td>Content 4</td>
                                <td>Content 4</td>
                                <td>Content 4</td>
                            </tr>
                            <tr>
                                <td>Content 5</td>
                                <td>Content 5</td>
                                <td>Content 5</td>
                                <td>Content 5</td>
                                <td>Content 5</td>
                                <td>Content 5</td>
                            </tr>
                            <tr>
                                <td>Content 6</td>
                                <td>Content 6</td>
                                <td>Content 6</td>
                                <td>Content 6</td>
                                <td>Content 6</td>
                                <td>Content 6</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default Schedule
