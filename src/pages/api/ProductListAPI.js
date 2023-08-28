export default async function ProductListAPI(req, res) {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await response.json();
    res.status(200).json(data.products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
