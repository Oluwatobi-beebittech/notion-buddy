import type { GenericResponse } from './Types';

import { API } from '../Client';

export const disconnectFromNotion = (userId: string, canvaUserToken: string): Promise<GenericResponse> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/disconnect/${userId}`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return API.DELETE(url, additionalRequestConfig);

}