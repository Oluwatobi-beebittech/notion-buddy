import * as React from "react";
import { Box, ImageCard, Rows, Title } from "@canva/app-ui-kit";
import styles from "./PageCard.css";

type Props = {
  icon: string | React.ReactNode;
  onClick: () => void;
  thumbnailUrl: string;
  title: string;
};
export const PageCard: React.FC<Props> = ({
  icon,
  onClick,
  thumbnailUrl,
  title,
}) => {
  const x = 0;

  return (
    <div
      onClick={onClick}
      onKeyUp={(keyEvent) => {
        if (keyEvent.code !== "Enter") return;
        onClick();
      }}
      tabIndex={0}
      role="button"
      className={styles.pageCard}
    >
      <Rows spacing="1u">
        <ImageCard
          alt={title}
          ariaLabel={title}
          borderRadius="standard"
          onClick={onClick}
          thumbnailUrl={thumbnailUrl}
          thumbnailHeight={100}
          selectable={false}
        />
        <Box>
          <Title size="xsmall">
            {icon} {title ?? ""}
          </Title>
        </Box>
      </Rows>
    </div>
  );
};
