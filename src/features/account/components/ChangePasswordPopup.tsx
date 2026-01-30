import { FaEye as Eye, FaEyeSlash as EyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BsExclamationCircle as ExclamationIcon } from "react-icons/bs";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";
import toast from "react-hot-toast";

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

    if (!user?.id) {
      setPasswordError("You must be signed in to change your password.");
      return;
    }

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

    if (hasPassword && !user.email) {
      setPasswordError("Missing email for this account.");
      return;
    }

    setIsSaving(true);

    try {
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

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setPasswordError(updateError.message);
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: user.id, has_password: true });

      if (profileError) {
        setPasswordError(profileError.message);
        return;
      }

      toast.success("Updated password successfully");
      onTogglePassword(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close"
        onClick={() => onTogglePassword(false)}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative w-full max-w-[560px] bg-[#1A1A1A] text-white flex flex-col gap-3 sm:gap-4 p-5 sm:p-7 rounded-xl border border-white/10 shadow-2xl">
        <CloseIcon
          onClick={() => onTogglePassword(false)}
          className="text-gray-400 absolute top-4 right-4 text-2xl hover:text-gray-300 duration-150 cursor-pointer"
        />

        <h2 className="font-bold text-lg sm:text-xl">
          {hasPassword ? "Change Password" : "Set Password"}
        </h2>

        <div className="text-gray-400 border-b border-gray-800 pb-4 text-sm sm:text-base">
          {hasPassword
            ? "Change your current password"
            : "Create a password for your account"}
        </div>

        {hasPassword && (
          <>
            <label className="text-sm sm:text-base" htmlFor="current-password">
              Current Password
            </label>
            <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative overflow-hidden">
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                id="current-password"
                type={isCurrentPasswordShow ? "text" : "password"}
                className="w-full h-full p-3 pr-10 bg-transparent outline-none text-sm sm:text-base"
                placeholder="Enter your current password..."
                autoComplete="current-password"
              />
              {isCurrentPasswordShow ? (
                <EyeSlash
                  onClick={() => setIsCurrentPasswordShow(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
                />
              ) : (
                <Eye
                  onClick={() => setIsCurrentPasswordShow(true)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
                />
              )}
            </div>
          </>
        )}

        <label className="text-sm sm:text-base" htmlFor="new-password">
          New Password
        </label>
        <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative overflow-hidden">
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            id="new-password"
            type={isPasswordShow ? "text" : "password"}
            className="w-full h-full p-3 pr-10 bg-transparent outline-none text-sm sm:text-base"
            placeholder="Enter your new password..."
            autoComplete="new-password"
          />
          {isPasswordShow ? (
            <EyeSlash
              onClick={() => setIsPasswordShow(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
            />
          ) : (
            <Eye
              onClick={() => setIsPasswordShow(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
            />
          )}
        </div>

        <label className="mt-2 text-sm sm:text-base" htmlFor="password-confirm">
          Confirm Password
        </label>
        <div className="border border-gray-500 rounded-md bg-[#0D0D0D] relative overflow-hidden">
          <input
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            id="password-confirm"
            type={isPasswordConfirmShow ? "text" : "password"}
            className="w-full h-full p-3 pr-10 bg-transparent outline-none text-sm sm:text-base"
            placeholder="Re-enter your new password..."
            autoComplete="new-password"
          />
          {isPasswordConfirmShow ? (
            <EyeSlash
              onClick={() => setIsPasswordConfirmShow(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
            />
          ) : (
            <Eye
              onClick={() => setIsPasswordConfirmShow(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
            />
          )}
        </div>

        {passwordError && (
          <div className="text-red-400 text-sm">{passwordError}</div>
        )}

        <div className="flex gap-3 items-start bg-blue-500/10 p-4 rounded-md mt-2">
          <ExclamationIcon className="text-blue-400 text-xl sm:text-2xl mt-0.5" />
          <div className="text-blue-300 text-xs sm:text-sm leading-relaxed">
            After setting it, you can sign in with either Google or your
            password.
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3">
          <button
            onClick={() => onTogglePassword(false)}
            className="border border-gray-700 py-3 px-5 rounded-xl cursor-pointer hover:bg-gray-700/30 duration-150 disabled:opacity-50"
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            onClick={handleSetPassword}
            className="bg-white/80 px-6 sm:px-10 py-3 rounded-xl text-black cursor-pointer hover:bg-white duration-150 disabled:opacity-50"
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
    </div>
  );
};

export default ChangePasswordPopup;
