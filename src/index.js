import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from '@mantine/modals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from "./Router";

ReactDOM.render(
    <MantineProvider>
        <ModalsProvider>
            <ColorSchemeProvider>
                <NotificationsProvider position="top-right" limit={3}>
                    <Router />
                </NotificationsProvider>
            </ColorSchemeProvider>
        </ModalsProvider>
    </MantineProvider>, document.getElementById('root'));



