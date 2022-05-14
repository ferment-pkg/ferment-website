/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "../pages/index.module.scss";
export default function FileViewer({
  file,
  setShow,
}: {
  file: string;
  setShow: any;
}) {
  const [isClicked, setisClicked] = useState(false);
  setInterval(() => {
    if (isClicked) {
      setisClicked(false);
    }
  }, 2500);
  console.log(file);
  return (
    <div className="container mx-auto px-4 pt-8 flex justify-center flex-col w-fit flex-1 z-50 absolute left-0 right-0 m-auto">
      <h1 className="text-center font-mono text-2xl font-bold m-2">File</h1>

      <code className="w-fit h-fit m-auto bg-slate-800 text-white whitespace-pre-wrap p-4 ">
        {file}
      </code>
      <button
        className="m-auto bg-black text-white w-20 p-4
      mt-4 rounded-xl"
        onClick={() => {
          setShow(false);
        }}
      >
        Close
      </button>
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
      <button
        className="m-auto bg-black text-white w-20 p-4
      mt-4 rounded-xl"
        onClick={() => {
          navigator.clipboard.writeText(file);
          setisClicked(true);
        }}
      >
        Copy
      </button>
    </div>
  );
}
