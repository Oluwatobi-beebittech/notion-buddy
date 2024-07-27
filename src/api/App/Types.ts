export type UserDetails = {
    userId: string;
    hasNotionAccessToken: boolean;
    isNotionAccessTokenValid: boolean;
}

export type VerifyNotionConnection = {
    message: string;
    isNotionAccessTokenValid: boolean
}
