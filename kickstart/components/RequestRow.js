import { Router } from 'next/router';
import React from 'react';

import { Table, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const RequestRow = (props) => {
  const {
    id,
    description,
    value,
    recipient,
    complete,
    approvalCount,
    approvals,
    approversCount,
    address,
  } = props;

  const onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);
    try {
      await campaign.methods.approveRequest(id).send({ from: accounts[0] });
    } catch (err) {}
  };
  const onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);
    try {
      await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
    } catch (err) {}
  };

  const readyToFinalize = () => approvalCount > approversCount / 2;
  return (
    <Table.Row disabled={complete} positive={readyToFinalize && !complete}>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
      <Table.Cell>{recipient}</Table.Cell>
      <Table.Cell>
        {approvalCount}/{approversCount}
      </Table.Cell>
      <Table.Cell>
        {!complete && (
          <Button basic color="green" onClick={onApprove}>
            Approve
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        {!complete && (
          <Button basic color="teal" onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default RequestRow;
