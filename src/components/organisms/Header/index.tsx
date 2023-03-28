import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Container from '../Container';
import Menu, { MenuItem } from '../Menu';

import logo from 'assets/images/logo.svg';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import mapModifiers from 'utils/functions';

interface HeaderProps {
  menus: MenuItem[];
  handleSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ menus, handleSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="o-header">
      <Container>
        <div className="o-header_wrapper">
          <div className="o-header_hambuger">
            <Button iconName="hambuger" iconSize="32" handleClick={() => setOpen(true)} />
          </div>
          <div className="o-header_left">
            <div className="o-header_logo"><Link href="/"><Image imgSrc={logo} alt="Nici Logo" ratio="75x46" /></Link></div>
            <div className={mapModifiers('o-header_menu', open && 'opened')}>
              <div className="o-header_menu_logo">
                <Link href="/"><Image imgSrc={logo} alt="Nici Logo" ratio="75x46" /></Link>
                <Button iconName="close" iconSize="24" handleClick={() => setOpen(false)} />
              </div>
              <Menu menu={menus} />
              <div className="o-header_menu_account">
                <Link href="/account"><Typography.Text modifiers={['15x18', 'black', 'uppercase']}>Tài khoản</Typography.Text></Link>
              </div>
            </div>
          </div>
          <div className="o-header_right">
            <div className="o-header_right_button hide-mobile">
              <Button iconName="user" iconSize="24" handleClick={() => navigate('/account')} />
            </div>
            <div className="o-header_right_button">
              <Button iconName="search" iconSize="24" handleClick={handleSearch} />
            </div>
            <div className="o-header_right_button hide-mobile">
              <Button iconName="love" iconSize="24" badge={1} />
            </div>
            <div className="o-header_right_button">
              <Typography.Text modifiers={['12x14', 'ashGrey']}>$190.00</Typography.Text>
              <Button iconName="cart" iconSize="24" badge={2} handleClick={() => navigate('/cart')} />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
