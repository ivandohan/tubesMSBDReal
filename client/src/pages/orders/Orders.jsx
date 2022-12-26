import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./orders.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const SchDetail = () => {
    const {currentUser} = useContext(AuthContext)

    const productId = parseInt(useLocation().pathname.split("/")[2]);
    const [searchParam] = useSearchParams()
    const [respon, setRespon] = useState("")
    const [isSuccess, setSuccess] = useState(false)

    const [prc, setPrc] = useState(searchParam.get('cp'))

    const [order, setOrder] = useState({
        productId,
        costumerName: null,
        quantity: null,
        price: prc,
        address: "",
        notes: "",
        status: "In Process",
    })


    const handleChange = (e) => {
        setOrder((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    
    
    const handleClick = async (e) => {
        e.preventDefault()
        // order.price = (order.quantity * parseInt(searchParam.get('cp')))
        setPrc(order.quantity * parseInt(searchParam.get('cp')))
        try {
            const res = await makeRequest.post("/markets", order)
            setRespon(res.data)
            setSuccess(true)
            console.log(res.data)
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="schdetail">
            <h1>Order Info </h1>
            {/* <span>{respon && respon}</span> */}
            {!isSuccess ?
            <div className="vm">
                <form>
                    <label htmlFor="qtty">Quantity</label>
                    <input type="number" name="quantity" id="qtty" onChange={handleChange}/>

                    <label htmlFor="nm">Name</label>
                    <input type="text" name="costumerName" id="nm" onChange={handleChange}/>

                    <label htmlFor="city">Address</label>
                    <input type="text" name="address" placeholder="e.g Jl. Bunga Cempaka, Gg. Alhidayah, No. 76" id="city" onChange={handleChange}/>

                    <label htmlFor="notes">Notes</label>
                    <textarea name="notes" id="notes" cols="30" rows="10" onChange={handleChange}></textarea>

                    <button onClick={handleClick}>Order Now</button>
                </form>
            </div> :
            <div className="vm">
                <h2>{respon}</h2>
                <Link to={'/craft-market'}>
                    <button>Back</button>
                </Link>
            </div>
            }
        </div>
    )
}

export default SchDetail
