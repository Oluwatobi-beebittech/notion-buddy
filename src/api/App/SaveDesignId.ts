import { API } from '../Client';

export const saveDesignId = (saveDesignIdDto: string, canvaDesignToken: string) => {
    const url = `${BACKEND_HOST}/api/v1/notionbuddy/oauth/authorise/proceed`;
    const additionalRequestConfig: RequestInit = {
        headers: {
            Authorization: `Bearer ${canvaDesignToken}`,
          }
    };

    return API.POST(url, saveDesignIdDto, additionalRequestConfig);

}