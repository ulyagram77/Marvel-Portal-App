import { Helmet } from 'react-helmet';

import AppBanner from 'src/components/interface/appBanner/AppBanner';
import ComicsList from 'src/components/interface/comicsList/ComicsList';
import ErrorBoundary from 'src/components/others/errorBoundary/ErrorBoundary';

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with list of comics" />
                <title>Comics Page</title>
            </Helmet>

            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;
