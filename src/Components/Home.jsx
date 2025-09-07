import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import Loading from "./Loading";

const Home = () => {
  const [Products] = useContext(ProductContext);
  const { search } = useLocation();
  const [individualCategoryProducts, setIndividualCategoryProducts] =
    useState(null);
  const categoryName = decodeURIComponent(search.split("=")[1]);

  const getProductCategory = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
      const data = await response.json() 
      setIndividualCategoryProducts(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!individualCategoryProducts || categoryName == 'undefined') setIndividualCategoryProducts(Products)
    if(categoryName != "undefined") {
      // getProductCategory() 
      setIndividualCategoryProducts(Products.filter((p)=>p.category == categoryName))
    }
  }, [categoryName, Products]);

  return Products && Products.length > 0 ? (
    <>
      <Navbar />

      <div className="main-container w-[82%] min-h-[100vh] flex flex-wrap gap-5 items-center justify-center  overflow-y-auto">
        {individualCategoryProducts && individualCategoryProducts.map((products, index) => (
          <Link
            key={index}
            to={`/details/${products.id}`}
            className="card shadow w-[25%] h-[50vh] border-[1px] border-[gray] flex flex-col items-center justify-center bg-[white] text-black hover:scale-105 transition-all rounded-lg"
          >
            <div
              className="img-div h-[65%] w-full bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${products.image})`,
              }}
            ></div>
            <h1 className="text-center mx-1 mt-5">{products.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : Products && Products.length === 0 ? (
    <>
      <Navbar />
      <div className="main-container w-[82%] min-h-[100vh] flex items-center justify-center">
        <h1 className="text-2xl">No products available. Add some products to get started!</h1>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
