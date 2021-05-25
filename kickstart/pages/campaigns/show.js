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

  console.log('summary:', summary);

  return summary;
};

export default Show;
