import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from 'App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthInterceptor from 'api/AuthInterceptor';
import './index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

AuthInterceptor();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
