export const TransactionFields = `
  id: String    
  createdAt: DateTime
  updatedAt: DateTime
  source: String
  destination: String
  currency: String
  value: String
  shopItemId: String
  shopItem: ShopItem
  contractStatus: String
  status: String
`;

export const TransactionQuery = `
  id
  createdAt
  updatedAt
  source
  destination
  currency
  value
  shopItemId
  contractStatus
  status
`;
