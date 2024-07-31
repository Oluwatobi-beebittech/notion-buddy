import { Button, Rows, Text, Title } from '@canva/app-ui-kit';
import * as React from 'react';

type Props = {
    actionButtonText: string;
    action: () => void;
    description: string;
    icon: () => JSX.Element;
}
export const NoResultsFound: React.FC<Props> = ({ action, actionButtonText, description, icon}): JSX.Element => {
    return (
        <Rows spacing='2u'>
            <Title alignment='center'>Nothing was found</Title>
            <Text>{description}</Text>
            <Button variant='primary' icon={icon} onClick={action} stretch>{actionButtonText}</Button>
        </Rows>
    )
}