import * as React from "react";
import { TextPlaceholder } from "@canva/app-ui-kit";
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
