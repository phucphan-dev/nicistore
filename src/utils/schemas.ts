import * as yup from 'yup';

export const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const loginSchema = yup.object({
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const registerSchema = yup.object({
  fullName: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự'),
});

export const shippingAddressSchema = yup.object({
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  name: yup.string().required('Vui lòng nhập tên'),
  cityId: yup.number().required('Vui lòng chọn tỉnh / thành phố'),
  districtId: yup.number().required('Vui lòng chọn quận / huyện'),
  wardId: yup.number().required('Vui lòng chọn phường / xã'),
});

export const updateProfileSchema = yup.object({
  fullName: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('Vui lòng nhập mật khẩu'),
  password: yup.string().required('Vui lòng nhập mật khẩu mới'),
  confirmPassword: yup.string().required('Vui lòng nhập xác nhận mật khẩu mới').oneOf([yup.ref('password')], 'Mật khẩu xác nhận không trùng khớp'),
});

export const orderSchema = yup.object({
  cityId: yup.number().required('Vui lòng chọn tỉnh / thành phố'),
  districtId: yup.number().required('Vui lòng chọn quận / huyện'),
  wardId: yup.number().required('Vui lòng chọn phường / xã'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  name: yup.string().required('Vui lòng nhập họ và tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
});

export const buyForMeSchema = yup.object({
  fullname: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
});

export const contactScheme = yup.object({
  name: yup.string().required('Vui lòng nhập họ tên'),
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
  subject: yup.string().required('Vui lòng nhập chủ để'),
  message: yup.string().required('Vui lòng để lại lời nhắn')
});
