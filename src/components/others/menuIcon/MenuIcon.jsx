import PropTypes from 'prop-types';
import './MenuIcon.scss';

const MenuIcon = ({ open, setOpen }) => {
    const clazz = `menu__icon ${open ? 'active' : ''}`;

    return (
        <div className={clazz} onClick={setOpen}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

MenuIcon.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default MenuIcon;
