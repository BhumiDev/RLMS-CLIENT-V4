// ----------------------------------------------------------------------

export default function Chip(theme) {
    return {
        MuiChip: {
            styleOverrides: {
                root: {
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.onDarkContrastText,
                    borderRadius: '6px',
                    position: 'relative',
                    zIndex: 0, // Fix Safari overflow: hidden with border radius,
                    fontWeight: 400,
                    [theme.breakpoints.down('sm')]: {
                        height: '28px'
                    }
                }
            }
        }
    };
}
