import React from "react";
import DogList from "../components/DogList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <DogList />
      <Cart />
    </div>
  );
};

export default Home;
