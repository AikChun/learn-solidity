import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const Show = (props) => {
  const { address } = props;
  const renderCards = () => {
    const {
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      balance,
    } = props;
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests.',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to be an approver',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of people who have already donated to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Column width={10}>
          {renderCards()}
          <Link route={`/campaigns/${address}/requests`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
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
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    address,
  };

  return summary;
};

export default Show;
