import { addNativeElement } from "@canva/design";

import type { PageBlockType } from "src/api";

import { generateRichTextRange } from "../GenerateRichTextRange";

export const handleTextClick = (block: PageBlockType['results'][number]) => {
  const blockRichText: string | undefined = block[block.type]?.["rich_text"];
  const hasNoText = blockRichText?.length === 0 || blockRichText?.length === undefined;
  const hasNoEquationExpression = !block[block.type]?.["expression"];
  
  if (hasNoText && hasNoEquationExpression) return;

  addNativeElement({
    // @ts-expect-error RICHTEXT is not recognised in TS by the addNativeElement function
    type: "RICHTEXT",
    range: generateRichTextRange(block),
  });
};

export const handleTextDragStart = (block: PageBlockType['results'][number]) => {
  handleTextClick(block);
};
