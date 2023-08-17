"use client";

import { Provider } from "react-redux";
import store from "./store";
import { NextUIProvider } from "@nextui-org/react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "online-shop-app.us.auth0.com";
const clientId = "b3RVumk3fDz15pvcVdgS0jktx3jDF3py";

function Providers({ children }) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </Provider>
    </Auth0Provider>
  );
}

export default Providers;
