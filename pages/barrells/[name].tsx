/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "../../components/head";
import Navbar from "../../components/navbar";
import styles from "../index.module.scss";
export default function Barrell({ barrell }: { barrell: Barrell }) {
  const command = `ferment install ${barrell.name}`;
  const [isClicked, setisClicked] = useState(false);
  useEffect(() => {
    if (isClicked == true) {
      setInterval(() => {
        setisClicked(false);
      }, 1500);
    }
  }, [isClicked]);
  return (
    <div>
      <Navbar />
      <Head />
      <div className="container flex justify-center flex-col flex-1 m-auto">
        <h1 className="text-2xl text-center m-4">{barrell.name}</h1>
        <p className="text-center">{barrell.description}</p>
        {barrell.home ? (
          <span className="text-center m-auto text-blue-500">
            <Link href={barrell.home}>{barrell.home}</Link>
          </span>
        ) : null}
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
          className="before:content-['$'] before:text-green-600 bg-slate-800 text-white w-fit p-2 m-auto mt-4 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(command);
            setisClicked(true);
          }}
        >
          {" "}
          ferment install {barrell.name}
        </code>
        <h1 className="text-center text-xl font-bold">Dependencies</h1>-
        <div className="flex flex-row justify-center">
          {barrell.dependencies?.map((barrell) => [
            <span className="text-green-600 text-center m-1" key={barrell}>
              {barrell}
            </span>,
          ]) || <span className="text-center text-red-500">NONE</span>}
        </div>
        <h1 className="text-center text-xl font-bold">Download URL</h1>
        <p className="text-center text-xl m-2 text-blue-500 ">
          <Link href={barrell.download}>{barrell.download}</Link>
        </p>
      </div>
    </div>
  );
}
export async function getServerSideProps({
  req,
  query,
}: {
  req: any;
  query: any;
}) {
  const res = await (
    await fetch(`http://${req.headers.host}/api/barrells/${query.name}`)
  ).json();
  return {
    props: {
      barrell: res,
    },
  };
}
