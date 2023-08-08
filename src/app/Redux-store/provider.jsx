"use client";

import { Provider } from "react-redux";
import store from "./store";
import { NextUIProvider } from "@nextui-org/react";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
}

export default Providers;
