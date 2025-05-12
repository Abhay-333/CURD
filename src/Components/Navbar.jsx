import React, { useContext } from "react";
import { ProductContext } from "../Utils/Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [Products] = useContext(ProductContext);

  let individualCategory =
    Products && Products.reduce((acc, cv) => [...acc, cv.category], []);
  individualCategory = [...new Set(individualCategory)];

  const colors = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, 
    ${(Math.random() * 255).toFixed()},
    ${(Math.random() * 255).toFixed()},0.4)`;
  };

  return (
    <nav className="sideNavbar bg-zinc-700 w-[18%] h-full flex items-start flex-col">
      <div className="addToCart bg-black font-bold py-5 px-4 rounded-lg mx-9 my-10">
        <a href="/create" className="">
          <button>Add New Product</button>
        </a>
      </div>

      <div className="categories flex flex-col items-start px-6">
        <h1 className="text-2xl">Category</h1>

        {individualCategory.map((categories, index) => (
          <Link
            key={index}
            to={`/?category=${categories}`}
            className="mt-3 flex items-center capitalize"
          >
            <span
              style={{ background: colors() }}
              className={`w-[15px] h-[15px] mr-1 rounded-full`}
            ></span>
            {categories}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
