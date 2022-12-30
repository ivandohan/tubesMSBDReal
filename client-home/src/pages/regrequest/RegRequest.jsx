import "./reqreg.scss"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";


const RegRequest = () => {

    const { isLoading, error, data } = useQuery(["regreq"], () =>
        makeRequest.get("/users/regreq").then((res) => {
            return res.data;
        })
    );

    const [users, setUserInfo] = useState({
        selected: [],
    })

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { selected } = users;

        
        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                selected: [...selected, value],
            });
        }
        
        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                selected: selected.filter((e) => e !== value),
            });
        }

        console.log(`${value} is ${checked}`);
    };

    const queryClient = useQueryClient();

    const accMutation = useMutation(
        (userIds) => {
            return makeRequest.put("/users/accept", userIds);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["regreq"]);
            },
        }
    )

    const rejMutation = useMutation(
        (userIds) => {
            return makeRequest.put("/users/reject", userIds);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["regreq"]);
            },
        }
    )

    const handleAcc = () => {
        try {
            if(window.confirm("Papaya? Banana Lapuka?")){
                accMutation.mutate(users)
                alert("Potaaa!")
            }
            setUserInfo({selected: []})
        }catch(e) {
            console.log("Error")
        }
    }

    const handleRej = () => {
        try {
            if(window.confirm("Papaya? Banana Lapuka?")){
                rejMutation.mutate(users)
                alert("Potaaa!")
            }
            setUserInfo({selected: []})
        }catch(e) {
            console.log("Error")
        }
    }


    return (
        <div className="reqreg">
            <h1>Registration Request</h1>
            <div className="block">
                <h2>Check to Accept</h2>
                <ul>
                    {
                        error ? "Error" : isLoading ? "loading..." :
                        data.map((user, i) => (
                            <li>
                                <input type="checkbox" id={"cb"} name="selected" value={user.id} onChange={handleChange}/>
                                <label for={"cb"}>{user.name} | {user.userLevel}</label>
                            </li>
                        ))
                    }
                </ul>
                <div className="buttons">
                    <button className="rej" onClick={handleRej}>Reject</button>
                    <button className="acc" onClick={handleAcc}>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default RegRequest