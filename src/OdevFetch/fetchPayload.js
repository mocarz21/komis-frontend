import { fetchSetting } from "./fetchConfig";

export const fetchPayload = async ({ endpoint, body, callback }) => {
  const output = await fetch(`${process.env.REACT_APP_API_PATH}/${endpoint}`, {
    ...fetchSetting,
    headers: {
      ...fetchSetting.headers,
      ["Access-Token"]: `${sessionStorage.getItem("accessToken")}`,
    },
    body: body ? JSON.stringify(body) : "",
  })
    .then(response => response.json())
    .then(res => {
      callback(res);
    });

  return output;
};
