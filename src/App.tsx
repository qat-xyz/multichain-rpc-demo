import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Background } from "./components/Background";
import { ROUTES } from "./constants/ROUTES";
import { ConnectionProvider } from "./providers/ConnectionProvider";
import { theme } from "./theme";

const router = createBrowserRouter(ROUTES);

export const App = () => (
  <ConnectionProvider>
    <ChakraProvider theme={theme}>
      <Background />
      <RouterProvider router={router} />
    </ChakraProvider>
  </ConnectionProvider>
);
