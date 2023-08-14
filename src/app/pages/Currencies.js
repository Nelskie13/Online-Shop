import Image from "next/image";
import Down from "../assets/down.svg";
const fixeAPI = process.env.FIXER_API;

export async function getStaticProps() {
  const res = await fetch(
    `http://data.fixer.io/api/latest?access_key=${fixeAPI}`
  );
  const data = await res.json();
  return { props: { currencies: data } };
}

export default function Currencies({ currencies }) {
  const currenciesList = ["USD", "EUR", "PHP", "IDR", "AUD"];
  return (
    <div className="flex">
      <select className="text-gray-400 text-base font-bold leading-none bg-transparent appearance-none border-none outline-none w-14">
        {currenciesList.map((currency) => (
          <option key={currency} value={currency}>
            <div>
              <p className="text-slate-500 text-sm font-normal leading-tight">
                {currency}
              </p>
            </div>
          </option>
        ))}
      </select>
      <Image src={Down} alt="Logo" />
    </div>
  );
}
