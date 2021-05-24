import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

import factory from '../ethereum/factory';

function Index({ campaigns = [] }) {
  const renderCampaigns = () => {
    const items = campaigns.map((campaign) => ({
      header: campaign,
      description: <a>View Campaign</a>,
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.3/dist/semantic.min.css"
        />
        <h3>Open Campaigns</h3>
        <Button floated="right" content="Create Campaign" icon="add" primary />
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  console.log('campaigns', campaigns);

  return { campaigns };
};

export default Index;
