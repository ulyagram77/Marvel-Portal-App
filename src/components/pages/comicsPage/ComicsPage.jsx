import { Helmet } from 'react-helmet';
import { AppBanner, ComicsList } from 'src/components/interface';
import { ErrorBoundary } from 'src/components/others';

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
