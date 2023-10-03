import axios from 'axios';
import { useEffect } from 'react';
import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    Input,
    Typography
} from '@mui/material';
import { Stack } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Apiconfig from '../../../../config/ApiConfig';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

const AddMachineDialogBox = ({ network, reloadFlag, open, setOpen }) => {
    const [image, setImage] = useState();
    const [data, setData] = useState(true);
    const [server, setServer] = useState({});
    const [mongoServer, setMongoServer] = useState({});
    // const [open, setOpen] = React.useState(false);
    const [imageId, setImageId] = useState();
    const [open1, setOpen1] = React.useState(false);

    //     console.log('network-machinecard',network )
    // console.log("network-carsoul",network)
    useEffect(() => {
        console.log('here');
        axios.get(`${Apiconfig.resource.images}`).then((res) => {
            setImage(res.data);
        });

        console.log('network', network);
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 3000, min: 2000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 2000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const handleServer = (e) => {
        setMongoServer((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        setMongoServer((state) => ({ ...state, networks: network.networkid }));
        setMongoServer((state) => ({ ...state, networksmongoId: network._id }));
    };

    function creatingServer(item) {
        setOpen1(!open1);
        console.log('here');
        console.log('server is here', mongoServer);
        for (let i = 0; i < mongoServer.numberOfMachine; i++) {
            setOpen(false);
            axios
                .post(`${MongoApiconfig.resource.servers}`, {
                    name: `${mongoServer.name} ${i + 1}`,
                    image_id: imageId,
                    flavor_id: mongoServer.flavor,
                    networks: mongoServer.networks,
                    password: mongoServer.password
                })
                .then((res) => {
                    console.log('server res', res);
                    axios.put(
                        `${MongoApiconfig.resource.updateServerNetwork}/${mongoServer.networksmongoId}`,
                        { serverId: res.data.data._id }
                    );
                    reloadFlag(res);
                    console.log(res);
                    setOpen1(false);
                })
                .catch((err) => console.log(err));
        }
    }
    const handleClose = (item) => {
        console.log('server ka data', server);

        console.log('image_id', item);
        creatingServer(item);
    };
    const handleClose1 = () => {
        setOpen(false)(data) ? setData(true) : setData(false);
    };
    const handleChange = (id) => {
        data ? setData(false) : setData(true);
        setImageId(id);
        setOpen(true);
    };
    return (
        <Stack direction="row" gap={4}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={open}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {image?.map((item) => {
                return (
                    <div style={{ maxWidth: '300px' }}>
                        <Stack
                            style={{ backgroundColor: 'teal' }}
                            p={2}
                            color="white"
                            justifyContent="flex-start"
                            minWidth="250px"
                            minHeight="80px"
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography>{item?.name}</Typography>
                                <IconButton
                                    onClick={() => handleChange(item.id)}
                                >
                                    {data ? <AddIcon /> : <RemoveIcon />}
                                </IconButton>
                            </Stack>
                        </Stack>
                    </div>
                );
            })}
        </Stack>
    );
};

export default AddMachineDialogBox;
