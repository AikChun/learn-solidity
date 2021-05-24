import React from 'react';

import factory from '../ethereum/factory';

function Index({ campaigns = [] }) {
  return (
    <div>
      <h1>This is the campaign list!!!</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign}>{campaign}</li>
        ))}
      </ul>
    </div>
  );
}

Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  console.log('campaigns', campaigns);

  return { campaigns };
};

export default Index;
