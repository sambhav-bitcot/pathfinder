"use server";
import { fetchGraphQLQuery } from "@/utils/graphql";
import { GET_TRANSACTION_HISTORY_QUERY, GET_WALLET_SUMMARY_QUERY } from "./query";
import { TransactionHistoryResponse, WalletSummaryResponse } from "@/types/wallet";


export const getWalletSummary = async (): Promise<WalletSummaryResponse> => {
  const res = await fetchGraphQLQuery<WalletSummaryResponse>(
    GET_WALLET_SUMMARY_QUERY
  );
  return res as WalletSummaryResponse;
};

export const getTransactionHistory = async (
  paginate:  { limit: number, page: number  }
): Promise<TransactionHistoryResponse> => {
  const variables = {
    input : paginate
  }
  const res = await fetchGraphQLQuery<TransactionHistoryResponse>(
    GET_TRANSACTION_HISTORY_QUERY,
    variables
  );
  return res as TransactionHistoryResponse;
};

