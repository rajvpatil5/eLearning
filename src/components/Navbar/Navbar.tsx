import React from "react";
import { Fragment, useContext, useState } from "react";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/users/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const signOutHandler = async () => {
    await signOutUser();
    navigate("/");
  };

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Mobile menu */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 bg-opacity-25" />
          </Transition.Child>

          {/* write inset-0  to maintain height */}
          <div className="fixed inset-0 overflow-y-auto top-20">
            <div className="flex min-h-full  ">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6 mt-2">
                    <div className="flow-root">
                      <Link
                        to={"/allcourses"}
                        className="text-sm font-medium text-gray-900 "
                      >
                        All Courses
                      </Link>
                    </div>

                    <div className="flow-root">
                      <Link
                        to={"/dashboard"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Dashboard
                      </Link>
                    </div>

                    <div className="flow-root">
                      <Link
                        to={"/login"}
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Desktop Menu */}
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setIsOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex ">
                    <h1 className=" text-2xl font-bold text-black  px-2 py-1 rounded">
                      eLearning
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to={"/allcourses"}
                    className="text-sm font-medium text-gray-700 "
                  >
                    All Courses
                  </Link>

                  <Link
                    to={"/dashboard"}
                    className="text-sm font-medium text-gray-700 "
                  >
                    Dashboard
                  </Link>
                  {currentUser ? (
                    <div className="flow-root">
                      <Link
                        onClick={signOutHandler}
                        to={"/login"}
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                      >
                        SignOut
                      </Link>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <Link
                        to={"/login"}
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
