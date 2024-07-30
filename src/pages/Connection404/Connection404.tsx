import { Button, Rows, Text, Title } from "@canva/app-ui-kit";
import { getDesignToken } from "@canva/design";
import { requestOpenExternalUrl } from "@canva/platform";
import * as React from "react";
import { saveDesignId } from "src/api";
import { PageWrapper } from "src/components";
import { useNotionBuddyStore } from "src/store";

import type { State } from "src/store";

export const Connection404: React.FC = (): JSX.Element => {
  const { designDetails, userDetails } = useNotionBuddyStore<State>(
    (state) => state
  );
  const { setDesignDetails } = designDetails;
  const { userId } = userDetails;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const notionBuddyConnectionUrl: string = userId
    ? `${BACKEND_HOST}/api/v1/notionbuddy/oauth/connect?u=${userId}`
    : "";

  async function handleClick() {
    setIsLoading(true);
    const { token: designToken } = await getDesignToken();
    const response = await requestOpenExternalUrl({
      url: notionBuddyConnectionUrl,
    });

    if (response.status === "COMPLETED") {
      await saveDesignId(JSON.stringify({ userId }), designToken);
      setDesignDetails({ canvaDesignToken: designToken });
    }

    setIsLoading(false);
  }

  return (
    <PageWrapper>
      <Rows spacing="3u">
        <Title tone="primary" size="medium" alignment="center">
          Connection to your Notion account failed
        </Title>
        <Text>
          Sorry, we couldn't establish a connection to your Notion account.
          Please try reconnecting to Notion.
        </Text>
        <Button
          variant="primary"
          onClick={handleClick}
          loading={isLoading}
          ariaLabel="Reconnect to Notion"
          stretch
        >
          Reconnect to Notion
        </Button>
      </Rows>
    </PageWrapper>
  );
};
