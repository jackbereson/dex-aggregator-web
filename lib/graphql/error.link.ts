import { onError } from 'apollo-link-error';

import { clearCustomerToken } from '@/lib/services/customer/customer.model';

export const ErrorLink = onError(({ graphQLErrors, networkError }) => {
    let errorMessage = '';

    if (graphQLErrors) {
        if ('token_invalid_or_expired' === graphQLErrors?.[0]?.message) {
        } else if (
            'the_access_code_has_expired' === graphQLErrors?.[0]?.message
        ) {
            // Import and use Telegram Web App SDK to close the app with a message
            require('@twa-dev/sdk');

            clearCustomerToken();
            const webApp = (window as any).Telegram.WebApp;

            webApp.MainButton.setParams({
                color: '#FF5733', // Set your desired color here
            })
                .setText(
                    "Session expired. Close app and type 'start' to play again.",
                )
                .show()
                .onClick(() => webApp.close());

            return;
        }
        graphQLErrors.forEach(({ message, path }) =>
            // eslint-disable-next-line no-console
            console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`),
        );
    }

    if (networkError) {
        const netErr = networkError as any;

        if (netErr.error && netErr.error.errors) {
            errorMessage = `[Network error]: ${netErr.error.errors[0].message}`;
            networkError.message = netErr.error.errors[0].message;
        } else {
            errorMessage = `[Network error]: ${networkError}`;
        }
    }

    return errorMessage as any;
});
