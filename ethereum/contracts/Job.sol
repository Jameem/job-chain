pragma solidity ^0.4.17;

contract JobFactory {
    address[] public deployedJobs;

    function createJob(uint budget, string title, string description) public {
        address newJob = new Job(budget, title, description, msg.sender);
        deployedJobs.push(newJob);
    }

    function getDeployedJobs() public returns (address[]) {
        return deployedJobs;
    }
}

contract Job {

    address public manager;
    uint public maximumBudget;
    string public jobTitle;
    string public jobDescription;
    address public acceptedBidder;
    uint public acceptedBidAmount;
    string public status;
    bool public closed = false;
    uint public contractBalance;

    struct Bid {
        uint amount;
        address bidder;
    }

    Bid[] public bidders;
    // mapping(address => bidder) public bidders;

    //Check if the manager is invoking the function
    modifier isManager() {
        require(msg.sender == manager);
        _;
    }

    //Post a new Job
    function Job(uint budget, string title, string description, address creator) public {
        manager = creator;
        maximumBudget = budget;
        jobTitle = title;
        jobDescription = description;
        status = "Job Posted";

    }

    //Bid against a Job
    function bid(uint bidAmount) public {
        require(msg.sender != manager);
        require(!closed);
        require(bidAmount < maximumBudget);

        Bid memory newBid = Bid({
          amount: bidAmount,
          bidder: msg.sender
        });

        bidders.push(newBid);
        status = "Bidding Started";
    }

    //Accept a bid from the bidders
    function acceptBid(uint index) public isManager payable {
        Bid storage bid = bidders[index];
        require(msg.value >= bid.amount);

        contractBalance = this.balance;
        acceptedBidder = bid.bidder;
        acceptedBidAmount = msg.value;
        status = "Bid Accepted";
        closed = true;
    }

    //Accepted Bidder start the Job
    function startJob() public {
        require(msg.sender == acceptedBidder);

        status = "Job Started";
    }

    //Job finish request from the accepted Bidder
    function requestFinishJob() public {
        require(msg.sender == acceptedBidder);

        status = "Finish Requested";
    }

    //Finish Job
    function finishJob() public isManager {
        /* require(keccak256(status) == keccak256("Finish Requested")); */

        acceptedBidder.transfer(this.balance);
        contractBalance = this.balance;
        status = "Job Finished";
    }

	function getSummary() public view returns (
		uint, uint, uint, string, string, address, string
		) {
		return (
			maximumBudget,
			this.balance,
			bidders.length,
			jobTitle,
			jobDescription,
			manager,
			status
		);
	}

	function getBiddersCount() public view returns (uint) {
		return bidders.length;
	}
}
