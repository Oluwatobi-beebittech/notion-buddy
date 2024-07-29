import * as React from "react";
import { Text } from "@canva/app-ui-kit";
import { VideoCard } from "../VideoCard";
import { TypographyCard } from "../TypographyCard";
import { ImageCard } from "../ImageCard";
import { defaultImagePlaceholder } from "src/utilities";
import { addNativeElement, ui } from "@canva/design";
import {
  HumanFriendlyBlockName,
  NotionBlock,
  NotionBlockBadgeColour,
  SupportedNotionBlocks,
  handleAudioClick,
  handleAudioDragStart,
  handleVideoClick,
  handleVideoDragStart,
  handleImageClick,
  handleImageDragStart
} from "src/utilities";
import { AudioCard } from "../AudioCard";

type Props = {
  block: any;
};
export const PageBlock: React.FC<Props> = ({ block }): JSX.Element => {

  const handleClick = (textCollection: Array<string>) => {
    addNativeElement({
      type: "TEXT",
      children: textCollection,
    });
  }
  const handleDragStart = (
    event: React.DragEvent<HTMLElement>,
    textCollection: Array<string>
  ) => {
    ui.startDrag(event, {
      type: "TEXT",
      children: textCollection,
    });
  };

  const badgeTone = SupportedNotionBlocks.includes(block.type)
    ? NotionBlockBadgeColour[block.type]
    : "critical";
  const badgeText = HumanFriendlyBlockName?.[block.type] ?? "Unknown block";
  const text = block[block.type]["rich_text"]?.[0]?.["plain_text"] ?? "";

  switch (block.type) {
    case NotionBlock.AUDIO: {
      const audioConfig = block[NotionBlock.AUDIO];
      const audioType = audioConfig.type;
      const audioCaption: string =
      audioConfig.caption?.[0]?.["plain_text"] ?? "";
      const audioUrl = audioConfig[audioType]["url"];

      console.log({ block });
      return (
        <AudioCard
        audioPreviewUrl={audioUrl}
        durationInSeconds={0}
        title={audioCaption}
          badgeTone={badgeTone}
          thumbnailUrl={defaultImagePlaceholder}
          badgeText={badgeText}
          ariaLabel="Hello world"
          onClick={()=>handleAudioClick(audioUrl)}
          onDragStart={(event: React.DragEvent<HTMLElement>) =>
            handleAudioDragStart(event, audioUrl)
          }
        />
      );
    }
    case NotionBlock.IMAGE: {
      const imageConfig = block[NotionBlock.IMAGE];
      const imageType = imageConfig.type;

      console.log({ block });
      return (
        <ImageCard
          badgeTone={badgeTone}
          thumbnailUrl={imageConfig[imageType]["url"]}
          badgeText={badgeText}
          onClick={() => {handleImageClick(imageConfig[imageType]["url"])}}
          ariaLabel="Hello world"
          onDragStart={(event: React.DragEvent<HTMLElement>) =>
            handleImageDragStart(event, imageConfig[imageType]["url"])
          }
        />
      );
    }
    case NotionBlock.VIDEO: {
      const videoConfig = block[NotionBlock.VIDEO];
      const videoType = videoConfig.type;
      const videoUrl: string = videoConfig[videoType]["url"];
      const videoCaption: string =
        videoConfig.caption?.[0]?.["plain_text"] ?? "";
      const isYoutube = videoUrl.includes("youtube");
      console.log({videoUrl});
      const youtubeVideoId = isYoutube
        ? new URLSearchParams(new URL(videoUrl).search).get("v")
        : "";
      const thumbnailUrl = isYoutube
        ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
        : defaultImagePlaceholder;
      const videoPreviewUrl = isYoutube
        ? `https://www.youtube.com/embed/${youtubeVideoId}?start=30&end=38`
        : "";

      console.log({ block });
      return (
        <VideoCard
          badgeText={badgeText}
          videoUrl={videoUrl}
          alt={videoCaption}
          badgeTone={badgeTone}
          mimeType="video/webm"
          thumbnailUrl={thumbnailUrl}
          videoPreviewUrl={videoPreviewUrl}
          onClick={() => handleVideoClick(thumbnailUrl, videoUrl, videoUrl)}
          ariaLabel="Hello world"
          onDragStart={(event: React.DragEvent<HTMLElement>) =>
            handleVideoDragStart(event, thumbnailUrl, videoUrl, videoUrl)
          }
        />
      );
    }
    default: {
      return (
        <TypographyCard
          badgeTone={badgeTone}
          badgeText={badgeText}
          onClick={() => {handleClick([text])}}
          ariaLabel="Hello world"
          onDragStart={(event: React.DragEvent<HTMLElement>) =>
            handleDragStart(event, [text])
          }
        >
          <Text lineClamp={2}>{text}</Text>
        </TypographyCard>
      );
    }
  }
};
