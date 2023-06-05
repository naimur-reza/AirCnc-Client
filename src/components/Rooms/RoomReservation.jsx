import React, { useState } from "react";
import Calender from "../Rooms/Calender";
import Button from "../Button/Button";
import useAuth from "../../api/useAuth";
import BookingModal from "../Modals/BookingModal";
import { formatDistance } from "date-fns";
import { addBooking, updateRoomStatus } from "../../api/bookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RoomReservation = ({ room }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    startDate: new Date(room.from),
    endDate: new Date(room.to),
    key: "selection",
  });
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const totalPrice = parseFloat(
    formatDistance(new Date(room.to), new Date(room.from)).split(" ")[0] *
      room.price
  );
  console.log(totalPrice);
  const [bookingInfo, setBookingInfo] = useState({
    guest: {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    },
    host: room.host.email,
    location: room.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: room.title,
    guests: room.guest,
    roomId: room._id,
    image: room.image,
  });

  const handleSelect = (ranges) => {
    setValue({ ...value });
  };

  // const modalHandler = () => {
  //   addBooking(bookingInfo).then((data) => {
  //     updateRoomStatus(room._id, true).then((data) => {
  //       navigate("/dashboard/my-bookings");
  //       toast.success("Booking Successful");
  //       console.log(data);
  //       closeModal();
  //     });
  //   });
  // };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calender value={value} handleSelect={handleSelect} />
      <hr />
      <div className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={room.host.email === user?.email || room.booked}
          label="Reserve"
        />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <BookingModal
        bookingInfo={bookingInfo}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </div>
  );
};

export default RoomReservation;
