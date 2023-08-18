import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Logo/Logo-Full-Light.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllCategory } from "../services/operators/courseDetails";
import { IoChevronDownOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  const navbardata = [
    {
      name: "Home",
      id: 1,
      path: "/",
    },
    {
      name: "Catalog",
      id: 2,
    },
    {
      name: "About Us",
      id: 3,
      path: "/aboutus",
    },
    {
      name: "Contact Us",
      id: 4,
      path: "/contactus",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await dispatch(showAllCategory());
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="w-full h-[64px] bg-richblack-800 fixed z-50 flex items-center border border-richblack-700">
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-between">
        <div>
          <img
            src={logo}
            alt="studynotion logo"
            className="w-[160px] h-[32px]"
          />
        </div>

        <div className="flex gap-x-4">
          {navbardata.map((data) => {
            return (
              <div key={data.id}>
                {data.name !== "Catalog" ? (
                  <div>
                    <Link to={data.path}>
                      <p
                        className={`text-white ${
                          matchRoute(data.path)
                            ? "  text-yellow-50"
                            : "text-richblack-5"
                        }`}
                      >
                        {data.name}
                      </p>
                    </Link>
                  </div>
                ) : (
                  <div className="text-white flex items-center relative">
                    <div className="flex text-white gap-x-1 group">
                      <p
                        className={`text-white ${
                          matchRoute("/catalog/:catlogName")
                            ? " text-yellow-50"
                            : "text-richblack-900"
                        }`}
                      >
                        Catelog
                      </p>

                      <div
                        className={` pt-1 ${
                          matchRoute("/catalog/:catlogName")
                            ? " text-yellow-50"
                            : "text-white"
                        }`}
                      >
                        <IoChevronDownOutline />
                      </div>

                      <div className="w-[250px] bg-richblack-5 absolute top-10 rounded-lg invisible group-hover:visible z-50 transition-all duration-200 -translate-x-16">
                        {categories.length > 0 ? (
                          <div className="p-3">
                            <ul>
                              {categories.map((category) => (
                                <li
                                  key={category._id}
                                  className="text-black p-2 hover:bg-richblack-50 rounded-lg"
                                >
                                  <Link
                                    to={`/catalog/${category.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                  >
                                    <p className={`text-richblack-900`}>
                                      {category.name}
                                    </p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div>No Category found</div>
                        )}
                      </div>

                      <div className="w-[40px] h-[40px] rotate-45 bg-richblack-5 absolute rounded-lg top-8 translate-x-12 invisible group-hover:visible transition-all duration-200"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Link>
                <BiSearch size="25px" color="white" />
              </Link>

              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart size="25px" color="white" />
              </Link>

              <img
                src={user?.image}
                className="rounded-full w-[30px] h-[30px]"
              />
            </div>
          ) : (
            <div className="flex gap-x-4">
              <Link to="/login">
                <button className="w-[78px] h-[40px] bg-transparent rounded-lg text-white border border-richblue-400">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="w-[78px] h-[40px] bg-transparent rounded-lg text-white border border-richblue-400">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
