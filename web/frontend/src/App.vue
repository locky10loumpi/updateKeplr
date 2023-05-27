<template>
    <div v-if="isKeplrConnected">
        Address: {{  addr }} <br/>
        balances: {{  balances }}<br/>
        <br/>
        <input type="text" v-model="coins" placeholder="100blabla,10token" />
        <button @click="mintToken()">MintCoins</button>
    </div>
    <button v-else @click="connectKeplr()">connect Keplr</button>
</template>

<script setup lang="ts">
import { Client } from 'ts-client'
import { V1Beta1Coin } from 'ts-client/cosmos.bank.v1beta1/rest'
import { ref } from 'vue'

type coins = V1Beta1Coin[]

const isKeplrConnected = ref(false)
const addr = ref("")
const coins = ref("")
const balances = ref<coins>()

const client = new Client({ 
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos"
})
const appDenom="Token"
const minDenom="utoken"

const getAccounState = async ()=>{
    const ret = await client.CosmosBankV1Beta1.query.queryAllBalances(addr.value)

    balances.value = ret.data.balances
}

const connectKeplr = async ()=>{
    await client.useKeplr({
        currencies: [ 
            { 
                coinDenom: appDenom,
                coinMinimalDenom: minDenom,
                coinDecimals: 6,
            },
        ],
        feeCurrencies: [
            {
                coinDenom: appDenom,
                coinMinimalDenom: minDenom,
                coinDecimals: 6,
                gasPriceStep: {
                    low: 0.01,
                    average: 0.025,
                    high: 0.04,
                },
            },
        ],
        stakeCurrency: {
            coinDenom: appDenom,
            coinMinimalDenom: minDenom,
            coinDecimals: 6,
        },
        walletUrlForStaking:"localhost:5173/"
    });
    const ret = await client.signer.getAccounts();

    if ( ret.length == 0){
        return;
    }

    const wallet = ret[0].address
    addr.value = wallet

    await getAccounState()

    isKeplrConnected.value = true
}
const mintToken = async ()=>{
    const ret = await client.UpdatekeplrFoo.tx.sendMsgFooMessage({
        value:{
            creator: addr.value,
            coins: coins.value
        },
        fee:{
            amount:[
                {
                    amount: "5000",
                    denom: minDenom
                }
            ],
            gas: "200000"
        }
    })

    if ( ret.code != 0 ) {
        console.log(ret.rawLog)
        return
    }

    await getAccounState()
    console.log("mint succeeded")
}
</script>