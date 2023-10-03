// ----------------------------------------------------------------------

export default function Input(theme) {
    return {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        '& svg': { color: theme.palette.text.disabled }
                    }
                },
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: theme.palette.text.disabled
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': {
                        borderBottomColor: theme.palette.grey[500_56]
                    }
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.grey[500_12],
                    '&:hover': {
                        backgroundColor: theme.palette.grey[500_16]
                    },
                    '&.Mui-focused': {
                        backgroundColor: theme.palette.action.focus
                    },
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.action.disabledBackground
                    }
                },
                underline: {
                    '&:before': {
                        borderBottom: 'none'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light,
                        borderRadius: 4
                    },
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.action.disabledBackground
                        }
                    }
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    MuiInputLabel: {
                        styleOverrides: {
                            root: {
                                '& .Mui-focused': {
                                    color: 'rgba(25, 49, 79,0.5)'
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}
