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
    <div className="flex bg-slate-800 justify-center mobile:fixed">
      <header
        className="navbar h-20 mobile:h-24 bg-slate-800 flex items-center justify-between mobile:items-end mobile:fixed"
        style={{ width: "1200px" }}
      >
        <Link href="/">
          <button className="logo-btn relative left-20 mobile:left-2.5 mobile:mb-5 mobile:top-16 mobile:fixed">
            <Image src={StoreLogo} alt="Logo" />
          </button>
        </Link>

        <nav className="menu-nav relative right-20 mobile:right-2.5 mobile:fixed">
          <ul className="menu-list w-60 h-12 justify-end items-center gap-20 inline-flex left-20">
            <li className="profile-link justify-start items-center gap-8 flex">
              <div className="flex w-80 justify-between items-center mobile:bg-white mobile:relative mobile:top-14 mobile:left-[98px] mobile:h-16">
                <div className="profile-section w-32 mobile:relative mobile:left-[70px]">
                  <Profile />
                </div>
                <div className="signin-section w-28 mobile:w-24 flex justify-center mobile:justify-end mobile:relative mobile:left-14">
                  <button
                    onClick={() => {
                      isAuthenticated ? logout() : loginWithRedirect();
                    }}
                    className={`signin-btn w-${
                      isAuthenticated ? "full" : "24"
                    } h-12 px-5 py-4 mobile:px-2.5 rounded-3xl border border-blue-600 justify-center items-center gap-1 flex mobile:h-10`}
                  >
                    <div className="signin-title text-blue-600 text-base mobile:text-sm font-semibold leading-none mobile:leading-tight">
                      {isAuthenticated ? "Sign Out" : "Sign In"}
                    </div>
                  </button>
                </div>

                <div className="indicator mt-2 w-10 flex justify-center mobile:relative mobile:text-blue-600 mobile:right-[270px] mobile:bottom-1">
                  <Link href="/pages/shopping-cart">
                    <button className="cart-button mobile:border mobile:border-blue-600 mobile:rounded-full mobile:w-10 mobile:h-10">
                      <Badge
                        content={totalCounter}
                        size="sm"
                        className="cart-badge bg-white text-center text-slate-800 mobile:text-[8px] mobile:w-2.5 mobile:h-2.5 border border-none font-semibold leading-3 mobile:bg-blue-600 mobile:text-white mobile:mt-2.5 mobile:mr-1"
                      >
                        <Image
                          src={EmptyCartLogo}
                          alt="Logo"
                          className="mobile:mt-2"
                        />
                      </Badge>
                    </button>
                  </Link>
                </div>
              </div>

              <div className="currency-section w-14">
                <Currency selectedCurrency={currency} dispatched={dispatch} />
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
