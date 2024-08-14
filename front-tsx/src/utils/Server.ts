import axios from 'axios';

//const API_URL = 'http://localhost:8080';
const API_URL = 'https://task-echo-frad2spata-uc.a.run.app';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProductToCart = async (cartID: string, productID: string) => {
  const endpoint = `${API_URL}/carts/${cartID}/products/${productID}`;
  try {
    const response = await axios.post(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error adding product ${productID} to cart ${cartID}:`, error);
    throw error;
  }
};

export const createCart = async () => {
  const endpoint = `${API_URL}/carts`;
  try {
    const response = await axios.post(endpoint, { products: [] });
    return response.data;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};


export const getCartById = async (cartID: number) => {
  const endpoint = `${API_URL}/carts/${cartID}`;
  try {
    const response = await axios.get(endpoint);
    const cart = response.data;

    if (cart.status === 'paid') {
      return createCart();
    }

    return cart;
  } catch (error) {
    console.error(`Error fetching cart with ID ${cartID}:`, error);
    throw error;
  }
};

export const removeProductFromCart = async (cartID: string, productID: string) => {
  const endpoint = `${API_URL}/carts/${cartID}/products/${productID}`;
  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error removing product ${productID} from cart ${cartID}:`, error);
    throw error;
  }
};

export const fetchPayments = async () => {
  const endpoint = `${API_URL}/payments`;
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const payForCart = async (cartID: string) => {
  const endpoint = `${API_URL}/payments/${cartID}`;
  try {
    const response = await axios.post(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error paying for cart with ID ${cartID}:`, error);
    throw error;
  }
};
