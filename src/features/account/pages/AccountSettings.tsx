import { CiMail as MailIcon } from "react-icons/ci";
import { CiLink as LinkIcon } from "react-icons/ci";
import { LuKey as KeyIcon } from "react-icons/lu";
import { BsExclamationCircle as ExclamationIcon } from "react-icons/bs";
import { CiDark as DarkIcon, CiLight as LightIcon } from "react-icons/ci";
import { CiDesktop as DesktopIcon } from "react-icons/ci";
import { GrLanguage as LanguageIcon } from "react-icons/gr";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import SetPasswordPopUp from "../components/SetPasswordPopup";
import { supabase } from "@/lib/supabase";
import ChangePasswordPopup from "../components/ChangePasswordPopup";
import AvatarPicker from "../components/AvatarPicker";

const AccountSettings = () => {
  const { user } = useAuth();
  const [hasPassword, setHasPassword] = useState(false);
  const [isSetPasswordOpen, setIsSetPasswordOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const providers = user?.app_metadata?.providers ?? [];

  // Function to capitalize words
  const capitalize = ([first, ...rest]: string): string => {
    return first.toUpperCase() + rest.join("");
  };
  useEffect(() => {
    // Fetch the current user's profile row to determine if they already have a password
    if (!user?.id) return;

    const getHasPassword = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("has_password")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.log(error.message);
        setHasPassword(false);
        return;
      }

      // If the profile row doesn't exist yet, treat it as "no password"
      setHasPassword(!!data?.has_password);
    };

    const getAvatarUrl = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("profile_image")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }
      console.log(data);
      setAvatarUrl(data.profile_image);
    };

    getAvatarUrl();
    getHasPassword();
  }, [user?.id]);

  return (
    <div className="flex flex-col gap-4 text-white p-20 px-32 items-center relative">
      {/* Change Avatar */}
      {isAvatarPickerOpen && (
        <AvatarPicker
          avatarUrl={avatarUrl}
          onSelectAvatar={setAvatarUrl}
          onToggleAvatarPicker={setIsAvatarPickerOpen}
        />
      )}

      {(isSetPasswordOpen || isChangePasswordOpen || isAvatarPickerOpen) && (
        <div
          onClick={() => {
            setIsSetPasswordOpen(false);
            setIsChangePasswordOpen(false);
            setIsAvatarPickerOpen(false);
          }}
          className="absolute inset-0 bg-black/80"
        />
      )}

      <div className="flex flex-col items-start w-2/3 gap-5">
        <h1 className="font-bold text-3xl">Account Settings</h1>
        <div className="text-gray-400 text-base">
          Manage your profile, security and preferences
        </div>

        {/* Profile section */}
        <div className="flex flex-col p-8 gap-2 bg-[#1A1A1A] w-full mt-8 rounded-xl">
          <h2 className="font-bold text-xl">Profile</h2>
          <div className="text-gray-400 mb-8">
            Personal information linked to your account
          </div>

          <div className="flex items-start gap-4">
            {/* Profile image */}
            <img
              onClick={() => setIsAvatarPickerOpen(true)}
              className="w-20 h-20 object-cover rounded-full cursor-pointer hover:ring-slate-600 hover:scale-105 duration-150 hover:ring-2"
              src={avatarUrl || "/default-avatar.png"}
              alt="Avatar"
            />

            {/* Profile information */}
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-gray-400">Display name</h3>
              <div>{user?.user_metadata?.name || user?.email || "User"}</div>

              <h3 className="font-bold text-gray-400 mt-5">Email Address</h3>
              <div className="flex items-center gap-2">
                <MailIcon /> {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Security section */}
        <div className="flex flex-col p-8 gap-2 bg-[#1A1A1A] w-full mt-8 rounded-xl">
          <h2 className="font-bold text-xl">Security</h2>
          <div className="text-gray-400">
            Manage how you sign in to your account
          </div>

          <div className="flex items-start gap-4 mt-4 border-b border-gray-800 pb-7">
            <div className="bg-blue-500/30 text-2xl p-2 rounded-xl">
              <LinkIcon className="text-green-400" />
            </div>

            <div className="flex flex-col">
              <div>Connected via</div>
              <ul className="mt-1">
                {providers?.map((provider) => {
                  return (
                    <li className="text-gray-400 list-disc ml-4" key={provider}>
                      {capitalize(provider)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mt-4 border-b border-gray-800 pb-7">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/30 text-2xl p-2 rounded-xl">
                <KeyIcon className="text-yellow-600" />
              </div>

              <div className="flex flex-col">
                <div>Password</div>
                <div className="text-gray-400">Add/Change Password</div>
              </div>
            </div>

            {/* If user doesn't have email provider AND has no password yet => show Set Password */}
            {!user?.app_metadata?.providers?.includes("email") &&
            !hasPassword ? (
              <button
                onClick={() => setIsSetPasswordOpen(true)}
                className="w-[120px] bg-white text-black rounded-md p-1 mt-4 cursor-pointer hover:bg-gray-300 duration-150"
              >
                Set password
              </button>
            ) : (
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="w-32 bg-[#1A1A1A]/20 text-white rounded-md p-1 ring ring-gray-600 mt-4 cursor-pointer hover:bg-gray-700 duration-150"
              >
                Change password
              </button>
            )}

            {isSetPasswordOpen && (
              <SetPasswordPopUp
                onToggleHasPassword={setHasPassword}
                onTogglePassword={setIsSetPasswordOpen}
              />
            )}

            {isChangePasswordOpen && (
              <ChangePasswordPopup
                hasPassword={hasPassword}
                onTogglePassword={setIsChangePasswordOpen}
              />
            )}
          </div>

          {!user?.app_metadata?.providers?.includes("email") &&
            !hasPassword && (
              <div className="flex gap-4 items-center bg-yellow-500/10 p-5 rounded-md mt-4">
                <ExclamationIcon className="text-yellow-400" />
                <div>
                  <div className="text-yellow-500">
                    You're currently signed in with Google only
                  </div>
                  <div className="text-yellow-600/70">
                    Setting a password allows you to sign in using either method
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col p-8 gap-3 bg-[#1A1A1A] w-full mt-8 rounded-xl">
          <h2 className="font-bold text-xl">Preferences</h2>
          <div className="text-gray-400">Customize your experience</div>

          <div className="text-gray-400 mt-4">Theme</div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-center justify-center bg-transparent border border-gray-500 rounded-md p-3 w-1/3">
              <DarkIcon className="text-2xl" />
              Dark
            </div>

            <div className="flex flex-col items-center justify-center bg-transparent border border-gray-500 rounded-md p-3 w-1/3">
              <LightIcon className="text-2xl" />
              Light
            </div>

            <div className="flex flex-col items-center justify-center bg-transparent border border-gray-500 rounded-md p-3 w-1/3">
              <DesktopIcon className="text-2xl" />
              System
            </div>
          </div>

          <div className="text-gray-400 mt-4">Language</div>
          <div className="flex items-center justify-between gap-2 text-base border border-gray-500 p-3 rounded-md">
            <div className="flex items-center gap-4">
              <LanguageIcon className="text-xl text-gray-400" />
              <div className="font-semibold">English</div>
            </div>

            <ArrowDown className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
