import AppBanner from 'src/components/appBanner/AppBanner';
import ComicsList from 'src/components/comicsList/ComicsList';
import ErrorBoundary from 'src/components/errorBoundary/ErrorBoundary';

const ComicsPage = () => {
    return (
        <>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;
