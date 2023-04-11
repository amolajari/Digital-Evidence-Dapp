// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract EvidenceContract {

    struct Evidence {
        uint ID;
        string hash;
        address owner;
        address creator;
        string description;
        address[] taddr;
        uint[] ttime;
    }

    event EvidenceCreated(
        uint ID,
        string hash,
        address owner,
        address creator,
        string description,
        address[] taddr,
        uint[] ttime
    ); 
    
    event EvidenceTransfered(
        address[] taddr,
        uint[] ttime
    );


    mapping(uint => Evidence) private evidences;

    modifier OnlyOwner(uint ID) {
        require(msg.sender == evidences[ID].owner); _;}

    modifier OnlyCreator(uint ID) {
        require(msg.sender == evidences[ID].creator); _;}
    
    modifier EvidenceExists(uint ID, bool mustExist) {
        bool exists = evidences[ID].ID != 0;
        if (mustExist)
            require (ID != 0 && exists);
        else
            require (!exists);
    _;}

    function CreateEvidence( uint ID ,string memory hash , string memory description) public EvidenceExists(ID, false) {
        evidences[ID].ID = ID;
        evidences[ID].hash = hash;
        evidences[ID].owner = msg.sender;
        evidences[ID].creator = msg.sender;
        evidences[ID].description = description;
        evidences[ID].taddr.push(msg.sender);
        evidences[ID].ttime.push(block.timestamp);

        emit EvidenceCreated(ID, hash, msg.sender, msg.sender, description, evidences[ID].taddr, evidences[ID].ttime);
    }

    function Transfer(uint ID, address newowner) public OnlyOwner(ID) EvidenceExists(ID, true) {
        evidences[ID].owner = newowner;
        evidences[ID].taddr.push(newowner);
        evidences[ID].ttime.push(block.timestamp);

        emit EvidenceTransfered(evidences[ID].taddr, evidences[ID].ttime);
    }

    function RemoveEvidence(uint ID)
        public OnlyCreator(ID) EvidenceExists(ID, true) {
        delete evidences[ID];
    }
    
    function GetEvidenceInfo(uint ID) view public returns (uint, address, address, string memory, address[] memory, uint[] memory) {
        return ( evidences[ID].ID, evidences[ID].owner,
            evidences[ID].creator, evidences[ID].description,
            evidences[ID].taddr, evidences[ID].ttime);
    }

    function GetEvidence(uint ID) view public OnlyOwner(ID) returns (uint, string memory, address, address, string memory) {
        
        return ( evidences[ID].ID, evidences[ID].hash ,evidences[ID].owner,
            evidences[ID].creator, evidences[ID].description
            );
    }
}