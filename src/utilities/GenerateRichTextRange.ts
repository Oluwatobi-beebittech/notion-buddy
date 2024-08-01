import type { Annotations, EquationBlockType, EquationType, PageBlockType, RichTextType, TextType } from "src/api";

import { colour } from "./Colours";
import { NotionBlock } from "./Enums";

const applyRichTextFormatting = (
  textConfig: TextType & EquationType,
  textAnnotations: Annotations,
  additionalFormattingOptions = {}
) => {
  const { content, expression, link } = textConfig;
  const hasLink = Boolean(link);
  const { bold, italic, strikethrough, underline, color } = textAnnotations;

  if (!content && !expression) return;

  const formattingOptions = {
    color: colour[color],
    ...(hasLink && { link: link?.url }),
    ...(bold && { fontWeight: "bold" }),
    ...(italic && { fontStyle: "italic" }),
    ...(underline && { decoration: "underline" }),
    ...(strikethrough && { strikethrough: "strikethrough" }),
    ...additionalFormattingOptions,
  };

  return { text: content ?? expression, formatting: formattingOptions };
};

const defaultAnnotation: Partial<Annotations> = { color: "default" };

const getRichTextRange = (
  richTextCollection: RichTextType[] | EquationBlockType[],
  additionalFormattingOptions = {}
) => {
  return {
    readTextRegions: () =>
      richTextCollection
        .map((richText) =>
          applyRichTextFormatting(
            richText[richText.type],
            richText?.annotations ?? defaultAnnotation,
            additionalFormattingOptions
          )
        )
        .filter((richTextConfig) => typeof richTextConfig !== "undefined"),
  };
};

export const generateRichTextRange = (block: PageBlockType['results'][number]) => {
  const richTextCollection = block[block.type]["rich_text"] ?? [];

  switch (block.type) {
    case NotionBlock.EQUATION: {
      return getRichTextRange([block] as RichTextType[] | EquationBlockType[]);
    }
    case NotionBlock.TO_DO: {
      const listMarker = block[NotionBlock.TO_DO]["checked"]
        ? "checked"
        : "unchecked";
      return getRichTextRange(richTextCollection, { listMarker });
    }
    case NotionBlock.NUMBERED_LIST_ITEM: {
      return getRichTextRange(richTextCollection, { listMarker: "decimal" });
    }
    case NotionBlock.BULLETED_LIST_ITEM: {
      return getRichTextRange(richTextCollection, { listMarker: "disc" });
    }
    case NotionBlock.PARAGRAPH: {
      return getRichTextRange(richTextCollection);
    }
    default: {
      return getRichTextRange(richTextCollection);
    }
  }
};
