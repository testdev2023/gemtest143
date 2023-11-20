import axios from "axios";

export const HTTP = async (method, url, data, access_token) => {
  try {
    const res = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.data;
  } catch (err) {}
};
