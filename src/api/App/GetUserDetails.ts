import type { UserDetails } from './Types';

import { API } from '../Client';

export const getUserDetails = async (canvaUserToken : string): Promise<UserDetails> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/oauth/authorise`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };
    
    return API.POST(url, '', additionalRequestConfig);
}