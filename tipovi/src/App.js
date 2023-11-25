import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { register, setUser } from "./redux/features/authSlice";
import Header from "./components/Header";
import Register from "./pages/Register";
import AddEditTip from "./pages/AddEditTip";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./pages/Error";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header>
          <ToastContainer />
        </Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/addTips" element={<AddEditTip></AddEditTip>}></Route>
          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
