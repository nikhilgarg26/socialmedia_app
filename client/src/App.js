import { useContext } from "react";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
// import CardExampleLinkCard from "./card";
// import { Container } from "semantic-ui-react";

function App() {
  const { user } = useContext(Context);
  // console.log("success " , user);

  return (
    <Router>
      {user ? <Topbar /> : null}
    
      <Routes>
        <Route exact path="/" element={ user?<Home/>:<Login />} />
        <Route path="/login" element={ user?<Home/>:<Login />} />
        <Route path="/register" element={ user?<Home/>:<Register />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Router>

  );
}

export default App;
