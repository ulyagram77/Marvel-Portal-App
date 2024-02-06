import { RingLoader } from 'react-spinners';

const loaderWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
};

const Loader = () => {
    return (
        <div className="loader" style={loaderWrapperStyles}>
            <RingLoader size={150} color="#9F0013" />
        </div>
    );
};

export default Loader;
