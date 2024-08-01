import {
  AudioContextProvider,
  Badge,
  Box,
  AudioCard as CanvaAudioCard,
} from "@canva/app-ui-kit";
import * as React from "react";

import type { Tone } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/badge/badge";
import type { AudioCardProps } from "@canva/app-ui-kit/dist/cjs/ui/apps/developing/ui_kit/components/card/audio/audio";

import styles from "./AudioCard.css";

type Props = AudioCardProps & {
  badgeText: string;
  badgeTone: Tone;
  badgeTooltipLabel?: string | undefined;
  loading?: boolean | undefined;
};
export const AudioCard: React.FC<Props> = ({
  ariaLabel,
  audioPreviewUrl,
  badgeText,
  badgeTone,
  badgeTooltipLabel,
  durationInSeconds,
  loading,
  onClick,
  onDragStart,
  thumbnailUrl,
  title,
}) => {

  return (
    <Box className={styles.audioCard}>
      <Box className={styles.actionRow}>
        <Badge
          tone={badgeTone}
          text={badgeText}
          tooltipLabel={badgeTooltipLabel}
        />
      </Box>
      <AudioContextProvider>
        <CanvaAudioCard
          title={title}
          durationInSeconds={durationInSeconds}
          audioPreviewUrl={audioPreviewUrl}
          loading={loading}
          ariaLabel={ariaLabel}
          thumbnailUrl={thumbnailUrl}
          onClick={onClick}
          onDragStart={onDragStart}
        />
      </AudioContextProvider>
    </Box>
  );
};
