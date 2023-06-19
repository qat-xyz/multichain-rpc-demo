import { Documentation } from "../routes/Documentation";
import { Home } from "../routes/Home";

export const ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/documentation",
    element: <Documentation />,
  },
];
