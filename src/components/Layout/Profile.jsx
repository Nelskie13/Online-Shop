import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <section className="text-gray-400">Loading...</section>;
  }
  return (
    isAuthenticated && (
      <section className="Profile flex gap-3">
        <img
          src={user.picture}
          alt={user.name}
          height={24}
          width={24}
          className="rounded-full"
        />
        <p className="text-gray-400 text-base font-bold leading-none flex justify-center items-center">
          {user.name}
        </p>
      </section>
    )
  );
}

export default Profile;
