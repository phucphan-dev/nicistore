import React from 'react';

import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbTypes[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => (
  <div className="m-breadcrumb">
    <ul className="m-breadcrumb_wrapper">
      {breadcrumbs.map((item, index) => (
        <li className="m-breadcrumb_item" key={`${item.text}-${item.slug}`}>
          {(index + 1) === breadcrumbs.length ? (
            <Typography.Text modifiers={['13x19', 'black', 'capitalize', '400', 'nowrap']}>{item.text}</Typography.Text>
          ) : (
            <Link href={item.slug} target={item.target}>
              <div className="m-breadcrumb_item_wrap">
                <div className="m-breadcrumb_item_title">
                  <Typography.Text modifiers={['13x19', 'black3', 'capitalize', '400', 'nowrap']}>
                    {item.text}
                  </Typography.Text>
                </div>
                <span className="m-breadcrumb_item_divider">/</span>
              </div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Breadcrumb;
