import { defaultHeaders } from "../Client";

export const getResourceMimeType = async (url: string): Promise<any> => {
    const response = await fetch(url, { 
        method: 'HEAD',
        headers: {
            ...defaultHeaders,
            'Access-Control-Allow-Origin': '*'
        }
     });

    if (response.ok) {
      // Get the Content-Type header from the response
      const contentType = response.headers.get('Content-Type');
        return contentType ?? 'Unknown type';
      }
      return 'Unknown type';
}