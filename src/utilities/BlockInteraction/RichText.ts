import { addNativeElement, ui } from "@canva/design";

export const handleTextClick = (textCollection: Array<string>) => {
  if (textCollection[0] === "") return;
  
  addNativeElement({
    type: "TEXT",
    children: textCollection,
  });
};

export const handleTextDragStart = (
  event: React.DragEvent<HTMLElement>,
  textCollection: Array<string>
) => {
  ui.startDrag(event, {
    type: "TEXT",
    children: textCollection,
  });
};
