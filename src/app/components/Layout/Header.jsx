"use client";
import React, { useState } from "react";
import Image from "next/image";
import StoreLogo from "../../assets/Logo.svg";
import DownLogo from "../../assets/down.svg";
import EmptyCartLogo from "../../assets/emptyCartGray.svg";
import Link from "next/link";
import { Badge } from "@nextui-org/react";

function Header() {
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
            <div className="Frame1077239919 justify-start items-center gap-10 flex">
              <button className="Buttons w-24 h-12 px-5 py-4 rounded-3xl border border-blue-600 justify-center items-center gap-1 inline-flex">
                <div className="Title text-blue-600 text-base font-semibold leading-none">
                  Sign in
                </div>
              </button>

              <div className="indicator mt-2">
                <Link href="/pages/shopping-cart">
                  <button>
                    <Badge
                      content="4"
                      size="sm"
                      className="bg-white text-center text-slate-800 text-xs font-semibold leading-3"
                    >
                      <Image src={EmptyCartLogo} alt="Logo" />
                    </Badge>
                  </button>
                </Link>
              </div>

              <div className=" justify-start items-center gap-1 flex">
                <button className=" w-3 h-3 flex gap-1">
                  <p className="Title text-gray-400 text-base font-bold leading-none">
                    USD
                  </p>
                  <Image src={DownLogo} alt="Logo" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
