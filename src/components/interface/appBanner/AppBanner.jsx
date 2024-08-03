import { avengers, avengersLogo } from 'src/assets';
import './AppBanner.scss';

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={avengers} className="app__banner-img" alt="Avengers" />
            <div className="app__banner-text">
                New comics every week!
                <br />
                Stay tuned!
            </div>
            <img src={avengersLogo} className="app__banner-img" alt="Avengers logo" />
        </div>
    );
};

export default AppBanner;
