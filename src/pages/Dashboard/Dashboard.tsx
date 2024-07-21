import * as React from "react";
import {
  Rows,
  Text,
  Title,
} from "@canva/app-ui-kit";
import { PageWrapper } from "src/components";

type Props = {
  userId: string;
};
export const Dashboard: React.FC<Props> = ({ userId }): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <PageWrapper>
      <Rows spacing="3u">
        <Title tone="primary" size="medium" alignment="center">
          Your account is connected
        </Title>
        <Text>
          You will be able to import text content from Notion pages when you
          connect to Notion.
        </Text>
      </Rows>
    </PageWrapper>
  );
};
