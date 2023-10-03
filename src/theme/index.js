import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// material
import { CssBaseline } from '@mui/material';
import {
    ThemeProvider,
    createTheme,
    StyledEngineProvider
} from '@mui/material/styles';
//
import shape from './shape';
import lightPalette from './Palette/lightPalette';
import darkPalette from './Palette/darkPalette';
import pinkPalette from './Palette/pinkPalette';
import yellowPalette from './Palette/yellowPalette';
import gradientPalette from './Palette/gradientPalette';
import saffronPalette from './Palette/saffronPalette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
// import { store } from '../store';

// ----------------------------------------------------------------------

const ThemeConfig = ({ children }) => {
    // const storeState = store.getState();
    const themeState = (state) => state.theme.mode;
    const storeState = useSelector(themeState);

    const [themeMode, setTheme] = useState(storeState);
    const [palette, setPalette] = useState(lightPalette);
    const updatePalette = (name) => {
        switch (name) {
            case 'dark':
                setPalette(darkPalette);
                break;
            case 'light':
                setPalette(lightPalette);
                break;
            case 'gradient':
                setPalette(gradientPalette);
                break;
            case 'pink':
                setPalette(pinkPalette);
                break;
            case 'humid':
                setPalette(yellowPalette);
                break;
            case 'saffron':
                setPalette(saffronPalette);
                break;
            default:
                break;
        }
    };
    console.log('themeMode', themeMode);
    useEffect(() => {
        setTheme(storeState);
        updatePalette(storeState);
    }, [themeMode, storeState]);

    // const palette = (name) => {
    //     switch (name) {
    //         case 'dark':
    //             return darkPalette ;
    //             break;
    //         case 'light':
    //             return lightPalette;
    //             break;
    //         case 'gradient':
    //             return gradientPalette;
    //             break;
    //         default:
    //             break;
    //     }
    // };
    // const palette = themeMode;

    const themeOptions = useMemo(
        () => ({
            breakpoints,
            palette,
            shape,
            typography,
            shadows,
            customShadows
        }),
        [palette]
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);
    console.log('theme theme', theme);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

ThemeConfig.propTypes = {
    children: PropTypes.node
};

ThemeConfig.defaultProps = {
    children: {}
};

export default ThemeConfig;
