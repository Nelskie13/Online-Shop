import React from "react";

const Star = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M2.9125 11L3.725 7.4875L1 5.125L4.6 4.8125L6 1.5L7.4 4.8125L11 5.125L8.275 7.4875L9.0875 11L6 9.1375L2.9125 11Z"
      fill="#D1E31E"
    />
  </svg>
);

const StarOutlined = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M3.6659 9.96159L4.21214 7.60018L4.27998 7.3069L4.05253 7.10971L2.22002 5.52098L4.64324 5.31063L4.9433 5.28458L5.06056 5.00715L6 2.78436L6.93944 5.00715L7.0567 5.28458L7.35676 5.31063L9.77998 5.52098L7.94747 7.10971L7.72002 7.3069L7.78786 7.60018L8.33409 9.96159L6.25827 8.70937L6 8.55357L5.74173 8.70937L3.6659 9.96159Z"
      stroke="#D1E31E"
    />
  </svg>
);

function RatingStar({ rating, size }) {
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star

  // Create an array to store the full stars
  const starsArray = Array(fullStars)
    .fill()
    .map((_, index) => (
      <div key={`fullStar-${index}`}>
        <Star size={size} />
      </div>
    ));

  // Add the half-star if it's required
  if (hasHalfStar) {
    starsArray.push(
      <div key="halfStar">
        <Star size={size} />
      </div>
    );
  }

  // Fill the rest with outlined stars (total 5 stars in the array)
  const totalStars = 5;
  while (starsArray.length < totalStars) {
    starsArray.push(
      <div key={`outlinedStar-${starsArray.length}`}>
        <StarOutlined size={size} />
      </div>
    );
  }

  return <div className="flex items-center">{starsArray}</div>;
}

export default RatingStar;
