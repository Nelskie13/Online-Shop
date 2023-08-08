"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Redux-store/CartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.data);
  const productList = useSelector((state) => state.productList.data);

  const dispatch = useDispatch();

  const handleUpdateCount = (productId, newCount) => {
    dispatch(addToCart({ productId, count: newCount }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => {
          // Find the corresponding product from productList using the id
          const product = productList.find((p) => p.id === item.product?.id);

          return (
            <li key={item.product?.id} className="cart-item">
              <div className="item-info">
                {product && (
                  <>
                    <p>Title: {product.title}</p>
                    <p>Category: {product.category}</p>
                    <p>Brand: {product.brand}</p>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {item.count}</p>
                  </>
                )}
              </div>
              <div className="item-actions">
                <button
                  onClick={() =>
                    handleUpdateCount(item.product.id, item.count - 1)
                  }
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  onClick={() =>
                    handleUpdateCount(item.product.id, item.count + 1)
                  }
                >
                  +
                </button>
                <button onClick={() => handleRemoveItem(item.product.id)}>
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Cart;
