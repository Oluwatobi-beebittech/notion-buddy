import { NotionBlock } from "./Enums";

export const SupportedNotionBlocks = [
  NotionBlock.AUDIO,
  NotionBlock.CALLOUT,
  NotionBlock.CODE,
  NotionBlock.EQUATION,
  NotionBlock.HEADING_1,
  NotionBlock.HEADING_2,
  NotionBlock.HEADING_3,
  NotionBlock.IMAGE,
  NotionBlock.PARAGRAPH,
  NotionBlock.VIDEO,
];

export const NotionBlockBadgeColour = {
  [NotionBlock.AUDIO]: "warn",
  [NotionBlock.CALLOUT]: "positive",
  [NotionBlock.CODE]: "positive",
  [NotionBlock.EQUATION]: "positive",
  [NotionBlock.HEADING_1]: "positive",
  [NotionBlock.HEADING_2]: "positive",
  [NotionBlock.HEADING_3]: "positive",
  [NotionBlock.IMAGE]: "info",
  [NotionBlock.PARAGRAPH]: "positive",
  [NotionBlock.VIDEO]: "assist",
};
