import React from 'react';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';

interface SubscribeProps {
  children?: React.ReactNode;
}

const Subscribe: React.FC<SubscribeProps> = () => (
  <div className="t-subscribe">
    <Container>
      <div className="t-subscribe_wrapper">
        <div className="t-subscribe_left">
          <Typography.Heading type="h3" modifiers={['white', '30x36']}>Get our emails for info on new items, sales and more.</Typography.Heading>
          <div className="t-subscribe_description">
            <Typography.Text modifiers={['16x18', 'white']}>
              We&apos;ll email you a voucher worth
              £10 off your first order over £50.
            </Typography.Text>
          </div>
          <div className="t-subscribe_input">
            <Input placeholder="Enter your email address" />
            <div className="t-subscribe_button">
              <Button sizes="h48" variant="dark">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="t-subscribe_right">
          <Typography.Heading type="h3" modifiers={['white', '30x36']}>
            Need help?
            <br />
            (+84) 388192167
          </Typography.Heading>
          <div className="t-subscribe_description">
            <Typography.Text modifiers={['16x18', 'white']}>
              We are available 8:00am – 7:00pm
            </Typography.Text>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default Subscribe;
