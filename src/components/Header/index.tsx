import IconSearch from "@icons/Search.svg";
import IconCart from "@icons/Cart.svg";
import Nav from "./Nav";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { mutate } = api.post.logout.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message, {
        position: "bottom-right",
      });
      await router.push("/login");
    },
  });

  return (
    <>
      <header className={`mt-4 w-full bg-transparent`}>
        <div className="flex justify-end">
          <div className="flex gap-4 px-6 text-sm text-brand-black-100">
            <button disabled>Help</button>
            <button disabled>Orders & Returns</button>
            <button
              onClick={() => mutate()}
              className="cursor-pointer"
              disabled={router.asPath === "/" ? false : true}
            >
              {router.asPath === "/" ? "Logout" : "Login"}
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="flex h-full items-center justify-between px-0 py-4 lg:py-5">
            <div className="text-2xl font-bold md:text-3.5xl">ECOMMERCE</div>
            <div className="hidden h-full w-full items-center justify-center lg:flex">
              <Nav />
            </div>
            <div className="flex items-center gap-x-6">
              <IconSearch />
              <IconCart />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
