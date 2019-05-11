import web3 from "./web3";
import JobFactory from "./build/JobFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(JobFactory.interface),
  "0x21bfaa06Dc712C346fd8C96084824646F308822e"
);

export default instance;
