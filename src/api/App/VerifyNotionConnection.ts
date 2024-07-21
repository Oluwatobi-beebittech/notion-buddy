import { API } from '../Client';

export const verifyNotionConnection = async (verifyConnectionDto: string, canvaUserToken: string) => {
    const url: string = `${BACKEND_HOST}/api/v1/notionbuddy/notion/verify`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return await API.POST(url, verifyConnectionDto, additionalRequestConfig);

}