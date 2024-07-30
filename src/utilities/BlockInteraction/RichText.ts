import { addNativeElement } from "@canva/design";
import { generateRichTextRange } from "../GenerateRichTextRange";

export const handleTextClick = (block: any) => {
  const hasNoText = block[block.type]?.["rich_text"]?.length === 0;
  const hasNoEquationExpression = !Boolean(block[block.type]?.["expression"]);
  
  if (hasNoText && hasNoEquationExpression) return;

  addNativeElement({
    // @ts-ignore
    type: "RICHTEXT",
    range: generateRichTextRange(block),
  });
};

export const handleTextDragStart = (block: any) => {
  handleTextClick(block);
};
