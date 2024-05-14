import React, { FunctionComponent, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import Root from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Signin from "@/views/Signin.tsx";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useAuth } from "./hooks/useAuth.ts";
import HomeView from "./views/Home.tsx";
import App from "./App.tsx";

// interface UnauthenticatedRouteProps {
//   children: ReactNode;
// }

// const UnauthenticatedRoute: FunctionComponent<UnauthenticatedRouteProps> = ({
//   children,
// }) => {
//   const { auth } = useAuth();
//   return !auth ? children : <Navigate to={"/home"} />;
// };

// interface AuthenticatedRouteProps {
//   children: ReactNode;
// }

// const AuthenticatedRoute: FunctionComponent<AuthenticatedRouteProps> = ({
//   children,
// }) => {
//   const { auth } = useAuth();

//   return auth ? children : <Navigate to={"/signin"} />;
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "signin",
//         element: (
//           <UnauthenticatedRoute>
//             <Signin />
//           </UnauthenticatedRoute>
//         ),
//       },
//       {
//         path: "home",
//         element: (
//           <AuthenticatedRoute>
//             <HomeView />
//           </AuthenticatedRoute>
//         ),
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={router} /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
