import * as React from "react";
import { Text } from "@canva/app-ui-kit";
import { TypographyCard } from "../TypographyCard";
import { ImageCard } from "../ImageCard";
import { ui } from "@canva/design";
import {
  HumanFriendlyBlockName,
  NotionBlock,
  NotionBlockBadgeColour,
  SupportedNotionBlocks,
} from "src/utilities";

type Props = {
  block: any;
};
export const PageBlock: React.FC<Props> = ({ block }): JSX.Element => {
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
  const badgeText = HumanFriendlyBlockName?.[block.type] ?? 'Unknown block';
  const text = block[block.type]["rich_text"]?.[0]?.["plain_text"] ?? "";

  switch (block.type) {
    case NotionBlock.IMAGE: {
      const blockType = block.type;
      const imageConfig = block[blockType];
      const imageType = imageConfig.type;

        console.log({block});
      return (
        <ImageCard
          badgeTone={badgeTone}
          thumbnailUrl={imageConfig[imageType]["url"]}
          badgeText={badgeText}
          onClick={() => {}}
          ariaLabel="Hello world"
          onDragStart={(event: React.DragEvent<HTMLElement>) =>
            handleDragStart(event, [text])
          }
        />
      );
    }
    default: {
      return (
        <TypographyCard
          badgeTone={badgeTone}
          badgeText={badgeText}
          onClick={() => {}}
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
