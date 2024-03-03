import axios from "axios";
import {
  loginUrl,
  getPostAll,
  createPost,
  getbyid,
  loadPhoto,
  updatePosturl,
} from "./urls";

const axiosInterceptor = axios.create({
  baseURL: "https://api-sandbox.monbak.com",
});

// globalThis is a new feature in ES2020
const localStorage = globalThis.localStorage;

axiosInterceptor.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem("token"));

    const accessToken = tokens.access.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInterceptor.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

async function post(url, data, config = {}) {
  debugger;
  return await axiosInterceptor
    .post(url, data, { ...config })
    .then((response) => response);
}

async function get(url, config = {}) {
  return await axiosInterceptor.get(url, { ...config }).then((response) => {
    return response;
  });
}

async function patch(url, data, config = {}) {
  return await axiosInterceptor
    .patch(url, data, { ...config })
    .then((response) => response);
}

// Login function
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(loginUrl, {
      email,
      password,
    });

    if (response.status === 200) {
      const { data } = response;
      localStorage.setItem("token", JSON.stringify(data.tokens));
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `user=${JSON.stringify(data.user)}; path=/`;
      window.location.replace("/");
    } else {
      return response.data.message;
    }
  } catch (error) {
    return error.response.data.message;
  }
};

// Create new prepost
export const createPrePost = async (data) => {
  debugger;

  try {
    const response = await post(createPost, data);
    setTimeout(() => {
      window.location.replace(`/CeoPost`);
    }, 1000);
  } catch (error) {
    throw new Error(error);
  }
};

// Get all post
export const getPost = async () => {
  try {
    const response = await get(getPostAll);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Get post by id
export const getPostbyId = async (id) => {
  try {
    const response = await get(getbyid + id);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// Upload image
export const uploadImagePost = async (data) => {
  try {
    debugger;
    const response = await post(loadPhoto, data);
    return response.data.data.publicUrl;
  } catch (error) {
    throw new Error(error);
  }
};

// Update post
export const updatePost = async (id, data) => {
  try {
    const response = await patch(updatePosturl + id, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const rebuild = async () => {
  try {
    const response = await post(
      `https://webhooks.amplify.us-west-1.amazonaws.com/prod/webhooks?id=9bd7d1a6-d58a-48cb-b160-f83536be5cb8&token=${
        import.meta.env.TOKEN_AMPLIFY
      }=startbuild`
    );
  } catch (error) {
    throw new Error(error);
  }
};
