import { format } from "date-fns";
import { useState } from "react";
import { deleteRoom } from "../../api/rooms";
import DeleteModal from "../../components/Modals/DeleteModal";
import { toast } from "react-hot-toast";
import UpdateRoomModal from "../../components/Modals/UpdateRoomModal";

const RoomDataRow = ({ room, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const modalHandler = (id) => {
    deleteRoom(id).then((data) => {
      console.log(data);
      if (data.deletedCount > 0) {
        toast.success("Room deleted successfully");
        refetch();
        closeModal();
        console.log(data);
      }
    });

    console.log(id);
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative">Delete</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
          <span onClick={() => setIsUpdateModal(true)} className="relative">
            Update
          </span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          modalHandler={modalHandler}
          closeModal={closeModal}
          id={room?._id}
        />
        <UpdateRoomModal
          refetch={refetch}
          id={room?._id}
          room={room}
          isUpdateModal={isUpdateModal}
          setIsUpdateModal={setIsUpdateModal}
        />
      </td>
    </tr>
  );
};

export default RoomDataRow;
