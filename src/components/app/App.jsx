import { lazy, Suspense } from 'react';
import Loader from '../others/loader/Loader';

const AppRouting = lazy(() => import('../interface/appRouting/AppRouting'));

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <AppRouting />
        </Suspense>
    );
};

export default App;
