// save user to the db

export const saveUser = (user) => {
  const currentUser = {
    email: user.email,
  };

  fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// get all rooms

export const getAllRooms = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
  const data = await res.json();

  return data;
};
