import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";


const Edit = () => {
  const [Products, setProducts] = useContext(ProductContext);
  const { id } = useParams();
  const [editProduct, setEditProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const onChangeHandler = (e)=>{

    setEditProduct({...editProduct, [e.target.name]: e.target.value})

}

  const navigate = useNavigate();

  useEffect(()=>{
    if (Products && Products.length > 0) {
      const product = Products.find((p)=>p.id == id);
      if (product) {
        setEditProduct(product);
        setIsLoading(false);
      } else {
        // Product not found, redirect to home
        navigate('/');
      }
    } else if (Products && Products.length === 0) {
      // No products available, redirect to home
      navigate('/');
    }
  },[id, Products, navigate])

  const AddProduct = (e) => {
    e.preventDefault();

    if (
      !editProduct.title || editProduct.title.trim().length <= 5 ||
      !editProduct.image || editProduct.image.trim().length <= 5 ||
      !editProduct.category || editProduct.category.trim().length <= 5 ||
      !editProduct.price || editProduct.price.toString().trim().length <= 1 ||
      !editProduct.description || editProduct.description.trim().length <= 5
    ) {
      alert("Each and every field atleast must have 4 characters");
      return;
    }

    const pi = Products.findIndex((p)=>p.id == id);
    if (pi === -1) {
      alert("Product not found!");
      return;
    }

    const copyData = [...Products];
    copyData[pi] = {...Products[pi], ...editProduct};

    setProducts(copyData);
    localStorage.setItem(
      "Products",
      JSON.stringify(copyData)
    );
    toast.success("Product Updated Successfully");
    navigate(-1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-full">
      <form
        onSubmit={AddProduct}
        className="h-full w-[60%] mx-auto flex flex-col items-start justify-start py-[5vw] px-[5vw] gap-5"
      >
        <label className="text-4xl font-bold">Edit Product</label>
        <input
          value={editProduct.title || ""}
          onChange={onChangeHandler}
          name="title"
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          type="text"
          placeholder="Title..."
        />

        <input
          value={editProduct.image || ""}
          onChange={onChangeHandler}
          name="image"
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          type="url"
          placeholder="Image URL"
        />

        <div className="flex w-full gap-[3vw]">
          <input
            value={editProduct.category || ""}
            onChange={onChangeHandler}
            name="category"
            className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
            type="text"
            placeholder="Category..."
          />

          <input
            value={editProduct.price || ""}
            onChange={onChangeHandler}
            name="price"
            className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
            type="number"
            placeholder="Price..."
          />
        </div>

        <textarea
          value={editProduct.description || ""}
          onChange={onChangeHandler}
          name="description"
          rows="9"
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          placeholder="Enter Product description here..."
        ></textarea>

        <button className="font-bold addToCart bg-black py-4 px-4 rounded-lg">
          Edit Product Details
        </button>
      </form>
    </div>
  );
};

export default Edit;
