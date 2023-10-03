export default function DataGrid(theme) {
    return {
        MuiDataGrid: {
            styleOverrides: {
                columnHeaders: {
                    backgroundColor: theme.palette.primary.light,
                    color: '#fff',
                    borderTopRightRadius: '8px',
                    borderTopLeftRadius: '8px'
                },
                columnHeaderTitle: {
                    fontWeight: 500,
                    fontSize: 17,
                    lineHeight: '23.8px',
                    letterSpacing: 0.5
                },
                columnSeparator: {
                    display: 'none'
                },
                root: {}
            }
        }
    };
}
