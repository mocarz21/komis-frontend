import { useQuery } from "./useQuery";
import { returnFetch } from "./returnFetch";
import { lodgingsSave } from "./preSend";


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


const endpointGenerator = (endpoint, props, rest) => {
  const securePrefix = props?.isSecure ? "/secure" : "";
  let preparedEndpoint = `${process.env.REACT_APP_API_PATH}${securePrefix}/${endpoint}/`;
  if (props?.id) {
    preparedEndpoint += props.id + "/";
  }
  if (rest) {
    preparedEndpoint += `/${rest}`;
  }
  if (props?.query) {
    preparedEndpoint += getQuery(props.query);
  }

  return preparedEndpoint;
};


export const useBooks = props => {
  const { loading, payload } = useQuery({
    endpoint: endpointGenerator("books", props),
    isLazy: props?.isLazy,
  });

  return {
    loading,
    payload,
  };
};