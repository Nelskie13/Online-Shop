"use client";

import { Provider } from "react-redux";
import store from "./store";
import { NextUIProvider } from "@nextui-org/react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

function Providers({ children }) {
  const auth0Config = {
    domain: domain,
    clientId: clientId,
    authorizationParams: {},
  };

  if (typeof window !== "undefined") {
    auth0Config.authorizationParams.redirect_uri = window.location.origin;
  }

  return (
    <Auth0Provider {...auth0Config}>
      <Provider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </Provider>
    </Auth0Provider>
  );
}

export default Providers;
