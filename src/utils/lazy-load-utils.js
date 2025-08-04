import React, { Suspense } from "react";
import URLFallBack from "../components/url-fallback";

const loadableWithRetry = (componentImport) => {
    let pageHasAlreadyBeenForceRefreshed = false;
    const sessionStorageValue = window.sessionStorage.getItem("page-has-been-force-refreshed");

    if (sessionStorageValue !== null) {
        pageHasAlreadyBeenForceRefreshed = sessionStorageValue.toLowerCase() === "true";
    }

    const LazyComponent = React.lazy(async () => {
        try {
            const component = await componentImport();
            window.sessionStorage.setItem("page-has-been-force-refreshed", "false");
            return component;
        } catch (error) {
            if (!pageHasAlreadyBeenForceRefreshed) {
                window.sessionStorage.setItem("page-has-been-force-refreshed", "true");
                window.location.reload();
            }
            throw error;
        }
    });

    return (props) => (
        <Suspense fallback={<URLFallBack />}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

export default loadableWithRetry;
