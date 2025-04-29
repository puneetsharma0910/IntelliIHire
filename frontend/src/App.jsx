import "./Login.css";
import Landingpage from "./Pages/Landingpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Homepage from "./Pages/Homepage";
import Homepage_Admin from "./Pages/Homepage_Admin";
import Profile_Page from "./Pages/Profile_Page";
import FindWork from "./Pages/FindWork";
import DeliverWork from "./Pages/DeliverWork";
import PostJob from "./components/Homepage/PostJob";
import Navbar from "./components/Homepage/Navbar";
import Home from "./components/Homepage/Home";
import Jobs from "./components/Homepage/Jobs";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homepage" element={<Jobs />} />
          <Route path="/homepage_admin" element={<Homepage_Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile_page" element={<Profile_Page />} />
          <Route path="/find-work" element={<FindWork />} />
          <Route path="/deliver-work" element={<DeliverWork />} />
          <Route path="/post-job" element={<PostJob />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
