import Skeleton from 'src/components/others/skeleton/Skeleton';
import ErrorMessage from 'src/components/others/errorMessage/ErrorMessage';
import Spinner from 'src/components/others/spinner/Spinner';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state!');
    }
};

export default setContent;
