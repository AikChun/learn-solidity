import React from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';

const RequestIndex = (props) => {
  const { address } = props;

  const { Header, Row, HeaderCell, Body } = Table;
  return (
    <Layout>
      <h3>View Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approved</HeaderCell>
            <HeaderCell>Finalized</HeaderCell>
          </Row>
        </Header>
      </Table>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const {
    query: { address },
  } = props;

  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, requests, requestsCount };
};

export default RequestIndex;
