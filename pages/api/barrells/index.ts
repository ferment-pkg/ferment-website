import fs from "fs";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import child from "child_process";
type Data = Barrell[];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //shell
  const Barrells: Barrell[] = [];
  let finished = false;
  if (!fs.existsSync("ferment")) {
    const c = child.exec("git clone https://github.com/ferment-pkg/ferment");
    c.on("exit", () => {
      try {
        fs.rmdirSync("ferment/bin", { recursive: true });
        fs.rmdirSync("ferment/images", { recursive: true });
        fs.rmdirSync("ferment/cmd", { recursive: true });
        fs.rmSync("ferment/go.mod");
        fs.rmSync("ferment/go.sum");
        fs.rmSync("ferment/main.go", { recursive: true });
      } catch (err) {
        console.log(err);
      }
      finished = true;
    });
  } else {
    // const c = child.exec("cd ferment && git pull");
    // c.on("exit", () => {
    //   finished = true;
    // });
  }
  while (!finished) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  for (const file of fs.readdirSync("ferment/Barrells")) {
    if (!file.endsWith(".py") || file == "index.py") {
      continue;
    }
    const name = file.replace(".py", "");
    const content = fs
      .readFileSync(`ferment/Barrells/${file}`, "utf8")
      .split("\n");
    let description = content
      .find((line) => line.includes("description"))
      ?.split("=")[1]
      .replaceAll("\t", "")
      .replaceAll('"', "") as string;
    const download = content
      .find((line) => line.includes("url"))
      ?.split("=")[1]
      .replaceAll("\t", "")
      .replaceAll("'", "")
      .replaceAll('"', "") as string;
    const git =
      content.find((line) => line.includes("git"))?.split("=")[1] == "True";
    const dependencies = content
      .find((line) => line.includes("dependencies"))
      ?.split("=")[1]
      .replaceAll("\t", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll(" ", "")
      .replaceAll("'", "")
      .replaceAll('"', "") as string;
    const home = content
      .find((line) => line.includes("homepage"))
      ?.split("=")[1]
      .replaceAll("\t", "")
      .replaceAll('"', "") as string;
    Barrells.push({
      name,
      description,
      download,
      git,
      dependencies: dependencies ? dependencies.split(",") : undefined,
      home,
    });
  }
  res.status(200).send(Barrells);
}
