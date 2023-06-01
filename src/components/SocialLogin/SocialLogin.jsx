import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { saveUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
const SocialLogin = () => {
  const navigate = useNavigate;
  const [loading, setLoading] = useState();
  const { signInWithGoogle } = useContext(AuthContext);
  // Handle google signin
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const user = result.user;
        saveUser(user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };
  return (
    <div
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
      <FcGoogle size={32} />

      <p>Continue with Google</p>
    </div>
  );
};

export default SocialLogin;
