import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../Redux-store/ProductListSlice";
import { useEffect } from "react";
import Image from "next/image";
import ButtonCart from "../assets/ButtonsCart.svg";
import Shop from "../assets/shop.svg";
import RatingStar from "./RatingStar";

function ProductList() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => state.productList.data);

  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    const originalPrice = Math.floor(
      (discountedPrice * 100) / (100 - discountPercentage)
    );
    return originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div>
        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: "repeat(3, 320px)",
            gridHeight: "341px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          {productListData.map((product) => (
            <div
              key={product.id}
              className="w-80 h-84 rounded-md border border-gray-200 grid grid-rows-2"
            >
              <Image
                src={product.thumbnail}
                width={320}
                height={165}
                alt="Logo"
                className="h-44 rounded-t-md object-cover"
              />

              <div className="h-44 px-5 py-2.5 bg-slate-50 rounded-b-md ">
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
                    <RatingStar rating={product.rating} />
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

                  <div className="flex ml-auto">
                    <button>
                      <Image src={ButtonCart} alt="Logo" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
