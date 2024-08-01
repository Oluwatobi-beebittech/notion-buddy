import { API } from '../Client';

export const getPageBlocks = (pageId: string, canvaUserToken: string): Promise<any> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/page/${pageId}`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return API.GET(url, additionalRequestConfig);

}