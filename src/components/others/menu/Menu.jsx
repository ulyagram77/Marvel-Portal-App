import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { MenuIcon } from '..';
import './Menu.scss';

const Menu = ({ open, setOpen, links, isLinkActive }) => {
    const clazz = `menu__body ${open ? 'active' : ''}`;

    return (
        <nav className="menu">
            <MenuIcon open={open} setOpen={setOpen} />

            <ul className={clazz}>
                {links.map(link => (
                    <li key={link.path}>
                        <NavLink end style={isLinkActive} to={link.path}>
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Menu.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
    isLinkActive: PropTypes.func,
};

Menu.defaultProps = {
    links: [],
    isLinkActive: () => {},
};

export default Menu;
