/* eslint-disable @next/next/no-img-element */
import "@fortawesome/fontawesome-free/css/all.min.css";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "../components/head";
import NavBar from "../components/navbar";
import styles from "./index.module.scss";
const Home: NextPage = () => {
  const [isClicked, setisClicked] = useState(false);
  const site = "https://ferment.tk/install.sh";
  const command = `curl -SsL ${site} | sh`;
  useEffect(() => {
    if (isClicked == true) {
      setInterval(() => {
        setisClicked(false);
      }, 2500);
    }
  }, [isClicked]);
  return (
    <div>
      <Head />
      <NavBar />
      <div className="container mx-auto px-4 pt-8 flex justify-center flex-col w-auto flex-1 text-center">
        <h1 className="text-center text-3xl font-bold">Welcome to Ferment</h1>
        <p className="text-center text-xl pt-2">A package manager for MacOS</p>
        {/* Make Center */}

        <img
          src="/tooltip.svg"
          alt="tooltip"
          width={"40px"}
          height="40px"
          className={`${isClicked ? styles.tooltip : "hidden"} `}
        />
        <span className={`${isClicked ? styles.tooltip : "hidden"} `}>
          Copied
        </span>
        <code
          className="language-bash before:content-['$'] before:text-green-600 bg-slate-800 text-white p-3 text-center pl-4 pr-4 overflow-x-scroll hover:cursor-pointer w-fit m-auto"
          onClick={() => {
            navigator.clipboard.writeText(command);
            setisClicked(true);
          }}
        >
          {" "}
          <span className="text-red-600">curl</span>{" "}
          <span className="text-green-300">-SsL</span> {site} | sh
        </code>
        <h1 className="font-bold text-xs text-center w-1/3 m-auto mt-5">
          Ferment is a fast and open source way to install packages on MacOS, it
          it community driven and open source. Packages Are Easy To Install And
          Make. Ferment uses the same concepts of a very popular package manager
          called brew while being much faster.
        </h1>
        <h1 className="font-bold text-2xl m-5">Resources:</h1>
        <h1 className="font-bold text-xl m-5">
          <Link href="/barrells">Browse All Barrells</Link>
        </h1>
        <h1 className="font-bold text-xl m-5">
          <Link href="/create">Make Your Own - Beta</Link>
        </h1>
        <h1 className="font-bold text-xl m-5">
          <Link href="https://github.com/ferment-pkg/ferment/blob/main/README.md">
            Documentation
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Home;
