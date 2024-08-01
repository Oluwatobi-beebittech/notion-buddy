import type { VerifyNotionConnection } from "./Types";

import { API } from "../Client";

export const verifyNotionConnection = async (
  verifyConnectionDto: string,
  canvaUserToken: string
): Promise<VerifyNotionConnection> => {
  const url = `${BACKEND_HOST}/api/v1/notionbuddy/notion/verify`;
  const additionalRequestConfig: RequestInit = {
    headers: {
      Authorization: `Bearer ${canvaUserToken}`,
    },
  };

  return API.POST(url, verifyConnectionDto, additionalRequestConfig);
};
