pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public {
        require(msg.sender == manager);

        uint256 index = random() % players.length;
        address winnerAddress = players[index];
        winnerAddress.transfer(this.balance);
        players = new address[](1);
    }
}
