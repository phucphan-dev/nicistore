import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Section from 'components/organisms/Section';
import mapModifiers from 'utils/functions';

const menu = [
  {
    id: 1,
    text: 'Account Detail'
  },
  {
    id: 2,
    text: 'Orders'
  },
  {
    id: 3,
    text: 'Address'
  },
];

const AccountDetail: React.FC = () => (
  <>
    <div className="p-account_field">
      <Input required label="First name" type="text" bordered />
    </div>
    <div className="p-account_field">
      <Input required label="Last name" type="text" bordered />
    </div>
    <div className="p-account_field">
      <Input required label="Display name" type="text" bordered />
    </div>
    <div className="p-account_field">
      <Input required label="Email address" type="text" bordered />
    </div>
    <div className="p-account_field">
      <Typography.Text modifiers={['600', '18x21']}>Password change</Typography.Text>
    </div>
    <div className="p-account_field">
      <Input required label="Current password" type="password" bordered />
    </div>
    <div className="p-account_field">
      <Input required label="New password" type="password" bordered />
    </div>
    <div className="p-account_field">
      <Input required label="Confirm new password" type="password" bordered />
    </div>
    <div className="p-account_button">
      <Button variant="primary" sizes="h42">Save changes</Button>
    </div>
  </>
);

const Account: React.FC = () => {
  const [active, setActive] = useState(1);
  return (
    <Section>
      <div className="p-account">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="p-account_menu">
                <div className="p-account_menu_head">
                  <Typography.Text>
                    Wellcome back,
                    {' '}
                    <br />
                    {' '}
                    <Typography.Text type="span" modifiers={['700']}>phuc.phan</Typography.Text>
                  </Typography.Text>
                </div>
                {menu.map((item) => (
                  <div
                    className={mapModifiers('p-account_menu_item', item.id === active && 'active')}
                    key={item.id}
                    onClick={() => setActive(item.id)}
                  >
                    <Typography.Text>{item.text}</Typography.Text>
                  </div>
                ))}
                <div className="p-account_menu_item">
                  <Typography.Text>Logout</Typography.Text>
                </div>
              </div>
            </Col>
            <Col lg={9}>
              {(() => {
                switch (active) {
                  case 1:
                    return <AccountDetail />;
                  case 2:
                    return 'Not yet';
                  case 3:
                    return 'Not yet';
                  default:
                    return null;
                }
              })()}
            </Col>
          </Row>
        </Container>
      </div>
    </Section>
  );
};

export default Account;
