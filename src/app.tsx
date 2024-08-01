import { ProgressBar, Rows, Text, Title } from "@canva/app-ui-kit";
import { auth } from "@canva/user";
import * as React from "react";

import type { State } from "./store";

import { getUserDetails, verifyNotionConnection } from "./api";
import { PageWrapper } from "./components";
import { Connection404, ConnectToNotion, Dashboard } from "./pages";
import { useNotionBuddyStore } from "./store";

export const App: React.FC = (): JSX.Element => {
  const { userDetails} = useNotionBuddyStore<State>((state) => state);
  const {userId, hasNotionAccessToken, isNotionAccessTokenValid, setUserDetails} =  userDetails;
  const [progress, setProgress] = React.useState<number>(0);

  const initialiseUser = async () => {
    setProgress(50);
    const userToken = await auth.getCanvaUserToken();

    const responseUserDetails = await getUserDetails(userToken);
    const { hasNotionAccessToken, userId } = responseUserDetails;

    if (!hasNotionAccessToken) {
      setUserDetails({...responseUserDetails, canvaUserToken: userToken});
      setProgress(100);
      return;
    }

    setProgress(75);
    const { isNotionAccessTokenValid } = await verifyNotionConnection(JSON.stringify({ userId }), userToken);

    setProgress(100);
    setUserDetails({...responseUserDetails, canvaUserToken: userToken, isNotionAccessTokenValid });
  };

  React.useEffect(() => {
    initialiseUser();
  }, [hasNotionAccessToken, isNotionAccessTokenValid]);

  const isUserRegistered = Boolean(userId);

  if (isUserRegistered && !hasNotionAccessToken && !isNotionAccessTokenValid) {
    return <ConnectToNotion />;
  }

  if (isUserRegistered && hasNotionAccessToken && isNotionAccessTokenValid) {
    return <Dashboard />;
  }

  if (isUserRegistered && hasNotionAccessToken && !isNotionAccessTokenValid) {
    return <Connection404 />;
  }

  return (
    <PageWrapper>
      <Rows spacing="3u">
        <Title tone="primary" size="medium" alignment="center">
          We are authenticating your account
        </Title>
        <Text>
          Once authenticated, you will be able to connect and use your Notion
          page content.
        </Text>

        <ProgressBar size="medium" tone="info" value={progress} />
      </Rows>
    </PageWrapper>
  );
};
