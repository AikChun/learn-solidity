import React from 'react';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';

const Show = () => {
  return (
    <Layout>
      <h3>Campaign Show</h3>
    </Layout>
  );
};

Show.getInitialProps = async (props) => {
  const {
    query: { address },
  } = props;

  const instance = getCampaign(address);

  const summary = await instance.methods.getSummary().call();

  return {
    minimumContribution: summary[0],
    balance: summary[1],
    numberOfRequests: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };

  console.log('summary:', summary);

  return summary;
};

export default Show;
