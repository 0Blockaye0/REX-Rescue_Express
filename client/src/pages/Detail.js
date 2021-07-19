import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_DOGS,
} from "../utils/actions";
import { QUERY_DOGS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentDog, setCurrentDog] = useState({});

  const { loading, data } = useQuery(QUERY_DOGS);

  const { dogs, cart } = state;


  useEffect(() => {
    // already in global store
    if (dogs.length) {
      setCurrentDog(dogs.find(dog => dog._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_DOGS,
        dogs: data.dogs
      });

      data.dogs.forEach((dog) => {
        idbPromise('dogs', 'put', dog);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('dogs', 'get').then((indexedDogs) => {
        dispatch({
          type: UPDATE_DOGS,
          dogs: indexedDogs
        });
      });
    }
  }, [dogs, data, loading, dispatch, id]);

  console.log(data);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        dog: { ...currentDog, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...currentDog, purchaseQuantity: 1 });

    }
  }

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentDog._id
    });

    idbPromise('cart', 'delete', { ...currentDog });
  };

  return (
    <>
      {currentDog && cart ? (
        <div className="container wrapper my-1">
          <div className="product-img">
          <img
            src={`/images/${currentDog.image}`}
            alt={currentDog.name}
            height="420" 
            width="327"
          />
          </div>
          <div class="product-info">
            <div className="product-text">
          <Link to="/" id="back-link">
            ← Back to Available Dogs
          </Link>

          <h2 id="dog-name">{currentDog.name}</h2>

          <p>
            {currentDog.description}
          </p>

          <p>
            <strong>Breed: </strong>
            {currentDog.breed}
            {" "}
            <br />
            <strong>Age: </strong>
            {currentDog.age} old
            {" "}
            <br />
            {/* <button 
              disabled={!cart.find(p => p._id === currentDog._id)} 
              onClick={removeFromCart}
            >
              Remove Application
            </button> */}
          </p>
          </div>
          <div className="product-price-btn">
            <strong>Application Fee: </strong>
              ${currentDog.price}
              {" "}
              <br />
              <button onClick={addToCart}>
                Submit Application
              </button>
          </div>
          </div>
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;

// <div class="wrapper">
//     <div class="product-img">
//       <img src="http://bit.ly/2tMBBTd" height="420" width="327">
//     </div>
//     <div class="product-info">
//       <div class="product-text">
//         <h1>Harvest Vase</h1>
//         <h2>by studio and friends</h2>
//         <p>Harvest Vases are a reinterpretation<br> of peeled fruits and vegetables as<br> functional objects. The surfaces<br> appear to be sliced and pulled aside,<br> allowing room for growth. </p>
//       </div>
//       <div class="product-price-btn">
//         <p><span>78</span>$</p>
//         <button type="button">buy now</button>
//       </div>
//     </div>
//   </div>
