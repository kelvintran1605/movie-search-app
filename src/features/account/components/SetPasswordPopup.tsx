import { FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BsExclamationCircle as ExclamationIcon } from "react-icons/bs";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const SetPasswordPopup = ({
  onTogglePassword,
}: {
  onTogglePassword: (state: boolean) => void;
}) => {
  const { user } = useAuth();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordConfirmShow, setIsPasswordConfirmShow] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSetPassword = async () => {
    setPasswordError("");

    if (!user?.id) {
      setPasswordError("You must be signed in to set a password.");
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setPasswordError(error.message);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, has_password: true });

    if (profileError) {
      setPasswordError(profileError.message);
      return;
    }

    onTogglePassword(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 bg-[#1A1A1A] text-white flex flex-col gap-2 p-7 rounded-xl">
      <h2 className="font-bold text-xl">Set password</h2>
      <div className="text-gray-400 border-b border-gray-800 pb-5">
        Create password for your account
      </div>

      <label htmlFor="password">New Password</label>
      <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="password"
          type={isPasswordShow ? "text" : "password"}
          className="w-full h-full p-3"
          placeholder="Enter your password..."
          autoComplete="new-password"
        />
        {isPasswordShow ? (
          <EyeSlash
            onClick={() => setIsPasswordShow(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
          />
        ) : (
          <Eye
            onClick={() => setIsPasswordShow(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
          />
        )}
      </div>

      <label className="mt-5" htmlFor="password-confirm">
        Confirm Password
      </label>
      <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative">
        <input
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          id="password-confirm"
          type={isPasswordConfirmShow ? "text" : "password"}
          className="w-full h-full p-3"
          placeholder="Re-enter your password..."
          autoComplete="new-password"
        />
        {isPasswordConfirmShow ? (
          <EyeSlash
            onClick={() => setIsPasswordConfirmShow(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
          />
        ) : (
          <Eye
            onClick={() => setIsPasswordConfirmShow(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
          />
        )}
      </div>

      <div className="text-red-400">{passwordError}</div>

      <div className="flex gap-4 items-center bg-blue-500/10 p-5 rounded-md mt-4">
        <ExclamationIcon className="text-blue-400 text-2xl" />
        <div className="text-blue-300 text-sm">
          You'll be able to sign in using either your Google account or this
          password
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onTogglePassword(false)}
          className="border border-gray-700 p-3 px-21 rounded-xl cursor-pointer hover:bg-gray-700/30 duration-150"
        >
          Cancel
        </button>
        <button
          onClick={handleSetPassword}
          className="bg-white/50 px-16 p-3 rounded-xl text-black cursor-pointer hover:bg-white/80 duration-150"
        >
          Set Password
        </button>
      </div>
    </div>
  );
};

export default SetPasswordPopup;
