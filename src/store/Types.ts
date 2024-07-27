type PageBlockFilters = {
    all: Array<any>;
    [key: string]: Array<any>;
    unsupported: Array<any>;
}

type PageBlocks = {
    [key: string]: PageBlockFilters;
}

export type DesignDetailsState = {
    canvaDesignToken: string;
    setDesignDetails: (designDetails: Partial<DesignDetailsState>) => void;
}

export type NotionDetailsState = {
    pageBlocks: PageBlocks;
    pages: Array<any>;
    selectedPage: string;
    totalPages: number;
    setNotionDetails: (notionDetails: Partial<NotionDetailsState>) => void;
    setNotionPageBlocks: (pageBlockDetails: PageBlocks) => void;
}

export type UserDetailsState = {
    canvaUserToken: string;
    hasNotionAccessToken: boolean;
    isNotionAccessTokenValid: boolean;
    setUserDetails: (userDetails: Partial<UserDetailsState>) => void;
    userId: string;
}

export type State = {
    designDetails: DesignDetailsState;
    notionDetails: NotionDetailsState;
    userDetails: UserDetailsState;
}