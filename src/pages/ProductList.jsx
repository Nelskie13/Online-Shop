import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../app/redux/ProductListSlice";
import { useEffect } from "react";
import Image from "next/image";
import ButtonCart from "../assets/ButtonsCart.svg";

function ProductList() {
  const dispatch = useDispatch();
  const productListData = useSelector((state) => state.productList.data);
  const isLoading = useSelector((state) => state.productList.loading);
  const error = useSelector((state) => state.productList.error);

  // Dispatch the fetchProductList action in getServerSideProps.
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-3 gap-4">
        {productListData.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-md rounded-md">
            <div>
              <Image
                src={product.thumbnail}
                width={100}
                height={100}
                alt="Logo"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-gray-600">
              Price: ${product.price} {product.discountPercentage}
            </p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <button>
              <Image src={ButtonCart} alt="Logo" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export getServerSideProps from the same file to use in the Next.js server-side rendering.
export async function getServerSideProps() {
  try {
    // Fetch data from the API and return it as props.
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    return {
      props: {
        productListData: data.products,
      },
    };
  } catch (error) {
    // In case of an error, return an empty data array.
    return {
      props: {
        productListData: [],
      },
    };
  }
}

export default ProductList;
