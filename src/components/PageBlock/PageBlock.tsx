import { Text } from "@canva/app-ui-kit";
import * as React from "react";
import {
  defaultImagePlaceholder,
  handleAudioClick,
  handleAudioDragStart,
  handleImageClick,
  handleImageDragStart,
  handleTextClick,
  handleTextDragStart,
  handleVideoClick,
  handleVideoDragStart,
  HumanFriendlyBlockName,
  NotionBlock,
  NotionBlockBadgeColour,
  SupportedNotionBlocks,
} from "src/utilities";

import { AudioCard } from "../AudioCard";
import { ImageCard } from "../ImageCard";
import { TypographyCard } from "../TypographyCard";
import { VideoCard } from "../VideoCard";

type Props = {
  block: any;
};
export const PageBlock: React.FC<Props> = ({ block }): JSX.Element => {
  const isBlockSupported: boolean = SupportedNotionBlocks.includes(block.type);
  const badgeTone = isBlockSupported
    ? NotionBlockBadgeColour[block.type]
    : "critical";
    const humanFriendlyBlockName = HumanFriendlyBlockName?.[block.type] ?? "Unknown block";
    const badgeText = isBlockSupported ? humanFriendlyBlockName : `${humanFriendlyBlockName} - unsupported block`;
  
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

      return (
        <AudioCard
          audioPreviewUrl={audioUrl}
          durationInSeconds={0}
          title={audioCaption}
          badgeTone={badgeTone}
          thumbnailUrl={defaultImagePlaceholder}
          badgeText={badgeText}
          ariaLabel="Add audio to design"
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

      return (
        <ImageCard
          badgeTone={badgeTone}
          thumbnailUrl={imageConfig[imageType]["url"]}
          badgeText={badgeText}
          onClick={() => {
            handleImageClick(imageConfig[imageType]["url"]);
          }}
          ariaLabel="Add image to design"
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
      
      const youtubeVideoId = isYoutube
        ? new URLSearchParams(new URL(videoUrl).search).get("v")
        : "";
      const thumbnailUrl = isYoutube
        ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
        : defaultImagePlaceholder;
      const videoPreviewUrl = isYoutube
        ? `https://www.youtube.com/embed/${youtubeVideoId}?start=30&end=38`
        : "";

      return (
        <VideoCard
          badgeText={badgeText}
          videoUrl={videoUrl}
          alt={videoCaption}
          badgeTone={badgeTone}
          mimeType="video/webm"
          thumbnailUrl={thumbnailUrl}
          videoPreviewUrl={videoPreviewUrl}
          onClick={() => handleVideoClick(videoUrl)}
          ariaLabel="Add video embed to design"
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
          badgeTooltipLabel="This block is currently unsupported and may not function as intended."
          onClick={() => {
            handleTextClick(block);
          }}
          ariaLabel="Add copy to design"
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
          badgeTooltipLabel={!isBlockSupported ? "This block is currently unsupported and may not function as intended." : undefined}
          onClick={() => {
            handleTextClick(block);
          }}
          ariaLabel="Add copy to design"
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
