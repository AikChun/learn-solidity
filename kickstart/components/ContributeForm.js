import React, { useState } from 'react';

import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props) => {
  const [value, setValue] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const { address } = props;

    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {}
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Form.Field>
      <Button type="submit" primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
