export const CustomerFields = `
    updatedAt: DateTime
    telegramId: String
    activeAt: DateTime
    status: String
    username: String
    firstName: String
    lastName: String
    avatar: String
    fanInUsed: String
    referenceId: String 
    referralCode: String
    referralUrl: String
    walletAddress: String
    walletSolanaAddress: String
    unclaimedReferrals: Int
    isValid: Boolean
`;

export const CustomerQuery = `
    updatedAt
    telegramId
    activeAt
    status
    username
    firstName
    lastName
    avatar
    fanInUsed
    referenceId
    referralCode
    referralUrl
    walletAddress
    walletSolanaAddress
    unclaimedReferrals
    isValid
`;
