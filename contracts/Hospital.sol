// SPDX-License-Identifier: minutes

pragma solidity ^0.8.0;

contract Hospital {
    
    struct Appointment {
        string name;
        uint8 age;
        uint256 visitTime;
        string condition;
        string remarks;
    }
    
    mapping(uint256 => Appointment[]) public appointments;
    mapping(address => uint256) public patientId;
    mapping(uint256 => address) public patientAddress;
    mapping(address => bool) internal mod;
    uint256 internal patientCount;
    
    constructor() {
        mod[msg.sender] = true;
        patientCount = 0;
    }

    modifier onlyMod {
        require(mod[msg.sender] == true);
        _;
    }

    function newPatient(address _patientAddress) public onlyMod returns(uint256) {
        require(patientId[_patientAddress] == 0, "Patient already added");
        patientCount ++;
        patientId[_patientAddress] = patientCount;
        patientAddress[patientCount] = _patientAddress;
        return patientCount;
    }
    
    function addAppointment(uint256 _patientId, string memory _name, uint8 _age, string memory _condition, string memory _remarks) public onlyMod{
        require(patientAddress[_patientId] != address(0), "patient does not exist");
        uint id = appointments[_patientId].length;
        appointments[_patientId].push();
        Appointment storage appointment = appointments[_patientId][id];
        appointment.name = _name;
        appointment.age = _age;
        appointment.visitTime = block.timestamp;
        appointment.condition = _condition;
        appointment.remarks = _remarks;
    }
    
    function getAppointment(uint256 _patientId, uint _appointmentId) public view onlyMod returns(Appointment memory){
        return appointments[_patientId][_appointmentId];
    }

    // function patientExists(address _patientAddress) public view onlyMod returns(bool) {
    //     if(patientId[_patientAddress] == 0) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    function getPatientId(address _patientAddress) public view onlyMod returns(uint256){
        require(patientId[_patientAddress] != 0, "New patient to be added");
        return patientId[_patientAddress];
    }

    function numberOfVisits(uint256 _patientId) public view onlyMod returns(uint256) {
        return appointments[_patientId].length;
    }

    function addMod(address _mod) public onlyMod {
        require(!mod[_mod], "Already a mod");
        mod[_mod] = true;
    }
    
}