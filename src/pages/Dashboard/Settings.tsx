import {
  Alert,
  Box,
  Button,
  Column,
  Columns,
  Flyout,
  PencilIcon,
  Rows,
  Text,
  TrashIcon,
  XIcon,
} from "@canva/app-ui-kit";
import { getDesignToken } from "@canva/design";
import { requestOpenExternalUrl } from "@canva/platform";
import * as React from "react";
import { saveDesignId } from "src/api";
import { PageWrapper } from "src/components";
import { useNotionBuddyStore } from "src/store";

import type { State } from "src/store";

export const Settings: React.FC = (): JSX.Element => {
  const { designDetails, userDetails } = useNotionBuddyStore<State>(
    (state) => state
  );
  const [isFlyoutOpen, setIsFlyoutOpen] = React.useState<boolean>(false);
  const [isKeepSelectedAlertOpen, setIsKeepSelectedAlertOpen] =
    React.useState<boolean>(false);
  const { setDesignDetails } = designDetails;
  const { userId } = userDetails;
  const [isUpdateNotionConnectionLoading, setIsUpdateNotionConnectionLoading] =
    React.useState<boolean>(false);

  const notionBuddyConnectionUrl: string = userId
    ? `${BACKEND_HOST}/api/v1/notionbuddy/oauth/connect?u=${userId}`
    : "";

  async function handleClick() {
    setIsUpdateNotionConnectionLoading(true);
    const { token: designToken } = await getDesignToken();
    const response = await requestOpenExternalUrl({
      url: notionBuddyConnectionUrl,
    });

    if (response.status === "COMPLETED") {
      await saveDesignId(JSON.stringify({ userId }), designToken);
      setDesignDetails({ canvaDesignToken: designToken });
    }

    setIsUpdateNotionConnectionLoading(false);
  }

  const keepNotionConnection = () => {
    setIsFlyoutOpen(false);
    setIsKeepSelectedAlertOpen(true);
    setTimeout(() => setIsKeepSelectedAlertOpen(false), 15000);
  };

  return (
    <PageWrapper>
      <Rows spacing="2u">
        {isKeepSelectedAlertOpen && (
          <Alert tone="info">
            That was a close call! Let’s proceed with exploring the
            Superbuddy-Notion connection.
          </Alert>
        )}
        <Button
          variant="primary"
          ariaLabel="Update Notion Connection"
          icon={PencilIcon}
          onClick={handleClick}
          loading={isUpdateNotionConnectionLoading}
          stretch
        >
          Update Notion Connection
        </Button>

        <Flyout
          open={isFlyoutOpen}
          description="Unlink your account."
          footer={
            <Box padding="1u">
              <Columns spacing="1u">
                <Column>
                  <Button
                    onClick={keepNotionConnection}
                    stretch
                    variant="secondary"
                  >
                    Keep
                  </Button>
                </Column>
                <Column>
                  <Button
                    onClick={() => {}}
                    stretch
                    variant="primary"
                    icon={TrashIcon}
                  >
                    Discard
                  </Button>
                </Column>
              </Columns>
            </Box>
          }
          headerEnd={
            <Button
              icon={XIcon}
              onClick={() => {
                setIsFlyoutOpen(false);
              }}
              variant="tertiary"
            />
          }
          onRequestClose={() => {
            setIsFlyoutOpen(false);
          }}
          placement="bottom-start"
          title="Disconnect Notion"
          trigger={
            <Button
              variant="secondary"
              ariaLabel="Disconnect from Notion"
              icon={TrashIcon}
              iconPosition="start"
              onClick={() => {
                setIsFlyoutOpen(true);
              }}
              stretch
            >
              Disconnect from Notion
            </Button>
          }
          width="32u"
        >
          <Box padding="1u">
            <Rows spacing="2u">
              <Text>
                Upon unlinking your Notion account, you will no longer have
                access to the content on your Notion pages.
              </Text>
            </Rows>
          </Box>
        </Flyout>
      </Rows>
    </PageWrapper>
  );
};
