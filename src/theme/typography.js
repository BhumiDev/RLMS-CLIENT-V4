// ----------------------------------------------------------------------

function pxToRem(value) {
    return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
    return {
        '@media (max-width:600px)': {
            fontSize: pxToRem(sm)
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md)
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg)
        }
    };
}

const FONT_PRIMARY = 'Public Sans, sans-serif';

const typography = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    // text: '#ffffff',
    h1: {
        fontWeight: 500,
        lineHeight: 80 / 64,
        fontSize: pxToRem(50),
        letterSpacing: 4,
        ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
        // color: '#ffffff'
    },
    h2: {
        fontWeight: 500,
        lineHeight: 64 / 48,
        fontSize: pxToRem(36),
        letterSpacing: 4,
        ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
        // color: '#ffffff'
    },
    h3: {
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: pxToRem(25),
        letterSpacing: 0,
        ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
        // color: '#ffffff'
    },
    h4: {
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: pxToRem(21),
        letterSpacing: 0.15,
        ...responsiveFontSizes({ sm: 20, md: 21, lg: 21 })
        // color: '#ffffff'
    },
    h5: {
        fontWeight: 400,
        lineHeight: 1.5,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ sm: 18, md: 19, lg: 20 })
        // color: '#ffffff'
    },
    h6: {
        fontWeight: 500,
        lineHeight: 28 / 18,
        fontSize: pxToRem(17),
        ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
        // color: '#ffffff'
    },
    subtitle1: {
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: pxToRem(16)
        // color: '#ffffff'
    },
    subtitle2: {
        fontWeight: 500,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
        // color: '#ffffff'
    },
    body1: {
        lineHeight: 1.5,
        letterSpacing: 0.5,
        fontWeight: 400,
        fontSize: pxToRem(15),
        ...responsiveFontSizes({ sm: 14, md: 15, lg: 18 })
        // color: '#ffffff'
    },
    body2: {
        lineHeight: 22 / 14,
        fontWeight: 400,
        fontSize: pxToRem(13)
        // color: '#ffffff'
    },
    caption: {
        fontWeight: 400,
        lineHeight: '15.6px',
        letterSpacing: '0.4px',
        fontSize: pxToRem(13)
        // color: '#ffffff'
    },
    overline: {
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        letterSpacing: 1.1,
        textTransform: 'uppercase'
        // color: '#ffffff'
    },
    button: {
        fontWeight: 500,
        lineHeight: 24 / 14,
        fontSize: pxToRem(15),
        letterSpacing: 1.25,
        textTransform: 'capitalize'
        // color: '#ffffff'
    }
};

export default typography;
