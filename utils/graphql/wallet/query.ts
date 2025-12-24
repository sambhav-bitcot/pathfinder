import { gql, DocumentNode } from '@apollo/client';

export const GET_TRANSACTION_HISTORY_QUERY: DocumentNode = gql`
query GetStudentTransactionHistory($input: StudentTransactionHistoryInput){
    getStudentTransactionHistory(input: $input) {
        limit
        page
        total
        totalPages
        transactions {
            active_status
            amount
            created_at
            currency
            id
            metadata
            wallet_id
            transaction_type
        }
    }
}
`;

export const GET_WALLET_SUMMARY_QUERY: DocumentNode = gql`
query GetStudentWalletSummary {
    getStudentWalletSummary {
        purchaseCount
        refundCount
        sessionsCount
        totalPurchased
        totalRefunded
        totalSpent
    }
}
`;


