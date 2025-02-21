import { setContext } from "apollo-link-context";
import { getCustomerToken } from "../services/customer/customer.model";

export const AuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return new Promise((resolve) => {
    const token = getCustomerToken();
    const context = {
      headers: {
        ...headers,
        ...(token && token !== "undefined"
          ? {
              "x-token": token,
            }
          : {}),
      },
    };

    // return the headers to the context so httpLink can read them
    resolve(context);
  });
});
