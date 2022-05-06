import Navbar from "../../components/navbar";
import Head from "../../components/head";
import { useState } from "react";
import Link from "next/link";
export default function Barrells({ barrels }: { barrels: any[] }) {
  const [barrellsFilter, setBarrells] = useState(barrels);
  return (
    <div>
      <Navbar />
      <Head />
      <div className="container flex justify-center flex-col flex-1 m-auto">
        <h1 className="text-2xl text-center m-4">Barrells</h1>
        <input
          className="bo border-4 w-40 m-auto mb-1"
          placeholder="Search"
          onChange={(e) => {
            setBarrells(
              barrels.filter((barrel) => {
                return barrel.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase());
              })
            );
          }}
        ></input>
        <div className="row">
          {barrellsFilter.map((barrel: Barrell) => (
            <div
              key={barrel.name}
              className="flex justify-center w-fit m-auto bg-slate-600 mt-2 rounded-lg p-3"
            >
              <p className="float-left mr-2 font-bold text-white">
                <Link href={`/barrells/${barrel.name}`}>{barrel.name}</Link>
              </p>
              <p className="float-right text-white"> {barrel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await (await fetch("http://localhost:3000/api/barrells")).json();
  return {
    props: {
      barrels: res,
    },
  };
}
