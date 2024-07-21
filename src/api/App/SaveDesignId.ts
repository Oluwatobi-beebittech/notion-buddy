import { API } from '../Client';

export const saveDesignId = async (saveDesignIdDto: string, canvaDesignToken: string) => {
    const url: string = `${BACKEND_HOST}/api/v1/notionbuddy/oauth/authorise/proceed`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaDesignToken}`,
          }
    };

    return await API.POST(url, saveDesignIdDto, additionalRequestConfig);

}