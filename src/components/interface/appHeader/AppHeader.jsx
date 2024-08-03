import { Link, NavLink } from 'react-router-dom';
import './AppHeader.scss';
import { Menu } from 'src/components/others';
import { useState } from 'react';
import { navLinks } from 'src/constants';
import { useMatchMedia } from 'src/hooks';

const AppHeader = () => {
    const [open, setOpen] = useState(false);
    const { isMobile } = useMatchMedia();

    const toggleMenu = () => setOpen(!open);

    const isLinkActive = ({ isActive }) => ({
        color: isActive ? '#9f0013' : 'inherit',
    });

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            {isMobile ? (
                <Menu
                    open={open}
                    setOpen={toggleMenu}
                    links={navLinks}
                    isLinkActive={isLinkActive}
                />
            ) : (
                <nav className="app__menu">
                    <ul>
                        <li>
                            <NavLink end style={isLinkActive} to="/">
                                Characters
                            </NavLink>
                        </li>
                        /
                        <li>
                            <NavLink style={isLinkActive} to="/comics">
                                Comics
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default AppHeader;
