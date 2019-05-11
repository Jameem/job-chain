import web3 from "./web3";
import JobFactory from "./build/JobFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(JobFactory.interface),
  "0xd8D37155Aa4BF82851D3DaFCAe7350e92B957Fa3"
);

export default instance;
