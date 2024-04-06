import Link from "next/link";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  target?: "_self" | "_blank" | "_parent" | "_top";
};

const NavItem: React.FC<NavItemProps> = ({
  href,
  isActive,
  target = "_blank",
  children,
}) => {
  return (
    <li className="relative mx-4 transition-all xl:mx-5">
      <Link
        href={href}
        target={target}
        className={`text-base font-medium tracking-normal transition-opacity ${
          isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
        } text-black`}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
