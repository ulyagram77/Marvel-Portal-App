import errorPic from './error.gif';

const styles = {
    display: 'block',
    width: '230px',
    height: '230px',
    objectFit: 'contain',
    margin: '0 auto',
    alignSelf: 'center',
};

const ErrorMessage = () => {
    return <img src={errorPic} alt="Error" style={styles} />;
};

export default ErrorMessage;
