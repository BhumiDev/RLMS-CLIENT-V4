import { CheckCircle } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Uncheck from '../../../assets/images/uncheckCircle.svg';
import currentLectureIcon from '../../../assets/images/currentLectureIcon.svg';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const LessonName = ({
    name,
    done,
    lectureNumber,
    index,
    completedLectures,
    id
}) => {
    return (
        <Box className="hover">
            <Box display="flex" px={2} py={1}>
                {completedLectures?.includes(id) ? (
                    lectureNumber == index ? (
                        // <img src={currentLectureIcon} alt="notDone" />
                        <CircleIcon sx={{ color: 'primary.main' }} />
                    ) : (
                        <CheckCircle sx={{ color: 'primary.main' }} />
                    )
                ) : // <img
                //     src={
                //         lectureNumber === index
                //             ? currentLectureIcon
                //             : Uncheck
                //     }
                //     alt="notDone"
                // />
                lectureNumber === index ? (
                    <CircleIcon sx={{ color: 'primary.main' }} />
                ) : (
                    <CircleOutlinedIcon sx={{ color: 'primary.main' }} />
                )}
                <Typography variant="body1" sx={{ ml: 2 }}>
                    {name}
                </Typography>
            </Box>
            <Divider />
        </Box>
    );
};

LessonName.propTypes = {
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    lectureNumber: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired
};

export default LessonName;
