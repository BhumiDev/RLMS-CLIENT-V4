// ----------------------------------------------------------------------

export default function Card(theme) {
    return {
        MuiCard: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.down('md')]: {
                        width: '100%'
                        // height: 240
                    },
                    boxShadow: theme.customShadows.z16,
                    borderRadius: '6px',
                    position: 'relative',
                    zIndex: 0 // Fix Safari overflow: hidden with border radius
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: { variant: 'h6' },
                subheaderTypographyProps: { variant: 'body2' }
            },
            styleOverrides: {
                root: {
                    padding: theme.spacing(3, 3, 0)
                }
            }
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.down('sm')]: {
                        height: 130
                    },
                    [theme.breakpoints.between('sm', 'lg')]: {
                        height: 173
                    },
                    [theme.breakpoints.up('lg')]: {
                        height: 220
                    }
                }
            }
        }
        // MuiCardContent: {
        //     styleOverrides: {
        //         root: {
        //             // padding: theme.spacing(3)
        //         }
        //     }
        // }
    };
}
