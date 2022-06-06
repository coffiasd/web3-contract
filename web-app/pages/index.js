
import { Contract, providers, utils, signer, getDefaultProvider } from "ethers";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { abi, MY_CONTRACT_ADDRESS } from "../constants";

export default function MyApp() {

  const ConnectToWallet = async () => {
    const provider = new providers.AlchemyProvider("rinkeby", "-MKh-62Yjr40C7oNdOLUQBRi4rqRpWEY") // network, apikey
    // let provider = getDefaultProvider()
    console.log(MY_CONTRACT_ADDRESS, abi)
    const contractApi = new Contract(MY_CONTRACT_ADDRESS, abi, provider)

    let contractWithSigner = contractApi.connect(wallet);
    contractWithSigner.setMood("this is my mood")

    console.log(contractApi)
    let currentValue = await contractApi.getMood()
    console.log(currentValue)
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