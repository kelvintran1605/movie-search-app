import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative inset-0 w-full h-[700px] z-10 flex">
      <div className="w-full h-full relative">
        <img
          className="w-full h-full object-cover"
          src="/hero.webp"
          alt="Hero"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/20 z-10" />

        <div className="tracking-wider w-full text-white absolute top-0 pt-20 pl-10 bottom-0 z-30 flex flex-col justify-center gap-5 lg:pl-30">
          <h1 className="text-[35.2px] font-bold relative w-[80%] lg:w-[50%] leading-tight lg:text-5xl">
            All the Movies You Love. All in One Place.
            <img
              className="w-28 absolute hidden -top-16 -left-28 -rotate-16 drop-shadow-lg lg:block"
              src="/CinemaStar.png"
            />
          </h1>
          <p className="text-2xl w-[90%] lg:w-[45%]">
            Search across a world of blockbusters, indie gems, award-winning
            films, and hidden treasures.
          </p>
          <Link
            to={`/movies/popular`}
            className="
                px-2 py-2 mt-4
                bg-linear-to-r from-[#3B82F6] to-[#60A5FA]
                text-white font-semibold
                rounded-full flex items-center justify-center
                shadow-md shadow-blue-500/20
                transition-all duration-300
                hover:shadow-lg hover:shadow-blue-400/30
                hover:scale-[1.04]
                cursor-pointer w-40"
          >
            Discover Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
