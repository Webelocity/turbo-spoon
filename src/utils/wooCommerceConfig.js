import axios from 'axios';

// WooCommerce Api Endpoint added with api security keys
export const wooCommerceRequest = axios.create({
  params: {
    consumer_key: process.env.REACT_APP_CONSUMER_KEY,
    consumer_secret: process.env.REACT_APP_CONSUMER_SECRET,
  },
  baseURL: process.env.REACT_APP_WOOCOMMERCE_BASE_URL,
});
