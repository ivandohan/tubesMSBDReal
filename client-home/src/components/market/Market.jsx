import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./market.scss";

const Market = () => {

    const { isLoading, error, data } = useQuery(["markets"], () =>
        makeRequest.get("/markets").then((res) => {
            return res.data;
        })
    );

    return (
        <div className="market">
            {error ? "Something went wrong!" : isLoading ? "loading.." : data.map((product) => (
                <div className="market-container">
                    <div class="product-details">
                        <h1>{product.productName}</h1>
                        <p class="information">" {product.descr}</p>
                        <div class="control">
                            <Link to={`/craft-market/${product.id}?cp=${product.price}`} className="link">
                                <button class="btn">
                                    <span class="price">Rp.{product.price}</span>
                                    <span class="shopping-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></span>
                                    <span class="buy">Pesan</span>
                                </button>
                            </Link>        
                        </div>
                    </div>
                        
                    <div class="product-image">                
                        <img src={'/upload/' + product.image} alt="" />
                        <div class="info">
                            <h2>Verified by : </h2>
                            <ul>
                                <li>
                                    <strong>Admin</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Market
