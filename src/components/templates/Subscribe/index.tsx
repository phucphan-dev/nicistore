import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import { subcribeService } from 'services/contact';

interface SubscribeProps {
  children?: React.ReactNode;
}

const Subscribe: React.FC<SubscribeProps> = () => {
  const method = useForm<{ email: string }>({
    resolver: yupResolver(yup.object({
      email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
    })),
  });
  const { mutate: subscribeMutate, isLoading } = useMutation(
    'subcribesAction',
    subcribeService,
    {
      onSettled: () => {
        method.setValue('email', '');
        toast.success('Đăng ký thông tin thành công!', { toastId: 'subscribeSuccess' });
      }
    }
  );
  const onSubmit = (data: { email: string }) => {
    subscribeMutate(data.email);
  };
  const handleSubscribe = async () => {
    const valid = await method.trigger();
    if (valid) {
      const { email } = method.getValues();
      subscribeMutate(email);
    }
  };
  return (
    <div className="t-subscribe">
      <Container>
        <div className="t-subscribe_wrapper">
          <div className="t-subscribe_left">
            <Typography.Heading type="h3" modifiers={['white', '20x24']}>Nhận email của chúng tôi để biết thông tin về các mặt hàng mới, bán hàng và hơn thế nữa.</Typography.Heading>
            <div className="t-subscribe_input">
              <FormProvider {...method}>
                <Controller
                  name="email"
                  control={method.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      name="email"
                      required
                      placeholder="Nhập email của bạn"
                      type="text"
                      value={value}
                      bordered
                      onChange={onChange}
                      error={error?.message}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubscribe();
                        }
                      }}
                    />
                  )}
                />
                <div className="t-subscribe_button">
                  <Button
                    sizes="h48"
                    variant="dark"
                    handleClick={method.handleSubmit(onSubmit)}
                    loading={isLoading}
                  >
                    Đăng ký
                  </Button>
                </div>
              </FormProvider>
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
};

export default Subscribe;
