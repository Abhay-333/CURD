import React, { useState, createContext, useEffect } from "react";

export const ProductContext = createContext();

const Context = (props) => {
  const [Products, setProducts] = useState( JSON.parse(localStorage.getItem("Products")) || []);

  const getProducts = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
      localStorage.setItem("Products", JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
  };

  useEffect(() => {
    // Only fetch from API if no products in localStorage
    if (!localStorage.getItem("Products")) {
      getProducts();
    }
  }, []);

  return (
    <ProductContext.Provider value={[ Products, setProducts ]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
