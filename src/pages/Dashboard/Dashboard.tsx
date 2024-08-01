import {
  Alert,
  CogIcon,
  GridViewIcon,
  Rows,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@canva/app-ui-kit";
import * as React from "react";
import { getAllPages } from "src/api";
import { PageCards, PageWrapper } from "src/components";
import { useNotionBuddyStore } from "src/store";

import type { State } from "src/store";

import { Page } from "./Page";
import { Settings } from "./Settings";

export const Dashboard: React.FC = (): JSX.Element => {
  const [showAlert, setShowAlert] = React.useState<boolean>(true);
  const [errorConfig, setErrorConfig] = React.useState<{
    hasError: boolean;
    message: string;
  }>({
    hasError: false,
    message: "",
  });
  const { userDetails, notionDetails } = useNotionBuddyStore<State>(
    (state) => state
  );
  const { pages, setNotionDetails, totalPages, selectedPage } = notionDetails;
  const { canvaUserToken, userId } = userDetails;

  const getPages = async () => {
    try {
      const response = await getAllPages(
        JSON.stringify({ userId }),
        canvaUserToken
      );
      setNotionDetails({
        pages: response.results,
        totalPages: response.results.length,
      });
    } catch (error: any) {
      const { message, internalStatusCode } = JSON.parse(error?.message);
      setErrorConfig({
        hasError: true,
        message: `${internalStatusCode} - ${message}`,
      });
    }
  };

  React.useEffect(() => {
    getPages();
  }, []);

  if (selectedPage) {
    return (
      <Page
        onBack={() =>
          setNotionDetails({
            blockSearchQuery: "",
            selectedPage: "",
            selectedBlockType: "all",
            showEmptyBlocks: true,
          })
        }
        selectedPage={selectedPage}
      />
    );
  }

  return (
    <PageWrapper>
      <Rows spacing="3u">
        {showAlert && (
          <Alert
            tone="positive"
            onDismiss={() => {
              setShowAlert(false);
            }}
          >
            You are now connected to Notion
          </Alert>
        )}
        {errorConfig.hasError && (
          <Alert
            tone="critical"
            onDismiss={() => {
              setErrorConfig({
                hasError: false,
                message: "",
              });
            }}
          >
            {errorConfig.message}
          </Alert>
        )}

        <Tabs>
          <Rows spacing="2u">
            <TabList>
              <Tab id="pages" start={<GridViewIcon />}>
                Pages
              </Tab>
              <Tab id="settings" start={<CogIcon />}>
                Settings
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel id="pages">
                <PageCards
                  totalPages={totalPages}
                  pages={pages}
                  onPageClick={() => {
                    if (showAlert) setShowAlert(false);
                  }}
                />
              </TabPanel>
              <TabPanel id="settings">
                <Settings />
              </TabPanel>
            </TabPanels>
          </Rows>
        </Tabs>
      </Rows>
    </PageWrapper>
  );
};
