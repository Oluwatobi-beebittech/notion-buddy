import { ProgressBar, Rows, Text, Title } from "@canva/app-ui-kit";
import { auth } from "@canva/user";
import * as React from "react";

import type { State } from "./store";

import { getUserDetails, verifyNotionConnection } from "./api";
import { PageWrapper } from "./components";
import { Connection404, ConnectToNotion, Dashboard } from "./pages";
import { useNotionBuddyStore } from "./store";

export const App: React.FC = (): JSX.Element => {
  const { userDetails } = useNotionBuddyStore<State>((state) => state);
  const {
    userId,
    hasNotionAccessToken,
    isNotionAccessTokenValid,
    setUserDetails,
  } = userDetails;
  const [progress, setProgress] = React.useState<number>(0);
  const [connectionErrorMessage, setConnectionErrorMessage] = React.useState<string>("");

  const initialiseUser = async () => {
    setProgress(50);
    const userToken = await auth.getCanvaUserToken();

    const responseUserDetails = await getUserDetails(userToken);
    const { hasNotionAccessToken, userId } = responseUserDetails;

    if (!hasNotionAccessToken) {
      setUserDetails({ ...responseUserDetails, canvaUserToken: userToken });
      setProgress(100);
      return;
    }

    setProgress(75);
    try {
      const { isNotionAccessTokenValid } = await verifyNotionConnection(
        JSON.stringify({ userId }),
        userToken
      );

      setProgress(100);
      setUserDetails({
        ...responseUserDetails,
        canvaUserToken: userToken,
        isNotionAccessTokenValid,
      });
    } catch (error: any) {
      const { message, internalStatusCode } = JSON.parse(error?.message);
      
      setConnectionErrorMessage(`${message} (${internalStatusCode})`);
      setUserDetails({
        ...responseUserDetails,
        hasNotionAccessToken: true,
        isNotionAccessTokenValid: false,
      });
    }
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
    return <Connection404 errorMessage={connectionErrorMessage} />;
  }

  return (
    <PageWrapper>
      <Rows spacing="3u">
        <Title tone="primary" size="medium" alignment="center">
          We are authenticating your account
        </Title>
        <Text>
          After authentication, you will have the ability to connect and utilize
          your Notion page content.
        </Text>

        <ProgressBar size="medium" tone="info" value={progress} />
      </Rows>
    </PageWrapper>
  );
};
