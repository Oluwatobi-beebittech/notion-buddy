import * as React from "react";
import {
  Badge,
  Box,
  Button,
  TypographyCard as CanvaTypographyCard,
  GridIcon,
} from "@canva/app-ui-kit";
import { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import styles from "./TypographyCard.css";
import { TypographyCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/typography/typography";

type Props = TypographyCardProps & {
  badgeText: string;
  badgeTone: Tone;
  badgeTooltipLabel?: string | undefined;
  loading?: boolean | undefined;
};
export const TypographyCard: React.FC<Props> = ({
  ariaLabel,
  badgeText,
  badgeTone,
  badgeTooltipLabel,
  children,
  loading,
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
        <Box className={styles.groupButton}>
          <Button
            icon={GridIcon}
            onClick={() => {}}
            variant="tertiary"
            tooltipLabel="Group items"
            disabled={loading}
          />
        </Box>
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
