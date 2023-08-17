"use client";
import Image from "next/image";
import StoreLogo from "../../assets/Logo.svg";
import EmptyCartLogo from "../../assets/emptyCartGray.svg";
import Link from "next/link";
import { Badge } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import Currency from "../Currency";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const counters = useSelector((state) => state.counters);
  const totalCounter = cartItems.reduce(
    (total, item) => total + (counters[item.id] || 1),
    0
  );
  const currency = useSelector((state) => state.currencies.data.rates);
  const dispatch = useDispatch();

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="navbar w-full h-20 bg-slate-800 flex items-center justify-between">
        <Link href="/">
          <button className="relative left-20 ">
            <Image src={StoreLogo} alt="Logo" />
          </button>
        </Link>

        <div className="relative right-20">
          <div className="Menu w-60 h-12 justify-end items-center gap-20 inline-flex left-20">
            <div className="Frame1077239919 justify-start items-center gap-8 flex">
              <div className="Profile w-32">
                <Profile />
              </div>
              <div className="SignIn w-28 flex justify-center">
                <button
                  onClick={() => {
                    isAuthenticated ? logout() : loginWithRedirect();
                  }}
                  className={`Buttons w-${
                    isAuthenticated ? "full" : "24"
                  } h-12 px-5 py-4 rounded-3xl border border-blue-600 justify-center items-center gap-1 flex`}
                >
                  <div className="Title text-blue-600 text-base font-semibold leading-none">
                    {isAuthenticated ? "Sign Out" : "Sign In"}
                  </div>
                </button>
              </div>

              <div className="indicator mt-2 w-10 flex justify-center">
                <Link href="/pages/shopping-cart">
                  <button>
                    <Badge
                      content={totalCounter}
                      size="sm"
                      className="bg-white text-center text-slate-800 text-xs font-semibold leading-3"
                    >
                      <Image src={EmptyCartLogo} alt="Logo" />
                    </Badge>
                  </button>
                </Link>
              </div>

              <div className="Currency w-14">
                <Currency selectedCurrency={currency} dispatched={dispatch} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
