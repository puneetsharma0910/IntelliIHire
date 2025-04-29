// src/Navbar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user type
        const profileResponse = await axios.get("/api/profile");
        setUserType(profileResponse.data.profile.userType);

        // Fetch profile image
        const imageResponse = await axios.get("/api/profileImage", { 
          responseType: "blob",
          timeout: 5000 // 5 second timeout
        });
        const imageBlob = new Blob([imageResponse.data], { 
          type: imageResponse.headers["content-type"] 
        });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Don't show error to user, just use default profile picture
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const gotoProfile = () => {
    navigate("/profile_page");
  };

  const goto_homepage = () => {
    navigate("/homepage");
  };

  const gotoFindWork = () => {
    navigate("/find-work");
  };

  const gotoDeliverWork = () => {
    navigate("/deliver-work");
  };

  const handleSearch = (e) => {
    console.log("Searching for:", e.target.value);
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
      {/* Left section with logo and links */}
      <div className="flex items-center space-x-8">
        <img src={logo} alt="IntelliHire logo" className="h-10 pl-3" />
        <div onClick={goto_homepage} className="text-xl tracking-tight mr-4 cursor-pointer text-white">
          IntelliHire
        </div>
        <ul className="flex space-x-6 text-gray-300">
          <li onClick={gotoFindWork} className="hover:text-orange-500 cursor-pointer tracking-tight">Find work</li>
          <li onClick={gotoDeliverWork} className="hover:text-orange-500 cursor-pointer">Deliver work</li>
          <li className="hover:text-orange-500 cursor-pointer">Manage finances</li>
          <li className="hover:text-orange-500 cursor-pointer">Messages</li>
        </ul>
      </div>

      {/* Right section with search, dropdown, and icons */}
      <div className="flex items-center space-x-4">
        <input 
          type="text" 
          placeholder="Search" 
          className="px-4 py-2 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-white placeholder-gray-400"
          onChange={handleSearch}
        />
        <select className="border border-gray-700 p-2 rounded-lg focus:outline-none text-white bg-gray-800">
          <option value="Jobs">Jobs</option>
          <option value="Freelancers">Freelancers</option>
        </select>
        <div className="flex items-center space-x-4">
          <span className="text-xl cursor-pointer text-gray-300 hover:text-orange-500">🔔</span>
          <span className="text-xl cursor-pointer text-gray-300 hover:text-orange-500">🔲</span>
          <div 
            onClick={gotoProfile}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-500 bg-gray-800 flex items-center justify-center"
          >
            {!isLoading && image ? (
              <img
                src={image}
                alt="User profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-400">👤</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
