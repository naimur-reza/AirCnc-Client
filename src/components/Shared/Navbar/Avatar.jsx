import { useContext } from "react";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { AuthContext } from "../../../providers/AuthProvider";

const Avatar = () => {
  const { user } = useContext(AuthContext);
  return (
    <img
      className="h-9 w-9 rounded-full"
      src={user && user.photoURL ? user.photoURL : avatarImg}
      alt="profile"
    />
  );
};

export default Avatar;
