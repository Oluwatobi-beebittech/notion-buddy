import { Text } from "@canva/app-ui-kit";
import * as React from "react";
import { defaultImagePlaceholder } from "src/utilities";
import {
  HumanFriendlyBlockName,
  NotionBlock,
  NotionBlockBadgeColour,
  SupportedNotionBlocks,
  handleAudioClick,
  handleAudioDragStart,
  handleTextClick,
  handleTextDragStart,
  handleVideoClick,
  handleVideoDragStart,
  handleImageClick,
  handleImageDragStart,
} from "src/utilities";

import { AudioCard } from "../AudioCard";
import { ImageCard } from "../ImageCard";
import { TypographyCard } from "../TypographyCard";
import { VideoCard } from "../VideoCard";

type Props = {
  block: any;
};
export const PageBlock: React.FC<Props> = ({ block }): JSX.Element => {
  const badgeTone = SupportedNotionBlocks.includes(block.type)
    ? NotionBlockBadgeColour[block.type]
    : "critical";
  const badgeText = HumanFriendlyBlockName?.[block.type] ?? "Unknown block";
  const richTextCollection = block[block.type]["rich_text"] ?? [];
  const hasRichTextCollection = richTextCollection.length > 0;
  const concatenatedPlainText = hasRichTextCollection
    ? richTextCollection.map(({ plain_text }) => plain_text).join("")
    : "";

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
          onClick={() => handleAudioClick(audioUrl)}
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
          onClick={() => {
            handleImageClick(imageConfig[imageType]["url"]);
          }}
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
      console.log({ videoUrl });
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
    case NotionBlock.EQUATION: {
      return (
        <TypographyCard
          badgeTone={badgeTone}
          badgeText={badgeText}
          onClick={() => {
            handleTextClick(block);
          }}
          ariaLabel="Hello world"
          onDragStart={() =>
            handleTextDragStart(block)
          }
        >
          <Text lineClamp={2}>{block[NotionBlock.EQUATION]['expression']}</Text>
        </TypographyCard>
      );
    }
    default: {
      return (
        <TypographyCard
          badgeTone={badgeTone}
          badgeText={badgeText}
          onClick={() => {
            handleTextClick(block);
          }}
          ariaLabel="Hello world"
          onDragStart={() =>
            handleTextDragStart(block)
          }
        >
          <Text lineClamp={2}>{concatenatedPlainText}</Text>
        </TypographyCard>
      );
    }
  }
};
