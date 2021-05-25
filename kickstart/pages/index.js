import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';

import factory from '../ethereum/factory';
import { Link } from '../routes';

function Index({ campaigns = [] }) {
  const renderCampaigns = () => {
    const items = campaigns.map((campaign) => ({
      header: campaign,
      description: (
        <Link route={`/campaigns/${campaign}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add"
              primary
            />
          </a>
        </Link>
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
