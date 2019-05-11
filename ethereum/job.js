import web3 from "./web3";
import Job from "./build/Job.json";

export default address => {
  return new web3.eth.Contract(JSON.parse(Job.interface), address);
};
