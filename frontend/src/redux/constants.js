export const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000" // Backend for local development
  : "https://e-commerce-app-apimern.vercel.app"; // Production backend
export const USERS_URL = "/api/users";
export const CATEGORY_URL = "/api/category";
export const PRODUCT_URL = "/api/products";
export const UPLOAD_URL = "/api/upload";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
