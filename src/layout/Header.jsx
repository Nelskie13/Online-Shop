import React from "react";
import Image from "next/image";
import StoreLogo from "../assets/Logo.svg";
import DownLogo from "../assets/down.svg";
import EmptyCartLogo from "../assets/empty.svg";

function Header() {
  return (
    <>
      <div className="Bg w-full h-20 bg-slate-800 flex items-center justify-between">
        <div className="relative left-20 ">
          <Image src={StoreLogo} alt="Logo" />
        </div>

        <div className="relative right-20">
          <div className="Menu w-60 h-12 justify-end items-center gap-20 inline-flex left-20">
            <div className="Frame1077239919 justify-start items-center gap-10 flex">
              <div className="Buttons w-24 h-12 px-5 py-4 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex">
                <div className="Title text-blue-600 text-base font-semibold leading-none">
                  Sign in
                </div>
              </div>

              <div className="Icon24pxShopingCartEmpty w-6 h-6 relative">
                <Image src={EmptyCartLogo} alt="Logo" />
              </div>

              <div className="Frame1077240874 justify-start items-center gap-1 flex">
                <div className="Title text-gray-400 text-base font-bold leading-none">
                  USD
                </div>
                <div className="Icon12ArrowDown w-3 h-3 relative">
                  <Image src={DownLogo} alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
