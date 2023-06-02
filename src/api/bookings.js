export const addBooking = async (bookingsData) => {
  return fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookingsData),
  }).then((res) => res.json());
};
