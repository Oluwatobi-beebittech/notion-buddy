import { upload } from "@canva/asset";
import { addNativeElement, ui } from "@canva/design";

import type { VideoMimeType } from "@canva/asset";

export const handleVideoClick = async (
  videoUrl: string,
  mimeType: VideoMimeType,
  isEmbed: boolean,
  thumbnailImageUrl: string,
) => {
  if(isEmbed) {
    addNativeElement({
      type: "EMBED",
      url: videoUrl,
    });
    return;
  }

  if(videoUrl === "") return;

  const videoAsset = await upload({
    type: "VIDEO",
    mimeType,
    url: videoUrl,
    thumbnailImageUrl,
    thumbnailVideoUrl: videoUrl
  });

  addNativeElement({
    type: "VIDEO",
    ref: videoAsset.ref,
  });
  
};

export const handleVideoDragStart = (
  event: React.DragEvent<HTMLElement>,
  videoUrl: string,
  mimeType: VideoMimeType,
  isEmbed: boolean,
  thumbnailImageUrl: string,
) => {
  if(isEmbed) {
    ui.startDrag(event, {
      type: "EMBED",
      previewSize: {
        width: 320,
        height: 180,
      },
      previewUrl: thumbnailImageUrl,
      embedUrl: videoUrl
    });
    return;
  }

  if(videoUrl === "") return;

  ui.startDrag(event, {
    type: "VIDEO",
    resolveVideoRef: () => {
      return upload({
        mimeType,
        thumbnailImageUrl,
        thumbnailVideoUrl: videoUrl,
        type: "VIDEO",
        url: videoUrl,
        width: 320,
        height: 180,
      });
    },
    previewSize: {
      width: 320,
      height: 180,
    },
    previewUrl: thumbnailImageUrl,
  });
};
