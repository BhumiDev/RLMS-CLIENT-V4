import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { allVariants } from './staticData';
import { useState } from 'react';

const index = () => {
    const [element, setElement] = useState(allVariants[0].element);

    return (
        <Grid container>
            <Grid item md={4}>
                {allVariants.map((variant) => (
                    <Button onClick={() => setElement(variant.element)}>
                        {variant.name}
                    </Button>
                ))}
            </Grid>
            <Grid item md={8}>
                {element}
            </Grid>
        </Grid>
    );
};

export default index;
