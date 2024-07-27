import * as React from "react";
import { Button, PencilIcon, Rows, TrashIcon } from "@canva/app-ui-kit";
import {PageWrapper} from 'src/components';

type Props = {
    userId: string;
}
export const Settings: React.FC<Props> = ({ userId }): JSX.Element => {
  const x = userId;

  return (
    <PageWrapper>
  <Rows spacing="2u">
    <Button
          variant="primary"
          ariaLabel="Update Notion Connection"
          icon={PencilIcon}
          stretch
        >
          Update Notion Connection
        </Button>
        <Button
          variant="secondary"
          ariaLabel="Disconnect from Notion"
          icon={TrashIcon}
          iconPosition="start"
          stretch
        >
          Disconnect from Notion
        </Button>
  </Rows>
  </PageWrapper>
  );
};
