import React, { Component } from 'react';
import './App.css';
import Hospital from "./Hospital.json";
import Web3 from 'web3';

const addressHospital = "0x3052A800520167788428fC55c9b66bA901Ce545A"


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  
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

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await window.ethereum.selectedAddress;
    this.setState({account})

    const abiHospital = Hospital.abi;

    const contractHospital = new web3.eth.Contract(abiHospital, addressHospital);

    this.setState({ contractHospital });
  }

  constructor(props) {
    super(props);
    this.state = {
     contractHospital: null,
     account: null,
     address: null,
     id: null,
     appId: null,
     name: null,
     age: null,
     condition: null,
     remarks: null,
     time: null,
     total: null,
     patientId: null
    };
  }

  captureName = async (event) => {
    event.preventDefault();

    console.log('capturing name')
    const name = event.target.value;
    this.setState({ name });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  captureAddress = async (event) => {
    event.preventDefault();

    console.log('capturing address')
    const address = event.target.value;
    this.setState({ address });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  captureAge = async (event) => {
    event.preventDefault();

    console.log('capturing age')
    const age = event.target.value;
    this.setState({ age });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  captureCondition = async (event) => {
    event.preventDefault();

    console.log('capturing condition')
    const condition = event.target.value;
    this.setState({ condition });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  captureRemarks = async (event) => {
    event.preventDefault();

    console.log('capturing remarks');
    const remarks = event.target.value;
    this.setState({ remarks });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  captureId = async (event) => {
    event.preventDefault();

    console.log('capturing id');
    const id = event.target.value;
    this.setState({ id });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  captureAppId = async (event) => {
    event.preventDefault();

    console.log('capturing id');
    const appId = event.target.value;
    this.setState({ appId });

    const account = await window.ethereum.selectedAddress;
    this.setState({account});
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const name = this.state.name
    const age = this.state.age
    const condition = this.state.condition
    const remarks = this.state.remarks
    const id = this.state.id

    await this.state.contractHospital.methods.addAppointment(id, name, age, condition, remarks).send({from: account}).then((r) => {
      console.log(r);
    })
  }

  onFetch = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const id = this.state.id
    const appId = this.state.appId

    await this.state.contractHospital.methods.getAppointment(id, appId).call({from: account}).then((r) => {
      console.log(r)
      this.setState({ name: r.name })
      this.setState({ age: r.age })
      this.setState({ time: r.visitTime })
      this.setState({ condition: r.condition })
      this.setState({ remarks: r.remarks })
    })
  }

  newPatient = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const address = this.state.address;

    await this.state.contractHospital.methods.newPatient(address).send({from: account}).then((r) => {
      console.log(r);
    })
  }

  onQuery = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const id = this.state.id;

    await this.state.contractHospital.methods.numberOfVisits(id).call({from: account}).then((r) => {
      console.log(r);
      this.setState({ total: r })
    })
  }

  patientId = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    await this.state.contractHospital.methods.getPatientId(this.state.address).call({from: account}).then((r) => {
      this.setState({ patientId:r })
    })
  }

  addMod = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const address = this.state.address;

    await this.state.contractHospital.methods.addMod(address).send({from: account}).then((r) => {
      console.log(r);
    })
  }

  

  render() {
    return (
      <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
       <h1>Hospital Appointments</h1>
       <br></br>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              
              <div>
                <p>Patient name : {this.state.name}</p>
                <p>Patient age : {this.state.age}</p>
                <p>Visit time : {this.state.time}</p>
                <p>Condition : {this.state.condition}</p>
                <p>Remarks : {this.state.remarks}</p>
              </div>
              <br></br>
              <h4>Add new patient</h4>
              <form onSubmit={this.newPatient}>
                <input placeholder = "Patient address" onChange={this.captureAddress}></input>
                <input type = "submit" />
              </form>
              <br></br>
              <h4>Create Appointment</h4>
              <br></br>
              <form onSubmit={this.onSubmit}>
                <input placeholder = "Patient Id" onChange={this.captureId}/>
                <br></br>
                <br></br>
                <input placeholder = "Patient name" onChange={this.captureName}/>
                <br></br>
                <br></br>
                <input placeholder = "Patient age" onChange={this.captureAge}/>
                <br></br>
                <br></br>
                <input placeholder = "Condition" onChange={this.captureCondition}/>
                <br></br>
                <br></br>
                <input placeholder = "Remarks" onChange={this.captureRemarks}/>
                <br></br>
                <br></br>
                <input type = "submit" />
              </form>
              <br></br>
              <h4>Display Appointment</h4>
              <form onSubmit={this.onFetch}>
                <input placeholder = "Patient Id" onChange={this.captureId}></input>
                <input placeholder = "Appointment Id" onChange={this.captureAppId}></input>
                <input type = "submit" />
              </form>
              <h4>Number of visits :</h4>
              <h4>{this.state.total}</h4>
              <form onSubmit={this.onQuery}>
                <input placeholder = "Patient Id" onChange={this.captureId}></input>
                <input type = "submit" />
              </form>
              <h4>Fetch patient Id :</h4>
              <h4>{this.state.patientId}</h4>
              <form onSubmit={this.patientId}>
                <input placeholder = "Patient Address" onChange={this.captureAddress}></input>
                <input type = "submit" />
              </form>
              <br></br>
              <h4>Add Moderator</h4>
              <form onSubmit={this.addMod}>
                <input placeholder = "Patient Address" onChange={this.captureAddress}></input>
                <input type = "submit" />
              </form>
              <br></br>
              <br></br>
            </div>
          </main>
        </div>
      </div>
    </div>
    );
  }
  }

export default App;
