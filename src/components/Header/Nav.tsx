import NavItem from "./NavItem";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <NavItem href="/categories" target="_self">
          Categories
        </NavItem>
        <NavItem href="/game-of-life" target="_self">
          Game of life
        </NavItem>
      </ul>
    </nav>
  );
};

export default Nav;
