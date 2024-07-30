import { NotionBlock } from "./Enums";

export const MultimediaBasedNotionBlocks = [
  NotionBlock.AUDIO,
  NotionBlock.IMAGE,
  NotionBlock.VIDEO,
];

export const TextBasedNotionBlocks = [
  NotionBlock.BULLETED_LIST_ITEM,
  NotionBlock.CALLOUT,
  NotionBlock.CODE,
  NotionBlock.HEADING_1,
  NotionBlock.HEADING_2,
  NotionBlock.HEADING_3,
  NotionBlock.NUMBERED_LIST_ITEM,
  NotionBlock.PARAGRAPH,
  NotionBlock.QUOTE,
];

export const SupportedNotionBlocks = [
  ...MultimediaBasedNotionBlocks,
  ...TextBasedNotionBlocks,
];

export const NotionBlockBadgeColour = {
  [NotionBlock.AUDIO]: "warn",
  [NotionBlock.BULLETED_LIST_ITEM]: "positive",
  [NotionBlock.CALLOUT]: "positive",
  [NotionBlock.CODE]: "positive",
  [NotionBlock.EQUATION]: "positive",
  [NotionBlock.HEADING_1]: "positive",
  [NotionBlock.HEADING_2]: "positive",
  [NotionBlock.HEADING_3]: "positive",
  [NotionBlock.IMAGE]: "info",
  [NotionBlock.NUMBERED_LIST_ITEM]: "positive",
  [NotionBlock.PARAGRAPH]: "positive",
  [NotionBlock.QUOTE]: "positive",
  [NotionBlock.VIDEO]: "assist",
};
