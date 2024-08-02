import { lazy, Suspense } from 'react';
import { Loader, ThemeSwitcher } from '../others';

const AppRouting = lazy(() => import('../interface/appRouting/AppRouting'));

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <ThemeSwitcher />
            <AppRouting />
        </Suspense>
    );
};

export default App;
