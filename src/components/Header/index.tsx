import IconSearch from "@icons/Search.svg";
import IconCart from "@icons/Cart.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <header
        className={`z-30 h-16 w-full bg-transparent transition-all duration-300`}
      >
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="relative flex h-full items-center justify-between px-0 py-4 lg:py-5">
            <div className="relative z-10 text-3.5xl font-bold">ECOMMERCE</div>

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
