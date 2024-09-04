import React, { useState, useEffect, useMemo, useCallback, useLayoutEffect } from 'react'
//import { WalletTgSdk } from 'https://cdn.jsdelivr.net/npm/@blockchain-web3/web3-tg-sdk@0.1.6'
import { WalletTgSdk } from '@uxuycom/web3-tg-sdk'
import { ethers } from 'ethers'
import clsx from 'clsx'
import { Toast } from 'antd-mobile'
import Btn from '../../components/Btn'
import { approveABI, CHAINS, erc20Abi } from '../../config'
import { KEY_STORE } from '../../constance'
const DEFAULT_CHAIN_ID = '0x38' // BSC

const walletTgSdk = new WalletTgSdk()


const { ethereum } = walletTgSdk


async function getTokenInfo(contract, rpc) {
  const provider = new ethers.JsonRpcProvider(rpc)
  try {
    const tokenContract = new ethers.Contract(contract, erc20Abi, provider);
    const [name, symbol, totalSupply, decimals, balance] = await Promise.all([
      tokenContract.name?.()?.catch(_ => ""),
      tokenContract.symbol(),
      tokenContract.totalSupply(),
      tokenContract.decimals(),
      ethereum.selectedAddress ? tokenContract.balanceOf(ethereum.selectedAddress) : Promise.resolve(0)

    ])
    provider.destroy()
    return {
      name,
      symbol,
      totalSupply,
      decimals,
      balance: ethers.formatUnits(balance, decimals)
    }
  } catch (error) {
    provider.destroy()
    throw error
  }
}

async function getTokenInfoViews(_rpc) {
  const rpc = _rpc || document.querySelector('#transaction_token_rpc').value;
  if(!rpc) {
    return
  }
  const contract = document.querySelector('#transaction_token_contract').value
  if (contract.length != 42) return
  
  document.querySelector('#select_token_info').innerHTML = `loading...`

  try {
    const {
      name,
      symbol,
      totalSupply,
      decimals,
      balance
    } = await getTokenInfo(contract, rpc)

    document.querySelector("#select_token_info").innerHTML = `
            <p>Token Name: ${name}</p>
            <p>Token Symbol: ${symbol}</p>
            <p>Token Total Supply: ${ethers.formatUnits(totalSupply, decimals)}</p>
            <p>Token Decimals: ${decimals}</p>
            <p>Token Balance: ${balance}</p>
      `
  } catch (error) {
    console.log(error)
    document.querySelector("#select_token_info").innerHTML = `
       ${error?.message}
    `
  }
}
const defaultChainConfig = CHAINS.find(chain => String(chain.chainId) === DEFAULT_CHAIN_ID)

