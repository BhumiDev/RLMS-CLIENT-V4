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
import { createMachine, getAllMachines } from '../../../../API/Machine';
import { getAllImages, getAllNetworks } from '../../../../API/OpenStack';

const AddMachineDialogTest = ({
    handleServer,
    open,
    handleClose,
    courseId,
    sections
}) => {
    console.log('section', sections);

    const [allMachines, setAllMachines] = useState([]);
    const [formData, setData] = useState({
        sectionId: '',
        machine: ''
    });

    const handleSubmit = () => {
        // createMachine(courseId, formData).then((response) =>
        //   console.log("Machine created with response of", response)
        // );
        // handleClose();
    };

    const handleChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const data = {
        sectionId: formData?.sectionId,
        ctf_id: formData?.machine?.ctf_id,
        ctf_name: formData?.machine?.ctf_name
    };

    console.log('formDta', data);
    console.log('Course id in dialog', courseId);
    const setUpInitialValues = () => {
        getAllMachines().then((response) => setAllMachines(response));
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
                {/* -----------------------module dropdown--------------------- */}
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

                {/* ---------------------machines dropdown-------------------- */}
                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="sectionId-label">Machines</InputLabel>
                        <Select
                            labelId="machine-label"
                            id="machine"
                            name="machine"
                            value={formData.machine}
                            label="Machines"
                            onChange={handleChange}
                        >
                            {allMachines?.map((section) => (
                                <MenuItem value={section}>
                                    {section.ctf_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
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
