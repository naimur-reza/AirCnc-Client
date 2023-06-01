export const addRoom = async (roomData) => {
  fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(roomData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
