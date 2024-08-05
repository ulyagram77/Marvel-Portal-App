import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { MenuIcon } from '..';
import { useRef } from 'react';
import { useEffect } from 'react';
import './Menu.scss';

const Menu = ({ open, setOpen, links, isLinkActive }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, setOpen]);

    const clazz = `menu__body ${open ? 'active' : ''}`;

    return (
        <nav className="menu" ref={menuRef}>
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
