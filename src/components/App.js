import React, { Component } from 'react';
import Web3 from 'web3';
// import Identicon from 'identicon.js';
import './App.css';
import EvidenceContract from '../abis/EvidenceContract.json'
import Navbar from './Navbar'
import Main from './Main'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //Metamask: web3 import
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData(){
    const web3 = window.web3
    //load a/c
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    
    //n/w ID
    const networkId = await web3.eth.net.getId()
    const networkData = EvidenceContract.networks[networkId]
    if(networkData){
      const evidence = web3.eth.Contract(EvidenceContract.abi,networkData.address)
      this.setState({evidence})
      // const createEvd = await evidence.methods
      this.setState({loading: false}) 
    }else{
      window.alert('Evidence contract not deployed to detected network.') 
    }
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      // this.setState({ loading: true })
      // this.state.evidence.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
      //   this.setState({ loading: false })
      // })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      evidence: null,
      loading: true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            // Code...
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            />
          } 
      </div>
    );
  }
}

export default App;