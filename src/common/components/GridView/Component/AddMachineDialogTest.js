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
import {
    getAllFlavours,
    getAllGameList,
    getAllImages,
    getAllNetworks
} from '../../../../API/OpenStack';
import { getLecturesBySection } from '../../../../API/Course';

const AddMachineDialogTest = ({
    handleServer,
    open,
    handleClose,
    courseId,
    sections
}) => {
    console.log('section', sections);
    // const [allNetworks, setAllNetworks] = useState([]);
    // const [allImages, setAllImages] = useState([]);
    // const [allFlavours, setAllFlavours] = useState([]);
    const [allLectures, setAllLectures] = useState([]);
    const [allGameList, setAllGameList] = useState([]);
    const [formData, setData] = useState({
        // networkId: '',
        // imageId: '',
        name: '',
        // flavourId: '',
        // // numberOfMachines: "",
        // // password: "",
        sectionId: '',
        lectureId: '',
        ctfId: ''
        // time: ''
    });

    // const handleSubmit = () => {
    //     const data = {
    //         // networkId: formData?.networkId,
    //         // imageId: formData?.imageId,
    //         name: formData?.name,
    //         ctf: formData?.ctfId,
    //         // flavourId: formData?.flavourId,
    //         // lectureId: formData?.lectureId,
    //         // time: formData?.time
    //     };

    //     console.log("data", data)
    //     // createMachine(courseId, data).then((response) =>
    //     //     console.log('Machine created with response of', response)
    //     // );
    //     handleClose();
    //     setData({
    //         // networkId: '',
    //         // imageId: '',
    //         name: '',
    //         // flavourId: '',
    //         ctfId:'',
    //         // numberOfMachines: "",
    //         // password: "",
    //         // sectionId: '',
    //         // lectureId: '',
    //         // time: ''
    //     });
    // };
    const handleSubmit = () => {
        const selectedCtfId = formData.ctfId;
        const selectedCtf = allGameList.find(
            (ctf) => ctf.ctf_id === selectedCtfId
        );

        const data = {
            ctf_name: selectedCtf ? selectedCtf.ctf_name : '', // Set the name to ctf_name if found, otherwise empty string
            ctf_id: selectedCtfId,
            lectureId: formData?.lectureId
        };

        console.log('data', data, courseId);
        // create machine api
        createMachine(courseId, data).then((response) =>
            console.log('Machine created with response of', response)
        );
        handleClose();
        setData({
            name: '',
            ctfId: '',
            sectionId: '',
            lectureId: ''
        });
    };

    const handleChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const getLectures = async () => {
        console.log('sectionid', formData.sectionId);
        if (formData?.sectionId) {
            const res = await getLecturesBySection(formData?.sectionId);
            console.log('response of get lecture', res);
            setAllLectures(res);
        }
    };

    console.log('formDta', formData);
    console.log('Course id in dialog', courseId);
    const setUpInitialValues = () => {
        // getAllNetworks().then((response) => setAllNetworks(response.data));
        // getAllImages().then((response) => setAllImages(response.data));
        // getAllFlavours().then((response) => setAllFlavours(response?.data));
        getAllGameList().then((response) => setAllGameList(response.data));
    };
    useEffect(() => setUpInitialValues(), []);
    console.log('allGameList', allGameList);

    useEffect(() => getLectures(), [formData?.sectionId]);

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
                Add Machine
            </DialogTitle>
            <DialogContent dividers>
                {/* <Stack my={2}>
                    <TextField
                        fullWidth
                        label="Machine Name"
                        name="name"
                        value={formData.name}
                        id="fullWidth"
                        // style={{ minWidth: '500px' }}
                        onChange={handleChange}
                    />
                </Stack> */}

                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="sectionId-label">Modules</InputLabel>
                        <Select
                            labelId="sectionId-label"
                            id="sectionId"
                            name="sectionId"
                            value={formData.sectionId}
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
                {formData?.sectionId && (
                    <Stack my={2}>
                        <FormControl>
                            <InputLabel id="lectureId-label">
                                Lectures
                            </InputLabel>
                            <Select
                                labelId="lectureId-label"
                                id="lectureId"
                                name="lectureId"
                                value={formData.lectureId}
                                label="Lecture"
                                onChange={handleChange}
                            >
                                {allLectures?.map((lecture) => (
                                    <MenuItem value={lecture._id}>
                                        {lecture.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                )}
                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="ctf-label">Labs</InputLabel>
                        <Select
                            labelId="ctf-label"
                            id="ctf"
                            name="ctfId"
                            value={formData.ctfId}
                            label="Labs"
                            onChange={handleChange}
                        >
                            {allGameList.map((ctf) => (
                                <MenuItem value={ctf.ctf_id}>
                                    {ctf.ctf_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                {/* <Stack my={2}>
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
                                <MenuItem value={image.image_id}>
                                    {image.image_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack my={2}>
                    <FormControl>
                        <InputLabel id="flavour-label">Flavor</InputLabel>
                        <Select
                            labelId="flavour-label"
                            id="flavour"
                            name="flavourId"
                            value={formData.flavourId}
                            label="Flavour"
                            onChange={handleChange}
                        >
                            {allFlavours.map((flavor) => (
                                <MenuItem value={flavor.flavor_id}>
                                    {flavor.flavor_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack> */}

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
                {/* <Stack direction="row" alignItems="center" my={2} gap={2}>
          <Typography>No. of machines</Typography>
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
        </Stack> */}
                {/* <Stack direction="row" alignItems="center" my={2} gap={2}>
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
                </Stack> */}
                {/* <TextField
          fullWidth
          label="Password"
          value={formData.password}
          name="password"
          id="fullWidth"
          // style={{ minWidth: '500px' }}
          onChange={handleChange}
        /> */}
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
                    onClick={() => {
                        handleClose();
                        setData({
                            name: '',
                            ctfId: '',
                            sectionId: '',
                            lectureId: ''
                        });
                    }}
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
