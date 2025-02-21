import { MutationOptions, QueryOptions } from "@apollo/client";

import { CheckPointInput, Customer } from "./customer.model";
import { CustomerFields, CustomerQuery } from "./customer.field";

import { CrudRepository } from "../../servers/main/crud.repo";
import { fetchResultGeo } from "../../helpers/ipAddress.helper";

export class CustomerRepository extends CrudRepository<Customer> {
  apiName = "Customer";

  shortFragment = this.parseFragment(`
    ${CustomerFields}
  `);

  fullFragment = this.parseFragment(`
    customer{
      ${CustomerQuery}
    }
  `);

  loginByAddress = async ({ address }: { address: string }) => {
    const api = "loginByAddress";

    const geo = await fetchResultGeo();

    const option: MutationOptions = {
      mutation: this.gql`
        mutation {
          ${api}(
            address: "${address}",
            addressIp:"${geo.IPv4}",
            ) {
            customer { ${CustomerQuery} }
            token
          }
        }
      `,
    };

    const result = await this.apollo.mutate(option);

    this.handleError(result);

    return result.data[api] as {
      customer: Customer;
      token: string;
    };
  };

  loginByGoogle = async ({ idToken }: { idToken: string }) => {
    const api = "loginByGoogle";
    const option: MutationOptions = {
      mutation: this.gql`
        mutation {
          ${api}(
            idToken: "${idToken}"
            ) {
            customer { ${CustomerQuery} }
            token
          }
        }
      `,
    };

    const result = await this.apollo.mutate(option);

    this.handleError(result);

    return result.data[api] as {
      customer: Customer;
      token: string;
    };
  };

  async loginTelegram(token: string) {
    const api = "loginTelegram";

    const option: MutationOptions = {
      mutation: this.gql`
        mutation {
          ${api}(
            token: "${token}"
            ) {
            token
          }
        }
      `,
    };

    const result = await this.apollo.mutate(option);

    this.handleError(result);

    return result.data[api] as {
      token: string;
    };
  }

  async customerGetMe() {
    const api = "customerGetMe";
    const option: QueryOptions = {
      query: this.gql`query {  ${api} { ${this.fullFragment} }}`,
      fetchPolicy: "no-cache",
    };
    const result = await this.apollo.query(option);

    return result.data[api];
  }

  async checkPoint(checkPoint: CheckPointInput, signal?: AbortSignal) {
    const api = "customerCheckPoint";

    const option: MutationOptions = {
      mutation: this.gql`
            mutation customerCheckPoint($checkPoint: CheckPointInput!) {
                ${api}(checkPoint: $checkPoint) {
                  # status
                  star {
                    value
                  }
                }
            }
        `,
      variables: {
        checkPoint: checkPoint,
      },
      context: {
        fetchOptions: {
          signal,
        },
      },
    };

    const result = await this.apollo.mutate(option);

    this.handleError(result);

    return result.data[api];
  }

  async inviteCustomer(referralCode: string) {
    const api = "inviteCustomer";

    const mutation = `
            mutation inviteCustomer($referralCode: String!) {
                ${api}(referralCode: $referralCode) {
                    customer {
                          referenceId
                        }
                    referrerCustomer {
                          id
                          referralCode
                        }
                }
            }
        `;

    const option: MutationOptions = {
      mutation: this.gql(mutation),
      variables: { referralCode },
    };

    const result = await this.apollo.mutate(option);

    return result.data[api];
  }

  async claimEnterInviteCodeReward() {
    const api = "claimEnterInviteCodeReward";
    const mutation = `
            mutation claimEnterInviteCodeReward {
                ${api} {
                    rewardPoint
                    customer {
                     ${CustomerQuery}
                    }
                }
            }
        `;

    const option: MutationOptions = {
      mutation: this.gql(mutation),
    };

    const result = await this.apollo.mutate(option);

    return result.data[api];
  }

  async claimReferralReward(unclaimedReferrals: number) {
    const api = "claimReferralReward";

    const mutation = this.gql`
            mutation claimReferralReward($unclaimedReferrals: Int!) {
                ${api}(unclaimedReferrals: $unclaimedReferrals) {
                    rewardPoint
                    customer {
                      ${CustomerQuery}
                    }
                }
            }
        `;

    const result = await this.apollo.mutate({
      mutation,
      variables: { unclaimedReferrals },
    });

    return result.data[api];
  }

  async updateCustomerWalletAddress(walletAddress: string): Promise<any> {
    const mutation = this.gql`
        mutation updateCustomerWalletAddress($walletAddress: String!) {
            updateCustomerWalletAddress(walletAddress: $walletAddress) {
                id
                walletAddress
            }
        }
    `;

    const result = await this.apollo.mutate({
      mutation,
      variables: { walletAddress },
    });

    this.handleError(result);

    return result.data.updateCustomerWalletAddress;
  }

  async updateCustomerWalletSolanaAddress(
    walletAddress: string,
    token?: string,
  ): Promise<any> {
    const mutation = this.gql`
        mutation updateCustomerWalletSolanaAddress($walletAddress: String!) {
            updateCustomerWalletSolanaAddress(walletAddress: $walletAddress) {
                id
                walletSolanaAddress
            }
        }
    `;

    const result = await this.apollo.mutate({
      mutation,
      variables: { walletAddress },
      context: { headers: { "x-token": token } },
    });

    this.handleError(result);

    return result.data.updateCustomerWalletSolanaAddress;
  }

  async customerGetRank() {
    const api = "customerGetRank";
    const option: QueryOptions = {
      query: this.gql`query {  ${api} { 
                  id
                  point
                  rank
             }}`,
      fetchPolicy: "no-cache",
    };
    const result = await this.apollo.query(option);

    return result.data[api];
  }

  async customerGetTotal() {
    const api = "customerGetTotal";
    const option: QueryOptions = {
      query: this.gql`query {  ${api} { 
                total
           }}`,
      fetchPolicy: "no-cache",
    };
    const result = await this.apollo.query(option);
    // console.log('result.data[api]',result.data[api])

    return result.data[api];
  }
}

export const CustomerService = new CustomerRepository();
