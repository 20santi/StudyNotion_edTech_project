import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import SidebarLink from "./SidebarLink";
import { logOut } from "../../../services/operators/authApi";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClick = () => {
    dispatch(logOut(navigate));
  };

  return (
    <div className="w-[222px] h-screen mt-16 fixed bg-richblack-800 border border-richblack-700">
      <div className="flex flex-col">
        <Link to="/dashboard/my-profile">
          <div
            className={` h-[38px] mt-7 flex items-center
                        ${
                          matchRoute(`/dashboard/my-profile`)
                            ? " bg-yellow-800 text-yellow-50 border-l-[3px]"
                            : "text-richblack-5"
                        }`}
          >
            <div className="flex items-center pl-7 gap-x-2">
              <p>My Profile</p>
              <VscAccount className="text-lg" />
            </div>
          </div>
        </Link>

        <div className="flex flex-col">
          {sidebarLinks.map((subLink) => (
            <div key={subLink.id} className="">
              {subLink.type === user.accountType && (
                <Link to={subLink.path}>
                  <div
                    className={` h-[38px] flex items-center
                                        ${
                                          matchRoute(subLink.path)
                                            ? " bg-yellow-800 text-yellow-50 border-l-[3px]"
                                            : "text-richblack-5"
                                        }`}
                  >
                    <SidebarLink subLink={subLink} iconName={subLink.icon} />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="w-[170px] h-[1px] bg-richblack-600 mt-5 ml-5"></div>

        <div>
          <div className="mt-9">
            <Link to="/dashboard/settings">
              <div
                className={` flex gap-x-2 h-[38px] items-center pl-7
                                ${
                                  matchRoute("/dashboard/settings")
                                    ? " bg-yellow-800 text-yellow-50 border-l-[3px]"
                                    : "text-richblack-5"
                                }`}
              >
                <p>Setting</p>
                <VscSettingsGear className="text-lg" />
              </div>
            </Link>
          </div>
        </div>

        <div
          onClick={handleClick}
          className="mt-3 flex gap-x-2 items-center pl-7"
        >
          <p className="text-white -mt-1">Log Out</p>
          <FiLogOut size="20px" color="white" />
        </div>
      </div>
    </div>
  );
}
