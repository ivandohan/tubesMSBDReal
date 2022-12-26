import { useContext } from "react";
import Market from "../../components/market/Market"
import { AuthContext } from "../../context/authContext";
import "./craftmarket.scss"

const CraftMarket = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="craftmarket">
            <h1>Craft Market</h1>
            <Market />
        </div>
    )
}

export default CraftMarket