export type DesignDetailsState = {
    canvaDesignToken: string;
    setDesignDetails: (designDetails: Partial<DesignDetailsState>) => void;
}

export type NotionDetailsState = {
    pages: Array<any>;
    selectedPage: string;
    totalPages: number;
    setNotionDetails: (notionDetails: Partial<NotionDetailsState>) => void;
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