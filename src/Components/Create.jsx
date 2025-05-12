import React, { useContext, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const [Products, setProducts] = useContext(ProductContext);
  
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const AddProduct = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length <= 1 ||
      description.trim().length <= 5
    ) {
      alert("Each and every field atleast must have 4 characters");
      return;
    }
    const customProduct = {
      id: nanoid(),
      title,
      image,
      category,
      price,
      description,
    };
    setProducts([...Products, customProduct]);
    localStorage.setItem(
      "Products",
      JSON.stringify([...Products, customProduct])
    );
    toast.success("Product Added Successfully")    
    navigate("/");
  };

  return (
    <div className="h-screen w-full">
      <form
        onSubmit={AddProduct}
        className="h-full w-[60%] mx-auto flex flex-col items-start justify-start py-[5vw] px-[5vw] gap-5"
      >
        <label className="text-4xl font-bold">Add New Product</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          type="text"
          placeholder="Title..."
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          type="url"
          placeholder="Image URL"
        />

        <div className="flex w-full gap-[3vw]">
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
            type="text"
            placeholder="Category..."
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
            type="number"
            placeholder="Price..."
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="9"
          className="w-full p-2 rounded-md bg-zinc-700 placeholder:text-[white]"
          placeholder="Enter Product description here..."
        ></textarea>

        <button className="font-bold addToCart bg-black py-4 px-4 rounded-lg">
          Submit Product Details
        </button>
      </form>
    </div>
  );
};

export default Create;
