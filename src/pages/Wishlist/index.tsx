/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';

import Checkbox from 'components/atoms/Checkbox';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Section from 'components/organisms/Section';
import { getAllFavoriteProductService } from 'services/product';
import { ROUTES_PATH } from 'utils/constants';
import { renderPrice } from 'utils/functions';

const Wishlist: React.FC = () => {
  const [checkList, setCheckList] = useState<number[]>([]);
  const { data: favoritesData } = useQuery(
    ['getAllFavoriteProduct'],
    () => getAllFavoriteProductService(),
  );
  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((item) => item !== id));
    }
  };
  return (
    <>
      <Helmet>
        <title>Nici Store | Theo dõi đơn hàng</title>
      </Helmet>
      <Section>
        <div className="p-wishlist">
          <Container>
            <table className="p-wishlist_table">
              <tr className="p-wishlist_tr">
                <th style={{ width: 60 }}>
                  <div className="p-wishlist_th checkAll">
                    <Checkbox
                      name="checkAll"
                      checked={checkList.length === favoritesData?.data.length}
                      onChange={(e) => (e.currentTarget.checked
                        ? setCheckList(favoritesData
                          ? favoritesData.data.map((item) => item.id) : []) : setCheckList([]))}
                    />
                  </div>
                </th>
                <th><div className="p-wishlist_th hide-mobile"><Typography.Text>Hình ảnh</Typography.Text></div></th>
                <th><div className="p-wishlist_th"><Typography.Text>Tên sản phẩm</Typography.Text></div></th>
                <th><div className="p-wishlist_th"><Typography.Text>Giá</Typography.Text></div></th>
                <th><div className="p-wishlist_th hide-mobile"><Typography.Text>Tồn kho</Typography.Text></div></th>
              </tr>
              {favoritesData?.data.map((item) => (
                <tr className="p-wishlist_t" key={item.name + item.slug}>
                  <td>
                    <div className="p-wishlist_td">
                      <Checkbox
                        name={String(item.id)}
                        checked={checkList.includes(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e.currentTarget.checked)}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="p-wishlist_td hide-mobile">
                      <Image imgSrc={item.thumbnail} ratio="1x1" />
                    </div>
                  </td>
                  <td>
                    <div className="p-wishlist_td">
                      <Link href={`${ROUTES_PATH.PRODUCT_DETAIL}/${item.slug}`}>
                        <Typography.Text>
                          {item.name}
                        </Typography.Text>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className="p-wishlist_td">
                      <Typography.Text modifiers={item.salePercent > 0 ? ['lineThrough', 'ashGrey'] : undefined}>
                        {renderPrice(item.price, true, 'VNĐ')}
                      </Typography.Text>
                      {item.salePercent > 0 && (
                        <Typography.Text>
                          {renderPrice(item.price * (100 - item.salePercent) / 100, true, 'VNĐ')}
                        </Typography.Text>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="p-wishlist_td hide-mobile">
                      <Typography.Text>
                        {item.stock}
                      </Typography.Text>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </Container>
        </div>
      </Section>
    </>
  );
};

export default Wishlist;
