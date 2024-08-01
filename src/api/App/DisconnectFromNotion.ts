import { API } from '../Client';

export const disconnectFromNotion = (userId: string, canvaUserToken: string): Promise<any> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/disconnect/${userId}`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return API.DELETE(url, additionalRequestConfig);

}