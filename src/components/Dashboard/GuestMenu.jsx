import { NavLink } from "react-router-dom";
import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import useAuth from "../../api/useAuth";
import { becomeHost } from "../../api/auth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import HostModal from "../Modals/HostRequestModal";
const GuestMenu = () => {
  const { user, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const modalHandler = (email) => {
    becomeHost(email)
      .then((data) => {
        toast.success("You are now a host");
        closeModal;
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <NavLink
        to="my-bookings"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
            isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
          }`
        }>
        <BsFingerprint className="w-5 h-5" />

        <span className="mx-4 font-medium">My Bookings</span>
      </NavLink>

      <div className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer">
        {!role && (
          <>
            <GrUserAdmin className="w-5 h-5" />
            <span onClick={() => setIsOpen(true)} className="mx-4 font-medium">
              Become A Host
            </span>
          </>
        )}

        <HostModal
          isOpen={isOpen}
          modalHandler={modalHandler}
          email={user?.email}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default GuestMenu;
