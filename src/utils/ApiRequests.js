import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { wooCommerceRequest } from './wooCommerceConfig';

// temporrary for now storing token in local storage will be moved to Cookies
const TOKEN = localStorage.getItem('Authorization');

// Auth WP Endpoint to Validate token and check signature
export const validateToken = axios.create({
  baseURL:
    'https://combative-crane-ipifx.instawp.xyz/wp-json/jwt-auth/v1/token/validate',
  headers: { Authorization: `Bearer ${TOKEN}` },
});

// Auth WP Endpoint to check username and password and return token (For login only)
export const AuthRequest = axios.create({
  baseURL:
    'https://combative-crane-ipifx.instawp.xyz/wp-json/jwt-auth/v1',
});

// Function to get method(get, post, delete, put), endpoint, userId and data if needed.
export const userRequest = async (
  method,
  endpoint,
  userId,
  data
) => {
  // Validate token signature if is valid using WP Auth token validate
  await validateToken.post('');
  // if response is valid then added a decode to chech user id matches
  const decoded = jwtDecode(TOKEN);
  const id = decoded.data.user.id;
  if (id === userId) {
    // if userId matches will fire up wooCommerce function
    return await wooCommerceRequest[method](endpoint, data);
  } else {
    return {
      response: {
        data: {
          staus: 404,
          message: 'unAuth Error userId mismatch',
        },
      },
    };
  }
};

// Function handling all publicRequests that will not require Auth.
export const publicRequest = async (
  method,
  endpoint,
  data
) => {
  return await wooCommerceRequest[method](endpoint, data);
};
