import Link from "next/link";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  target?: "_self" | "_blank" | "_parent" | "_top";
};

const NavItem: React.FC<NavItemProps> = ({
  href,
  target = "_blank",
  children,
}) => {
  return (
    <li className="relative mx-4 transition-all xl:mx-5">
      <Link
        href={href}
        target={target}
        className={`text-base font-medium tracking-normal text-black opacity-70 transition-opacity hover:opacity-100`}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
