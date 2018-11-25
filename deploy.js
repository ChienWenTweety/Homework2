const fs = require('fs')
const Web3 = require('web3')
//搭建自己的節點，localhost就是你節點的地址
let web3 = new Web3('http://localhost:8545')

const abi = JSON.parse(fs.readFileSync('./contract/Bank_sol_Bank.abi').toString())
const bytecode = '0x' + fs.readFileSync('./contract/Bank_sol_Bank.bin').toString()

let bank = new web3.eth.Contract(abi)

web3.eth.getAccounts().then(function (accounts) {
     
    // deploy contract
    bank.deploy({
        data:bytecode
    })
    .send({
        from: accounts[0],
        gas: 1500000,
        gasPrice: 3000000000
    })
    .once('receipt',function(receipt) {
        console.log(receipt) // contains the new contract address
      })
      .on('error', function(error){
          console.log(error)
      })
  
     //function:callback function
    
})
process.on('unhandledRejection', (reason, promise)=> {
    console.log('Unhandled Rejection at:', reason.stack || reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
})