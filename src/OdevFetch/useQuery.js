import { use, useEffect } from "react";
import { useState } from "react";
import { fetchSetting } from "./fetchConfig";

export const useQuery = ({ endpoint, query, isLazy }) => {
  const [loading, setLoading] = useState(isLazy ? false : true); 
  const [payload, setPayload] = useState(false);

  const getQuery = query => {
    const values = [];
    if (query) {
      Object.keys(query).forEach(key => {
        values.push(`${key}=${query[key]}`);
      });
    }
    const preparedQuery = values.join("&");

    return values.length ? `?${preparedQuery}` : "";
  };

  const fetchPayload = async ({ query }) => {
 
    await fetch(`${process.env.REACT_APP_API_PATH}/${endpoint}${getQuery(query)}`, { 
      ...fetchSetting,
      method: "GET",
      headers: {
        ...fetchSetting.headers,
        authorization: `${sessionStorage.getItem('accessToken')}`,
        refreshToken: sessionStorage.getItem('refreshToken')
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res && res.status && res.message) {
        }
        setPayload(res);
        setLoading(false);
      });
      
  };

  const refetch = payload => {
    setLoading(true);
    fetchPayload({
      query: payload?.query || {},
    });
  };

  useEffect(() => {
    if (!isLazy) {
      fetchPayload({ query });
    }
  }, []);

  return {
    loading,
    payload,
    refetch,
  };
};