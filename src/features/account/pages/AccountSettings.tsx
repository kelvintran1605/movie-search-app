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
import { useTheme } from "@/context/ThemeContext";

const AccountSettings = () => {
  const { user, avatarUrl: profileUrl } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const [hasPassword, setHasPassword] = useState(false);
  const [isSetPasswordOpen, setIsSetPasswordOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profileUrl);

  const providers = user?.app_metadata?.providers ?? [];

  const capitalize = ([first, ...rest]: string): string => {
    return first.toUpperCase() + rest.join("");
  };

  useEffect(() => {
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

      setHasPassword(!!data?.has_password);
    };
    getHasPassword();
  }, [user?.id]);

  useEffect(() => {
    setAvatarUrl(profileUrl || "");
  }, [profileUrl]);

  return (
    <div className="flex flex-col gap-4 text-black dark:text-white bg-gray-100 dark:bg-black items-center relative px-4 py-8 sm:px-8 sm:py-12 lg:px-20 lg:py-16">
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

      <div className="flex flex-col items-start w-full max-w-4xl gap-5">
        <h1 className="font-bold text-2xl sm:text-3xl">Account Settings</h1>
        <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Manage your profile, security and preferences
        </div>

        <div className="flex flex-col p-5 sm:p-8 gap-2 bg-white dark:bg-[#1A1A1A] w-full mt-6 sm:mt-8 rounded-xl">
          <h2 className="font-bold text-lg sm:text-xl">Profile</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Personal information linked to your account
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              onClick={() => setIsAvatarPickerOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full cursor-pointer hover:ring-slate-400 dark:hover:ring-slate-600 hover:scale-105 duration-150 hover:ring-2"
              src={avatarUrl || "/default-avatar.png"}
              alt="Avatar"
            />

            <div className="flex flex-col gap-1 w-full">
              <h3 className="font-bold text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Display name
              </h3>
              <div className="text-base sm:text-lg break-words">
                {user?.user_metadata?.name || user?.email || "User"}
              </div>

              <h3 className="font-bold text-gray-600 dark:text-gray-400 mt-4 sm:mt-5 text-sm sm:text-base">
                Email Address
              </h3>
              <div className="flex items-center gap-2 text-sm sm:text-base break-all">
                <MailIcon /> {user?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-8 gap-2 bg-white dark:bg-[#1A1A1A] w-full mt-6 sm:mt-8 rounded-xl">
          <h2 className="font-bold text-lg sm:text-xl">Security</h2>
          <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Manage how you sign in to your account
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-4 border-b border-gray-300 dark:border-gray-800 pb-6 sm:pb-7">
            <div className="bg-blue-300/30 text-2xl p-2 rounded-xl shrink-0">
              <LinkIcon className="text-green-500" />
            </div>

            <div className="flex flex-col">
              <div className="text-base sm:text-lg">Connected via</div>
              <ul className="mt-1">
                {providers?.map((provider) => {
                  return (
                    <li
                      className="text-gray-600 dark:text-gray-400 list-disc ml-4 text-sm sm:text-base"
                      key={provider}
                    >
                      {capitalize(provider)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 border-b border-gray-300 dark:border-gray-800 pb-6 sm:pb-7">
            <div className="flex items-center gap-4">
              <div className="bg-blue-300/30 text-2xl p-2 rounded-xl shrink-0">
                <KeyIcon className="text-yellow-600" />
              </div>

              <div className="flex flex-col">
                <div className="text-base sm:text-lg">Password</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Add/Change Password
                </div>
              </div>
            </div>

            {!user?.app_metadata?.providers?.includes("email") &&
            !hasPassword ? (
              <button
                onClick={() => setIsSetPasswordOpen(true)}
                className="w-full sm:w-[140px] bg-black dark:bg-white text-white dark:text-black rounded-md p-2 sm:p-1 cursor-pointer hover:bg-gray-800 dark:hover:bg-gray-300 duration-150"
              >
                Set password
              </button>
            ) : (
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="w-full sm:w-40 bg-gray-200 dark:bg-[#1A1A1A]/20 text-black dark:text-white rounded-md p-2 sm:p-1 ring ring-gray-400 dark:ring-gray-600 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 duration-150"
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center bg-yellow-100 dark:bg-yellow-500/10 p-4 sm:p-5 rounded-md mt-4">
                <ExclamationIcon className="text-yellow-400 shrink-0" />
                <div className="text-sm sm:text-base">
                  <div className="text-yellow-600 dark:text-yellow-500">
                    You're currently signed in with Google only
                  </div>
                  <div className="text-yellow-700/70 dark:text-yellow-600/70">
                    Setting a password allows you to sign in using either method
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className="flex flex-col p-5 sm:p-8 gap-3 bg-white dark:bg-[#1A1A1A] w-full mt-6 sm:mt-8 rounded-xl">
          <h2 className="font-bold text-lg sm:text-xl">Preferences</h2>
          <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Customize your experience
          </div>

          <div className="text-gray-600 dark:text-gray-400 mt-4 text-sm sm:text-base">
            Theme
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div
              onClick={() => setThemeMode("dark")}
              className={`${
                themeMode === "dark"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-transparent"
              } hover:bg-gray-200 dark:hover:bg-gray-600 duration-150 cursor-pointer flex flex-col items-center justify-center border border-gray-300 dark:border-gray-500 rounded-md p-3 w-full`}
            >
              <DarkIcon className="text-2xl" />
              Dark
            </div>

            <div
              onClick={() => setThemeMode("light")}
              className={`${
                themeMode === "light"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-transparent"
              } hover:bg-gray-200 dark:hover:bg-gray-600 duration-150 cursor-pointer flex flex-col items-center justify-center border border-gray-300 dark:border-gray-500 rounded-md p-3 w-full`}
            >
              <LightIcon className="text-2xl" />
              Light
            </div>

            <div
              onClick={() => setThemeMode("system")}
              className={`${
                themeMode === "system"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-transparent"
              } hover:bg-gray-200 dark:hover:bg-gray-600 duration-150 cursor-pointer flex flex-col items-center justify-center border border-gray-300 dark:border-gray-500 rounded-md p-3 w-full`}
            >
              <DesktopIcon className="text-2xl" />
              System
            </div>
          </div>

          <div className="text-gray-600 dark:text-gray-400 mt-4 text-sm sm:text-base">
            Language
          </div>
          <div className="flex items-center justify-between gap-2 text-sm sm:text-base border border-gray-300 dark:border-gray-500 p-3 rounded-md bg-white dark:bg-transparent">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <LanguageIcon className="text-xl text-gray-500 dark:text-gray-400 shrink-0" />
              <div className="font-semibold truncate">English</div>
            </div>

            <ArrowDown className="text-2xl shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
