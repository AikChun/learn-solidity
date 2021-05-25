import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  return (
    <Layout>
      <h3>Create a campaign</h3>
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Button primary type="submit">
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
