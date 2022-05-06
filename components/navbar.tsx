import { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import Link from "next/link";
const NavBar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    document.onscroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
  });
  return (
    <nav
      className={`w-full bg-slate-700 p-20 text-teal-50 bg-gradient-to-bl from-slate-500`}
    >
      <p
        className={`${styles.title} text-center text-2xl text-opacity-5 font-bold`}
      >
        <Link href="/">Ferment</Link>
      </p>
    </nav>
  );
};
export default NavBar;
