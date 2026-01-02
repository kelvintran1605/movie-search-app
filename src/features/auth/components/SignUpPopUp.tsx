import { FcGoogle } from "react-icons/fc";
import { FaApple, FaDiscord, FaEyeSlash, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdClose as CloseButton } from "react-icons/io";
import { supabase } from "@/lib/supabase";

const SignUpPopUp = ({
  onToggleSignUp,
  onToggleSignIn,
}: {
  onToggleSignUp: () => void;
  onToggleSignIn: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string>("");
  const images = [
    {
      name: "Stranger Things",
      url: "/stranger-things.jpg",
    },
    {
      name: "Avengers",
      url: "/avengers.jpg",
    },
    {
      name: "Avatar 2",
      url: "/avatar.jpg",
    },
  ];

  // Function to handle google sign in
  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });

    if (error) {
      console.error(error.message);
      return;
    }
  };

  // Function to handle discord sign in
  const handleDiscordSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  const handleInAppSignUp = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setErrors(error.message);
      return;
    }

    if (!data.session) {
      setErrors(
        "Check your email to confirm your account. If you already have an account, try signing in or resetting your password."
      );
      return;
    }

    setTimeout(() => {
      onToggleSignUp();
    }, 500);
  };
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onToggleSignUp}
        className="bg-black/40 fade absolute w-full h-full"
      ></div>
      {/* Card */}
      <div className="relative flex items-stretch w-full sm:w-[90%] max-w-5xl h-dvh md:h-[90dvh] bg-white text-black rounded-md overflow-hidden">
        {/* Image */}
        <img
          key={imageIndex}
          className="hidden lg:block w-1/2 h-full object-cover fade"
          src={images[imageIndex].url}
          alt={images[imageIndex].name}
        />

        {/* Form */}
        <form
          onSubmit={handleInAppSignUp}
          className="flex flex-col w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto"
        >
          <CloseButton
            onClick={onToggleSignUp}
            className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-400 cursor-pointer"
          />

          <h2 className="font-bold text-[32px] text-center">
            Create your free account
          </h2>

          <span className="text-[#282A2D] mt-2 mb-8 tracking-wider text-center">
            No credit card required.
          </span>

          <div className="text-center text-[#282A2D] mb-8">
            Create your account to save your favorite movies, build custom
            watchlists, and access a more personalized browsing experience.
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="flex items-center justify-center gap-4 font-semibold text-lg border border-gray-400 w-full rounded-md p-2.5 hover:bg-gray-200 cursor-pointer transition duration-150"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* Apple button */}
          <button
            onClick={handleDiscordSignUp}
            type="button"
            className="flex items-center justify-center gap-4 font-semibold text-lg border text-white border-gray-400 w-full rounded-md p-2.5 bg-black hover:bg-gray-800 cursor-pointer transition duration-150 mt-4"
          >
            <FaDiscord className="text-xl" />
            Continue with Discord
          </button>

          {/* OR divider */}
          <div className="relative w-full my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600 tracking-wider uppercase">
                OR
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-600 font-bold" htmlFor="email">
              Email address
            </label>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border-b p-2 focus:outline-none border-gray-600"
                autoComplete="email"
                type="email"
                id="email"
                name="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-gray-600 font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b p-2 pr-10 focus:outline-none border-gray-600"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm */}
          <div className="mb-4">
            <label
              className="text-gray-600 font-bold"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-b p-2 pr-10 focus:outline-none border-gray-600"
                autoComplete="new-password"
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                name="password_confirmation"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#60A5FA] text-white rounded-md p-4 mt-4 hover:bg-[#60A5FA]/90 cursor-pointer font-semibold"
          >
            Create An Account
          </button>

          {/* Error message */}
          <span className="list-disc list-inside text-red-400 font-semibold mt-2 text-base">
            {errors}
          </span>
          <span className="mt-4 text-center text-base text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => {
                onToggleSignIn();
                onToggleSignUp();
              }}
              type="button"
              className="text-[#60A5FA] font-semibold cursor-pointer hover:underline"
            >
              Sign in
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUpPopUp;
