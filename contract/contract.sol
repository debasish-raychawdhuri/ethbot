pragma solidity ^0.8.12;

contract Estimator {
    struct HeartBeat {
        uint64 scale;
        uint64 timestamp;
    }

    mapping(uint32 => HeartBeat[]) beats;

    string command;

    address owner;

    constructor() {
        //constructor
        owner = tx.origin;
    }

    function getBeats(uint32 timeslot)
        public
        view
        returns (HeartBeat[] memory)
    {
        return beats[timeslot];
    }

    function updateCommand(string calldata com) public {
        if (tx.origin == owner) {
            command = com;
        }
    }

    function getCommand() public view returns (string memory) {
        return command;
    }

    function heartBeat(uint64 scale, uint64 timestamp) public {
        uint32 timeslot = (uint32)(timestamp / 60000);
        beats[timeslot].push(HeartBeat(scale, timestamp));
    }

    function estimate(uint64 timestamp) public view returns (uint64) {
        uint32 timeslot = (uint32)(timestamp / 60000);
        uint32 prev_timeslot = timeslot - 1;
        uint256 i = 0;
        uint64 sum = 0;

        for (i = 0; i < beats[prev_timeslot].length; i++) {
            if (beats[prev_timeslot][i].timestamp >= timestamp - 60000) {
                sum += beats[prev_timeslot][i].scale;
            }
        }

        for (i = 0; i < beats[timeslot].length; i++) {
            if (beats[timeslot][i].timestamp < timestamp) {
                sum += beats[timeslot][i].scale;
            }
        }
        return sum;
    }
}
