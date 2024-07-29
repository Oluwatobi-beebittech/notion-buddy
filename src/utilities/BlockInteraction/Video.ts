import { upload } from "@canva/asset";
import { addNativeElement, ui } from "@canva/design";

export const handleVideoClick = async (
  thumbnailImageUrl: string,
  videoPreviewUrl: string,
  videoUrl: string
) => {
  console.log({ thumbnailImageUrl, videoPreviewUrl, videoUrl });
//   const videoAsset = await upload({
//     mimeType: "video/mp4",
//     thumbnailImageUrl,
//     thumbnailVideoUrl: videoPreviewUrl,
//     type: "VIDEO",
//     url: videoUrl,
//     width: 320,
//     height: 180,
//   });

  addNativeElement({
    type: "EMBED",
    url: videoUrl,
  });
};

export const handleVideoDragStart = (
  event: React.DragEvent<HTMLElement>,
  thumbnailImageUrl: string,
  videoPreviewUrl: string,
  videoUrl: string
) => {
  ui.startDrag(event, {
    type: "EMBED",
    // resolveVideoRef: () => {
    //   return upload({
    //     mimeType: "video/mp4",
    //     thumbnailImageUrl,
    //     thumbnailVideoUrl: videoPreviewUrl,
    //     type: "VIDEO",
    //     url: videoUrl,
    //     width: 320,
    //     height: 180,
    //   });
    // },
    previewSize: {
      width: 320,
      height: 180,
    },
    previewUrl: thumbnailImageUrl,
    embedUrl: videoUrl
  });
};
