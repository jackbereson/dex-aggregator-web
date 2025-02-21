export enum PageTypes {
    SINGLE_GAME = 'SINGLE_GAME',
    SYSTEM_GAME = 'SYSTEM_GAME',
    ROULETTE_GAME = 'ROULETTE_GAME',
    LOTTERY_RESULT = 'LOTTERY_RESULT',
    AUTH = 'AUTH',
}

export enum GameNames {
    SINGLE_GAME = 'Single Game',
    SYSTEM_GAME = 'System Game',
    ROULETTE_GAME = 'Roulette Game',
    LOTTERY_RESULT = 'Lottery Result',
}

export type PageData = {
    code?: string;
    lotteryCode?: string;
    description?: string;
    title?: string;
    url?: string;
    image?: string;
    logo?: string;
    smallLogo?: string;
    keywords?: string;
    type?: PageTypes;
    JsonLD?: string;

    singleGameUrl?: string;
    systemGameUrl?: string;
    rouletteGameUrl?: string;
    resultGameUrl?: string;
};
