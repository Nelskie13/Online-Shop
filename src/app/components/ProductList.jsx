import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../Redux-store/ProductListSlice";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Shop from "../assets/shop.svg";
import RatingStar from "./RatingStar";
import DownLogo from "../assets/down.svg";
import DownWhiteLogo from "../assets/downWhite.svg";
import ButtonCartWhite from "../assets/emptyCartWhite.svg";
import ButtonCartBlue from "../assets/emptyCartBlue.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/remove.svg";
import Link from "next/link";
import { addToCart, removeFromCart } from "../Redux-store/CartSlice";

export const ButtonCart = ({
  id,
  addToCartTitle,
  addToBagStatus,
  className,
  textHover,
  height,
  width,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCounter, setShowCounter] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(1);
  const addToBag = addToBagStatus;

  const dispatch = useDispatch();
  const increment = () => {
    setCounter((prev) => prev + 1);
  };
  const decrement = () => {
    setCounter((prev) => Math.max(prev - 1, 0));
  };

  const handleHover = () => setIsHovered(true);
  const handleHoverOut = () => !isActive && setIsHovered(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (counter === 0 && showCounter) {
      dispatch(removeFromCart(id));
      setShowCounter(false);
      setIsActive(false);
    } else {
      setShowCounter(true);
      setIsActive(true);
    }
  };

  const buttonWidth = showCounter ? "28" : "16";
  const bgColor = isHovered || isActive ? "white" : "blue-600";
  const borderColor = isHovered || isActive ? "blue" : "transparent";
  const counterDisplayStyle = showCounter ? "block" : "none";
  const addToCartTitleDisplayStyle = showCounter ? "none" : "block";

  return (
    <div className="ButtonContainer">
      <button
        className={`CartButton w-${buttonWidth} bg-${bgColor} ${
          isActive ? "active ButtonCartBlue" : ""
        }  px-4 py-1 rounded-lg justify-center items-center gap-1 inline-flex ${className}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
        style={{ border: `1px solid ${borderColor}` }}
        onClick={(e) => {
          handleClick(e);
          if (onClick) {
            onClick(id);
          }
        }}
      >
        {showCounter && (
          <div
            className={`Counter flex items-center gap-1 ${counterDisplayStyle}`}
          >
            <button className="hover:bg-gray-200 " onClick={increment}>
              <Image src={Plus} alt="Increment" height={height} width={width} />
            </button>
            <p className="text-center text-blue-600 text-xs font-normal leading-none w-3">
              {counter}
            </p>

            <button className="hover:bg-gray-200" onClick={decrement}>
              <Image
                src={Minus}
                alt="Decrement"
                height={height}
                width={width}
              />
            </button>
          </div>
        )}
        {addToBag && (
          <p
            className={`text-white text-base font-normal leading-none ${textHover} `}
            style={{ display: addToCartTitleDisplayStyle }}
          >
            {addToCartTitle}
          </p>
        )}
        <Image
          src={isHovered ? ButtonCartBlue : ButtonCartWhite}
          alt="Logo"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

function ProductList() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => state.productList.data);
  const totalProducts = productListData.length;
  const [gridCount, setGridCount] = useState(6);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);
  const counter = 1;

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (buttonRef1.current &&
          !buttonRef1.current.contains(event.target) &&
          isDropdownOpen1) ||
        (buttonRef2.current &&
          !buttonRef2.current.contains(event.target) &&
          isDropdownOpen2)
      ) {
        setIsDropdownOpen1(false);
        setIsDropdownOpen2(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen1, isDropdownOpen2]);

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    const originalPrice = Math.floor(
      (discountedPrice * 100) / (100 - discountPercentage)
    );
    return originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredProducts = productListData.filter((product) => {
    if (selectedBrand && selectedCategory) {
      return (
        product.brand === selectedBrand && product.category === selectedCategory
      );
    } else if (selectedBrand) {
      return product.brand === selectedBrand;
    } else if (selectedCategory) {
      return product.category === selectedCategory;
    } else {
      return true;
    }
  });

  const clearSearch = () => {
    setSelectedBrand("");
    setSelectedCategory("");
  };

  const handleAddToCart = (product) => {
    if (counter > 0) {
      dispatch(addToCart({ product, count: counter }));
    } else {
      dispatch(removeFromCart(product.id)); // Remove the item from the cart
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-14 gap-96 ">
          <div className="flex items-center">
            <p className="w-96 text-zinc-900 text-4xl font-bold leading-10">
              All goods
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <button
                ref={buttonRef1}
                className={`w-28 h-12 px-5 py-3 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex ${
                  isDropdownOpen1 ? "bg-blue-600" : ""
                }`}
                onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
              >
                <p
                  className={`text-blue-600 text-base font-normal leading-normal ${
                    isDropdownOpen1 ? "text-white" : ""
                  }`}
                >
                  Brands
                </p>
                <Image
                  src={isDropdownOpen1 ? DownWhiteLogo : DownLogo}
                  alt="Logo"
                  className={`${
                    isDropdownOpen1
                      ? "animate-rotate-up"
                      : "animate-rotate-down"
                  }`}
                />
              </button>

              {isDropdownOpen1 && (
                <div className="dropdown absolute top-full left-0 bg-white shadow-md p-2 mt-2 rounded-lg">
                  <ul
                    className="py-2 space-y-2 cursor-pointer"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {[
                      ...new Set(
                        productListData.map((product) => product.brand)
                      ),
                    ].map((brand) => (
                      <li
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className="hover:bg-gray-200"
                      >
                        {brand}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={clearSearch}
                    className="bg-red-500 text-white rounded-md px-2 py-1 font-semibold text-sm hover:bg-red-600 ml-8 mt-2"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                ref={buttonRef2}
                className={`w-36 h-12 px-5 py-3 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex ${
                  isDropdownOpen2 ? "bg-blue-600" : ""
                }`}
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
              >
                <p
                  className={`text-blue-600 text-base font-normal leading-normal ${
                    isDropdownOpen2 ? "text-white" : ""
                  }`}
                >
                  Categories
                </p>
                <Image
                  src={isDropdownOpen2 ? DownWhiteLogo : DownLogo}
                  alt="Logo"
                  className={`${
                    isDropdownOpen2
                      ? "animate-rotate-up"
                      : "animate-rotate-down"
                  }`}
                />
              </button>

              {isDropdownOpen2 && (
                <div className="dropdown absolute top-full left-0 bg-white shadow-md p-2 mt-2 rounded-lg">
                  <ul
                    className="py-2 space-y-2 cursor-pointer"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {[
                      ...new Set(
                        productListData.map((product) => product.category)
                      ),
                    ].map((category) => (
                      <li
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="hover:bg-gray-200"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={clearSearch}
                    className="bg-red-500 text-white rounded-md px-2 py-1 font-semibold text-sm hover:bg-red-600 ml-8 mt-2"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: "repeat(3, 320px)",
            gridTemplateRows: "341px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
            marginTop: "40px",
          }}
        >
          {filteredProducts.slice(0, gridCount).map((product) => (
            <Link key={product.id} href={`/pages/product/${product.id}`}>
              <div
                key={product.id}
                className="w-80 h-84 rounded-md border border-gray-200 grid grid-rows-2 cursor-pointer"
              >
                <Image
                  src={product.thumbnail}
                  width={320}
                  height={165}
                  alt={product.title}
                  className="h-44 rounded-t-md object-cover"
                />

                <div className="h-44 px-5 py-2.5 bg-slate-50 rounded-b-md hover:bg-cyan-100">
                  <div className="h-6 text-zinc-900 text-xl font-bold leading-tight">
                    <span className="line-clamp-1">{product.title}</span>
                  </div>
                  <div className=" h-10 text-slate-500 text-xs font-normal leading-tight">
                    <span className="line-clamp-2 my-2">
                      {product.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 border-b border-gray-400 pb-2">
                    <p className="text-zinc-900 text-xl font-semibold leading-7">
                      ${product.price}
                    </p>
                    <p className="text-slate-500 text-xs font-normal line-through leading-none">
                      $
                      {calculateOriginalPrice(
                        product.price,
                        product.discountPercentage
                      )}
                    </p>
                    <div className="w-16 h-6 px-2.5 py-1 bg-orange-400 rounded-2xl justify-start items-start gap-2.5 flex justify-center items-center">
                      <p className="text-white text-xs font-semibold leading-none">
                        -{product.discountPercentage}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <div className="flex">
                      <RatingStar rating={product.rating} size={12} />
                      <p
                        className="text-center text-gray-400 text-xs font-normal leading-3 "
                        style={{ marginTop: "1px", marginLeft: "4px" }}
                      >
                        {product.rating}
                      </p>
                    </div>

                    <div className="flex">
                      <Image src={Shop} alt="Logo" />
                      <p className="text-gray-400 text-xs font-normal leading-3 flex items-center">
                        {product.stock}
                      </p>
                    </div>

                    <div className="ButtonCart flex ml-auto">
                      <ButtonCart
                        height="18"
                        width="18"
                        onClick={(counter) => handleAddToCart(product, counter)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mb-14">
          <button
            className="w-30 h-12 px-5 py-4 bg-blue-600 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex"
            onClick={() => setGridCount((prev) => prev + 6)}
            disabled={gridCount >= totalProducts}
          >
            <p className="text-white text-base font-normal leading-none">
              {gridCount >= totalProducts ? "No more goods" : "Load more"}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductList;
