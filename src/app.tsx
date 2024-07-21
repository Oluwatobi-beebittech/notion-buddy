import { ProgressBar, Rows, Text, Title } from "@canva/app-ui-kit";
import { auth } from "@canva/user";
import * as React from "react";
import { Connection404, ConnectToNotion, Dashboard } from "./pages";
import { PageWrapper } from "./components";
import { getUserDetails, UserDetails, verifyNotionConnection } from "./api";

export const App = () => {
  const [userDetails, setUserDetails] = React.useState<UserDetails>({
    userId: "",
    hasNotionAccessToken: false,
    isNotionAccessTokenValid: false,
  });
  const [progress, setProgress] = React.useState<number>(0);

  const callNotion = async () => {
    setProgress(50);
    const userToken = await auth.getCanvaUserToken();

    const responseUserDetails = await getUserDetails(userToken);
    const { hasNotionAccessToken, userId } = responseUserDetails;

    if (!hasNotionAccessToken) {
      setUserDetails(responseUserDetails);
      setProgress(100);
      return;
    }

    setProgress(75);
    await verifyNotionConnection(JSON.stringify({ userId }), userToken);

    setProgress(100);
    setUserDetails(responseUserDetails);
  };

  React.useEffect(() => {
    callNotion();
  }, []);

  const { userId, hasNotionAccessToken, isNotionAccessTokenValid } =
    userDetails;
  const isUserRegistered = Boolean(userId);

  if (isUserRegistered && !hasNotionAccessToken && !isNotionAccessTokenValid) {
    return <ConnectToNotion userId={userId} />;
  }

  if (isUserRegistered && hasNotionAccessToken && isNotionAccessTokenValid) {
    return <Dashboard userId={userId} />;
  }

  if (isUserRegistered && hasNotionAccessToken && !isNotionAccessTokenValid) {
    return <Connection404 userId={userId} />;
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
