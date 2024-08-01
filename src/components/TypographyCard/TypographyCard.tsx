import {
  Badge,
  Box,
  TypographyCard as CanvaTypographyCard,
} from "@canva/app-ui-kit";
import * as React from "react";

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { TypographyCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/typography/typography";

import styles from "./TypographyCard.css";

type Props = TypographyCardProps & {
  badgeText: string;
  badgeTone: Tone;
  badgeTooltipLabel?: string | undefined;
};
export const TypographyCard: React.FC<Props> = ({
  ariaLabel,
  badgeText,
  badgeTone,
  badgeTooltipLabel,
  children,
  onClick,
  onDragStart,
}) => {
  return (
    <Box className={styles.typographyCard}>
      <Box className={styles.actionRow}>
        <Badge
          tone={badgeTone}
          text={badgeText}
          tooltipLabel={badgeTooltipLabel}
        />
      </Box>
      <CanvaTypographyCard
        ariaLabel={ariaLabel}
        onClick={onClick}
        onDragStart={onDragStart}
      >
        {children}
      </CanvaTypographyCard>
    </Box>
  );
};
