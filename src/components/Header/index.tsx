import IconSearch from "@icons/Search.svg";
import IconCart from "@icons/Cart.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <div className="h-16"></div>
      <header
        className={`fixed top-0 z-30 w-full bg-transparent transition-all duration-300`}
      >
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="relative flex h-full items-center justify-between px-0 py-4 lg:py-5">
            <div className="text-3.5xl relative z-10 font-bold">ECOMMERCE</div>

            <div className="relative z-10 flex items-center gap-x-3">
              <IconSearch />
              <IconCart />
            </div>
            <div className="absolute inset-0 z-0 hidden h-full w-full items-center justify-center lg:flex">
              <Nav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
