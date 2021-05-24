import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import { FACTORY_ADDRESS } from './constants';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  FACTORY_ADDRESS
);

export default instance;
