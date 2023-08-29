import Image from "next/image";
import StoreLogo from "@/assets/Logo.svg";
import EmptyCartLogo from "@/assets/emptyCartGray.svg";
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
    <div className="flex bg-slate-800 justify-center">
      <header className="mobile:w-auto tablet:w-[1200px] bg-slate-800 tablet:px-20 mobile:h-24 tablet:h-20 flex justify-between mobile:items-end tablet:items-center">
        <Link href="/">
          <button className="logo-btn mobile:left-2.5 tablet:left-0 mobile:mb-5 tablet:mb-0 mobile:top-16 tablet:top-0">
            <Image src={StoreLogo} alt="Logo" />
          </button>
        </Link>

        <nav className="menu-list w-60 h-12 justify-end items-center gap-20 inline-flex ">
          <div className="profile-link justify-start items-center gap-8 flex">
            <div className="flex justify-start items-center gap-8 mobile:relative mobile:top-20 tablet:top-0 mobile:left-[60px] tablet:left-0">
              <div className="profile-section w-32 mobile:relative mobile:left-[70px] tablet:left-0">
                <Profile />
              </div>
              <div className="signin-section tablet:w-28 mobile:w-24 flex tablet:justify-center mobile:justify-end mobile:relative mobile:left-14 tablet:left-0">
                <button
                  onClick={() => {
                    isAuthenticated ? logout() : loginWithRedirect();
                  }}
                  className={`signin-btn w-${
                    isAuthenticated ? "full" : "24"
                  } tablet:h-12 tablet:px-5 py-4 mobile:px-2.5 rounded-3xl border border-blue-600 justify-center items-center gap-1 flex mobile:h-10`}
                >
                  <div className="signin-title text-blue-600 tablet:text-base mobile:text-sm font-semibold tablet:leading-none mobile:leading-tight">
                    {isAuthenticated ? "Sign Out" : "Sign In"}
                  </div>
                </button>
              </div>

              <div className="indicator mt-2 w-10 flex tablet:justify-center mobile:relative mobile:right-[270px] tablet:right-0 mobile:bottom-1 tablet:bottom-0">
                <Link href="/shopping-cart">
                  <button className="cart-button mobile:border mobile:border-blue-600 mobile:rounded-full mobile:w-10 mobile:h-10 tablet:border-0 tablet:border-transparent tablet:rounded-none tablet:w-auto tablet:h-auto">
                    {/* Content */}
                    <Badge
                      content={totalCounter}
                      size="sm"
                      className="cart-badge bg-white text-center text-slate-800 mobile:text-[8px] tablet:text-[10px] mobile:w-2.5 tablet:w-4 mobile:h-2.5 tablet:h-4 border border-none font-semibold leading-3 mobile:bg-blue-600 tablet:bg-white mobile:text-white tablet:text-black mobile:mt-2.5 tablet:mt-0 mobile:mr-1 tablet:mr-0"
                    >
                      <Image
                        src={EmptyCartLogo}
                        alt="Logo"
                        className="mobile:mt-2 tablet:mt-0"
                      />
                    </Badge>
                  </button>
                </Link>
              </div>
            </div>

            <div className="currency-section w-14">
              <Currency selectedCurrency={currency} dispatched={dispatch} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
