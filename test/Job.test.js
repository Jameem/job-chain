const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/JobFactory.json");
const compiledJob = require("../ethereum/build/Job.json");

let accounts;
let factory;
let jobAddress;
let job;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });

  await factory.methods.createJob("500", "Job 1", "Job Description").send({
    from: accounts[0],
    gas: "2000000"
  });

  [jobAddress] = await factory.methods.getDeployedJobs().call();

  job = await new web3.eth.Contract(
    JSON.parse(compiledJob.interface),
    jobAddress
  );
});

describe("jobs", () => {
  it("deploys a factory and a job", () => {
    assert.ok(factory.options.address);
    assert.ok(job.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await job.methods.manager().call();

    assert.equal(accounts[0], manager);
  });

  it("allows people to bid against job", async () => {
    await job.methods.bid("100").send({
      from: accounts[1],
      gas: "1000000"
    });

    const isBidder = await job.methods.bidders(0).call();
    assert(isBidder);
  });

  it("allows a manager to accept", async () => {
    await job.methods.acceptBid(0).send({
      value: "15",
      from: accounts[0]
    });
  });
});
