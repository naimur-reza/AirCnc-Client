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

// delete room from here

export const deleteRoom = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

// get logged in host rooms

export const getHostRoom = async (email) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/rooms/host/${email}`,
    {
      headers: {
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  const data = res.json();
  return data;
};
