import React from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';

const Show = (props) => {
  const renderCards = () => {
    const items = [
      {
        header: `${props.manager}`,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: `${props.balance}`,
        description: 'Balance',
      },
      {
        header: `${props.minimumContribution}`,
        description: 'Minimum Contribution',
      },
      {
        header: `${props.numberOfRequests}`,
        description: 'Requests',
      },
      {
        header: `${props.approversCount}`,
        description: 'Approvers',
      },
    ];

    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <h3>Campaign Show</h3>
      {renderCards()}
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
