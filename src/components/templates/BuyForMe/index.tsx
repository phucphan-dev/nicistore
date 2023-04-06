/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Input from 'components/atoms/Input';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import { buyForMeService, buyForMeUnAuthService } from 'services/buyForMe';
import { BuyForMeDataRequest } from 'services/buyForMe/types';
import { useAppSelector } from 'store/hooks';
import { ERROR_MAPPING } from 'utils/constants';
import { buyForMeSchema } from 'utils/schemas';

const defaultValues: BuyForMeDataRequest = {
  fullname: '',
  email: '',
  phone: '',
  guestNote: '',
  productImages: []
};
const BuyForMe: React.FC = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const buyForMeMethod = useForm<BuyForMeDataRequest>({
    resolver: yupResolver(buyForMeSchema),
    defaultValues
  });

  const { mutate: buyForMeMutate, isLoading } = useMutation(
    ['buyForMeAction', profile],
    profile ? buyForMeService : buyForMeUnAuthService,
    {
      onSuccess: () => {
        buyForMeMethod.reset(defaultValues);
        toast.success('Đã gửi thông tin thành công!', { toastId: 'submitSuccess' });
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            buyForMeMethod.setError(ele.field as any, { message: ERROR_MAPPING[ele.message] });
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'submitFail' });
        }
      }
    }
  );

  const onSubmit = (data: BuyForMeDataRequest) => {
    buyForMeMutate(data);
  };

  return (
    <div className="t-buyForMe">
      <Container>
        <Row>
          <Col lg={6} md={12}>
            <div className="t-buyForMe_content">
              <div className="t-buyForMe_title">
                <Typography.Heading type="h4" modifiers={['22x25']}>Chúng tôi không có sản phẩm bạn cần?</Typography.Heading>
              </div>
              <Typography.Text modifiers={['16x18', '400']}>
                Sản phẩm bạn đang cần trên thị trường giá quá cao.
              </Typography.Text>
              <Typography.Text modifiers={['16x18', '400']}>
                Hãy giúp chúng tôi một vài thông tin,
                chúng tôi sẽ liên hệ cho bạn khi tìm thấy giá tốt dành cho bạn.
              </Typography.Text>
              <Typography.Text modifiers={['16x18', '400']}>
                Bạn chắn chắn sẽ hài lòng đấy!
              </Typography.Text>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <FormProvider {...buyForMeMethod}>
              <div className="t-buyForMe_field">
                <Controller
                  name="fullname"
                  control={buyForMeMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input name="fullname" required label="Họ và tên" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
              <div className="t-buyForMe_field">
                <Controller
                  name="phone"
                  control={buyForMeMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input name="phone" required label="Số điện thoại" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
              <div className="t-buyForMe_field">
                <Controller
                  name="email"
                  control={buyForMeMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input name="email" required label="Email" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
              <div className="t-buyForMe_field">
                <Controller
                  name="guestNote"
                  control={buyForMeMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextArea name="guestNote" label="Ghi chú" rows={2} value={value} onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
              <div className="t-buyForMe_field">
                <Controller
                  name="productImages"
                  control={buyForMeMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <label
                        htmlFor="productImages"
                        className="t-buyForMe_field_image"
                      >
                        Chọn hình ảnh
                      </label>
                      <input
                        id="productImages"
                        hidden
                        name="productImages"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          if (e.currentTarget.files) {
                            if (Object.keys(e.currentTarget.files).length > 3) {
                              buyForMeMethod.setError(
                                'productImages',
                                { message: 'Vui lòng chọn tối đa 3 ảnh' }
                              );
                            } else {
                              onChange(Object.values(e.currentTarget.files));
                            }
                          }
                        }}
                      />
                      {
                        error && (
                          <div className="a-input_error">
                            {error.message}
                          </div>
                        )
                      }
                      {value && value.length > 0 && (
                        <div className="t-buyForMe_images">
                          {value.map((item, idx) => (
                            <Image
                              key={item.name + idx.toString()}
                              imgSrc={URL.createObjectURL(item)}
                              ratio="1x1"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="t-buyForMe_button">
                <Button
                  variant="dark"
                  sizes="h48"
                  loading={isLoading}
                  handleClick={buyForMeMethod.handleSubmit(onSubmit)}
                >
                  Gửi thông tin
                </Button>
              </div>
            </FormProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BuyForMe;
