/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Select from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import useDidMount from 'hooks/useDidMount';
import { getLocationCitiesService, getLocationDistrictsService, getLocationWardsService } from 'services/location';
import { createShippingAddressService } from 'services/shippingAddress';
import { ShippingAddressDataRequest } from 'services/shippingAddress/types';
import { ERROR_MAPPING } from 'utils/constants';
import { shippingAddressSchema } from 'utils/schemas';

const ShippingAddress: React.FC = () => {
  const shippingAddressMethod = useForm<ShippingAddressDataRequest>({
    resolver: yupResolver(shippingAddressSchema),
  });

  const watchCity = shippingAddressMethod.watch('cityId');
  const watchDistrict = shippingAddressMethod.watch('districtId');

  const { mutate: getCitiesMutate, data: cities } = useMutation(
    'getCitiesAction',
    (countryId: number) => getLocationCitiesService(countryId),
  );

  const { mutate: getDistrictsMutate, data: districts } = useMutation(
    'getDistrictsAction',
    (cityId: number) => getLocationDistrictsService(cityId),
  );

  const { mutate: getWardsMutate, data: wards } = useMutation(
    'getWardsAction',
    (districtId: number) => getLocationWardsService(districtId),
  );

  const { mutate: createMutate, isLoading } = useMutation(
    'createShippingAddressAction',
    createShippingAddressService,
    {
      onSuccess: () => {
        // TODO
      },
      onError: (errors: any) => {
        if (errors.length > 0) {
          errors.forEach((ele: ErrorResponse) => {
            shippingAddressMethod.setError(
              ele.field as any,
              { message: ERROR_MAPPING[ele.message] }
            );
          });
        } else {
          toast.error('Đã có lỗi xảy ra!', { toastId: 'createFail' });
        }
      }
    }
  );

  const onSubmit = (data: ShippingAddressDataRequest) => {
    createMutate(data);
  };

  useDidMount(() => {
    getCitiesMutate(1);
  });

  useEffect(() => {
    getDistrictsMutate(watchCity);
    shippingAddressMethod.setValue('districtId', 0);
    shippingAddressMethod.setValue('wardId', 0);
  }, [getDistrictsMutate, shippingAddressMethod, watchCity]);

  useEffect(() => {
    getWardsMutate(watchDistrict);
    shippingAddressMethod.setValue('wardId', 0);
  }, [getWardsMutate, shippingAddressMethod, watchDistrict]);

  return (
    <FormProvider {...shippingAddressMethod}>
      <div className="p-account_field">
        <Controller
          name="name"
          control={shippingAddressMethod.control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <Input required label="Tên người nhận" type="text" value={value} bordered onChange={onChange} error={error?.message} />
          )}
        />
      </div>
      <div className="p-account_field">
        <Controller
          name="phone"
          control={shippingAddressMethod.control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <Input required label="Số điện thoại" type="text" value={value} bordered onChange={onChange} error={error?.message} />
          )}
        />
      </div>
      <div className="p-account_field">
        <Controller
          name="cityId"
          control={shippingAddressMethod.control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <Select
              name="cityId"
              placeholder="---"
              label="Tỉnh / Thành phố"
              options={cities || []}
              modifier={['bordered']}
              required
              value={cities?.find((item) => item.value === value)}
              handleSelect={(option) => onChange(option.value)}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="p-account_field">
        <Controller
          name="districtId"
          control={shippingAddressMethod.control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <Select
              name="districtId"
              placeholder="---"
              label="Quận / Huyện"
              options={districts || []}
              modifier={['bordered']}
              required
              value={districts?.find((item) => item.value === value)}
              handleSelect={(option) => onChange(option.value)}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="p-account_field">
        <Controller
          name="wardId"
          control={shippingAddressMethod.control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <Select
              name="wardId"
              placeholder="---"
              label="Phường / Xã"
              options={wards || []}
              modifier={['bordered']}
              required
              value={wards?.find((item) => item.value === value)}
              handleSelect={(option) => onChange(option.value)}
              error={error?.message}
            />
          )}
        />
      </div>
      <div className="p-account_field">
        <Controller
          name="address"
          control={shippingAddressMethod.control}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <Input required label="Địa chỉ" type="text" value={value} bordered onChange={onChange} error={error?.message} />
          )}
        />
      </div>
      <div className="p-account_button">
        <Button
          variant="primary"
          sizes="h42"
          loading={isLoading}
          handleClick={shippingAddressMethod.handleSubmit(onSubmit)}
        >
          <Typography.Text modifiers={['15x18']}>Save changes</Typography.Text>
        </Button>
      </div>
    </FormProvider>
  );
};

export default ShippingAddress;
