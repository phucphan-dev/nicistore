import React from 'react';

import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';

interface MenuData {
  id: string;
  text: string;
  link: string;
}
export interface MenuItem extends MenuData {
  childrens?: MenuItem[];
}
interface MenuProps {
  menu: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ menu }) => (
  <div className="o-menu">
    <ul className="o-menu_list">
      {menu.map((item) => (
        <li className="o-menu_item" key={item.id}>
          <Link customClassName="o-menu_link" href={`/${item.link}`}>
            <Typography.Text modifiers={['15x18', 'black', 'uppercase']}>{item.text}</Typography.Text>
          </Link>
          {item.childrens && (
            <ul className="o-menu_submenu">
              {item.childrens.map((child) => (
                <li className="o-menu_submenu_item" key={child.id}>
                  <Link customClassName="o-menu_submenu_link" href={`/${child.link}`}>
                    <Typography.Text modifiers={['15x18']}>{child.text}</Typography.Text>
                  </Link>
                  {child.childrens && (
                    <ul className="o-menu_subchildmenu">
                      {child.childrens.map((childSub) => (
                        <li className="o-menu_subchildmenu_item" key={childSub.id}>
                          <Link href={`/${childSub.link}`}>
                            <Typography.Text modifiers={['15x18']}>{childSub.text}</Typography.Text>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Menu;
