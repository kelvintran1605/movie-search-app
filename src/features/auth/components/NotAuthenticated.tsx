import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { PiSignInBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import SignInPopUp from "./SignInPopUp";

const NotAuthenticated = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-6 lg:px-16 bg-white text-black dark:bg-[#0D0D0D] dark:text-white">
      {isSignInOpen && (
        <SignInPopUp
          onToggleSignIn={() => setIsSignInOpen(false)}
          onToggleSignUp={() => {
            setIsSignInOpen(false);
            setIsSignUpOpen(true);
          }}
        />
      )}

      {isSignUpOpen && (
        <SignInPopUp
          onToggleSignIn={() => {
            setIsSignUpOpen(false);
            setIsSignInOpen(true);
          }}
          onToggleSignUp={() => setIsSignUpOpen((p) => !p)}
        />
      )}

      <div className="w-full max-w-xl text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          401 - Unauthorized Access
        </h2>

        <div className="text-gray-600 dark:text-gray-300 flex flex-col gap-2 mt-6">
          <div>You don't have permission to view this page.</div>
          <div>
            Please sign in with an authorized account or return to safety.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Link
            to="/"
            className="flex items-center gap-2 w-40 justify-center bg-blue-600 text-white p-2 rounded-md px-5 hover:bg-blue-700 duration-150"
          >
            <AiOutlineHome className="text-xl" /> Go to Home
          </Link>

          <button
            onClick={() => setIsSignInOpen(true)}
            className="flex items-center gap-2 w-40 justify-center cursor-pointer border border-gray-300 dark:border-gray-400 p-2 rounded-md px-6 hover:bg-gray-100 dark:hover:bg-gray-800 duration-150"
          >
            <PiSignInBold className="text-xl" /> Sign In
          </button>
        </div>
      </div>

      <img
        className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-contain"
        src="/unauthorized-page-picture.png"
        alt="Unauthorized"
      />
    </div>
  );
};

export default NotAuthenticated;
