import React from "react";
import SocialLogo from "../assets/Social.svg";
import Image from "next/image";

function Footer() {
  return (
    <>
      <div className="Footer w-full h-44 px-20 py-14 bg-zinc-900 justify-center items-start inline-flex justify-between">
        <div className="Frame12345625 self-stretch flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="FollowUs text-white text-xs font-normal leading-none">
            Follow Us
          </div>
          <div className="SocialLogo">
            <Image src={SocialLogo} alt="Logo" />
          </div>
        </div>
        <div className="Legality self-stretch justify-start items-start gap-2.5 inline-flex">
          <div className="PrivacyPolicy opacity-40 text-white text-xs font-normal leading-none">
            Privacy Policy{" "}
          </div>
          <div className=" opacity-40 text-white text-xs font-normal leading-none">
            ·
          </div>
          <div className="TermsOfUse opacity-40 text-white text-xs font-normal leading-none">
            Terms of Use
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
