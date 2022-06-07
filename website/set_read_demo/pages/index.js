
import { Contract, providers } from "ethers";
import Web3Modal from "web3modal";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { abi, MY_CONTRACT_ADDRESS } from "../constants";
import { message, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useState } from "react";

export default function MyApp() {

  const [inputValue, setInputValue] = useState("")

  const handleInput = event => {
    setInputValue(event.target.value);
  };


  const GetBlockChain = async () => {
    message.loading("loading")
    let provider = new providers.AlchemyProvider("rinkeby", "-MKh-62Yjr40C7oNdOLUQBRi4rqRpWEY") // network, apikey
    const contractApi = new Contract(MY_CONTRACT_ADDRESS, abi, provider)
    let currentValue = await contractApi.getMood()
    console.log(currentValue)
    message.destroy()
    message.success(currentValue)
  }

  const SetBlockChain = async () => {
    message.loading("setting")
    const web3Modal = new Web3Modal({
      network: "rinkeby",
      cacheProvider: true,
      providerOptions: {}
    });

    const instance = await web3Modal.connect();
    const provider = new providers.Web3Provider(instance);
    const signer = provider.getSigner();
    let contractApi = new Contract(
      MY_CONTRACT_ADDRESS,
      abi,
      signer
    )
    const tx = await contractApi.setMood(inputValue)
    await tx.wait();
    message.destroy()
    message.success("set success")
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
            <Input.Group compact>
              <Input style={{ width: 'calc(100% - 200px)' }} placeholder="set a value" onChange={handleInput} />
              <Button onClick={SetBlockChain} type="primary">Submit</Button>
            </Input.Group>
          </div>

          <div className={styles.description}>
            <Button onClick={GetBlockChain} type="primary">Get The value</Button>
          </div>


        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Ayden Lee From China
      </footer>
    </div>
  )
}