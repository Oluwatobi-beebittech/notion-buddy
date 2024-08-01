import type { PageBlockType } from "src/api";

type PageBlockFilters = {
    all: PageBlockType['results'];
    [key: string]: PageBlockType['results'];
    unsupported: PageBlockType['results'];
}

type PageBlocks = Record<string, PageBlockFilters>

export type DesignDetailsState = {
    canvaDesignToken: string;
    setDesignDetails: (designDetails: Partial<DesignDetailsState>) => void;
}

export type NotionDetailsState = {
    blockSearchQuery: string;
    pageBlocks: PageBlocks;
    pages: any[];
    selectedBlockType: string;
    selectedPage: string;
    showEmptyBlocks: boolean;
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