import "./manageorder.scss"
import moment from "moment";
import {Link} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";


const ManageOrder = () => {
    const [onDels, setOnDel] = useState([]);

    const { isLoading, error, data } = useQuery(["orders-inpros"], () =>
        makeRequest.get("/markets/orders-inpros").then((res) => {
            return res.data;
        })
    );

    const { isLoadingOnDel, errorOnDel, onDel } = useQuery(["orders-ondel"], () =>
        makeRequest.get("/markets/orders-ondel").then((res) => {
            setOnDel(res.data)
            return res.data;
        })
    );


    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newUpdate) => {
            return makeRequest.put("/markets/orders", newUpdate);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["orders-inpros"]);
                queryClient.invalidateQueries(["orders-ondel"]);
            },
        }
    )

    const handleDelivery = (id) => {
        try {
            if(window.confirm("Are sure about that?"))
                mutation.mutate({id, status: "on delivery"})
            alert("Order has been updated")
        } catch(e) {
            console.log("Error while updating")
        }
    }

    const handleCancel = (id) => {
        try {
            if(window.confirm("Are sure about that?"))
                mutation.mutate({id, status: "in process"})
            alert("Order has been updated")
        } catch(e) {
            console.log("Error while updating")
        }
    }

    const handleSee = (msg) => {
        alert(`Notes Content : \n` + msg)
    }

    return (
        <div className="manageorder">
            <h1>Manage Order</h1>
            {
                error ? "Something went wrong" : isLoading ? "loading..." :
                (data.length == 0 &&
                <div className="order-detail">
                    <p>No order list yet</p>
                </div>)
            }
            {/* {
                error ? "Something went wrong" : isLoading ? "loading..." :
                data.map((order) => (
                    <div className="order-detail">
                        <div className="info">
                            <h3>{order.costumerName}</h3> |
                            <span>{moment(order.orderDate).fromNow()}</span> |
                            <span>{order.status}</span>
                        </div>
                        <div className="detail-info">
                            <p>Product : <span>{order.productName}</span></p>
                            <p>Quantity : <span>{order.quantity}</span> </p>
                            <p>Price : <span>{order.price}</span> </p>
                            <p>Phone Number : <span>{order.phoneNumber}</span></p>
                            <p>Notes : <span>{order.notes}</span> </p>
                            <p>Address : <span>{order.address}</span> </p>
                        </div>
                        <button onClick={() => handleClick(order.id)}>Delivery</button>
                    </div>
                ))
            } */}
            <div className="order-detail">
                <h2>Order List</h2>
                <div class="table-wrapper">
                    <table class="fl-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Notes</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                error ? "Something went wrong" : isLoading ? "loading..." :
                                data.map((order) => (
                                    <tr>
                                        <td>{order.costumerName}</td>
                                        <td>{order.price}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td>{order.status}</td>
                                        <td><button className="see" onClick={() => handleSee(order.notes)}>See</button></td>
                                        <td><a className="link" href={"http://wa.me/" + order.phoneNumber}>
                                            <button className="wa">WA</button>
                                            </a></td>
                                        <td><button className="delivery" onClick={() => handleDelivery(order.id)}>Delivery</button></td>
                                    </tr>
                            ))}
                            {
                                errorOnDel ? "Something went wrong" : isLoadingOnDel ? "loading..." :
                                onDels.map((order) => (
                                    <tr>
                                        <td>{order.costumerName}</td>
                                        <td>{order.price}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td>{order.status}</td>
                                        <td><button className="see" onClick={() => handleSee(order.notes)}>See</button></td>
                                        <td><Link className="link">
                                            <button className="wa">WA</button>
                                            </Link></td>
                                        <td><button className="cancel" onClick={() => handleCancel(order.id)}>Cancel</button></td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageOrder