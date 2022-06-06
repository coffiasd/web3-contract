
import { Contract, providers, utils, signer } from "ethers";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { abi, MY_CONTRACT_ADDRESS } from "../constants";

export default function MyApp() {

  const ConnectToWallet = async () => {
    const provider = new providers.AlchemyProvider("rinkeby", "-MKh-62Yjr40C7oNdOLUQBRi4rqRpWEY") // network, apikey
    const contractApi = new Contract(MY_CONTRACT_ADDRESS, abi, provider)
    console.log(contractApi)
  }

  return (
    <div>
      <Head>
        <title>Crypto Devs</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Demo Page!</h1>
          <div className={styles.description}>
            <button onClick={ConnectToWallet} className={styles.button}>
              Connect
            </button>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by echo lee
      </footer>
    </div>
  )
}