import Head from "next/head";
import Header from "./Header";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type LayoutProps = {
  children: React.ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Moonshot</title>
        <meta name="description" content="ECommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`font-sans ${inter.variable}`}>
        <Header />
        <div id="content" className="mx-auto max-w-xl px-6 py-10">
          {children}
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
