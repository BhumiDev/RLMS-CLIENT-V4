import { useState } from 'react';
import { Drawer, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Cal from './cards/calendar';

const CalenderDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    <>
        <IconButton
            size="large"
            edge="start"
            onClick={() => setIsDrawerOpen(true)}
        >
            <MenuIcon />
        </IconButton>
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            <Box p={2} width="250px" textAlign="center" role="presentation">
                <Cal />
            </Box>
        </Drawer>
    </>;
};

export default CalenderDrawer;
