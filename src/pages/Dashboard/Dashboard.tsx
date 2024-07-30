import {
  Alert,
  CogIcon,
  Grid,
  GridViewIcon,
  Rows,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@canva/app-ui-kit";
import find from "lodash.find";
import matchesProperty from "lodash.matchesproperty";
import * as React from "react";
import * as searchjs from "searchjs";
import { getAllPages } from "src/api";
import { PageCards, PageWrapper } from "src/components";
import { useNotionBuddyStore } from "src/store";
import { searchProperty } from "src/utilities";

import type { State } from "src/store";


import { Page } from "./Page";
import { Settings } from "./Settings";

export const Dashboard: React.FC = (): JSX.Element => {
  const [showAlert, setShowAlert] = React.useState<boolean>(true);
  const { userDetails, notionDetails } = useNotionBuddyStore<State>(
    (state) => state
  );
  const { pages, setNotionDetails, totalPages, selectedPage } = notionDetails;
  const { canvaUserToken, userId } = userDetails;

  const getPages = async () => {
    const response = await getAllPages(
      JSON.stringify({ userId }),
      canvaUserToken
    );
    setNotionDetails({
      pages: response.results,
      totalPages: response.results.length,
    });
  };

  React.useEffect(() => {
    getPages();
  }, []);

  if (selectedPage) {
    return (
      <Page
        onBack={() =>
          setNotionDetails({
            selectedPage: "",
            selectedBlockType: "all"
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
                <Settings userId={userId} />
              </TabPanel>
            </TabPanels>
          </Rows>
        </Tabs>
      </Rows>
    </PageWrapper>
  );
};
