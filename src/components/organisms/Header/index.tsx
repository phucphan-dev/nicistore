import React from 'react';
import { useNavigate } from 'react-router-dom';

import Animate from '../Animate';
import Container from '../Container';
import Menu, { MenuItem } from '../Menu';

import logo from 'assets/images/logo.svg';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import { useAppSelector } from 'store/hooks';
import { ROUTES_PATH } from 'utils/constants';
import mapModifiers from 'utils/functions';

interface HeaderProps {
  open: boolean;
  menus: MenuItem[];
  handleToggleMenu?: () => void;
  handleSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  open, menus, handleSearch, handleToggleMenu
}) => {
  const navigate = useNavigate();
  const cartDetail = useAppSelector((state) => state.cart);

  return (
    <header className="o-header">
      <Animate type="slideInDown" noScroll>
        <div className="o-header_content">
          <Container>
            <div className="o-header_wrapper">
              <div className="o-header_hambuger">
                <Button iconName="hambuger" iconSize="32" handleClick={handleToggleMenu} />
              </div>
              <div className="o-header_left">
                <div className="o-header_logo"><Link href={ROUTES_PATH.HOME}><Image imgSrc={logo} alt="Nici Logo" ratio="75x46" /></Link></div>
                <div className={mapModifiers('o-header_menu', open && 'opened')}>
                  <div className="o-header_menu_logo">
                    <Link href={ROUTES_PATH.HOME}><Image imgSrc={logo} alt="Nici Logo" ratio="75x46" /></Link>
                    <Button iconName="close" iconSize="24" handleClick={handleToggleMenu} />
                  </div>
                  <Menu menu={menus} />
                  <div className="o-header_menu_account">
                    <Link href={ROUTES_PATH.ACCOUNT}><Typography.Text modifiers={['16x18', 'black', 'uppercase']}>Tài khoản</Typography.Text></Link>
                  </div>
                </div>
              </div>
              <div className="o-header_right">
                <div className="o-header_right_button hide-mobile">
                  <Button iconName="user" iconSize="24" handleClick={() => navigate(ROUTES_PATH.ACCOUNT)} />
                </div>
                <div className="o-header_right_button hide-mobile">
                  <Button iconName="search" iconSize="24" handleClick={handleSearch} />
                </div>
                <div className="o-header_right_button hide-mobile">
                  <Button iconName="love" iconSize="24" badge={0} handleClick={() => navigate(ROUTES_PATH.WISHLIST)} />
                </div>
                <div className="o-header_right_button">
                  <Button iconName="cart" iconSize="24" badge={cartDetail.items.length} handleClick={() => navigate(ROUTES_PATH.CART)} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Animate>
    </header>
  );
};

export default Header;
