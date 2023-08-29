import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../Redux-store/ProductDetailsSlice";
import Image from "next/image";
import RatingStar from "./Icons/RatingStar";
import ButtonCart from "./Icons/ButtonCart";
import { useRouter } from "next/router";

function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.productDetails);
  const selectedCurrency = useSelector(
    (state) => state.currencies.selectedCurrency
  );
  const exchangeRates = useSelector((state) => state.currencies.data.rates);

  useEffect(() => {
    // Check if the id exists and is not undefined
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching product details</div>;
  }

  // Check if the data exists before accessing its properties
  if (!data) {
    return <div>Product not found</div>;
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = data;

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
    <div className="flex justify-center mobile:pt-24 tablet:pt-0 tablet:pb-8 laptop:mb-8">
      <div className="flex tablet:inline-flex tablet:justify-center mobile:inline-block tablet:w-[1200px] mobile:w-[320px]">
        <div
          className="grid tablet:gap-4 mobile:gap-[102px] tablet:ml-20 tablet:my-16 mobile:m-3 mobile:w-[300px] mobile:h-[191px] laptop:w-[500px] laptop:h-80"
          style={{
            gridTemplateColumns: "500px",
          }}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={500}
            height={320}
            priority={true}
            className="rounded-lg object-fill h-80 border border-gray-200 mobile:w-[300px] mobile:h-[191px] laptop:w-[500px] laptop:h-80"
          />

          <div
            className="grid laptop:gap-10 mobile:gap-[11px] mobile:w-[93px] mobile:h-[93px] laptop:w-[140px] laptop:h-[140px] mobile:inline-flex"
            style={{
              gridTemplateColumns: "repeat(auto-fill, 140px)",
            }}
          >
            {images.slice(0, 3).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={title}
                width={140}
                height={140}
                priority={true}
                className="rounded-md object-cover border h-[140px] border-gray-200 mobile:w-[93px] mobile:h-[93px] laptop:w-[140px] laptop:h-[140px]"
              />
            ))}
          </div>
        </div>

        <div className="tablet:ml-10 tablet:my-16 mobile:mx-3 mobile:my-3 mobile:relative mobile:top-52 tablet:top-0 mobile:pb-20 tablet:pb-0">
          <div className="text-zinc-900 tablet:text-3xl mobile:text-2xl tablet:font-bold mobile:font-semibold leading-10 mb-2.5 mobile:relative mobile:bottom-2.5 tablet:bottom-0 mobile:overflow-x-auto tablet:title-no-overflow-x mobile:whitespace-nowrap tablet:whitespace-normal mobile:w-[300px] tablet:h-auto">
            {title}
          </div>
          <div className="tablet:w-72 text-slate-500 tablet:text-base mobile:text-sm font-normal leading-normal mobile:leading-tight mb-4 mobile:relative mobile:bottom-2.5 mobile:overflow-y-auto tablet:text-no-overflow-y mobile:h-9 tablet:h-auto mobile:w-full">
            {description}
          </div>

          <div className="flex mb-4 mobile:relative mobile:bottom-3.5">
            <RatingStar rating={rating} size={24} />
            <p className="text-center text-gray-400 text-base font-normal leading-normal ml-1">
              {rating}
            </p>
          </div>

          <div className="flex items-center gap-2 mb-5 mobile:mb-1 mobile:relative mobile:bottom-[348px] tablet:bottom-0">
            <p className="text-zinc-900 text-4xl mobile:text-2xl font-bold mobile:font-semibold leading-10 mobile:leading-normal">
              {convertPriceToCurrency(price, selectedCurrency)}
            </p>
            <p className="text-slate-500 text-xs mobile:text-sm font-normal line-through leading-none mobile:leading-tight">
              {convertPriceToCurrency(
                calculateOriginalPrice(price, discountPercentage),
                selectedCurrency
              )}
            </p>
            <div className="w-20 h-8 mobile:h-7 px-2.5 py-1 bg-orange-400 rounded-2xl gap-2.5 flex justify-center items-center">
              <p className="text-white text-base mobile:text-sm font-normal leading-normal mobile:leading-tight">
                -{discountPercentage}%
              </p>
            </div>
          </div>

          <div className="tablet:w-80 mobile:w-[300px] h-24 flex-col gap-2.5 inline-flex text-slate-500 tablet:text-base mobile:text-sm font-normal leading-normal mobile:relative mobile:bottom-16 tablet:bottom-0">
            <p>In stock: {stock}</p>
            <p>Brand: {brand}</p>
            <p>Category: {category}</p>
          </div>

          <div className="mt-10 mobile:w-[300px] mobile:relative mobile:bottom-[485px] tablet:bottom-0">
            <ButtonCart
              addToCartTitle={"Add to bag"}
              addToBagStatus={true}
              className="tablet:w-36 tablet:h-14 mobile:h-11 mobile:w-[300px]"
              textSize={"base"}
              height={24}
              width={24}
              product={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
