import { upload } from "@canva/asset";
import { addNativeElement, ui } from "@canva/design";

export const handleImageClick = async (imageUrl) => {
  const imageAsset = await upload({
    mimeType: "image/jpeg",
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
  imageUrl
) => {
  ui.startDrag(event, {
    type: "IMAGE",
    resolveImageRef: () => {
      return upload({
        mimeType: "image/jpeg",
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
