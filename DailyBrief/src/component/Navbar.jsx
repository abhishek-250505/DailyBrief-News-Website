import { RiBookmark2Line, RiNewspaperLine, RiUserLine, RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();
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

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">

      {/* Desktop Navbar */}
      <div className="hidden md:flex h-14 justify-between items-center md:pl-2">
        <div className="font-sans text-red-600 pl-5">{currentDate}</div>

        <h2 className="md:text-5xl text-center pl-10 pt-2 font-semibold font-serif flex gap-1 cursor-pointer">
          DAILY <RiNewspaperLine className="mt-1" size={42} /> BRIEF
        </h2>

        <div className="flex gap-4 pt-2 pr-6 items-center">
          <Link
            to="/saved"
            className="font-sans text-[12px] bg-[#B00020] px-3.5 rounded-lg text-white py-1 flex items-center gap-1 hover:bg-red-700 transition"
          >
            Saved <RiBookmark2Line size={16} />
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                  {initials}
                </span>
                <RiArrowDownSLine size={18} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="mb-3">
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="font-sans text-[12px] bg-[#4fb1e2] px-3.5 rounded-[10px] text-white py-1 hover:bg-blue-700 transition flex items-center gap-1">
              Login <RiUserLine />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden px-2 py-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold font-serif flex gap-1 items-center">
            DAILY <RiNewspaperLine size={22} /> BRIEF
          </h2>

          <div className="flex gap-2 items-center">
            <Link
              to="/saved"
              className="text-[12px] bg-[#B00020] px-3 py-1 rounded-[8px] text-white flex items-center gap-1 hover:bg-red-700 transition"
            >
              Saved <RiBookmark2Line size={14} />
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                    {initials}
                  </span>
                  <RiArrowDownSLine size={18} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="mb-3">
                      <div className="font-semibold text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-[12px] bg-[#4fb1e2] px-3 py-1 rounded-lg text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;