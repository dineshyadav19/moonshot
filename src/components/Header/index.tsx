import IconSearch from "@icons/Search.svg";
import IconCart from "@icons/Cart.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <header className={`mt-4 w-full bg-transparent`}>
        <div className="flex justify-end">
          <div className="flex gap-4 px-6 text-sm text-brand-black-100">
            <button disabled>Help</button>
            <button disabled>Orders & Returns</button>
            <button>Hi, John</button>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="flex h-full items-center justify-between px-0 py-4 lg:py-5">
            <div className="relative z-10 text-3.5xl font-bold">ECOMMERCE</div>
            <div className="z-0 hidden h-full w-full items-center justify-center lg:flex">
              <Nav />
            </div>
            <div className="relative z-10 flex items-center gap-x-6">
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
