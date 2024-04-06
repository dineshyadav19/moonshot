import { useRouter } from "next/router";
import NavItem from "./NavItem";

const Nav = () => {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isCurrentRoute = (route: string) => {
    return router.asPath === route || router.asPath.startsWith(route);
  };

  return (
    <nav>
      <ul className="flex items-center justify-between">
        <NavItem isActive={isCurrentRoute("/categories")} href="/categories">
          Categories
        </NavItem>
        <NavItem isActive={isCurrentRoute("/sale")} href="/sale">
          Sale
        </NavItem>
        <NavItem isActive={isCurrentRoute("/clearance")} href="/clearance">
          Clearance
        </NavItem>
        <NavItem isActive={isCurrentRoute("/new-stock")} href="/new-stock">
          New Stock
        </NavItem>
        <NavItem isActive={isCurrentRoute("/trending")} href="/trending">
          Trending
        </NavItem>
      </ul>
    </nav>
  );
};

export default Nav;