function App() {
  const [state, setState] = useState({
    appInfo: null,
    // address: null,
    // chainId: '',
    signature: null,
    eth_signTypedData_v4: null,
    message: "DApp demo",
    transaction: defaultChainConfig.transaction,
    transaction_token: defaultChainConfig.transaction_token,
    transaction_contract: defaultChainConfig.transaction_contract,
    chainRPCs: defaultChainConfig.chainRPCs,
  })

  const [ chainId ,setChainId] = useState("0x1")
  const [ address, setAddress ] = useState("")


  const [btnLoadingConnect, setBtnLoadingConnect] = useState(false)
  const [signMessageContext, setSignMessageContext] = useState('Hello world')
  const [btnLoadingSign, setBtnLoadingSign] = useState(false)
  const [btnLoadingSignV4, setBtnLoadingSignV4] = useState(false)
  const [btnLoadingSend, setBtnLoadingSend] = useState(false)
  const [btnLoadingHash, setBtnLoadingHash] = useState(false)
  const [btnLoadingApprove, setBtnLoadingApprove] = useState(false)
  const [btnLoadingTokenHash, setBtnLoadingTokenHash] = useState(false)
  const [btnLoadingTokenTran, setBtnLoadingTokenTran] = useState(false)
  const [signV4Value, setSignV4Value] = useState(`{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Group":[{"name":"name","type":"string"},{"name":"members","type":"Person[]"}],"Mail":[{"name":"from","type":"Person"},{"name":"to","type":"Person[]"},{"name":"contents","type":"string"},{"name":"attachment","type":"bytes"}],"Person":[{"name":"name","type":"string"},{"name":"wallets","type":"address[]"}]},"primaryType":"Mail","domain":{"chainId":"1","name":"Ether Mail","verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC","version":"1"},"message":{"from":{"name":"Cow","wallets":["0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF"]},"to":[{"name":"Bob","wallets":["0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB","0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57","0xB0B0b0b0b0b0B000000000000000000000000000"]}],"contents":"Hello, Bob!","attachment":"0x"}}`)

  const [verifyMessageResult, setVerifyMessageResult] = useState(null)

  const [notification, setNotification] = useState(null)


  useLayoutEffect(() => {
    init()
  }, [])


  
  function initEventListener() {
    // events
    ethereum.removeAllListeners()
    function handleAccountsChanged(accounts) {
        setAddress(accounts[0])
    }
    function handleChainChanged(_chainId) {
       setChainId("0x"+Number(_chainId).toString(16))
    }

    ethereum.on('accountsChanged',handleAccountsChanged)
    ethereum.on('chainChanged', handleChainChanged)
  }
  


  // get chainId, address
  const init =  async () => {
    window?.Telegram?.WebApp?.expand?.()

    const accounts = await ethereum.request({ method: 'eth_accounts', params: [] })
    const chainId = await ethereum.request({ method: 'eth_chainId', params: [] })
    const isConnected = accounts[0]
    setChainId(chainId)
    setAddress(accounts[0])
    initEventListener()
    isConnected &&  switchChain(DEFAULT_CHAIN_ID)
 

  }

  useEffect(() => {
    if(!chainId ){
      return
    }

    const chainConfig = CHAINS.find(chain => parseInt(chain.chainId) == parseInt(chainId))
    if(!chainConfig)  {
      return
    }

    const RPC_URL = chainConfig?.chainRPCs?.[0] || ''
    
    setState({
      ...state,
      transaction: chainConfig?.transaction,
      transaction_token: { ...chainConfig.transaction_token, rpc: RPC_URL },
      transaction_contract: chainConfig?.transaction_contract,
      chainRPCs: chainConfig?.chainRPCs,
    })
    getTokenInfoViews(RPC_URL)
  }, [chainId])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, isSuccess = true) => {
    setNotification({ message, isSuccess });
    Toast.show({
      content: <div className={clsx('text-body1 font-semibold text-center', isSuccess ? 'text-White' : 'text-White')}>{message}</div>,
      position: 'top',
      maskClassName: 'bg-bg_0',
      duration: 3000
    })
  }
  


  // Get App Info Event
  const getAppInfo = () => {
    const appInfo = ethereum?.getAppInfo?.()
    setState({ ...state, appInfo });
    showNotification("App info retrieved successfully");
  };

  // Connect Wallet Event
  const connectWallet = async () => {
    //if(btnLoadingConnect) return
    setBtnLoadingConnect(true)
    try {
      await ethereum.request({
        method: 'eth_requestAccounts',
        params: [],
      })
      
      const accounts = await ethereum.request({ method: 'eth_accounts', params: [] })
      const chainId = await ethereum.request({ method: 'eth_chainId', params: [] })
      setAddress(accounts[0])
      setChainId(chainId)
      showNotification('Wallet connected successfully')  
      switchChain(DEFAULT_CHAIN_ID)

    } catch (error) {
      console.error('Connection failed:', error)
      showNotification('Failed to connect wallet', false)
    }
    setBtnLoadingConnect(false)
  }

  // Switch chian Event
  const switchChain = async (chainId) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      });
      showNotification("Chain switched successfully");
    } catch (error) {
      console.error("Chain switch failed:", error);
      showNotification("Failed to switch chain", false);
    }
  };

  // Sign Message Event
  const signMessage = async () => {
    const signMessage = ethers.isHexString(signMessageContext) ? signMessageContext :ethers.hexlify(ethers.toUtf8Bytes(signMessageContext))
    //if(btnLoadingSign) return
    setBtnLoadingSign(true)
    try {
      const result = await ethereum.request({
        method: 'personal_sign',
        params: [signMessage, address],
      })
      setState({ ...state, signature: result, message: signMessage })
      showNotification('Message signed successfully')
    } catch (error) {
      console.error('Message signing failed:', error)
      showNotification('Failed to sign message', false)
    }
    setBtnLoadingSign(false)
  }
  function verifySignMessage() {
    if(!state.signature) {
      Toast('Please sign first');
      return;
    }

    const recoveredAddress = ethers.verifyMessage(signMessageContext, state.signature);

    setVerifyMessageResult(recoveredAddress)
  }

  // Sign Message v4 Event
  const signMessage_v4 = async () => {
    const message = signV4Value
    //if(btnLoadingSignV4) return
    setBtnLoadingSignV4(true)
    try {
      const result = await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [message],
      })
      setState({
        ...state, ['eth_signTypedData_v4']: {
          message: message,
          signature: result
        }
      })
      showNotification('Message signed successfully')
    } catch (error) {
      console.error('Message signing failed:', error)
      showNotification('Failed to sign message', false)
    }
    setBtnLoadingSignV4(false)
  }

  // Send Transaction Event
  const sendTransaction = async () => {
    //if(btnLoadingSend) return
    setBtnLoadingSend(true)
    try {
      const value = state.transaction.value.trim()

      if (value === '') {
        throw new Error('Please enter an amount.')
      }

      if (!/^\d*\.?\d+$/.test(value)) {
        throw new Error('Invalid amount. Please enter a valid number.')
      }

      const numValue = parseFloat(value)
      if (numValue <= 0) {
        throw new Error('Invalid amount. Please enter a positive number.')
      }

      if (!state.transaction.to || !ethers.isAddress(state.transaction.to)) {
        throw new Error('Invalid recipient address.')
      }

      const valueInWei = ethers.parseEther(value).toString()

      const result = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: state.transaction.to,
            value: valueInWei,
          },
        ],
      })
      setState({
        ...state,
        transaction: { ...state.transaction, hash: result },
      })
      showNotification('Transaction sent successfully')
    } catch (error) {
      console.error('Transaction failed:', error)
      showNotification(error.message || 'Failed to send transaction', false)
    }
    setBtnLoadingSend(false)
  }

  const sendTokenTransaction = async () => {
    //if(btnLoadingTokenTran) return
    setBtnLoadingTokenTran(true)
    try {
      const { transaction_token } = state
      const rpc = state.chainRPCs[0]
      const amount = transaction_token.amount
      const to = transaction_token.toAddress
      const contract = transaction_token.contractAddress
      const provider = new ethers.JsonRpcProvider(rpc);
      const tokenContract = new ethers.Contract(contract, erc20Abi, provider);
      const decimals = await tokenContract.decimals();
      const data = tokenContract.interface.encodeFunctionData('transfer', [to, ethers.parseUnits(String(amount), decimals)]);

      const transaction = {
        from: address,
        to: contract,
        data: data
      }
      const result = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [ transaction ],
      })
      setState({ ...state, ['transaction_token']: { ...transaction_token, hash: result } });
      showNotification('Token Transaction sent successfully')
    } catch (error) {
      console.error('Token Transaction failed:', error)
      showNotification(error.message || 'Failed to send Token transaction', false)
    }
    setBtnLoadingTokenTran(false)
  }

  // Get Transaction Receipt Event
  const getTransactionReceipt = async () => {
    //if(btnLoadingHash) return
    setBtnLoadingHash(true)
    try {
      const result = await ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [state.transaction.hash],
      })
      setState({
        ...state,
        transaction: { ...state.transaction, receipt: result },
      })
      showNotification('Transaction receipt retrieved successfully')
    } catch (error) {
      console.error('Get transaction receipt failed:', error)
      showNotification('Failed to get transaction receipt', false)
    }
    setBtnLoadingHash(false)
  }

  // Get transaction token Receipt Event
  const getTransactionHash = async () => {
    //if(btnLoadingTokenHash) return
    setBtnLoadingTokenHash(true)
    try {
      const result = await ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [state.transaction_token.hash],
      })
      const transaction_token = state.transaction_token
      setState({ ...state, transaction_token: { ...transaction_token, receipt: result } })
      showNotification('successfully')
    } catch (error) {
      console.error(error.message || 'error')
      showNotification('Failed', false)
    }
    setBtnLoadingTokenHash(false)
  }




  // Approve Contract Event
  const approveEvent = async () => {
    //if(btnLoadingApprove) return
    setBtnLoadingApprove(true)
    const domSelect = document.querySelector("#approve_select")
    const domInput = document.querySelector("#approve_input_amount")

    const approveUnLimit = domSelect.value == 1
    const amount = approveUnLimit
        ? ethers.MaxUint256
        : (domInput.value == 0 || domInput.value == 2)
            ? 0n
            :ethers.parseUnits(domInput.value, 0);

    const tokenAddress = state.transaction_contract.tokenAddress
    const uniswapAddress = state.transaction_contract.uniswapAddress

    // Create an instance of ethers.Contract
    const abiCoder = new ethers.AbiCoder();
    const iface = new ethers.Interface(approveABI);
    const data = iface.encodeFunctionData('approve', [uniswapAddress, amount]);

    // const amount = ethers.utils.parseUnits('1', 'ether'); // Adjust amount as needed
    const transaction = {
      from: address,
      to: tokenAddress,
      // value: "0x",
      data: data
    }
    try {
      const result = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      })
      setState({ ...state, ['transaction_token']: { ...transaction, hash: result } })
      showNotification('successfully')
    } catch (error) {
      console.error(error.message || 'error')
      showNotification('Failed', false)
    }
    setBtnLoadingApprove(false)
  }

  return (
      <div className='px-[16px] w-full h-full pb-[20px]'>
        {/*{notification && <div className={clsx('mb-4 px-4 rounded-[12px]', notification.isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>{notification.message}</div>}*/}
        <section className='mt-[20px]'>
          <h1 className='text-text_1 text-h3 font-semibold text-center'>Dapp Demo for Wallet</h1>
        </section>

   

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Step 1: Connect Wallet</h3>
            <div className='text-center text-text_1 text-body3 font-Regular mt-[8px]'>Click the button below to view the wallet connection interface</div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="text-body1 font-semibold mb-2 text-brand_1">{state.address ? 'connected' : 'not connected'}</div>
              <div className="text-body1 font-semibold mb-2">Address</div>
              <p className="break-all">{address || ''}</p>
            </div>
            {address ? <Btn text='Disconnect' onClick={() => {
              
              ethereum?.disconnect &&  ethereum?.disconnect?.()
            }} /> : <Btn loading={btnLoadingConnect} text='Connect Wallet' onClick={connectWallet} />}
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Switch Network</h3>
            <select
                // value={chainIdValue}
                value={chainId}
                onChange={(e) => switchChain(e.target.value)}
                className="w-full p-2 border rounded mt-[10px]"
            >
              {CHAINS.map(chain => (
                  <option key={chain.chainId} value={chain.chainId}>{chain.chainName}</option>
              ))}
            </select>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <div className="text-body1 font-semibold">Chain Id:
                {' '}
                {/* <span className='text-Orange'>{formatChainId()}</span> */}
                {' '}
                <span className='text-Orange'>{chainId}</span>
              </div>
            </div>
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Step 2: Sign Message</h3>
            <textarea className='w-full border border-border_1 p-2 my-1 rounded' value={signMessageContext} onChange={e => setSignMessageContext(e.target.value.trim())}></textarea>
            <div className='text-center text-text_1 text-body3 font-Regular mt-[8px]'>Click the button below to view the signature interface</div>
            <Btn loading={btnLoadingSign} text='Sign Message' onClick={signMessage} />
            {state.signature && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-body1 font-semibold mb-2">Signature</h2>
                  <p className="break-all">{state.signature}</p>
                  <h2 className="text-body1 font-semibold mt-4 mb-2">Message</h2>
                  <p>{state.message}</p>
                </div>
            )}
            <hr className='mb-[20px]' />
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Step 2: Sign Message verify</h3>
            <Btn loading={false} text='verify Message' onClick={verifySignMessage} />
            <div className='pt-1 break-words w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
              <b>personal_ecRecover result:</b>
              <br />
              {verifyMessageResult}
            </div>
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Step 2: Sign Message v4</h3>
            <textarea className='mt-[10px] w-full overscroll-auto' id="eth_signTypedData_v4" value={signV4Value} onChange={(e) => setSignV4Value(e.target.value.trim())} rows="6" cols="40" />
            {state.eth_signTypedData_v4 && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-body1 font-semibold mb-2">Signature</h2>
                  <p className="break-all">{state.eth_signTypedData_v4.signature}</p>
                </div>
            )}
            <Btn loading={btnLoadingSignV4} text='Sign Message v4' onClick={signMessage_v4} />
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Step 3: Send Transaction</h3>
            <div className='text-center text-text_1 text-body3 font-Regular mt-[8px]'>Click the button below to view the transfer interface</div>
            <div className='mt-[10px]'>
              <label className="block">To:</label>
              <input
                  type='text'
                  onChange={(e) =>
                      setState({
                        ...state,
                        transaction: {
                          ...state.transaction,
                          to: e.target.value,
                        },
                      })
                  }
                  className="w-full p-2 border rounded leading-[30px] font-Regular"
                  placeholder="Recipient address"
                  value={state.transaction.to}
              />
            </div>
            <div className='mt-[10px]'>
              <label className="block">Value :</label>
              <input
                  type="text"
                  onChange={(e) =>
                      setState({
                        ...state,
                        transaction: {
                          ...state.transaction,
                          value: e.target.value,
                        },
                      })
                  }
                  className="w-full p-2 border rounded leading-[30px] font-Regular"
                  placeholder="Amount in ETH"
                  value={state.transaction.value}
              />
            </div>
            {state.transaction.hash && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <div className="text-body1 font-semibold mb-2 text-text_1">Transaction Hash</div>
                  <p className="break-all">{state.transaction.hash}</p>
                  <Btn loading={btnLoadingHash} text='Get Transaction Receipt' loadingClass='right-[56px]' onClick={getTransactionReceipt}  />
                  {state.transaction.receipt && (
                      <pre className="mt-4 p-4 bg-gray-200 rounded overflow-x-auto">
                      {JSON.stringify(state.transaction.receipt, null, 2)}
                    </pre>
                  )}
                </div>
            )}
            <Btn loading={btnLoadingSend} text='Send Transaction' onClick={sendTransaction} />
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <h3 className='text-center text-text_1 text-h6 font-semibold'>Step 3: Send token Transaction</h3>
            <div className='mt-[10px]'>
              <div className='break-all mt-[10px]'>From:</div>
              <div className='break-all'>{address}</div>
            </div>
            <br />
            {/* <input type="text" /> */}
            {/* <p><b>RPC:</b></p> */}
            {/*onChange={(e) => {
              setState({
                ...state,
                transaction_token: { ...state.transaction_token, rpc: e.target.value },
              })
            }}*/}
            {/* <input type="text" id='transaction_token_rpc' className="w-full p-2 border rounded leading-[30px] font-Regular" disabled value={state.transaction_token.rpc} />
            <br />
            <br /> */}

            <p><b>Token Contract Address:</b></p>
            <input type="text" id='transaction_token_contract' className="w-full p-2 border rounded leading-[30px] font-Regular" value={state.transaction_token.contractAddress} onChange={async (e) => {
              const v = e.target.value
              getTokenInfoViews()
              setState({
                ...state,
                transaction_token: { ...state.transaction_token, contractAddress: v },
              })
            }} />
            <br />
            <br />

            <p id="select_token_info"> </p>
            <br />

            <p><b>to Address:</b></p>
            <input type="text" id='transaction_token_address' className="w-full p-2 border rounded leading-[30px] font-Regular" value={state.transaction_token.toAddress} onChange={(e) => {
              setState({
                ...state,
                transaction_token: { ...state.transaction_token, toAddress: e.target.value },
              })
            }} />
            <br />
            <br />

            <p><b>amount:</b></p>
            <input type="text" id='transaction_token_amount' className="w-full p-2 border rounded leading-[30px] font-Regular" value={state.transaction_token.amount} onChange={(e) => {
              setState({
                ...state,
                transaction_token: { ...state.transaction_token, amount: e.target.value },
              })
            }} />
            {state.transaction_token?.hash && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <div className="text-body1 font-semibold mb-2 text-text_1">Transaction Hash</div>
                  <p className="break-all">{state.transaction_token.hash}</p>
                  <Btn loading={btnLoadingTokenHash} text='Get transaction token Receipt' loadingClass='right-[56px]' onClick={getTransactionHash} />
                  {state.transaction_token.receipt && (
                      <pre className="mt-4 p-4 bg-gray-200 rounded overflow-x-auto">
                      {JSON.stringify(state.transaction_token.receipt, null, 2)}
                    </pre>
                  )}
                </div>
            )}
            <Btn loading={btnLoadingTokenTran} text='Send Token Transaction' onClick={sendTokenTransaction} />
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            {state.appInfo && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-body1 font-semibold mb-2">App Info</h2>
                  <p>Name: {state.appInfo.name}</p>
                  <p>Description: {state.appInfo.description}</p>
                  <p>Icon: <img src={state.appInfo.logo} width={40} /></p>
                  {/*<p>Url: {state.appInfo.url}</p>*/}
                  <p>Version: {state.appInfo.version}</p>
                </div>
            )}
            <Btn text='Get App Info' onClick={getAppInfo} />
          </div>
        </section>

        <section className='mt-[20px]'>
          <div className='w-full px-[12px] py-[16px] bg-bg_0 rounded-[12px]'>
            <div className="text-body1 font-semibold mb-2 text-text_1">Approve Contract</div>
            <div className='mt-[10px]'>
              <div className='break-all mt-[10px]'>From:</div>
              <div className='break-all'>{address}</div>
            </div>
            <br />
            <div>RPC:
              <input type="text" className='w-full p-2 border rounded leading-[30px] font-Regular' id='transaction_token_rpc' disabled value={state.transaction_token.rpc} />
            </div>
            <br />
            <div>approve Token:
              <input type="text" className='w-full p-2 border rounded leading-[30px] font-Regular' value={state.transaction_contract.tokenAddress}
                     onChange={(e) =>
                         setState({
                           ...state,
                           transaction_contract: {
                             ...state.transaction_contract,
                             tokenAddress: e.target.value,
                           },
                         })
                     }
              />
            </div>
            <br />
            <div>uniswapAddress:
              <input type="text" className='w-full p-2 border rounded leading-[30px] font-Regular' value={state.transaction_contract.uniswapAddress}
                     onChange={(e) =>
                         setState({
                           ...state,
                           transaction_contract: {
                             ...state.transaction_contract,
                             uniswapAddress: e.target.value,
                           },
                         })
                     }
              />
            </div>
            <br />
            <div>
              approve amount select:
              <select className="border rounded ml-[5px] h-[30px]" id="approve_select" onChange={e => {
                const dom = document.querySelector("#approve_input_amount")
                dom.disabled = e.target.value == 1
                dom.value = ""
                console.log(e.target.value)
              }}>
                <option value="1">UnLimit</option>
                <option value="2">Cancel Approve</option>
                <option value="3">input amount</option>
              </select>
            </div>
            <br />
            <div>input amount:
              <input className='w-full p-2 border rounded leading-[30px] font-Regular' id="approve_input_amount" disabled></input>
            </div>
            {state.transaction_token?.hash && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <div className="text-body1 font-semibold mb-2 text-text_1">Transaction Hash</div>
                  <p className="break-all">{state.transaction_token.hash}</p>
                  <Btn loading={btnLoadingTokenHash} text='Get transaction token Receipt' loadingClass='right-[56px]' onClick={getTransactionHash}  />
                  {state.transaction_token.receipt && (
                      <pre className="mt-4 p-4 bg-gray-200 rounded overflow-x-auto">
                      {JSON.stringify(state.transaction_token.receipt, null, 2)}
                    </pre>
                  )}
                </div>
            )}
            <Btn loading={btnLoadingApprove} text='Approve' onClick={approveEvent} />
          </div>
        </section>

      </div>
  )
}

export default App
