import { MutationOptions, QueryOptions } from '@apollo/client';

import { TransactionFields, TransactionQuery } from './transaction.field';
import { Transaction } from './transaction.model';

import { ShopItemQuery } from '../shopItem/shopItem.field';

import { CrudRepository } from '@/lib/servers/repo/crud.repo';

export class TransactionRepository extends CrudRepository<Transaction> {
    apiName = 'Transaction';
    shortFragment = this.parseFragment(`${TransactionFields}`);
    fullFragment = this.parseFragment(`
      ${TransactionQuery}
      shopItem{
        ${ShopItemQuery}
      }  
    `);

    async getCustomerTonTransactions() {
        const api = 'getCustomerTonTransactions';
        const option: MutationOptions = {
            mutation: this.gql`
            mutation {
              ${api} {
                data {
                  ${this.fullFragment}
                }
                star
              }
            }
          `,
        };
        const result = await this.apollo.mutate(option);

        return result.data[api];
    }

    async getCustomerMileageTransactions() {
        const api = 'getCustomerMileageTransactions';
        const option: QueryOptions = {
            query: this.gql`{${api} 
              {
                data {
                  id
                  createdAt
                  updatedAt
                  value
                  status
                  currency
                  type
                }
              }
            }`,
            fetchPolicy: 'no-cache',
        };
        const result = await this.apollo.query(option);

        return result.data[api];
    }

    async getCustomerTokenTransactions() {
        const api = 'getCustomerTokenTransactions';
        const option: QueryOptions = {
            query: this.gql`{${api} 
              {
                data {
                  id
                  createdAt
                  updatedAt
                  value
                  status
                  currency
                  type
                  # transactionId
                }
              }
            }`,
            fetchPolicy: 'no-cache',
        };
        const result = await this.apollo.query(option);

        return result.data[api];
    }
}
export const transactionService = new TransactionRepository();
