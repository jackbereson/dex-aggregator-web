import { Currency, ShopItem } from '../shopItem/shopItem.model';

import { BaseModel } from '@/lib/models/base-model.model';

export enum ContractStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
}

export enum TransactionStatus {
    ACTIVE = 'ACTIVE',
    DEACTIVED = 'DEACTIVED',
}

export enum TransactionType {
    SWAP_MILEAGE = 'SWAP_MILEAGE',
    TON_PURCHASE = 'TON_PURCHASE',
    SWAP_POINT_REWARD = 'SWAP_POINT_REWARD',
}

export type HistoryMileage = {
    id: string;
    createdAt: string;
    updatedAt: string;
    value: number;
    status: TransactionStatus;
    currency: Currency;
    type: TransactionType;
};

export interface Transaction extends BaseModel {
    status?: TransactionStatus;
    customerId?: string;
    shopItemId?: string;
    source?: string;
    destination?: string;
    currency?: Currency;
    value?: number;
    queryId?: string;
    contractStatus?: ContractStatus;
    shopItem?: ShopItem;
}
