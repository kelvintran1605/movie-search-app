import { useAuth } from "@/context/AuthContext";
import { avatars } from "@/lib/avatars";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

const AvatarPicker = ({
  onToggleAvatarPicker,
  avatarUrl,
  onSelectAvatar,
}: {
  onToggleAvatarPicker: (state: boolean) => void;
  avatarUrl: string;
  onSelectAvatar: (state: string) => void;
}) => {
  const [draftUrl, setDraftUrl] = useState(avatarUrl);
  const { user, setAvatarUrl } = useAuth();

  const handleSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user?.id, profile_image: draftUrl });

    if (error) return;

    onSelectAvatar(draftUrl);
    onToggleAvatarPicker(false);
    setAvatarUrl(draftUrl);
    toast.success("Updated avatar successfully");
  };

  // Focus on the model when the component mounts
  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    console.log(cancelBtnRef);
    cancelBtnRef?.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggleAvatarPicker(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onToggleAvatarPicker]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6">
      <div
        aria-label="Close avatar picker"
        onClick={() => onToggleAvatarPicker(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-3xl h-[85vh] sm:h-[80vh] bg-white text-black dark:bg-slate-900 dark:text-white rounded-2xl flex flex-col shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 sm:px-10 py-6 sm:py-8">
          <h3
            id="avatar-picker-title"
            className="font-bold text-xl sm:text-2xl"
          >
            Choose your avatar
          </h3>
          <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-semibold mt-2 sm:mt-3">
            Pick an avatar to represent your profile
          </div>
        </div>

        <div
          role="dialog"
          aria-modal={true}
          aria-labelledby="avatar-picker-title"
          className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto border-y border-gray-200 dark:border-gray-800"
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-3 sm:gap-4 place-items-center">
            {avatars.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setDraftUrl(avatar)}
                className={`relative rounded-full cursor-pointer transition-all duration-150 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18
                ${
                  draftUrl === avatar
                    ? "ring-4 ring-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105"
                    : "hover:ring-2 hover:ring-slate-400 dark:hover:ring-slate-600 hover:scale-105"
                }`}
              >
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={avatar}
                  alt="Avatar option"
                  loading="lazy"
                />
                {draftUrl === avatar && (
                  <div className="absolute left-1/2 top-1/2 flex items-center justify-center bg-indigo-500 text-white rounded-full w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 shadow-md">
                    <FaCheck />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 flex justify-end items-center gap-2 sm:gap-3">
          <button
            ref={cancelBtnRef}
            aria-label="Close modal"
            onClick={() => onToggleAvatarPicker(false)}
            className="cursor-pointer px-4 sm:px-5 py-2.5 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer px-5 sm:px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={draftUrl === avatarUrl}
          >
            Save avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPicker;
