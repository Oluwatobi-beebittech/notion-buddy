import * as React from "react";
import { Text } from "@canva/app-ui-kit";
import { TypographyCard } from "../TypographyCard";
import { ui } from "@canva/design";
import { HumanFriendlyBlockName, SupportedNotionBlocks } from "src/utilities";

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
  }
  
  const text = block[block.type]["rich_text"]?.[0]?.["plain_text"] ?? "";

  return (
    <TypographyCard
      badgeTone={
        SupportedNotionBlocks.includes(block.type) ? "positive" : "critical"
      }
      badgeText={HumanFriendlyBlockName[block.type]}
      onClick={() => {}}
      ariaLabel="Hello world"
      onDragStart={(event: React.DragEvent<HTMLElement>) =>
        handleDragStart(event, [text])
      }
    >
      <Text lineClamp={2}>
        {block[block.type]["rich_text"]?.[0]?.["plain_text"] ?? ""}
      </Text>
    </TypographyCard>
  );
};
