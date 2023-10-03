// ----------------------------------------------------------------------

import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Button(theme) {
    const themeState = (state) => state.theme.mode;
    const storeState = useSelector(themeState);

    const [themeMode, setTheme] = useState(storeState);
    useEffect(() => {
        setTheme(storeState);
    }, [themeMode, storeState]);

    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'uppercase',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none'
                    },

                    borderRadius: 4,
                    [theme.breakpoints.down('sm')]: {
                        padding: '6px 12px'
                    },

                    [theme.breakpoints.up('sm')]: {
                        padding: '6px 12px',
                        fontWeight: 500,
                        letterSpacing: '1.9px'
                    }
                },

                sizeLarge: {
                    height: 48
                },
                containedInherit: {
                    color: theme.palette.primary,

                    '&:hover': {
                        backgroundColor: theme.palette.grey[400]
                    }
                },
                containedSecondary: {
                    color: theme.palette.primary,
                    '&:hover': {
                        backgroundColor: theme.palette.grey[500]
                    }
                },

                outlinedInherit: {
                    border: `2px solid ${theme.palette.secondary.main}`,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        border: `2px solid ${theme.palette.secondary.main}`
                    }
                },
                outlinedSecondary: {
                    border: `2px solid ${theme.palette.secondary.main}`,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        border: `2px solid ${theme.palette.secondary.main}`
                    }
                },
                outlinedView: {
                    border: `2px solid ${theme.palette.view.main}`,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                        border: `2px solid ${theme.palette.view.main}`
                    },
                    outlinedError: {
                        border: `2px solid ${theme.palette.error.main}`,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            border: `2px solid ${theme.palette.error.main}`
                        }
                    },
                    textInherit: {
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover
                        }
                    }
                }
            }
        }
    };
}
