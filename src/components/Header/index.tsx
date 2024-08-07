import IconSearch from "@icons/Search.svg";
import IconCart from "@icons/Cart.svg";
import Nav from "./Nav";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import LoginIcon from "@icons/Login.svg";
import LogoutIcon from "@icons/Logout.svg";
import Link from "next/link";
const Header = () => {
  const router = useRouter();
  const publicRoutes = ["/login", "/sign-up", "/verify-email"];
  const { mutate } = api.post.logout.useMutation({
    onSuccess: async (data) => {
      toast.success(data.message, {
        position: "bottom-right",
      });
      await router.push("/login");
    },
  });

  const handleLoginLogout = () => {
    if (publicRoutes.includes(router.asPath)) {
      router.push("/login");
    } else {
      mutate();
    }
  };

  return (
    <>
      <header>
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="flex h-full items-center justify-between px-0 py-4 lg:py-5">
            <Link className="block text-2xl font-bold md:text-3.5xl" href="/">
              Moonshot
            </Link>
            <div className="hidden h-full w-full items-center justify-center lg:flex">
              <Nav />
            </div>
            <div className="flex items-center gap-x-6">
              <IconSearch />
              <IconCart />
              <button
                onClick={handleLoginLogout}
                className="flex cursor-pointer items-center"
              >
                {!publicRoutes.includes(router.asPath) ? (
                  <>
                    <LogoutIcon className="h-6 w-6 text-gray-700" />
                    <span className="ml-1">Logout</span>
                  </>
                ) : (
                  <>
                    <LoginIcon className="h-6 w-6 text-gray-700" />
                    <span className="ml-1">Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
