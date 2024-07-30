import { API } from '../Client';

export const getAllPages = async (getAllPagesDto: string, canvaUserToken: string): Promise<any> => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/pages`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaUserToken}`,
          }
    };

    return await API.POST(url, getAllPagesDto, additionalRequestConfig);

}