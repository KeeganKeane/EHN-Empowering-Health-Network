import React from 'react';
import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import './styles/styles.scss';
import 'normalize.css';
import AppRouter from './routers/AppRouter';

const root = createRoot(document.getElementById("app"));
root.render(
    <StrictMode>
        <AppRouter />
    </StrictMode>
)
