import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/features/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import AddEditTip from "./pages/AddEditTip";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Helmet } from "react-helmet";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="AppWrapper">
          <Helmet>
            <title>Besplatni Tipovi</title>
          </Helmet>
          <Header></Header>
          <ToastContainer position="top-right" theme="dark" />
          <div className="AppContent">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
              <Route
                path="/addTips"
                element={<AddEditTip></AddEditTip>}
              ></Route>
              <Route path="/editTip/:id" element={<AddEditTip></AddEditTip>} />
              <Route
                path="/dashboard"
                element={<Dashboard></Dashboard>}
              ></Route>
              <Route path="*" element={<Error></Error>}></Route>
            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
