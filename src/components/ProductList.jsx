import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../Redux-store/ProductListSlice";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Shop from "@/assets/shop.svg";
import RatingStar from "./Icons/RatingStar";
import DownLogo from "@/assets/down.svg";
import DownWhiteLogo from "@/assets/downWhite.svg";
import Link from "next/link";
import ButtonCart from "./Icons/ButtonCart";

function ProductList() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => state.productList.data);
  const totalProducts = productListData.length;
  const [gridCount, setGridCount] = useState(6);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const selectedCurrency = useSelector(
    (state) => state.currencies.selectedCurrency
  );
  const exchangeRates = useSelector((state) => state.currencies.data.rates);
  const buttonRef1 = useRef(null);
  const buttonRef2 = useRef(null);

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

  const BrandCategoryFiltering = ({ isCounterActive }) => {
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const buttonRef1 = useRef(null);
    const buttonRef2 = useRef(null);

    const clearBrand = () => {
      setSelectedBrand("");
    };

    const clearCategory = () => {
      setSelectedCategory("");
    };

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

    return (
      <div className="flex gap-3">
        <>
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
                isDropdownOpen1 && !isCounterActive ? "animate-rotate-up" : ""
              }`}
            />
          </button>

          {isDropdownOpen1 && (
            <div className="dropdown absolute top-[190px] bg-white shadow-md p-2 mt-2 rounded-lg">
              <ul className="py-2 space-y-2 cursor-pointer w-36 overflow-y-auto max-h-52">
                {[
                  ...new Set(productListData.map((product) => product.brand)),
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
                onClick={clearBrand}
                className="bg-red-500 text-white rounded-md px-2 py-1 font-semibold text-sm hover:bg-red-600 ml-8 mt-2"
              >
                Reset
              </button>
            </div>
          )}
        </>

        <>
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
                isDropdownOpen2 && !isCounterActive ? "animate-rotate-up" : ""
              }`}
            />
          </button>

          {isDropdownOpen2 && (
            <div className="dropdown absolute top-[190px] bg-white shadow-md p-2 mt-2 rounded-lg">
              <ul className="py-2 space-y-2 cursor-pointer overflow-y-auto max-h-52 w-36">
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
                onClick={clearCategory}
                className="bg-red-500 text-white rounded-md px-2 py-1 font-semibold text-sm hover:bg-red-600 ml-8 mt-2"
              >
                Reset
              </button>
            </div>
          )}
        </>
      </div>
    );
  };

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    const originalPrice = Math.floor(
      (discountedPrice * 100) / (100 - discountPercentage)
    );
    return originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  return (
    <div className="flex justify-center mobile:pt-10 tablet:pt-0">
      <div className="inline-block">
        <section className="flex justify-center mt-14 mobile:hidden tablet:block">
          <div className="flex justify-between w-auto">
            <p className="text-zinc-900 text-4xl font-bold leading-10">
              All goods
            </p>
            <BrandCategoryFiltering />
          </div>
        </section>

        <main className="grid justify-center mb-10 mobile:mt-16 tablet:mt-8 mobile:gap-5 tablet:gap-10 mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3">
          {filteredProducts.slice(0, gridCount).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div
                key={product.id}
                className="h-[341px] rounded-md border border-gray-200 grid grid-rows-2 cursor-pointer mobile:w-[300px] tablet:w-80 laptop:w-80"
              >
                <Image
                  src={product.thumbnail}
                  width={320}
                  height={165}
                  alt={product.title}
                  className="h-44 rounded-t-md object-cover mobile:w-full tablet:w-full"
                  priority={true}
                />

                <div className="h-[169px] px-5 py-2.5 bg-slate-50 rounded-b-md hover:bg-cyan-100 mobile:w-full tablet:w-full laptop:w-full">
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
                      {convertPriceToCurrency(product.price, selectedCurrency)}
                    </p>
                    <p className="text-slate-500 text-xs font-normal line-through leading-none">
                      {convertPriceToCurrency(
                        calculateOriginalPrice(
                          product.price,
                          product.discountPercentage
                        ),
                        selectedCurrency
                      )}
                    </p>
                    <div className="w-16 h-6 px-2.5 py-1 bg-orange-400 rounded-2xl gap-2.5 flex justify-center items-center">
                      <p className="text-white text-xs font-semibold leading-none">
                        -{product.discountPercentage}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2.5">
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
                        product={product}
                        textSize={"xs"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </main>

        <section className="flex justify-center mb-14">
          <button
            className="h-12 px-5 py-4 bg-blue-600 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex mobile:w-[300px] tablet:w-32"
            onClick={() => setGridCount((prev) => prev + 6)}
            disabled={gridCount >= totalProducts}
          >
            <p className="text-white text-base font-normal leading-none">
              {gridCount >= totalProducts ? "No more goods" : "Load more"}
            </p>
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProductList;
