import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";


const Edit = () => {
  const [Products, setProducts] = useContext(ProductContext);
  const { id } = useParams();
  const [editProduct, setEditProduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  })

  const onChangeHandler = (e)=>{

    setEditProduct({...editProduct, [e.target.name]: e.target.value})

}

  const navigate = useNavigate();

  useEffect(()=>{
    setEditProduct(Products.filter((p)=>p.id == id)[0])
  },[id])

  const AddProduct = (e) => {
    e.preventDefault();

    if (
      editProduct.title.trim().length <= 5 ||
      editProduct.image.trim().length <= 5 ||
      editProduct.category.trim().length <= 5 ||
      editProduct.price.trim().length <= 1 ||
      editProduct.description.trim().length <= 5
    ) {
      alert("Each and every field atleast must have 4 characters");
      return;
    }
    // const customProduct = {
    //   id: nanoid(),
    //   title,
    //   image,
    //   category,
    //   price,
    //   description,
    // };

    const pi = Products.findIndex((p)=>p.id == id)
    const copyData = [...Products]
    copyData[pi] = {...Products[pi], ...editProduct}

    setProducts(copyData);
    localStorage.setItem(
      "Products",
      JSON.stringify(copyData)
    );
    navigate(-1);


};

  return (
    <div className="h-screen w-full">
      <form
        onSubmit={AddProduct}
        className="h-full w-[60%] mx-auto flex flex-col items-start justify-start py-[5vw] px-[5vw] gap-5"
      >
        <label className="text-4xl font-bold">Edit Product</label>
        <input
          value={editProduct && editProduct.title}
          onChange={onChangeHandler}
          name="title"
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          type="text"
          placeholder="Title..."
        />

        <input
          value={editProduct && editProduct.image}
          onChange={onChangeHandler}
          name="image"
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          type="url"
          placeholder="Image URL"
        />

        <div className="flex w-full gap-[3vw]">
          <input
            value={editProduct && editProduct.category}
            onChange={onChangeHandler}
            name="category"
            className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
            type="text"
            placeholder="Category..."
          />

          <input
            value={editProduct && editProduct.price}
            onChange={onChangeHandler}
            name="price"
            className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
            type="number"
            placeholder="Price..."
          />
        </div>

        <textarea
          value={editProduct && editProduct.description}
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
