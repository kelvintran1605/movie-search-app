import { FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BsExclamationCircle as ExclamationIcon } from "react-icons/bs";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";

const ChangePasswordPopup = ({
  onTogglePassword,
  hasPassword,
}: {
  onTogglePassword: (state: boolean) => void;
  hasPassword: boolean;
}) => {
  const { user } = useAuth();

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordConfirmShow, setIsPasswordConfirmShow] = useState(false);
  const [isCurrentPasswordShow, setIsCurrentPasswordShow] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSetPassword = async () => {
    setPasswordError("");

    // Must be signed in
    if (!user?.id) {
      setPasswordError("You must be signed in to change your password.");
      return;
    }

    // Basic validation
    if (!newPassword || !passwordConfirm || (hasPassword && !currentPassword)) {
      setPasswordError("Please fill in all required fields.");
      return;
    }

    if (newPassword !== passwordConfirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    // Email is required only for re-auth
    if (hasPassword && !user.email) {
      setPasswordError("Missing email for this account.");
      return;
    }

    setIsSaving(true);

    try {
      // If user already has a password, re-authenticate with current password
      if (hasPassword) {
        const { error: reauthError } = await supabase.auth.signInWithPassword({
          email: user.email!,
          password: currentPassword,
        });

        if (reauthError) {
          setPasswordError("Current password is incorrect.");
          return;
        }
      }

      // Update password (works for both: OAuth users setting password, and email users changing password)
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setPasswordError(updateError.message);
        return;
      }

      // Mark has_password in profiles for UI logic
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: user.id, has_password: true });

      if (profileError) {
        setPasswordError(profileError.message);
        return;
      }

      onTogglePassword(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 bg-[#1A1A1A] text-white flex flex-col gap-2 p-7 rounded-xl">
      {/* Close Button */}
      <CloseIcon
        onClick={() => onTogglePassword(false)}
        className="text-gray-400 absolute top-5 right-5 text-2xl hover:text-gray-300 duration-150 cursor-pointer"
      />

      <h2 className="font-bold text-xl">
        {hasPassword ? "Change Password" : "Set Password"}
      </h2>

      <div className="text-gray-400 border-b border-gray-800 pb-5">
        {hasPassword
          ? "Change your current password"
          : "Create a password for your account"}
      </div>

      <>
        <label htmlFor="current-password">Current Password</label>
        <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative">
          <input
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            id="current-password"
            type={isCurrentPasswordShow ? "text" : "password"}
            className="w-full h-full p-3"
            placeholder="Enter your current password..."
            autoComplete="current-password"
          />
          {isCurrentPasswordShow ? (
            <EyeSlash
              onClick={() => setIsCurrentPasswordShow(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
            />
          ) : (
            <Eye
              onClick={() => setIsCurrentPasswordShow(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
            />
          )}
        </div>
      </>

      <label htmlFor="new-password">New Password</label>
      <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative">
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          id="new-password"
          type={isPasswordShow ? "text" : "password"}
          className="w-full h-full p-3"
          placeholder="Enter your new password..."
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
          placeholder="Re-enter your new password..."
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
          After setting it, you can sign in with either Google or your password.
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => onTogglePassword(false)}
          className="border border-gray-700 p-3 px-22 rounded-xl cursor-pointer hover:bg-gray-700/30 duration-150"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          onClick={handleSetPassword}
          className="bg-white/50 px-12 p-3 rounded-xl text-black cursor-pointer hover:bg-white/80 duration-150 disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : hasPassword
              ? "Change Password"
              : "Set Password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
