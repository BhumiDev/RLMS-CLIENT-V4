import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { createMachine } from '../../../../API/Machine';
import { getAllImages, getAllNetworks } from '../../../../API/OpenStack';

const AddMachineDialogTest = ({
    handleServer,
    open,
    handleClose,
    courseId,
    sections
}) => {
    console.log('section', sections);
    const [allNetworks, setAllNetworks] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [formData, setData] = useState({
        networkId: '',
        imageId: '',
        name: '',
        flavourId: '',
        numberOfMachines: '',
        password: '',
        sectionId: '',
        time: ''
    });

    const handleSubmit = () => {
        createMachine(courseId, formData).then((response) =>
            console.log('Machine created with response of', response)
        );
        handleClose();
    };

    const handleChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    console.log('formDta', formData);
    console.log('Course id in dialog', courseId);
    const setUpInitialValues = () => {
        getAllNetworks().then((response) => setAllNetworks(response.data));
        getAllImages().then((response) => setAllImages(response.data));
    };
    useEffect(() => setUpInitialValues(), []);

    return (
        <Dialog
            fullWidth
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            // style={{ minWidth: '600px' }}
        >
            <DialogTitle
                id="customized-dialog-title"
                // onClose={handleClose}
            >
                Image for
            </DialogTitle>
            <DialogContent dividers>
                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="sectionId-label">Modules</InputLabel>
                        <Select
                            labelId="sectionId-label"
                            id="sectionId"
                            name="sectionId"
                            value={formData.module}
                            label="Module"
                            onChange={handleChange}
                        >
                            {sections?.map((section) => (
                                <MenuItem value={section._id}>
                                    {section.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="network-label">Network</InputLabel>
                        <Select
                            labelId="network-label"
                            id="network"
                            name="networkId"
                            value={formData.networkId}
                            label="Network"
                            onChange={handleChange}
                        >
                            {allNetworks.map((network) => (
                                <MenuItem value={network.id}>
                                    {network.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="image-label">Image</InputLabel>
                        <Select
                            labelId="image-label"
                            id="image"
                            name="imageId"
                            value={formData.imageId}
                            label="Image"
                            onChange={handleChange}
                        >
                            {allImages.map((image) => (
                                <MenuItem value={image.id}>
                                    {image.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack my={2}>
                    <TextField
                        fullWidth
                        label="Machine Name"
                        name="name"
                        value={formData.name}
                        id="fullWidth"
                        // style={{ minWidth: '500px' }}
                        onChange={handleChange}
                    />
                </Stack>
                {/* <Stack my={2}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        id="fullWidth"
                        style={{ minWidth: '500px' }}
                        onChange={(e) => {
                            handleServer(e);
                        }}
                    />
                </Stack> */}
                <Stack direction="row" justifyContent="space-around">
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                            Flavor
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="small"
                            name="flavourId"
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="small"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="medium"
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="large"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Stack direction="row" gap={4}>
                        <Stack gap={1.5} alignItems="center">
                            <Typography>RAM(GB)</Typography>
                            <Typography>2</Typography>
                            <Typography>4</Typography>
                            <Typography>8</Typography>
                        </Stack>
                        <Stack gap={1.5} alignItems="center">
                            <Typography>Disk size(GB)</Typography>
                            <Typography>28</Typography>
                            <Typography>64</Typography>
                            <Typography>128</Typography>
                        </Stack>
                        <Stack gap={1.5} alignItems="center">
                            <Typography>CPU</Typography>
                            <Typography>2</Typography>
                            <Typography>4</Typography>
                            <Typography>8</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    justifyCotent="center"
                    alignItems="center"
                    gap={2}
                    my={2}
                >
                    <Typography>Available limit: 50 GB</Typography>
                    <Typography>Used: 1 GB</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" my={2} gap={2}>
                    {/* <Typography>No. of machines</Typography> */}
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Number of machines"
                        value={formData.numberOfMachines}
                        variant="outlined"
                        defaultValue="Enter the number"
                        name="numberOfMachines"
                        onChange={handleChange}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" my={2} gap={2}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        name="time"
                        label="Time Duration"
                        value={formData.time}
                        variant="outlined"
                        defaultValue="Enter the time duration"
                        onChange={handleChange}
                    />
                </Stack>
                <TextField
                    fullWidth
                    label="Password"
                    value={formData.password}
                    name="password"
                    id="fullWidth"
                    // style={{ minWidth: '500px' }}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={handleSubmit}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    Add Machine
                </Button>
                <Button
                    autoFocus
                    onClick={handleClose}
                    variant="outlined"
                    color="error"
                    size="small"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMachineDialogTest;
