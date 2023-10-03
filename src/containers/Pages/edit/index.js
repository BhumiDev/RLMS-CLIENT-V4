import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import Axios from 'axios';
import { test } from '../../../API/Course';

export const Test = () => {
    const [video, setVideo] = useState('');

    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        if (e.target.files) {
            console.log('in file');

            setVideo(e.target.files[0]);
        } else {
            console.log('in data');
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        console.log('DATA', formData);
        console.log('bata', video);

        await test(formData.name, video);
    };
    return (
        <>
            <h1>hellooo world</h1>
            <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                name="name"
                onChange={(e) => {
                    handleChange(e);
                }}
            />
            <TextField
                id="outlined-basic"
                label="video"
                variant="outlined"
                name="video"
                type="file"
                onChange={(e) => {
                    handleChange(e);
                }}
            />
            <br />

            <Button varient="outlined" onClick={handleSubmit}>
                {' '}
                submit
            </Button>
        </>
    );
};
