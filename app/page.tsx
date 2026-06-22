import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-miami-blue flex flex-col justify-center items-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-black">
        Welcome to Cosmic Cargo Network
      </h1>
      <p className="text-xl text-black">
        Ready to start your journey? Choose an origin to begin selecting your
        route.
      </p>
      <Link
        href="/select-origin"
        className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
      >
        Start Route Selection
      </Link>
    </div>
  );
};

export default HomePage;
