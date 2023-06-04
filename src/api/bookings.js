export const addBooking = async (bookingsData) => {
  fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookingsData),
  }).then((res) => res.json());
};

// update room status after booking
export const updateRoomStatus = async (id, status) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/rooms/status/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await res.json();
  return data;
};

// get bookings
export const getBookings = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${email}`);
  const data = await res.json();
  return data;
};
