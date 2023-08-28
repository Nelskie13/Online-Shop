const KEY = process.env.NEXT_PUBLIC_FIXER_API_KEY;

export default async function Currencies(req, res) {
  try {
    const response = await fetch(
      `http://data.fixer.io/api/latest?access_key=${KEY}&symbols=USD,EUR,PHP,IDR,AUD&format=1`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
