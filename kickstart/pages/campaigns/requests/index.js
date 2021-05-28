import React from 'react';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';

const RequestIndex = (props) => {
  const { address, requests, requestsCount, approversCount } = props;

  const { Header, Row, HeaderCell, Body } = Table;

  const renderRequestRows = () => {
    return requests.map((request, index) => (
      <RequestRow
        {...request}
        address={address}
        id={index}
        approversCount={approversCount}
        key={`${request.recipient}${index}`}
      />
    ));
  };
  return (
    <Layout>
      <h3>View Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
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
        <Body>{renderRequestRows()}</Body>
      </Table>
      <div>Found {requestsCount} requests</div>
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

  const approversCount = await campaign.methods.approversCount().call();

  return { address, requests, requestsCount, approversCount };
};

export default RequestIndex;
