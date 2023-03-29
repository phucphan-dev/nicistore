/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Loading from 'components/atoms/Loading';
import Select from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import useDidMount from 'hooks/useDidMount';
import { getLocationCitiesService, getLocationDistrictsService, getLocationWardsService } from 'services/location';
import {
  createShippingAddressService, deleteShippingAddressService,
  editShippingAddressService, getAllShippingAddressService
} from 'services/shippingAddress';
import { ShippingAddressData, ShippingAddressDataRequest } from 'services/shippingAddress/types';
import { ERROR_MAPPING } from 'utils/constants';
import mapModifiers, { scrollToTop } from 'utils/functions';
import { shippingAddressSchema } from 'utils/schemas';

type Props = {
  defaultValues?: ShippingAddressData;
  handleSuccess: () => void;
  handleCancel: () => void;
};

const ShippingAddress: React.FC<Props> = ({ defaultValues, handleSuccess, handleCancel }) => {
  const shippingAddressMethod = useForm<ShippingAddressDataRequest>({
    resolver: yupResolver(shippingAddressSchema),
    defaultValues: defaultValues ? {
      cityId: defaultValues.city.id,
      districtId: defaultValues.district.id,
      wardId: defaultValues.ward.id,
      name: defaultValues.name,
      phone: defaultValues.phone,
      address: defaultValues.address
    } : undefined
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
        handleSuccess();
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

  const { mutate: editMutate, isLoading: editLoading } = useMutation(
    'editShippingAddressAction',
    editShippingAddressService,
    {
      onSuccess: () => {
        handleSuccess();
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
    if (defaultValues) editMutate({ ...data, id: defaultValues.id });
    else createMutate(data);
  };

  useDidMount(() => {
    getCitiesMutate(1);
  });

  useEffect(() => {
    getDistrictsMutate(watchCity);
  }, [getDistrictsMutate, shippingAddressMethod, watchCity]);

  useEffect(() => {
    getWardsMutate(watchDistrict);
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
          loading={isLoading || editLoading}
          handleClick={shippingAddressMethod.handleSubmit(onSubmit)}
        >
          <Typography.Text modifiers={['15x18']}>Lưu</Typography.Text>
        </Button>
        <Button
          variant="secondary"
          sizes="h42"
          loading={isLoading || editLoading}
          handleClick={handleCancel}
        >
          <Typography.Text modifiers={['15x18']}>Hủy bỏ</Typography.Text>
        </Button>
      </div>
    </FormProvider>
  );
};

type ShippingAddressListProps = {
  isModal?: boolean;
  handleSelectAddress?: (data: ShippingAddressData) => void
};

const ShippingAddressList: React.FC<ShippingAddressListProps> = (
  { isModal, handleSelectAddress }
) => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<ShippingAddressData>();
  const [select, setSelect] = useState<number>(-1);
  const {
    mutate: getAllAddressMutate, data: shippingAddress,
    isLoading: getAllLoading
  } = useMutation(
    'getAllShippingAddressAction',
    getAllShippingAddressService,
  );
  const {
    mutate: deleteMutate
  } = useMutation(
    'deleteShippingAddressAction',
    deleteShippingAddressService,
    {
      onSuccess: () => {
        getAllAddressMutate();
      }
    }
  );

  useDidMount(() => {
    getAllAddressMutate();
  });
  return (
    <div className="p-account_shipping">
      {showForm ? (
        <ShippingAddress
          defaultValues={editData}
          handleSuccess={() => {
            setShowForm(false);
            setEditData(undefined);
            getAllAddressMutate();
            scrollToTop();
          }}
          handleCancel={() => {
            setShowForm(false);
            setEditData(undefined);
            scrollToTop();
          }}
        />
      ) : (
        <>
          <div className="p-account_shipping_list">
            {getAllLoading && <Loading isShow />}
            {shippingAddress?.data.map((item, idx) => (
              <div
                className={mapModifiers('p-account_shipping_item', select === idx && 'active')}
                key={item.id}
                onClick={() => isModal && setSelect(idx)}
              >
                <div className="p-account_shipping_wrapper">
                  <Typography.Text>
                    Tên:
                    {' '}
                    <strong>
                      {' '}
                      {item.name}
                    </strong>
                  </Typography.Text>
                  <div className="p-account_shipping_line">
                    <Typography.Text>
                      SĐT:
                      {' '}
                      <strong>{item.phone}</strong>
                    </Typography.Text>
                  </div>
                  <div className="p-account_shipping_line">
                    <Typography.Text>
                      Địa chỉ:
                      {' '}
                      <strong>
                        {item.address}
                        ,
                        {' '}
                        {item.ward.name}
                        ,
                        {' '}
                        {item.district.name}
                        ,
                        {' '}
                        {item.city.name}
                      </strong>
                    </Typography.Text>
                  </div>
                  <div className="p-account_shipping_edit">
                    <Button
                      iconName="edit"
                      iconSize="16"
                      variant="whiteBorder"
                      handleClick={() => {
                        setShowForm(true);
                        setEditData(item);
                      }}
                    />
                  </div>
                  <div className="p-account_shipping_delete">
                    <Button
                      iconName="delete"
                      iconSize="16"
                      variant="whiteBorder"
                      handleClick={() => {
                        deleteMutate([item.id]);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-account_shipping_button">
            <Button
              variant={isModal ? 'secondary' : 'primary'}
              sizes="h42"
              handleClick={() => setShowForm(true)}
            >
              <Typography.Text modifiers={['15x18']}>Thêm mới</Typography.Text>
            </Button>
            {isModal && (
              <Button
                variant="primary"
                sizes="h42"
                handleClick={() => handleSelectAddress && shippingAddress && select > -1
                  && handleSelectAddress(shippingAddress.data[select])}
              >
                <Typography.Text modifiers={['15x18']}>Chọn</Typography.Text>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingAddressList;
