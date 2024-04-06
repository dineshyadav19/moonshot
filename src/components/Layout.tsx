import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div id="content" className="mx-auto max-w-xl px-6 py-10">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
