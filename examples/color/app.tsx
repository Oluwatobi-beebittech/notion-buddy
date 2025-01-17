import { Rows, Swatch, Text } from "@canva/app-ui-kit";
import { openColorSelector } from "@canva/asset";
import { useState } from "react";
import styles from "styles/components.css";

import type {
  Anchor,
  ColorSelectionEvent,
  ColorSelectionScope,
} from "@canva/asset";

export const App = () => {
  const [color, setColor] = useState<string | undefined>(undefined);
  const onColorSelect = async <T extends ColorSelectionScope>(
    e: ColorSelectionEvent<T>
  ) => {
    if (e.selection.type === "solid") {
      setColor(e.selection.hexString);
    }
  };

  const onRequestOpenColorSelector = (boundingRect: Anchor) => {
    openColorSelector(boundingRect, {
      onColorSelect,
      scopes: ["solid"],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          This example demonstrates how apps can pick Brand, Document, and
          custom colors in an app.
        </Text>
        <Swatch
          fill={[color]}
          onClick={(e) =>
            onRequestOpenColorSelector(e.currentTarget.getBoundingClientRect())
          }
        />
      </Rows>
    </div>
  );
};
