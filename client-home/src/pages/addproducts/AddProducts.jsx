import "./addproducts.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {Link} from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const AddProducts = () => {

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const [productName, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const {currentUser} = useContext(AuthContext);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (newProduct) => {
        return makeRequest.post("/markets/add-product", newProduct);
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
            queryClient.invalidateQueries(["markets"]);
        },
      }
    );
  
    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        console.log("Img pro = ")
        console.log(imgUrl)
        mutation.mutate({ productName, img: imgUrl, price, stock, desc, authorId: currentUser.id});
        alert("Product has been created!")
        setName("");
        setFile(null);
        setPrice("");
        setStock("");
        setDesc("");
    };

    return (
        <div className="add-products">
            <h1>Add New Product</h1>
            <div className="add-section">
                <h2>Input Form</h2>
                <div class='signup-container'>
                    <div class='right-container'>
                        <div className="img">
                        {file ? (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        ):
                            <img src={'/upload/coverpic.png'} alt="" />
                        }
                        </div>
                        <header>
                            <div class='set'>
                                <div class='products-name'>
                                    <label for='product-name'>Product Name</label>
                                    <input 
                                        name="productName" 
                                        id='product-name' 
                                        placeholder="e.g Pencil Box" 
                                        type='text'
                                        onChange={(e) => setName(e.target.value)}
                                        value={productName}
                                    />
                                </div>
                                <div class='products-photo'>
                                    <button>
                                        <i class='fas fa-camera-retro'></i>
                                        <input
                                            type="file"
                                            id="file"
                                            style={{ display: "none" }}
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </button>
                                    <label htmlFor='file'>
                                        <div>
                                            <span>Upload a photo</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class='set'>
                                <div class='products-breed'>
                                    <label for='price'>Price</label>
                                    <input 
                                        name="price" 
                                        id='price' 
                                        placeholder="Rp." 
                                        type='text' 
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </div>
                                <div class='products-birthday'>
                                    <label for='stock'>Stock</label>
                                    <input 
                                        name="stock" 
                                        id='stock' 
                                        placeholder='e.g 1' 
                                        type='text' 
                                        onChange={(e) => setStock(e.target.value)}
                                        value={stock}
                                    />
                                </div>
                            </div>
                            <div className="text-area">
                                <label htmlFor="descr">Description</label>
                                <textarea 
                                    name="desc" 
                                    id="descr" 
                                    cols="30" 
                                    rows="10" 
                                    placeholder="Product description..."
                                    onChange={(e) => setDesc(e.target.value)}
                                    value={desc}
                                >
                                </textarea>
                            </div>
                        </header>
                        <footer>
                            <div class='set'>
                                <Link to={'/craft-market'}>
                                    <button id='back'>View Products</button>
                                </Link>
                                <button id='next' onClick={handleClick}>Add Product</button>
                            </div>
                        </footer>
                    </div>
                    </div>

            </div>
        </div>
    )
}

export default AddProducts
