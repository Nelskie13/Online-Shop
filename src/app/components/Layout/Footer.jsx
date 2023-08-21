import React from "react";
import SocialLogo from "../../assets/Social.svg";
import Image from "next/image";

function Footer() {
  return (
    <div className="flex justify-center bg-zinc-900 ">
      <footer
        className="Footer h-44 mobile:h-52 px-20 py-14 mobile:px-4 mobile:py-10 bg-zinc-900  items-start inline-flex justify-between mobile:inline-block"
        style={{ width: "1200px" }}
      >
        <section className="Frame12345625 self-stretch flex-col justify-start items-start gap-2.5 inline-flex">
          <h2 className="FollowUs text-white text-xs font-normal leading-none mobile:text-gray-400">
            Follow Us
          </h2>
          <div className="SocialLogo">
            <Image src={SocialLogo} alt="Logo" />
          </div>
        </section>
        <section className="Legality self-stretch justify-start items-start gap-2.5 inline-flex mobile:pt-10">
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
