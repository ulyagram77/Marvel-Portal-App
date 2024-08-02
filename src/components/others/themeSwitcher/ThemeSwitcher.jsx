import { useEffect, useState } from 'react';
import './ThemeSwitcher.scss';
import { moon, sun } from 'src/assets';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="mode" onClick={toggleTheme}>
            {theme === 'light' ? (
                <img src={sun} alt="sun" className="mode__icon" />
            ) : (
                <img src={moon} alt="moon" className="mode__icon" />
            )}
        </div>
    );
};

export default ThemeSwitcher;
