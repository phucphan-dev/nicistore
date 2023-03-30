import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import { changePasswordService, updateProfileService } from 'services/authenticate';
import { ChangePasswordDataRequest, UpdateProfileDataRequest } from 'services/authenticate/types';
import { useAppSelector } from 'store/hooks';
import { ERROR_MAPPING } from 'utils/constants';
import { changePasswordSchema, updateProfileSchema } from 'utils/schemas';

const Profile: React.FC = () => {
  const profile = useAppSelector((state) => state.auth.profile);

  const profileMethod = useForm<UpdateProfileDataRequest>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      fullName: profile?.fullName,
      phone: profile?.phone
    }
  });

  const { mutate: updateProfileMutate, isLoading: updateProfileLoading } = useMutation(
    'updateProfileAction',
    updateProfileService,
    {
      onSuccess: () => {
        toast.success('Cập nhật thông tin thành công!', { toastId: 'profileFail' });
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            profileMethod.setError(ele.field as any, { message: ERROR_MAPPING[ele.message] });
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'profileail' });
        }
      }
    }
  );

  const onUpdateProfile = (data: UpdateProfileDataRequest) => {
    updateProfileMutate(data);
  };

  const handleUpdateProfile = async () => {
    const isPassed = await profileMethod.trigger();
    if (isPassed) {
      const data = profileMethod.getValues();
      updateProfileMutate(data);
    }
  };

  const passwordMethod = useForm<ChangePasswordDataRequest & { confirmPassword: string }>({
    resolver: yupResolver(changePasswordSchema),
  });

  const { mutate: changePasswordMutate, isLoading: changePasswordLoading } = useMutation(
    'changePasswordAction',
    changePasswordService,
    {
      onSuccess: () => {
        toast.success('Đổi mật khẩu thành công!', { toastId: 'changePasswordFail' });
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            passwordMethod.setError(ele.field as any, { message: ERROR_MAPPING[ele.message] });
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'changePasswordFail' });
        }
      }
    }
  );

  const onChangePassword = (data: ChangePasswordDataRequest & { confirmPassword: string }) => {
    changePasswordMutate({ oldPassword: data.oldPassword, password: data.password });
  };

  const handleChangePassword = async () => {
    const isPassed = await passwordMethod.trigger();
    if (isPassed) {
      const data = passwordMethod.getValues();
      changePasswordMutate({ oldPassword: data.oldPassword, password: data.password });
    }
  };

  return (
    <>
      <FormProvider {...profileMethod}>
        <div className="p-account_field">
          <Typography.Text modifiers={['600', '18x21']}>Thông tin</Typography.Text>
        </div>
        <div className="p-account_field">
          <Controller
            name="fullName"
            control={profileMethod.control}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name="fullName"
                required
                label="Họ và tên"
                type="text"
                value={value}
                bordered
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className="p-account_field">
          <Controller
            name="phone"
            control={profileMethod.control}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name="phone"
                required
                label="Số điện thoại"
                type="text"
                value={value}
                bordered
                onChange={onChange}
                error={error?.message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateProfile();
                  }
                }}
              />
            )}
          />
        </div>
        <div className="p-account_button">
          <Button
            variant="primary"
            sizes="h42"
            loading={updateProfileLoading}
            handleClick={profileMethod.handleSubmit(onUpdateProfile)}
          >
            Cập nhật
          </Button>
        </div>
      </FormProvider>
      <FormProvider {...passwordMethod}>
        <div className="p-account_field heading">
          <Typography.Text modifiers={['600', '18x21']}>Mật khẩu</Typography.Text>
        </div>
        <div className="p-account_field">
          <Controller
            name="oldPassword"
            control={passwordMethod.control}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name="oldPassword"
                required
                label="Mật khẩu hiện tại"
                type="password"
                value={value}
                bordered
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className="p-account_field">
          <Controller
            name="password"
            control={passwordMethod.control}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name="password"
                required
                label="Mật khẩu mới"
                type="password"
                value={value}
                bordered
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
        </div>
        <div className="p-account_field">
          <Controller
            name="confirmPassword"
            control={passwordMethod.control}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <Input
                name="confirmPassword"
                required
                label="Nhập lại mật khẩu mới"
                type="password"
                value={value}
                bordered
                onChange={onChange}
                error={error?.message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleChangePassword();
                  }
                }}
              />
            )}
          />
        </div>
        <div className="p-account_button">
          <Button
            variant="primary"
            sizes="h42"
            loading={changePasswordLoading}
            handleClick={passwordMethod.handleSubmit(onChangePassword)}
          >
            Đổi mật khẩu
          </Button>
        </div>
      </FormProvider>
    </>
  );
};

export default Profile;
