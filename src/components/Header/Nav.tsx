import NavItem from "./NavItem";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <NavItem href="/categories">Categories</NavItem>
        <NavItem href="/sale">Sale</NavItem>
        <NavItem href="/clearance">Clearance</NavItem>
        <NavItem href="/new-stock">New Stock</NavItem>
        <NavItem href="/trending">Trending</NavItem>
      </ul>
    </nav>
  );
};

export default Nav;
