import React, { useEffect, useState } from "react";
import Image from "next/image";
import Down from "@/assets/down.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "@/Redux-store/CurrenciesSlice";
import { setSelectedCurrency } from "@/Redux-store/CurrenciesSlice";

function Currency() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("selectedCurrency") || "USD"
      : "USD"
  );

  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencies.data.rates);

  useEffect(() => {
    dispatch(fetchCurrencies()); // Dispatch the async thunk
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrencies(currency);
    setIsDropdownOpen(false);
    dispatch(setSelectedCurrency(currency)); // Dispatch the action to update selectedCurrency in the Redux store
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCurrency", currency); // Store selected currency in localStorage
    }
  };

  return (
    <div className="flex">
      <section
        className={`relative ${isDropdownOpen ? "z-10" : ""} inline-block`}
      >
        <button
          type="button"
          className="text-gray-400 text-base font-bold leading-none bg-transparent appearance-none border-none outline-none"
          onClick={toggleDropdown}
        >
          <p className="text-gray-400 text-base font-bold leading-none">
            {selectedCurrencies}
          </p>
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-white border border-gray-300 mt-1 p-2.5 rounded shadow-lg">
            <ul>
              {Object.keys(currencies).map((currencyCode) => (
                <li key={currencyCode}>
                  <button
                    type="button"
                    className="text-slate-400 text-sm font-normal leading-tight hover:text-blue-600"
                    onClick={() => handleCurrencyChange(currencyCode)}
                  >
                    {currencyCode}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <Image
        src={Down}
        alt="Logo"
        className={`${isDropdownOpen ? "animate-rotate-up" : ""} ml-2`}
      />
    </div>
  );
}

export default Currency;
