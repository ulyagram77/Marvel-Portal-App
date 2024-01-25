import { Link } from 'react-router-dom';

import './Page404.scss';

import venom from './marvel-angry-venom-doodle.gif';

const Page404 = () => {
    return (
        <div className="notFound">
            <div className="notFound_content">
                <h2>
                    4
                    <div className="notFound__img">
                        <img src={venom} alt="Error" />
                    </div>
                    4
                </h2>

                <h4>Opps! Page not found</h4>

                <p>
                    The page you were looking for doesn`t exist. You may have mistyped the
                    address or the page may have moved.
                </p>

                <Link to="/" className="button button__main button__long">
                    <div className="inner">Back To Main page</div>
                </Link>
            </div>
        </div>
    );
};

export default Page404;
