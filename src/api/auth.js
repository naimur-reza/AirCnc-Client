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

// get single room from db

export const getRoom = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${id}`);
  const data = await res.json();
  return data;
};

// become a host
export const becomeHost = (email) => {
  const currentUser = {
    role: "host",
  };

  return fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then((res) => res.json());
};

// get role form current user

export const getRole = async (email) => {
  if (email) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`);
    const user = await res.json();
    return user?.role;
  }
};
