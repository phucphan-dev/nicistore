export const ERROR_MAPPING: { [key: string]: string } = {
  'The email has already been taken.': 'Email đã tồn tại',
  'The selected verify code is invalid.': 'Mã xác nhận không đúng',
  'These credentials do not match our records.': 'Thông tin đăng nhập chưa chính xác',
  'Customer not active': 'Tài khoản chưa được kích hoạt'
};

export const LOCALSTORAGE = {
  NICI_TOKEN: 'NICI_TOKEN',
  NICI_REFRESH_TOKEN: 'NICI_REFRESH_TOKEN',
  NICI_CART: 'NICI_CART',
  NICI_HAS_ACCESS: 'NICI_HAS_ACCESS',
};

export const ROUTES_PATH = {
  HOME: '/',
  AUTHENTICATE: '/authenticate',
  PRODUCT_DETAIL: '/product-detail',
  CART: '/cart',
  CHECKOUT: '/checkout',
  TRACKING_ORDER: '/tracking-order',
  ACCOUNT: '/account',
  CONTACT: '/contact',
  WISHLIST: '/wishlist',
};
