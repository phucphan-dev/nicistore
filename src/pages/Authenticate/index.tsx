/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
// import Checkbox from 'components/atoms/Checkbox';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Section from 'components/organisms/Section';
import { loginService, registerService, registerVerifyEmailService } from 'services/authenticate';
import { LoginDataRequest, RegisterDataRequest } from 'services/authenticate/types';
import { addToCartService } from 'services/cart';
import { setAccessToken, setRefreshToken } from 'services/common/storage';
import { getProfileAction } from 'store/authenticate';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ERROR_MAPPING, LOCALSTORAGE, ROUTES_PATH } from 'utils/constants';
import mapModifiers from 'utils/functions';
import { loginSchema, registerSchema } from 'utils/schemas';

const Authenticate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [verified, setVerified] = useState(false);
  const profile = useAppSelector((state) => state.auth.profile);

  /* lOGIN */
  const loginMethod = useForm<LoginDataRequest>({
    resolver: yupResolver(loginSchema),
  });

  const { mutate: addToCartMutate, isLoading: syncCartLoading } = useMutation(
    'syncToCartAction',
    addToCartService,
    {
      onSuccess: () => {
        localStorage.removeItem(LOCALSTORAGE.NICI_CART);
      },
      onSettled: () => {
        navigate(ROUTES_PATH.HOME);
      }
    }
  );

  const { mutate: loginMutate, isLoading: loginLoading } = useMutation(
    'loginAction',
    loginService,
    {
      onSuccess: (data) => {
        toast.success('Đăng nhập thành công!', { toastId: 'loginSuccess' });
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        dispatch(getProfileAction());
        const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
        const cartData = cartLocal ? JSON.parse(cartLocal) as CartItem[] : [];
        if (cartData.length > 0) {
          addToCartMutate(cartData.map((item) => ({
            productId: item.productId,
            sizeId: item.size.id,
            colorId: item.color.id,
            quantity: item.quantity
          })));
        } else {
          navigate(ROUTES_PATH.HOME);
        }
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            loginMethod.setError('password', { message: ERROR_MAPPING[ele.message] || 'Thông tin chưa đúng' });
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'loginFail' });
        }
      }
    }
  );

  const loginAction = async (data: LoginDataRequest) => {
    loginMutate(data);
  };

  const handleLogin = async () => {
    const isPassed = await loginMethod.trigger();
    if (isPassed) {
      const data = loginMethod.getValues();
      loginMutate(data);
    }
  };

  /* REGISTER */
  const registerMethod = useForm<RegisterDataRequest & { verifyCode: string }>({
    resolver: yupResolver(registerSchema),
  });

  const { mutate: registerMutate, isLoading: registerLoading } = useMutation(
    'registerAction',
    registerService,
    {
      onSuccess: () => {
        setVerified(true);
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            registerMethod.setError(ele.field as any, { message: ERROR_MAPPING[ele.message] });
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'registerFail' });
        }
      }
    }
  );

  const { mutate: verifyEmailMutate, isLoading: verifyLoading } = useMutation(
    'verifyEmailAction',
    registerVerifyEmailService,
    {
      onSuccess: () => {
        toast.success('Chúc mừng bạn đã đăng ký tài khoản thành công!', { toastId: 'verifySuccess' });
        setVerified(false);
        setIsLogin(true);
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            registerMethod.setError(ele.field as any, { message: ERROR_MAPPING[ele.message] || 'Thông tin chưa đúng' });
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'registerFail' });
        }
      }
    }
  );

  const registerAction = useCallback(async (
    data: RegisterDataRequest & { verifyCode: string }
  ) => {
    if (verified) {
      if (!data.verifyCode) {
        registerMethod.setError('verifyCode', { message: 'Vui lòng nhập mã xác thực' });
      }
      verifyEmailMutate(data.verifyCode);
    } else {
      registerMutate(data);
    }
  }, [registerMethod, registerMutate, verified, verifyEmailMutate]);

  const handleRegister = async () => {
    const isPassed = await registerMethod.trigger();
    if (isPassed) {
      const data = registerMethod.getValues();
      registerMutate(data);
    }
  };

  useEffect(() => {
    if (profile) {
      navigate('/account');
    }
  }, [navigate, profile]);

  return (
    <Section>
      <div className="p-authenticate">
        <div className="p-authenticate_tabs">
          <div className={mapModifiers('p-authenticate_btnLogin', isLogin && 'active')}>
            <Button handleClick={() => setIsLogin(true)}>
              <Typography.Text modifiers={['18x21', '700', 'uppercase']}>Đăng nhập</Typography.Text>
            </Button>
          </div>
          <div className={mapModifiers('p-authenticate_btnRegister', !isLogin && 'active')}>
            <Button handleClick={() => setIsLogin(false)}>
              <Typography.Text modifiers={['18x21', '700', 'uppercase']}>Đăng ký</Typography.Text>
            </Button>
          </div>
        </div>
        <div className="p-authenticate_content">
          <div className={mapModifiers('p-authenticate_login', isLogin && 'active')}>
            <FormProvider {...loginMethod}>
              <div className="p-authenticate_field">
                <Controller
                  name="email"
                  control={loginMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input name="email" required label="Email" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                  )}
                />
              </div>
              <div className="p-authenticate_field">
                <Controller
                  name="password"
                  control={loginMethod.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      name="password"
                      required
                      label="Mật khẩu"
                      type="password"
                      value={value}
                      bordered
                      onChange={onChange}
                      error={error?.message}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLogin();
                        }
                      }}
                    />
                  )}
                />
              </div>
              {/* <div className="p-authenticate_field">
              <Checkbox name="isRemember">Ghi nhớ</Checkbox>
            </div> */}
              <div className="p-authenticate_button">
                <Button type="submit" variant="primary" loading={loginLoading || syncCartLoading} sizes="h42" handleClick={loginMethod.handleSubmit(loginAction)}>
                  <Typography.Text modifiers={['15x18', '500', 'uppercase']}>Đăng nhập</Typography.Text>
                </Button>
              </div>
            </FormProvider>
            {/* <div className="p-authenticate_forgot">
              <Link><Typography.Text modifiers={['14x16', 'ferrariRed']}>
              Quên mật khẩu?</Typography.Text></Link>
            </div> */}
          </div>
          <div className={mapModifiers('p-authenticate_register', !isLogin && 'active')}>
            <FormProvider {...registerMethod}>
              {verified ? (
                <div className="p-authenticate_field">
                  <div className="p-authenticate_message">
                    <Typography.Text modifiers={['12x14', 'cadetGrey', 'center']}>
                      Chúng tôi đã gửi một mã xác thực đến Email:
                      {' '}
                      <Typography.Text type="span" modifiers={['ferrariRed', '500']}>{registerMethod.getValues('email')}</Typography.Text>
                      <br />
                      Vui lòng nhập mã xác thực để kích hoạt tài khoản.
                    </Typography.Text>
                  </div>
                  <Controller
                    name="verifyCode"
                    control={registerMethod.control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <Input prefix="NICI-" required label="Mã xác thực" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                    )}
                  />
                </div>
              ) : (
                <>
                  <div className="p-authenticate_field">
                    <Controller
                      name="fullName"
                      control={registerMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="fullName" required label="Họ và tên" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-authenticate_field">
                    <Controller
                      name="phone"
                      control={registerMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="phone" required label="Số điện thoại" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-authenticate_field">
                    <Controller
                      name="email"
                      control={registerMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="email" required label="Email" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-authenticate_field">
                    <Controller
                      name="password"
                      control={registerMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input
                          name="password"
                          required
                          label="Mật khẩu"
                          type="password"
                          value={value}
                          bordered
                          onChange={onChange}
                          error={error?.message}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleRegister();
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                </>
              )}
              <div className="p-authenticate_button">
                <Button type="submit" loading={registerLoading || verifyLoading} variant="primary" sizes="h42" handleClick={registerMethod.handleSubmit(registerAction)}>
                  <Typography.Text modifiers={['15x18', '500', 'uppercase']}>{verified ? 'Xác thực' : 'Đăng ký'}</Typography.Text>
                </Button>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Authenticate;
