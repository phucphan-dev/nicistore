/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Animate from '../Animate';
import Container from '../Container';
import Menu, { MenuItem } from '../Menu';

import logo from 'assets/images/logo.svg';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
// import useClickOutside from 'hooks/useClickOutside';
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
  const profile = useAppSelector((state) => state.auth.profile);
  const menuRef = useRef<HTMLDivElement>(null);

  // useClickOutside(menuRef, () => {
  //   if (handleToggleMenu && open) {
  //     handleToggleMenu();
  //   }
  // });

  return (
    <header className="o-header">
      <Animate type="slideInDown" noScroll>
        <div className="o-header_content">
          <Container>
            <div className="o-header_wrapper">
              <div className="o-header_hambuger">
                <Button name="hambuger-button" aria-label="Hambuger" iconName="hambuger" iconSize="32" handleClick={handleToggleMenu} />
              </div>
              <div className="o-header_left">
                <div className="o-header_logo"><Link href={ROUTES_PATH.HOME}><Image imgSrc={logo} alt="Nici Logo" ratio="75x46" /></Link></div>
                <div className={mapModifiers('o-header_menu', open && 'opened')} ref={menuRef}>
                  <div className="o-header_menu_logo">
                    <Link href={ROUTES_PATH.HOME}><Image imgSrc={logo} alt="Nici Logo" ratio="75x46" /></Link>
                    <Button name="close-button" aria-label="Close" iconName="close" iconSize="24" handleClick={handleToggleMenu} />
                  </div>
                  <Menu menu={menus} />
                  <div className="o-header_menu_account">
                    <Link href={profile ? ROUTES_PATH.ACCOUNT : ROUTES_PATH.AUTHENTICATE}><Typography.Text modifiers={['16x18', 'black', 'uppercase']}>Tài khoản</Typography.Text></Link>
                  </div>
                </div>
              </div>
              <div className="o-header_right">
                <div className="o-header_right_button hide-mobile">
                  <Button name="user-button" aria-label="User" iconName="user" iconSize="24" handleClick={() => navigate(profile ? ROUTES_PATH.ACCOUNT : ROUTES_PATH.AUTHENTICATE)} />
                </div>
                <div className="o-header_right_button hide-mobile">
                  <Button
                    name="search-button"
                    aria-label="Search"
                    iconName="search"
                    iconSize="24"
                    handleClick={handleSearch}
                  />
                </div>
                {profile && (
                  <div className="o-header_right_button hide-mobile">
                    <Button name="love-button" aria-label="Love" iconName="love" iconSize="24" badge={0} handleClick={() => navigate(ROUTES_PATH.WISHLIST)} />
                  </div>
                )}
                <div className="o-header_right_button">
                  <Button name="cart-button" aria-label="Cart" iconName="cart" iconSize="24" badge={cartDetail.items.length} handleClick={() => navigate(ROUTES_PATH.CART)} />
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
