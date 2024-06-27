import AppLayout from "@/components/layout/app-layout";
import AuthLayout from "@/components/layout/auth-layout";
import AuthenticatedContextProvider from "@/context/authenticated-context";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Notes from "@/pages/notes";
import ArchivedNotes from "@/pages/notes/sub-pages/archived";
import NewNotes from "@/pages/notes/sub-pages/new";
import Note from "@/pages/note";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: (
      <AuthenticatedContextProvider>
        <AppLayout />
      </AuthenticatedContextProvider>
    ),
    children: [
      {
        path: "/notes",
        element: <Notes />,
        children: [
          {
            index: true,
            element: <NewNotes />,
          },
          {
            path: "archived",
            element: <ArchivedNotes />,
          },
        ],
      },
    ],
  },
  {
    path: "/note/view/:noteId",
    element: <Note />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/notes" replace={true} />,
  },
]);

export default function WebRouter() {
  return <RouterProvider router={router} />;
}
