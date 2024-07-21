import { API } from '../Client';
import { UserDetails } from './Types';

export const getUserDetails = async (canvaUserToken : string): Promise<UserDetails> => {
    const url: string = `${BACKEND_HOST}/api/v1/notionbuddy/oauth/authorise`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };
    
    return await API.POST(url, '', additionalRequestConfig);
}