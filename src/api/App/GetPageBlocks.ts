import { API } from '../Client';

export const getPageBlocks = async (pageId: string, canvaUserToken: string): Promise<any> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/page/${pageId}`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return await API.GET(url, additionalRequestConfig);

}