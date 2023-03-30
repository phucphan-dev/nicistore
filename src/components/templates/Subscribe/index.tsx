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
          <Typography.Heading type="h3" modifiers={['white', '20x24']}>Nhận email của chúng tôi để biết thông tin về các mặt hàng mới, bán hàng và hơn thế nữa.</Typography.Heading>
          <div className="t-subscribe_input">
            <Input placeholder="Enter your email address" />
            <div className="t-subscribe_button">
              <Button sizes="h48" variant="dark">Đăng ký</Button>
            </div>
          </div>
        </div>
        <div className="t-subscribe_right">
          <Typography.Heading type="h3" modifiers={['white', '30x36']}>
            Bạn cần trợ giúp?
            <br />
            <a href="tel:+84989684624"><Typography.Text type="span" modifiers={['18x21', 'white']}>0989 684 624 - </Typography.Text></a>
            <a href="tel:+84989157716"><Typography.Text type="span" modifiers={['18x21', 'white']}>0989 15 77 16</Typography.Text></a>
          </Typography.Heading>
          <div className="t-subscribe_description">
            <Typography.Text modifiers={['16x18', 'white']}>
              Giờ hoạt động 8:00am - 9:00pm
            </Typography.Text>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

export default Subscribe;
