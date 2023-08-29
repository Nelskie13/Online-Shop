import React from "react";
import SocialLogo from "@/assets/Social.svg";
import Image from "next/image";

function Footer() {
  return (
    <div className="flex justify-center bg-zinc-900">
      <footer className="mobile:w-auto tablet:w-[1200px] h-44 mobile:h-52 tablet:h-44 mobile:px-4 tablet:px-20 mobile:py-10 tablet:py-14 bg-zinc-900 justify-between mobile:inline-block tablet:inline-flex">
        <section className="flex-col justify-start items-start gap-2.5 inline-flex">
          <h2 className="text-white text-xs font-normal leading-none mobile:text-gray-400 tablet:text-white">
            Follow Us
          </h2>
          <div className="SocialLogo">
            <Image src={SocialLogo} alt="Logo" />
          </div>
        </section>
        <section className="items-start gap-2.5 inline-flex mobile:pt-10 tablet:pt-0">
          <div className="PrivacyPolicy opacity-40 text-white text-xs font-normal leading-none">
            Privacy Policy{" "}
          </div>
          <span className=" opacity-40 text-white text-xs font-normal leading-none">
            ·
          </span>
          <div className="TermsOfUse opacity-40 text-white text-xs font-normal leading-none">
            Terms of Use
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
