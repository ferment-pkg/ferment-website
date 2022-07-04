import { useState } from "react";
import FileViewer from "../components/fileviewer";
import Head from "../components/head";
import NavBar from "../components/navbar";
export default function CreatePage() {
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [url, setURL] = useState<string>("");
  const [home, setHome] = useState<string>("");
  const [git, setGit] = useState<boolean>(false);
  const [binary, setBinary] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [lib, setLib] = useState<boolean>(false);
  const [file, setFile] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [install, setInstall] = useState<string>(
    `
    def install(self):
    `
  );
  const methods: {
    name: string;
    values?: {
      name: string;
      type: "string" | "array" | "number" | "boolean";
    }[];
    cmd: string;
    description: string;
    multiple?: boolean;
  }[] = [
    {
      name: "Symlink",
      values: [
        { name: "dest", type: "string" },
        { name: "src", type: "string" },
      ],
      cmd: `
import os 
os.symlink("{{dest}}", "{{src}}")`,
      description: "Symlink a file or directory",
      multiple: true,
    },
    {
      name: "Make",
      cmd: `
import subprocess
subprocess.call(["make"], cwd=self.cwd)`,
      description: "Run make",
    },
    {
      name: "Make Install",
      cmd: `
import subprocess
subprocess.call(["make", "install"], cwd=self.cwd)`,
      description: "Run make install",
    },
    {
      name: "Configure",
      values: [{ name: "args", type: "array" }],
      cmd: `
import subprocess
args={{args}}
subprocess.call(["configure", *args], cwd=self.cwd)`,
      description: "Run configure",
    },
  ];
  return (
    <div>
      <Head />
      <NavBar />
      {show ? <FileViewer file={file} setShow={setShow} /> : null}
      <div
        className={`container mx-auto px-4 pt-8 flex justify-center flex-col w-auto flex-1 text-center  ${
          show ? "hidden" : ""
        }`}
      >
        <h1 className="text-center font-mono text-2xl font-bold">
          Barrells Maker
        </h1>
        <div
          className={`text-center font-mono m-10 flex flex-col w-full `}
          id="form"
        >
          <input
            type="text"
            placeholder="Name"
            className="border-2 m-auto w-fit"
            onChange={(e) => {
              setError(null);
              if (e.target.value === "" || e.target.value === "") {
                setError("Name is required");
                return;
              }
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Description"
            className="border-2 m-auto w-fit mt-4"
            onChange={(e) => {
              setError(null);
              if (e.target.value === "" || e.target.value === "") {
                setError("Name is required");
                return;
              }
              setDescription(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Download URL - .tar.gz || .git"
            className="border-2 m-auto w-80 mt-4"
            onChange={(e) => {
              setError(null);
              if (
                e.target.value === "" ||
                e.target.value === "" ||
                !validateUrl(e.currentTarget.value) ||
                (!e.target.value.endsWith("tar.gz") &&
                  !e.target.value.endsWith("git"))
              ) {
                setError("URL is required");
              }
              setURL(e.target.value);
              setGit(e.target.value.endsWith(".git"));
            }}
          />
          <input
            type="text"
            placeholder="Home Page"
            className="border-2 m-auto w-fit mt-4"
            onChange={(e) => {
              setError(null);
              setHome(e.target.value);
              if (e.target.value.length == 0) {
                setError(null);
                return;
              }
              if (!validateUrl(e.target.value)) {
                setError("Home URL Is Not Valid");
              }
              setHome(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="binary"
            className="border-2 m-auto w-fit mt-4"
            onChange={(e) => {
              setBinary(e.target.value);
            }}
          />
          <p className="m-auto w-fit mt-4">Dependencies</p>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (
                  e.currentTarget.value == "" ||
                  e.currentTarget.value == undefined ||
                  dependencies.find((dep) => dep == e.currentTarget.value) ||
                  e.currentTarget.value.includes(" ")
                ) {
                  return;
                }
                setDependencies([...dependencies, e.currentTarget.value]);
                e.currentTarget.value = "";
              }
            }}
            type="text"
            placeholder="Dependency"
            className="border-2 m-auto w-fit mt-4"
          />
          <div className="overflow-y-scroll h-40 border-2 w-80 m-auto mt-4 mb-4">
            {dependencies.map((d) => (
              <p
                className="text-center after:content-['x'] after:pl-10 after:text-red-500 after:cursor-pointer"
                onClick={() => {
                  setDependencies(dependencies.filter((dep) => dep !== d));
                }}
                key={d}
              >
                {d}
              </p>
            ))}
          </div>
          <label htmlFor="lib" className="m-4">
            Lib :
          </label>
          <select
            name="lib"
            className="m-auto w-fit"
            id="lib"
            onChange={(e) => setLib(e.target.value == "t")}
          >
            <option value="f">False</option>
            <option value="t">True</option>
          </select>
          <h1 className="text-center text-xl m-4">Installation</h1>
          <div className="flex flex-col overflow-x-scroll w-full h-72 m-auto">
            {/* {methods.map((method) => (
              <div key={method.name}>
                <p
                  onClick={() => {
                    setInstall(install + method.cmd);
                    console.log(install);
                  }}
                  className="cursor-pointer"
                >
                  {method.name} - {method.description}
                </p>
                <div className="flex flex-col">
                  {method.values?.map((m) => (
                    <input
                      type={"text"}
                      placeholder={m.name}
                      key={m.name}
                      onChange={(e) => {}}
                      className="border-2 m-auto w-fit"
                    />
                  ))}
                </div>
              </div>
            ))} */}
            <div>
              <p>Editor</p>
              <textarea
                className="border-2 resize-none w-1/2 h-96 mb-2 bg-slate-800 text-white"
                onChange={(e) => setInstall(e.target.value)}
                value={install}
              ></textarea>
            </div>
          </div>

          {/* error */}
          <p className="text-center text-red-600 w-fit m-auto">{error}</p>
        </div>
        <div className="w-full pl-20">
          <button
            className="border-2 w-max pr-5 pl-5 rounded-xl bg-black text-white pt-3 pb-3 mb-4 m-auto "
            onClick={() => {
              if (name === "" || url === "" || description == "") {
                setError("Fields name, description and url are required");
                return;
              } else if (error) {
                return;
              } else {
                setFile(
                  createPYFile(
                    name,
                    description,
                    url,
                    lib,
                    git,
                    home,
                    dependencies,
                    binary,
                    install
                  )
                );
                console.log(install);
                setShow(true);
              }
            }}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
function validateUrl(value: string) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

const template = `# Created With Barrell Tool https://ferment.tk/create
from index import Barrells
class {{name}}(Barrells):
    def __init__(self):
        self.description = "{{description}}"
        self.url = "{{url}}"
        self.git = {{git}}
        self.lib = {{lib}}
        self.home = "{{home}}"
        self.dependencies = {{dependencies}}
        self.binary = "{{binary}}"
    {{install}}
    `;
function createPYFile(
  name: string,
  description: string,
  url: string,
  lib: boolean,
  git: boolean,
  home: string,
  dependencies: string[],
  binary: string,
  install: string
) {
  name = name.replace("-", "");
  name = name.replace("_", "");
  let file = template
    .replace("{{name}}", name)
    .replace("{{description}}", description)
    .replace("{{url}}", url)
    .replace("{{git}}", `${git == true ? "True" : "False"}`)
    .replace("{{lib}}", `${lib == true ? "True" : "False"}`)
    .replace("{{home}}", home)
    .replace("{{binary}}", binary)
    .replace("{{dependencies}}", JSON.stringify(dependencies))
    .replace("{{install}}", install);
  const splitFile = file.split("\n");
  splitFile.forEach((line, index) => {
    console.log(line);
    if (line.endsWith('""')) {
      splitFile.splice(index, 1);
    }
  });
  return splitFile.join("\n");
}
