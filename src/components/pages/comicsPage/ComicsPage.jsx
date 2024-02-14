import AppBanner from 'src/components/interface/appBanner/AppBanner';
import ComicsList from 'src/components/interface/comicsList/ComicsList';
import ErrorBoundary from 'src/components/others/errorBoundary/ErrorBoundary';

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
