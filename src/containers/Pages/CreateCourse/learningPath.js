import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import {
    Box,
    Checkbox,
    Chip,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';

import { instructorCourses } from '../../../API/Course';
import { studentCategory } from '../../../API/Course';
import {
    getStudentByCategory,
    creatingLearningPath
} from '../../../API/Course';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { CreatelearningPathBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import _without from 'lodash/without';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const columns = [
    { field: 'id', headerName: 'S No.', width: 250 },
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
        editable: true
    },
    {
        field: 'majorCategory',
        headerName: 'Major Category',
        width: 250,
        editable: true
    },
    {
        field: 'subCategory',
        headerName: 'Sub Category',
        type: 'number',
        width: 250,
        editable: true
    }
];

// function getStyles(name, personName, theme) {
//     return {
//         fontWeight:
//             personName.indexOf(name) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium
//     };
// }

export default function LearningPath() {
    const [courses, setCourses] = useState([{}]);
    const [category, setCategory] = useState([]);
    const [users, setUsers] = useState([{}]);
    const [rowData, setRowData] = useState([{}]);
    // const [filteredCourses, setFilteredCourses] = useState([]);
    const [value, setValue] = useState(false);
    // const [selectAll, setSelectAll] = useState(false);
    const [instructorDetails, setInstructorDetails] = useState('');

    const [selectedIds, setSelectedIds] = useState([]);

    const [selected, setSelected] = useState({
        courses: [],
        category: '',
        title: ''
    });

    useEffect(() => {
        instructorCourses().then((data) => setCourses(data));
        studentCategory().then((data) => setCategory(data));
        setDetails();
    }, [users]);
    console.log('courses', courses);
    console.log('userss', users);

    const setDetails = () => {
        if (users[0]?.name) {
            const userDetails = users.map((value, index) => {
                let details = {
                    id: index + 1,
                    name: value.name,
                    majorCategory: value.majorCategory,
                    subCategory: value.subCategory
                };

                return details;
            });

            setValue(true);
            setRowData(userDetails);
            console.log('userDetails', userDetails);
        }

        if (courses[0].author) {
            setInstructorDetails(courses[0].author);
        }
    };

    // Filter courses based on the category condition
    const filteredCourses = courses.filter(
        (course) => course.majorCategory === selected.category
    );

    // const createLearningPath = async () => {
    //     console.log(instructorDetails); //ins
    //     console.log(selectedIds); // student

    //     const selectedCourseIds = [];
    //     selected.courses.map((course) => selectedCourseIds.push(course.id));
    //     let obj = {
    //         instructor: instructorDetails,
    //         students: selectedIds,
    //         courses: selectedCourseIds,
    //         title: selected.title
    //     };

    //     console.log('obj', obj);

    //     try {
    //         await creatingLearningPath(obj);
    //         toast.success('Learning Path Created Successfully');
    //         setUsers([{}]);
    //         setSelected({
    //             courses: [],
    //             category: '',
    //             title: ''
    //         });
    //     } catch (err) {
    //         console.log('err', err);
    //         toast.error("Learning Path Can't be Created");
    //     }
    // };
    ///////////////////////////////////////////////////////////////////////////////////////////////

    const createLearningPath = async () => {
        console.log('instructorDetails', instructorDetails);
        console.log('selectedIds', selectedIds);
        console.log('selected.courses', selected.courses);
        // console.log("selectedCourseIds", selectedCourseIds);

        if (selected.title.trim() === '') {
            toast.error('Title is required');
            return; // Do not proceed if the title is empty
        }
        // if(selected.courses === []) {
        //     toast.error('Courses is required');
        //     return; // Do not proceed if the title is empty
        // }
        if (!Array.isArray(selected.courses) || selected.courses.length === 0) {
            toast.error('Courses is required');
            return; // Do not proceed if the courses array is empty
        }

        const selectedCourseIds = [];
        selected.courses.map((course) => selectedCourseIds.push(course.id));
        // Extract _id from selectedIds and store them in an array
        const selectedUserIds = selectedIds.map(
            (selectedId) => users[selectedId - 1]._id
        );

        let obj = {
            instructor: instructorDetails,
            students: selectedUserIds,
            courses: selectedCourseIds,
            title: selected.title
        };

        console.log('obj', obj);

        try {
            await creatingLearningPath(obj);
            toast.success('Learning Path Created Successfully');
            setUsers([{}]);
            setSelected({
                courses: [],
                category: '',
                title: ''
            });
        } catch (err) {
            console.log('err', err);
            toast.error("Learning Path Can't be Created");
        }
    };

    // const handleChange = (event) => {
    //     const {
    //         target: { name, value }
    //     } = event;
    //     console.log('value', value);

    //     const obj = {
    //         name: value[value.length - 1].courseName,
    //         id: value[value.length - 1]._id
    //     };

    //     if (name === 'courses') {
    //         selected.courses.findIndex((x) => x.id === obj.id) == -1
    //             ? selected.courses.push(obj)
    //             : console.log('course already choosen');

    //         // console.log('setting selected');
    //         setSelected({ ...selected }, selected);
    //     } else if (name === 'category') {
    //         setSelected({ ...selected, category: value });
    //         getStudentByCategory(value).then((data) => setUsers(data));
    //     } else {
    //         console.log("selecteddd", selected)
    //         setSelected({ ...selected, title: value });
    //     }
    // };
    const handleChange = (event) => {
        const {
            target: { name, value }
        } = event;

        if (name === 'courses') {
            // Get the last character of the value
            const lastCharacter = value[value.length - 1];

            // Create the object with the correct properties
            const obj = {
                name: lastCharacter.courseName,
                id: lastCharacter._id
            };

            // Check if the id already exists in the selected.courses array
            const index = selected.courses.findIndex((x) => x.id === obj.id);

            if (index === -1) {
                // If not, push the new object
                setSelected((prevState) => ({
                    ...prevState,
                    courses: [...prevState.courses, obj]
                }));
            } else {
                console.log('Course already chosen');
                // toast.success('Course already chosen');
            }
        } else if (name === 'category') {
            setSelected((prevState) => ({
                ...prevState,
                courses: []
            }));
            setSelected((prevState) => ({
                ...prevState,
                category: value
            }));
            getStudentByCategory(value).then((data) => setUsers(data));
        } else if (name === 'title') {
            setSelected((prevState) => ({
                ...prevState,
                title: value
            }));
        } else {
            setSelected((prevState) => ({
                ...prevState,
                title: value
            }));
        }
    };

    console.log('selected', selected);

    const handleDelete = (e, id) => {
        // e.preventDefault();
        let newArr;
        console.log('id in handledelete', id);
        selected?.courses.map((item, index) => {
            if (item.id === id) {
                console.log('Removing index...', index);
                newArr = selected.courses.splice(index, 1);
                console.log('newarr in handledelete', newArr);
            }
        });
        setSelected({ ...selected }, selected);
        console.log('selected', selected);
    };

    return (
        <Box sx={{ minHeight: '79.1vh' }} px={11} mt={2}>
            <Box m={1}>
                <BreadCrumb breadItems={CreatelearningPathBreadcrumb} />
            </Box>

            <Box sx={{ maxWidth: 'md' }} display="flex">
                <Box m={1} width="100%">
                    <TextField
                        fullWidth
                        name="title"
                        label="Title"
                        value={selected.title.replace(/^\s+/, '')}
                        onChange={handleChange}
                    />
                </Box>
                <Box width="100%">
                    <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-multiple-name-label">
                            Select Categories
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            //   multiple
                            name="category"
                            value={selected.category}
                            onChange={handleChange}
                            input={<OutlinedInput label="Select Categories" />}
                            MenuProps={MenuProps}
                        >
                            {category.map((name) => (
                                <MenuItem
                                    key={name.categoryName}
                                    value={name.categoryName}
                                >
                                    {name.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <FormControl sx={{ m: 1, maxWidth: 'md', width: '100%' }}>
                <InputLabel id="demo-multiple-checkbox-label">
                    Select Courses
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="courses"
                    value={selected.courses}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Courses" />}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value.name}
                                    deleteIcon={
                                        <CancelIcon
                                            onMouseDown={(event) =>
                                                event.stopPropagation()
                                            }
                                        />
                                    }
                                    onDelete={(e) => handleDelete(e, value.id)}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {filteredCourses?.map((course) => (
                        <MenuItem
                            key={course._id}
                            id={course._id}
                            value={course}
                        >
                            {course?.courseName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {users.length !== 0 && value && (
                <div>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            hideFooter={true}
                            rows={rowData}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5
                                    }
                                }
                            }}
                            selectionModel={selectedIds}
                            onSelectionModelChange={(newSelection) => {
                                setSelectedIds(newSelection);
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        my={2}
                        flexDirection="row"
                        gap={2}
                    >
                        {/* <Button
                            variant="outlined"
                            color="secondary"
                            // onClick={(e) =>{ 
                            //     // setSelectAll(!selectAll)
                            // }}
                            onClick={() => {
                                // Check if users.length is not 0 and the value is true
                                if (users.length !== 0 && value) {
                                    // Create an array containing all row IDs
                                    const allRowIds = rowData.map((row) => row.id);
                        
                                    // Set the selectedIds state with all row IDs
                                    setSelectedIds(allRowIds);
                                }
                            }}
                            >
                            Select all users
                        </Button> */}
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                if (users.length !== 0) {
                                    // Check if any of the selectedIds are in allRowIds, and if so, remove them
                                    const allRowIds = rowData.map(
                                        (row) => row.id
                                    );
                                    const newSelectedIds = selectedIds.some(
                                        (id) => allRowIds.includes(id)
                                    )
                                        ? [] // If some selectedIds are in allRowIds, clear the selection
                                        : allRowIds; // Otherwise, select all users

                                    setSelectedIds(newSelectedIds);
                                }
                            }}
                        >
                            {selectedIds.length === 0
                                ? 'Select all users'
                                : 'Deselect all users'}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={createLearningPath}
                        >
                            Create
                        </Button>
                    </Box>
                </div>
            )}

            {users.length === 0 && (
                <Box
                    display="flex"
                    alignItems="center"
                    width="md"
                    justifyContent="center"
                >
                    <Typography color="text.primary" fontWeight={800}>
                        No User found
                    </Typography>
                </Box>
            )}
            <ToastContainer />
        </Box>
    );
}
