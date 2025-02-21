/* eslint-disable eqeqeq */
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import {
  ApolloQueryResult,
  FetchResult,
  MutationOptions,
  QueryOptions,
} from "@apollo/client/core";
import gql from "graphql-tag";

import { initializeApollo } from "../../graphql/apolloClient";

export class GraphRepository {
  static instance: GraphRepository;
  private _apollo: ApolloClient<NormalizedCacheObject> | undefined;

  static getInstance() {
    if (!GraphRepository.instance) {
      this.instance = new GraphRepository();
    }

    return GraphRepository.instance;
  }

  get apollo() {
    if (!this._apollo) {
      const publicUri = process.env.API_URI;
      const uri = `${publicUri}/graphql`;

      this._apollo = initializeApollo({ uri });
    }

    return this._apollo;
  }

  gql: Function = gql;

  query({
    query,
    options,
    variablesParams,
  }: {
    query: string[] | string;
    options?: Partial<QueryOptions>;
    variablesParams?: any;
  }) {
    return this.apollo.query<any>({
      query: gql`
        ${this.generateGQL("query", query, variablesParams)}
      `,
      variables: options?.variables,
      fetchPolicy: options?.fetchPolicy,
    });
  }

  watchQuery({
    query,
    options,
    variablesParams,
  }: {
    query: string[] | string;
    options?: Partial<QueryOptions>;
    variablesParams?: string;
  }) {
    return this.apollo.watchQuery<any>({
      query: gql`
        ${this.generateGQL("query", query, variablesParams as any)}
      `,
      variables: options?.variables,
      fetchPolicy: options?.fetchPolicy,
    });
  }

  async mutate({
    mutation,
    options,
    variablesParams,
  }: {
    mutation: string[] | string;
    options?: Partial<MutationOptions>;
    variablesParams?: any;
  }) {
    let result = await this.apollo.mutate<any>({
      mutation: gql`
        ${this.generateGQL("mutation", mutation, variablesParams)}
      `,
      variables: options?.variables,
      fetchPolicy: options?.fetchPolicy,
      context: options?.context,
    });

    let clearStoreFlag = false;
    let mutationList = [];

    if (typeof mutation === "string") {
      mutationList.push(mutation.trim());
    } else {
      mutationList = mutation.map((x) => x.trim());
    }
    for (const m of mutationList) {
      if (
        m.indexOf("create") == 0 ||
        m.indexOf("delete") == 0 ||
        m.indexOf("update") == 0
      ) {
        clearStoreFlag = true;
        break;
      }
    }
    if (clearStoreFlag) {
      await this.clearStore();
      // eslint-disable-next-line no-console
      console.log("clear store");
    }

    return result.data;
  }

  generateGQL(
    type: "query" | "mutation",
    list: string[] | string,
    variableParams = null,
  ) {
    let gql = `${type}${variableParams || ""} {
        `;

    if (typeof list === "string") {
      gql += `g0: ${list}
        `;
    } else {
      for (let i = 0; i < list.length; i++) {
        gql += `\ng${i}: ${list[i]}`;
      }
    }
    gql += `
      }`;
    gql = gql.replace(/\s{2,}/g, " ");

    return gql;
  }

  async clearStore() {
    await this.apollo.clearStore();
  }

  handleError(result: ApolloQueryResult<any> | FetchResult) {
    if ((result as ApolloQueryResult<any>).error) {
      throw Error((result as ApolloQueryResult<any>).error?.message);
    }
    if ((result as any).errors && (result as any).errors.length > 0) {
      throw Error((result as any).errors[0].message);
    }
  }

  parseFragment = (fragment: string) => {
    const fragments = [];
    const lines = fragment.trim().split("\n");

    for (const line of lines) {
      const parts = line.split(":");
      const key = parts[0];

      fragments.push(key);
    }

    return fragments.join(" ").trim();
  };
}

export const GraphService = new GraphRepository();
