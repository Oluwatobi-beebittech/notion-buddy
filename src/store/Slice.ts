import { StateCreator } from 'zustand';

import { DesignDetailsState, NotionDetailsState, State, UserDetailsState } from './Types';

export const createDesignDetailsSlice: StateCreator<
    State,
    [],
    [],
    DesignDetailsState
> = (set) => ({
	canvaDesignToken: '',
    setDesignDetails: (designDetails) => set((state) => ({ designDetails: { ...state.designDetails, ...designDetails } })),
});

export const createNotionDetailsSlice: StateCreator<
    State,
    [],
    [],
    NotionDetailsState
> = (set) => ({
	totalPages: 0,
    pages: [],
    selectedPage: '',
    setNotionDetails: (notionDetails) => set((state) => ({ notionDetails: { ...state.notionDetails, ...notionDetails } })),
});

export const createUserDetailsSlice: StateCreator<
    State,
    [],
    [],
    UserDetailsState
> = (set) => ({
	canvaUserToken: '',
    hasNotionAccessToken: false,
    isNotionAccessTokenValid: false,
    userId: '',
    setUserDetails: (userDetails) => set((state) => ({ userDetails: { ...state.userDetails, ...userDetails } })),
});