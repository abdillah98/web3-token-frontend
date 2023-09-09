import { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {ethers} from "ethers";
import { useContract, useContractRead, useContractWrite, ConnectWallet, useAddress } from "@thirdweb-dev/react";

export default function Home() {

    // State Variable
    const [amount, setAmount] = useState('')
    const [to, setTo] = useState('')

    // Thirdweb Hooks
    const account = useAddress()
    const { contract } = useContract("Your contract address ...");
    const { data: balanceOf, isLoading: isLoadingBalanceOf } = useContractRead(contract, "balanceOf", [account])
    const { data: symbol, isLoading: isLoadingSymbol } = useContractRead(contract, "symbol")
    const { mutateAsync: transfer, isLoading: isLoadingTransfer } = useContractWrite(contract, "transfer")

    console.log(contract)
    // transfer token
    const transferToken = async (e) => {
        e.preventDefault();

        // transfer code here...
    }


    // Authentication
    if(!account) {
        return <CardConnectWallet />
    }


    return (
        <div style={{
            'maxWidth': '400px',
            'margin': 'auto',
            'padding': '50px 20px'
        }}>

            {!isLoadingBalanceOf || !isLoadingSymbol ?            
                <>

                   <CardBalanceOf 
                        balanceOf={balanceOf}
                        symbol={symbol}
                   />

                    <h3 style={{'lineHeight': '0.6'}}>Transfer Token</h3>
                    <form style={{
                        'display': 'flex',
                        'flexDirection': 'column',
                        'gap': '20px'
                    }}>
                        <InputText 
                            type="number"
                            placeholder="amount (0)"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <InputText 
                            type="text"
                            placeholder="Account (x0...)  "
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                        <Button 
                            label={isLoadingTransfer ? 'Please wait...' : 'Send Token'} 
                            onClick={transferToken}
                            disabled={isLoadingTransfer}
                        />
                    </form>

                </> :
                <Loading />
            }
        </div>
    );
}


function CardConnectWallet() {
    return (
        <div style={{
          'maxWidth': '400px',
          'margin': '50px auto',
          'padding': '50px 20px',
          'textAlign': 'center',
          'border': '1px solid #dddddd',
          'borderRadius': '10px',
        }}>
            <div style={{'marginBottom': '20px'}}>Please Connect Wallet.</div>
            <ConnectWallet />
        </div>
    )
}

function CardBalanceOf(props) {
    return(
        <div style={{
         'padding': '20px',
         'border': '1px solid #dddddd',
         'borderRadius': '10px',
         'marginBottom': '40px'
        }}>
            <div>Your Balance</div>
            <h1 style={{'lineHeight': '0.6'}}>
               {ethers.utils.formatEther(props.balanceOf.toString())}
               {" "}
               <span>{props.symbol}</span>
            </h1>
        </div>
    )
}

function InputText(props) {
    return (
        <input
          style={{
            'display': 'block',
            'padding': '14px 20px',
            'borderRadius': '8px',
            'backgroundColor': '#f9f9f9',
            'outline': 'none',
            'border': '1px solid #dddddd',
            'fontSize': '16px'
          }} 
          {...props}
        />
    )
}

function Button(props) {
    return (
        <button 
            style={{
                'display': 'block',
                'padding': '14px 20px',
                'borderRadius': '8px',
                'backgroundColor': '#5f5fff',
                'color': '#ffffff',
                'border': '1px solid #5f5fff',
                'cursor': 'pointer',
                'fontWeight': 'bold',
                'fontSize': '16px'
            }}
            {...props}
        >
          {props.label}
        </button>
    )
}

function Loading() {
    return <div style={{'textAlign': 'center'}}>Loading...</div>
}
