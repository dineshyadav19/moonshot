import NavItem from "./NavItem";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <NavItem href="/categories">Categories</NavItem>
        <NavItem href="/game-of-life">Game of life</NavItem>
      </ul>
    </nav>
  );
};

export default Nav;
