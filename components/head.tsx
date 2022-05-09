import NextHead from "next/head";
import { useRouter } from "next/router";
const Head = () => {
  const router = useRouter();
  const title = router.pathname.split("/").pop();
  console.log(title);
  return (
    <NextHead>
      <title>Ferment - PKG Manager</title>
      {/*description*/}
      <meta
        name="description"
        content="Fast, Efficent And Open Source Package Manager For MacOS"
      />
      <meta property="og:title" content="Ferment - PKG Manager" />
      <meta
        property="og:description"
        content="Fast, Efficent And Open Source Package Manager For MacOS"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ferment" />
      <meta property="og:image" content="https://ferment.tk/logo.svg" />
      <meta property="og:color" content="#413FE0" />
      <meta property="og:url" content="https://ferment.tk/" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/logo.svg" />
    </NextHead>
  );
};
export default Head;
