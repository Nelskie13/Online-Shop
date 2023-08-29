import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { removeFromCart } from "../Redux-store/CartSlice";
import { reset } from "../Redux-store/CounterSlice";
import Cross from "@/assets/cross.svg";
import CrossBlue from "@/assets/crossBlue.svg";
import CartCounter from "./Icons/CartCounter";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [hoverStates, setHoverStates] = useState({});
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counters);
  const totalCounter = cartItems.reduce(
    (total, item) => total + (counters[item.id] || 1),
    0
  );
  const isCartEmpty = cartItems.length === 0;

  const selectedCurrency = useSelector(
    (state) => state.currencies.selectedCurrency
  );
  const exchangeRates = useSelector((state) => state.currencies.data.rates);

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(reset({ id: productId }));
  };
  const handleMouseEnter = (id) => {
    setHoverStates({ ...hoverStates, [id]: true });
  };

  const handleMouseLeave = (id) => {
    setHoverStates({ ...hoverStates, [id]: false });
  };

  const convertPriceToCurrency = (price) => {
    if (!exchangeRates || !selectedCurrency) {
      return parseFloat(price).toFixed(2);
    }

    const rate = exchangeRates[selectedCurrency];
    const numericPrice = parseFloat(String(price).replace(/,/g, "")); // Remove commas

    if (isNaN(numericPrice)) {
      return "Invalid Price";
    }

    const convertedPrice = numericPrice * rate;

    let formattedPrice;
    if (selectedCurrency === "IDR") {
      formattedPrice = new Intl.NumberFormat("en-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
        notation: "compact",
        compactDisplay: "short",
      }).format(convertedPrice);
    } else {
      formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: selectedCurrency,
        maximumFractionDigits: 2,
      }).format(convertedPrice);
    }
    formattedPrice = formattedPrice.replace(/\.\d+$/, "");
    return formattedPrice;
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    cartItems.forEach((item) => {
      const counter = counters[item.id] || 1;
      totalAmount += item.price * counter;
    });

    return convertPriceToCurrency(totalAmount);
  };
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const displayCartSummary = ({
    user,
    cartItems,
    selectedCurrency,
    exchangeRates,
  }) => {
    const cartSummary = {
      userName: user.name,
      userID: user.sub,
      item: cartItems.map((item) => ({
        productId: item.id,
        item: item.title,
        amount: convertPriceToCurrency(item.price * (counters[item.id] || 1)),
      })),
      currency: {
        name: selectedCurrency,
        rate: exchangeRates[selectedCurrency],
      },
    };

    console.log(JSON.stringify(cartSummary, null, 2));
  };

  return (
    <>
      <div className="mx-20 my-16 mobile:m-0 mobile:pt-20 tablet:pt-10">
        <div className="mb-10 flex justify-center">
          <div className="tablet:w-[1200px] mobile:w-[300px] tablet:px-20">
            <p className="tablet:w-[590px] text-zinc-900 text-4xl font-bold mobile:font-semibold leading-10 mobile:leading-normal mb-5 mobile:mb-2.5 mobile:w-[300px] mobile:text-2xl">
              Shopping Bag
            </p>
            <p className="text-slate-500 text-base font-normal leading-tight">
              {totalCounter} items in the shopping bag
            </p>
          </div>
        </div>
        <div className="container mx-auto grid gap-5">
          {cartItems.map((item) => (
            <div className="cart-container flex justify-center" key={item.id}>
              <div className="cart-item tablet:p-5 mobile:p-2.5 bg-slate-50 rounded-md flex  mobile:w-[300px] tablet:w-[600px] laptop:w-[900px] tablet:h-[140px] mobile:h-auto">
                <div className="item-container flex">
                  <div className="item-remove flex align-center mobile:order-2 tablet:order-1">
                    <button
                      onClick={() => removeItem(item.id)}
                      onMouseEnter={() => handleMouseEnter(item.id)}
                      onMouseLeave={() => handleMouseLeave(item.id)}
                    >
                      <Image
                        src={hoverStates[item.id] ? CrossBlue : Cross}
                        alt="Remove"
                        height={24}
                        width={24}
                      />
                    </button>
                  </div>

                  <div className="item-details flex tablet:ml-10 items-center mobile:ml-0 mobile:order-1">
                    {item.thumbnail && (
                      <Image
                        className="tablet:w-36 tablet:h-24 rounded-lg object-cover border border-gray-200 tablet:mr-5 mobile:mr-2.5 flex mobile:w-[53px] mobile:h-[53px]"
                        src={item.thumbnail}
                        alt={item.title}
                        width={140}
                        height={100}
                        priority={true}
                      />
                    )}
                    <div className="item-info mobile:mr-10 tablet:flex mobile:w-10 tablet:w-auto laptop:w-auto">
                      <div className="tablet:mr-10 laptop:mr-0">
                        <div className="Title laptop:w-72 text-slate-800 laptop:text-xl mobile:text-sm laptop:font-bold mobile:font-semibold laptop:leading-relaxed mobile:leading-tight laptop:mb-2.5 mobile:w-[74px] ">
                          {item.title}
                        </div>
                        <div className="Brand/Category laptop:flex gap-2.5 mobile:hidden">
                          <div className="w-auto h-auto px-2.5 py-1 rounded-3xl border border-neutral-300 justify-center items-center gap-1 inline-flex">
                            <p className="text-center text-gray-400 text-xs font-normal leading-3">
                              {item.brand}
                            </p>
                          </div>
                          <div className="w-auto h-auto px-2.5 py-1 rounded-3xl border border-neutral-300 justify-center items-center gap-1 inline-flex">
                            <p className="text-center text-gray-400 text-xs font-normal leading-3">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CartCounter product={item} />
                      </div>
                    </div>

                    <div className="item-price flex laptop:w-60 mobile:w-[120px] mobile:justify-center laptop:justify-end">
                      <p className="laptop:text-zinc-900 laptop:text-xl laptop:font-semibold laptop:leading-7 flex items-center mobile:text-slate-500 mobile:text-sm mobile:font-normal mobile:leading-tight">
                        {convertPriceToCurrency(
                          item.price * (counters[item.id] || 1)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="TotalAmount flex justify-center">
          <div className="Total flex justify-center mt-5 laptop:w-[1200px] mobile:mb-16 laptop:px-20">
            <div className="Total container laptop:flex laptop:justify-between mobile:grid mobile:place-content-center">
              <p className="text-zinc-900 laptop:text-xl mobile:text-sm font-semibold laptop:leading-7 mobile:leading-tight mobile:mb-3 laptop:mb-0">
                Total: {calculateTotalAmount()}
              </p>

              <div className="Buttons laptop:flex laptop:gap-5 mobile:gap-2.5 mobile:grid mobile:md:grid-row-3">
                <div className="mobile:order-3 laptop:order-1">
                  <Link href="/">
                    <button className="laptop:w-auto h-12 px-5 py-4 mobile:w-[300px] text-blue-600 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex hover:bg-blue-600 hover:text-white">
                      Continue shopping
                    </button>
                  </Link>
                </div>

                <div className="mobile:order-2">
                  <Link href="/shopping-cart/place-order">
                    <button
                      className={`laptop:w-auto h-12 px-5 py-4 ${
                        !isAuthenticated ? "text-white" : "text-blue-600"
                      } rounded-3xl ${
                        isAuthenticated
                          ? "border border-blue-600"
                          : "bg-neutral-300"
                      } justify-center items-center gap-1 inline-flex hover:bg-blue-600 hover:text-white mobile:w-[300px]`}
                      disabled={isCartEmpty || !isAuthenticated}
                      onClick={() =>
                        displayCartSummary({
                          user,
                          cartItems,
                          selectedCurrency,
                          exchangeRates,
                        })
                      }
                    >
                      Place order
                    </button>
                  </Link>
                </div>
                {!isAuthenticated && (
                  <div className="w-42 flex items-center mobile:order-1 laptop:order-3">
                    <p className="text-slate-500 text-sm font-normal leading-tight">
                      To place an order,{" "}
                      <a
                        onClick={loginWithRedirect}
                        style={{ color: "blue" }}
                        className="cursor-pointer"
                      >
                        sign in
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
