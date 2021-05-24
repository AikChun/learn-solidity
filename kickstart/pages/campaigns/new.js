import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';

const CampaignNew = () => (
  <Layout>
    <h3>Create a campaign</h3>
    <Form>
      <Form.Field>
        <label>Minimum Contribution</label>
        <input />
      </Form.Field>
      <Button primary type="submit">
        Create!
      </Button>
    </Form>
  </Layout>
);

export default CampaignNew;
