import React from 'react';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

const RequestIndex = (props) => {
  const { address } = props;
  return (
    <Layout>
      <h3>View Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

RequestIndex.getInitialProps = (props) => {
  const {
    query: { address },
  } = props;

  return { address };
};

export default RequestIndex;
