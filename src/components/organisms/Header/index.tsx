import React from 'react';

import Container from '../Container';
import Menu from '../Menu';

import logo from 'assets/images/logo.svg';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Typography from 'components/atoms/Typography';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => (
  <div className="o-header">
    <Container>
      <div className="o-header_wrapper">
        <div className="o-header_left">
          <div className="o-header_logo"><Image imgSrc={logo} alt="Nici Logo" /></div>
          <div className="o-header_menu"><Menu /></div>
        </div>
        <div className="o-header_right">
          <div className="o-header_right_button hide-mobile">
            <Button iconName="user" iconSize="24" />
          </div>
          <div className="o-header_right_button hide-mobile">
            <Button iconName="search" iconSize="24" />
          </div>
          <div className="o-header_right_button hide-mobile">
            <Button iconName="love" iconSize="24" badge={1} />
          </div>
          <div className="o-header_right_button">
            <Typography.Text modifiers={['12x14', 'ashGrey']}>$190.00</Typography.Text>
            <Button iconName="cart" iconSize="24" badge={2} />
          </div>
        </div>
      </div>
    </Container>
  </div>
);

Header.defaultProps = {
  children: undefined,
};

export default Header;
