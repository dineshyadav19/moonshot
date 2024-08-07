import PlayIcon from "@icons/Play.svg";
import CategoriesIcon from "@icons/Category.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="rounded-lg border border-solid border-gray-400  p-4 md:px-10 md:pb-20 md:pt-10">
      <h1 className="text-center text-3xl font-semibold">
        Welcome to Moonshot !
      </h1>
      <div className="mt-10 flex flex-col items-center justify-center gap-6">
        <Link
          href={"/game-of-life"}
          className="inline-flex items-center justify-center rounded-[4px] border-[1px] border-solid bg-white px-6 py-5 text-sm font-semibold uppercase leading-4 text-[#081e31] transition-colors hover:border-[#112f49] hover:bg-[#f6f6f6] focus:border-blue-800"
        >
          <PlayIcon className="h-10 w-10" />
          <span className="ml-2 text-xl">Play Game of life</span>
        </Link>
        <Link
          href={"/categories"}
          className="inline-flex items-center justify-center rounded-[4px] border-[1px] border-solid bg-white px-6 py-5 text-sm font-semibold uppercase leading-4 text-[#081e31] transition-colors hover:border-[#112f49] hover:bg-[#f6f6f6] focus:border-blue-800"
        >
          <CategoriesIcon className="h-10 w-10" />
          <span className="ml-2 text-xl">Go to Categories</span>
        </Link>
      </div>
    </div>
  );
}
