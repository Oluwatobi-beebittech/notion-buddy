import { API } from '../Client';

export const getAllPages = (getAllPagesDto: string, canvaUserToken: string): Promise<any> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/pages`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return API.POST(url, getAllPagesDto, additionalRequestConfig);

}