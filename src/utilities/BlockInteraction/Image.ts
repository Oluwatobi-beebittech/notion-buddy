import { upload } from "@canva/asset";
import { addNativeElement, ui } from "@canva/design";

import type { ImageMimeType } from "@canva/asset";

export const handleImageClick = async (
  imageUrl: string,
  mimeType: ImageMimeType
) => {
  if (mimeType.toString() === "image/gif") {
    const gifVideoAsset = await upload({
      type: "VIDEO",
      mimeType: "image/gif",
      url: imageUrl,
      thumbnailImageUrl: imageUrl,
      thumbnailVideoUrl: imageUrl,
    });
    await addNativeElement({
      type: "VIDEO",
      ref: gifVideoAsset.ref,
    });
    return;
  }

  const imageAsset = await upload({
    mimeType,
    thumbnailUrl: imageUrl,
    type: "IMAGE",
    url: imageUrl,
    width: 320,
    height: 212,
  });

  addNativeElement({
    type: "IMAGE",
    ref: imageAsset.ref,
  });
};

export const handleImageDragStart = (
  event: React.DragEvent<HTMLElement>,
  imageUrl: string,
  mimeType: ImageMimeType
) => {
  if (mimeType.toString() === "image/gif") {
    ui.startDrag(event, {
      type: "VIDEO",
      resolveVideoRef: () => {
        return upload({
          mimeType: "image/gif",
          thumbnailImageUrl: imageUrl,
          thumbnailVideoUrl: imageUrl,
          type: "VIDEO",
          url: imageUrl,
          width: 320,
          height: 180,
        });
      },
      previewSize: {
        width: 320,
        height: 180,
      },
      previewUrl: imageUrl
    });
    return;
  }
  
  ui.startDrag(event, {
    type: "IMAGE",
    resolveImageRef: () => {
      return upload({
        mimeType,
        thumbnailUrl: imageUrl,
        type: "IMAGE",
        url: imageUrl,
        width: 320,
        height: 212,
      });
    },
    previewUrl: imageUrl,
    previewSize: {
      width: 320,
      height: 212,
    },
    fullSize: {
      width: 320,
      height: 212,
    },
  });
};
