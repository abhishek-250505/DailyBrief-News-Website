import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

const Footer = () => {
   const [currentDate, setCurrentDate] = useState("");
   const navigate = useNavigate();
  
 
   useEffect(() => {
      const DateData = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
  
      const updateDate = () => {
        setCurrentDate(DateData.format(new Date()));
      };
  
      updateDate();
      const intervalId = setInterval(updateDate, 3600000);
      return () => clearInterval(intervalId);
    }, []);

    
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-white">DailyBrief</h2>
          <p className="mt-3 text-sm text-gray-400">
            Read Less. Know More. Stay updated with quick and smart news.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm" 
          >
            <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/")}>Home</li>
            <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/trending")}>Trending</li>
            <li className="hover:text-white cursor-pointer" onClick={()=>navigate("/saved")}>Saved News</li>
            
          </ul>
        </div>

        {/* Social link */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Connect
          </h3>
          <div className="flex gap-4 mb-1">
            {/* <span className="cursor-pointer hover:text-white">🐦</span> */}
            {/* <span className="cursor-pointer hover:text-white">📘</span> */}
            {/* <span className="cursor-pointer hover:text-white">📸</span> */}
          </div>
          <p className="text-sm text-gray-400">
            contact@dailybrief.com
          </p>

          <p className="mt-4 text-[18px] text-white">Date : <span className="text-red-500">{currentDate}</span></p>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-3 text-sm text-gray-500">
        © {new Date().getFullYear()} DailyBrief. All rights reserved.
      </div>
      {/* <div><p className="text-sm  text-gray-300 text-center">Made by Abhishek</p></div> */}

    </footer>
  );
};

export default Footer;