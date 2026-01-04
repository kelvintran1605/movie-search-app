import { useAuth } from "@/context/AuthContext";
import { avatars } from "@/lib/avatars";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

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
  const { user } = useAuth();
  const handleSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user?.id, profile_image: draftUrl });
    if (error) {
      console.log(error.message);
      return;
    }
    onSelectAvatar(draftUrl);
    onToggleAvatarPicker(false);
  };
  return (
    <div className="fixed w-[50%] h-[90%] bg-slate-900 top-1/2 -translate-y-1/2 rounded-2xl flex flex-col z-50">
      {/* Overlay */}
      <div className="px-12 py-8">
        <h3 className="font-bold text-2xl">Choose your avatar</h3>
        <div className="text-gray-400 font-semibold mt-3">
          Pick an avatar to represent your profile
        </div>
      </div>
      {/* Avatar options */}
      <div className="h-[70%] flex gap-4 py-3 w-full flex-wrap justify-center border-y border-gray-800 px-6">
        {avatars.map((avatar) => (
          <div
            className={`hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] rounded-full relative
            w-26 cursor-pointer h-26 ${
              draftUrl === avatar
                ? "ring-4 ring-indigo-500 hover:ring-4 hover:ring-indigo-500 duration-150 hover:scale-105"
                : "hover:ring-slate-600 hover:scale-105 duration-150 hover:ring-2"
            }`}
          >
            <img
              onClick={() => setDraftUrl(avatar)}
              className="w-full h-full rounded-full"
              src={avatar}
            />
            {draftUrl === avatar && (
              <div className="bounce absolute left-1/2 top-1/2 flex items-center justify-center bg-indigo-500 rounded-full w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/3">
                <FaCheck />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex justify-end mt-6 mr-10 items-center gap-3">
        <button
          onClick={() => onToggleAvatarPicker(false)}
          className="cursor-pointer px-5 py-2.5 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="cursor-pointer px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Save avatar
        </button>
      </div>
    </div>
  );
};

export default AvatarPicker;
