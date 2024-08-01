import type { NotionBlock } from "src/utilities";

export type GenericResponse = {
    message: string;
    internalStatusCode: string;
};

export type UserDetails = {
  userId: string;
  hasNotionAccessToken: boolean;
  isNotionAccessTokenValid: boolean;
};

export type VerifyNotionConnection = {
  message: string;
  isNotionAccessTokenValid: boolean;
};

type LinkType = {
  url: string;
} | null;

export type TextType = {
  content: string;
  link: LinkType;
};

type FileType = {
  url: string;
};

export type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

export type RichTextType = {
  type: string;
  text: TextType;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};

type StandardRichTextType = {
  rich_text: RichTextType[];
};

type VideoBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.VIDEO]: {
    caption: RichTextType[];
    file?: FileType | undefined;
    external?: FileType | undefined;
    type: string;
  };
};

export type EquationType = {
  expression: string;
};

type ParagraphBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.PARAGRAPH]: {
    rich_text: RichTextType[];
    equation?: EquationType | undefined;
  };
};

type ImageBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.IMAGE]: {
    caption: RichTextType[];
    file?: FileType | undefined;
    external?: FileType | undefined;
    type: string;
  };
};

type AudioBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.AUDIO]: {
    caption: RichTextType[];
    file?: FileType | undefined;
    external?: FileType | undefined;
    type: string;
  };
};

export type EquationBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.EQUATION]: EquationType;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
};

type BulletedListItemBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.BULLETED_LIST_ITEM]: StandardRichTextType;
};

type NumberedListItemBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.NUMBERED_LIST_ITEM]: StandardRichTextType;
};

type CalloutBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.CALLOUT]: StandardRichTextType;
};

type ToDoBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.TO_DO]: StandardRichTextType & {
    checked: boolean;
  };
};

type QuoteBlockType = {
  id: string;
  type: NotionBlock;
  [NotionBlock.QUOTE]: StandardRichTextType;
};

type GeneralPageBlock = {
  id: string;
  type: NotionBlock;
  [key: string]: unknown;
};

export type PageBlockType = {
  results: (
    | AudioBlockType
    | BulletedListItemBlockType
    | CalloutBlockType
    | EquationBlockType
    | GeneralPageBlock
    | ImageBlockType
    | NumberedListItemBlockType
    | ParagraphBlockType
    | QuoteBlockType
    | ToDoBlockType
    | VideoBlockType
  )[];
};
