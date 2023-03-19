import * as yup from 'yup';

export const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

export const loginSchema = yup.object({
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const registerSchema = yup.object({
  full_name: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  email: yup.string().required('Vui lòng nhập lại địa chỉ email').email('Email không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự'),
});
