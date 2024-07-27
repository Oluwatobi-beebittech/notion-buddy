import * as React from "react";
import { Placeholder, TitlePlaceholder } from "@canva/app-ui-kit";
import styles from "./PageCardSkeleton.css";

export const PageCardSkeleton = () => {
  return (
    <>
    <div
      className={styles.pageCardSkeleton}
    >
      <Placeholder shape="square" />
      <TitlePlaceholder size="xsmall" />
    </div>
    
    </>
  );
};
