/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useQuery } from 'react-query';

import Checkbox from 'components/atoms/Checkbox';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Section from 'components/organisms/Section';
import { getAllFavoriteProductService } from 'services/product';

const Wishlist: React.FC = () => {
  const { data, isLoading } = useQuery(
    ['getAllFavoriteProduct'],
    () => getAllFavoriteProductService(),
  );
  return (
    <Section>
      <Container>
        <table className="p-cart_table">
          <tr className="p-cart_t">
            <th>
              <div className="p-cart_th checkAll">
                <Checkbox
                  name="checkAll"
                // checked={checkList.length === cartDetail.length}
                // onChange={(e) => (e.currentTarget.checked
                //   ? setCheckList(cartDetail.map((item) => item.id)) : setCheckList([]))}
                />
              </div>

            </th>
            <th><div className="p-cart_th"><Typography.Text>Tên sản phẩm</Typography.Text></div></th>
            <th><div className="p-cart_th price"><Typography.Text>Giá</Typography.Text></div></th>
            <th><div className="p-cart_th"><Typography.Text>Quantity</Typography.Text></div></th>
            <th><div className="p-cart_th price"><Typography.Text>Subtotal</Typography.Text></div></th>
          </tr>
          {/* {cartDetail.map((item) => (
            <tr className="p-cart_t" key={item.name + item.link}>
              <td>
                <div className="p-cart_td">
                  <Checkbox
                    name={String(item.id)}
                    checked={checkList.includes(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.currentTarget.checked)}
                  />
                </div>
              </td>
              <td>
                <div className="p-cart_td">
                  <ProductCartItem
                    image={item.image}
                    href={item.link}
                    name={item.name}
                    color={item.color.name}
                    size={item.size.name}
                    handleDelete={() => handleDelete(item.id)}
                  />
                </div>
              </td>
              <td>
                <div className="p-cart_td price">
                  <Typography.Text>
                    {renderPrice(item.price, true, 'VNĐ')}
                  </Typography.Text>
                </div>
              </td>
              <td>
                <div className="p-cart_td">
                  <QuantityInput
                    initQuantity={item.quantity}
                    handleChange={(value) => handleChangeQuantity(item, value)}
                  />
                </div>
              </td>
              <td>
                <div className="p-cart_td price">
                  <Typography.Text>
                    {renderPrice(item.price, true, 'VNĐ')}
                  </Typography.Text>
                </div>
              </td>
            </tr>
          ))} */}
        </table>
      </Container>
    </Section>
  );
};

export default Wishlist;
