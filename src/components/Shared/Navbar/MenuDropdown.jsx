import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";

import { Link } from "react-router-dom";
import HostModal from "../../Modals/HostRequestModal";
import useAuth from "../../../api/useAuth";
import { becomeHost } from "../../../api/auth";
import { toast } from "react-hot-toast";

const MenuDropdown = () => {
  const { user, role, logOut, setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  console.log(role);
  const closeModal = () => {
    setModal(false);
  };
  const modalHandler = (email) => {
    becomeHost(email).then((data) => {
      toast.success("You're Host Now , Post Rooms!");
      setRole("Host");
      closeModal();
    });
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* Aircnc btn */}
        <div className="hidden py-3 px-8 md:block text-sm font-semibold  rounded-full hover:bg-neutral-100 transition cursor-pointer">
          <p className="bg-gradient-to-r from-orange-500 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            {!role && (
              <button
                className=""
                onClick={() => setModal(true)}
                disabled={!user}>
                AirCNC your home
              </button>
            )}
          </p>
        </div>
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex  flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold">
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  Dashboard
                </Link>
                <div
                  onClick={() => {
                    logOut();
                    setRole(null);
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <HostModal
        modalHandler={modalHandler}
        isOpen={modal}
        email={user?.email}
        closeModal={closeModal}
      />
    </div>
  );
};

export default MenuDropdown;
