import React from "react";
import ProductList from "../components/ProductList";
import SizeMenu from "../components/SizeMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <SizeMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
