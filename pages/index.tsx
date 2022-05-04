import type { NextPage } from 'next'
import Head from '../components/head'
import NavBar from '../components/navbar'
import styles from './index.module.scss'
const Home: NextPage = () => {
  return (
    <div>
      <Head/>
      <NavBar/>
      <div className="container mx-auto px-4 pt-8 flex justify-center align-middle flex-col">
        <h1 className="text-center text-3xl font-bold">Welcome to Ferment</h1>
        <p className="text-center text-xl pt-2">A package manager for MacOS</p>
        {/* Make Center */}
        <p className={`text-center bg-black text-white ${styles.download}`}>Download</p>
      </div>
    </div>

  )
}

export default Home
