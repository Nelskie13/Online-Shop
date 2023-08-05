import React, { useState } from "react";
import ButtonCartWhite from "../assets/emptyCartWhite.svg";
import ButtonCartBlue from "../assets/emptyCartBlue.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/remove.svg";
import Image from "next/image";

function ButtonCart() {
  const [isHovered, setIsHovered] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showCounter, setShowCounter] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    if (!isActive) {
      setIsHovered(false);
    }
  };

  const plus = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };
  const minus = (e) => {
    e.preventDefault();
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShowCounter(true);
    setIsActive(true);
  };

  return (
    <div>
      <div>
        <div className="ButtonContainer">
          <button
            className={`CartButton w-${
              showCounter ? "28" : "16"
            } h-8 px-5 py-1 bg-${
              isHovered || isActive ? "white" : "blue-600"
            } rounded-lg justify-center items-center gap-1 inline-flex${
              isActive ? " active ButtonCartBlue" : ""
            }`}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            style={{
              border: `1px solid ${
                isHovered || isActive ? "blue" : "transparent"
              }`,
            }}
            onClick={handleClick}
          >
            {showCounter && (
              <div className={`Counter flex items-center gap-2`}>
                <button onClick={plus}>
                  <Image src={Plus} alt="Logo" height={12} width={12} />
                </button>
                <p className="text-center text-blue-600 text-xs font-normal leading-none">
                  {counter}
                </p>
                <button onClick={minus}>
                  <Image src={Minus} alt="Logo" height={12} width={12} />
                </button>
              </div>
            )}

            <Image
              src={isHovered ? ButtonCartBlue : ButtonCartWhite}
              alt="Logo"
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonCart;
