import { lazy, Suspense } from 'react';
import Loader from '../loader/Loader';

const AppRouting = lazy(() => import('../appRouting/AppRouting'));

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <AppRouting />
        </Suspense>
    );
};

export default App;
