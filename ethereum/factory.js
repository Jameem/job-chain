import web3 from "./web3";
import JobFactory from "./build/JobFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(JobFactory.interface),
  "0xa49e144b059471297d60ef51770ec6D3e83a0737"
);

export default instance;
