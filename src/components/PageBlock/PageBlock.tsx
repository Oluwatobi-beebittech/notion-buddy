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

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { AudioMimeType, ImageMimeType, VideoMimeType } from "@canva/asset";
import type { PageBlockType, RichTextType } from "src/api";

import { AudioCard } from "../AudioCard";
import { ImageCard } from "../ImageCard";
import { TypographyCard } from "../TypographyCard";
import { VideoCard } from "../VideoCard";

type Props = {
  block: PageBlockType["results"][number];
};
export const PageBlock: React.FC<Props> = ({ block }): JSX.Element => {
  const isBlockSupported: boolean = SupportedNotionBlocks.includes(block.type);
  const badgeTone: Tone = isBlockSupported
    ? NotionBlockBadgeColour[block.type]
    : "critical";
  const humanFriendlyBlockName: string =
    HumanFriendlyBlockName?.[block.type] ?? "Unknown block";
  const badgeText: string = isBlockSupported
    ? humanFriendlyBlockName
    : `${humanFriendlyBlockName} - unsupported block`;

  const richTextCollection: RichTextType[] =
    block[block.type]["rich_text"] ?? [];
  const hasRichTextCollection: boolean = richTextCollection.length > 0;
  const concatenatedPlainText: string = hasRichTextCollection
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
          onClick={()=> (mimeType: AudioMimeType) => handleAudioClick(audioUrl, mimeType)}
          onDragStart={(event: React.DragEvent<HTMLElement>) => (mimeType: AudioMimeType) =>
            handleAudioDragStart(event, audioUrl, mimeType)
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
          onClick={() => (mimeType: ImageMimeType) => {
            handleImageClick(imageConfig[imageType]["url"], mimeType);
          }}
          ariaLabel="Add image to design"
          onDragStart={(event: React.DragEvent<HTMLElement>)=> (mimeType: ImageMimeType) =>
            handleImageDragStart(event, imageConfig[imageType]["url"], mimeType)
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
          thumbnailUrl={thumbnailUrl}
          videoPreviewUrl={videoPreviewUrl}
          onClick={() => (mimeType: VideoMimeType) => handleVideoClick(videoUrl, mimeType, isYoutube, thumbnailUrl)}
          ariaLabel="Add video embed to design"
          onDragStart={(event: React.DragEvent<HTMLElement>) => (mimeType: VideoMimeType) =>
            handleVideoDragStart(event, videoUrl, mimeType, isYoutube, thumbnailUrl)
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
          onDragStart={() => handleTextDragStart(block)}
        >
          <Text lineClamp={2}>{block[NotionBlock.EQUATION]["expression"]}</Text>
        </TypographyCard>
      );
    }
    default: {
      return (
        <TypographyCard
          badgeTone={badgeTone}
          badgeText={badgeText}
          badgeTooltipLabel={
            !isBlockSupported
              ? "This block is currently unsupported and may not function as intended."
              : undefined
          }
          onClick={() => {
            handleTextClick(block);
          }}
          ariaLabel="Add copy to design"
          onDragStart={() => handleTextDragStart(block)}
        >
          <Text lineClamp={2}>{concatenatedPlainText}</Text>
        </TypographyCard>
      );
    }
  }
};
