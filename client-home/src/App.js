import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Community from "./pages/community/Community";
import StudentDir from "./pages/studentdir/StudentDir";
import AboutSchool from "./pages/school/AboutSchool";
import SchoolEvents from "./pages/schoolevents/SchoolEvents";
import CraftMarket from "./pages/craftmarket/CraftMarket";
import CommuDetail from "./pages/commudetail/CommuDetail";
import DirDetails from "./pages/DirDetails/DirDetails";
import SchoolAch from "./pages/ach/SchoolAch";
import SchDetail from "./pages/schdetail/SchDetail";
import Orders from "./pages/orders/Orders";
import Quotes from "./pages/quotes/Quotes";
import ManageOrder from "./pages/manageorder/ManageOrder";
import RegRequest from "./pages/regrequest/RegRequest";
import ReportedPost from "./pages/reportedPost/ReportedPost";
import AddProducts from "./pages/addproducts/AddProducts";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const ProtectedLogRegPage = ({children}) => {
    if(currentUser != null) {
      return <Navigate to="/home" />
    }
    return children;
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/community",
          element: <Community />,
        },
        {
          path: "/community/:id",
          element: <CommuDetail />,
        },
        {
          path: "/student-directory",
          element: <StudentDir />,
        },
        {
          path: "/student-directory/:id",
          element: <DirDetails />,
        },
        {
          path: "/about-school",
          element: <AboutSchool />,
        },
        {
          path: "/school-detail/:id",
          element: <SchDetail/>,
        },
        {
          path: "/school-events",
          element: <SchoolEvents />,
        },
        {
          path: "/craft-market",
          element: <CraftMarket />,
        },
        {
          path: "/craft-market/:id",
          element: <Orders />,
        },
        {
          path: "/achievement",
          element: <SchoolAch />,
        },
        {
          path: "/manage-order",
          element: <ManageOrder />,
        },
        {
          path: "/registration-request",
          element: <RegRequest />,
        },
        {
          path: "/reported-post",
          element: <ReportedPost />,
        },
        {
          path: "/add-products",
          element: <AddProducts />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedLogRegPage>
          <Login />
        </ProtectedLogRegPage>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedLogRegPage>
          <Register />
        </ProtectedLogRegPage>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
