import React from "react";
import Container from "../../components/Shared/Container";
import Header from "../../components/Rooms/Header";

import RoomReservation from "../../components/Rooms/RoomReservation";
import RoomInfo from "../../components/Rooms/RoomInfo";
import { useLoaderData } from "react-router-dom";

const RoomDetails = () => {
  const room = useLoaderData();

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-6">
          <Header room={room} />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <RoomInfo room={room} />
            <div className="mb-10 md:col-span-3 order-first md:order-last">
              <RoomReservation room={room} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomDetails;
