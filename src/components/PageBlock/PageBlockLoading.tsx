import { TextPlaceholder } from "@canva/app-ui-kit";
import * as React from "react";

import { TypographyCard } from "../TypographyCard";

export const PageBlockLoading: React.FC = (): JSX.Element => (
  <TypographyCard
    ariaLabel="Loading"
    badgeTone="neutral"
    badgeText="Loading"
    loading
  >
    <TextPlaceholder size="xlarge" />
  </TypographyCard>
);
