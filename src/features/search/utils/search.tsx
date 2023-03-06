import axios, { CancelTokenSource } from "axios";

const makeRequestCreator = () => {
  let source: CancelTokenSource;

  return async (query: string) => {
    // Check if we made a request
    if (source) {
      // Cancel the previous request before making a new request
      source.cancel();
    }
    // Create a new CancelToken
    source = axios.CancelToken.source();
    try {
      const res = await axios.get(query, { cancelToken: source.token });
      const result = res.data.data;
      console.log(result);

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      }
    }
  };
};

export const search = makeRequestCreator();
