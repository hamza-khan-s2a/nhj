import axios from 'axios';

import { getUserInfo } from './localStroage';

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `/api/products/${id}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data
  } catch (err) {
    console.error(err)
    return { error: err.response.data.message || err.message }
  }
}

export const signin = async (email, password) => {
  const response = await axios.post('/api/users/signin', {
    email,
    password
  })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data.message)
      return { error: err.response.data.message || err.message }
    })

  return response
}

export const register = async (name, email, password) => {
  const response = await axios.post('/api/users/register', {
    name,
    email,
    password
  })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err.response.data.message)
      return { error: err.response.data.message || err.message }
    })

  return response
}

export const update = async (name, email, password) => {
  try {
    const { id, token } = getUserInfo()
    const response = await axios({
      url: `/api/users/${id}`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password
      }
    })
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data
  } catch (err) {
    console.error(err)
    return { error: err.response.data.message || err.message }
  }
}

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `/api/order`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    })
    if ((response.statusText !== "Created")) {
      throw new Error(response.data.message)
    }
    return response.data
  } catch (err) {

    return { error: err.response ? err.response.message : err.message }
  }
}

export const getMyOrders = async () => {
  const { token } = getUserInfo();
  try {
    const response = await axios({
      url: `/api/order/mine`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return err.response ? err.response.data.message : err.message;
  }
};

export const getOrder = async (id) => {
  const { token } = getUserInfo()
  try {
    const response = await axios({
      url: `/api/order/${id}`,
      // method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message)
    }
    return response.data

  } catch (err) {
    console.error(err)
    return { error: err.response.data.message || err.message }
  }
}
