import {fileTypeFromStream} from 'file-type';

import type { MimeType } from 'file-type';

export const getResourceMimeType = async (url: string): Promise<MimeType | undefined> => {
  const response = await fetch(url);
  const fileType = await fileTypeFromStream(response.body as any);
  return fileType?.mime;
}