import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    useTheme,
    Divider,
    CircularProgress,
    Typography,
    Grid,
    Tab,
    Tabs,
    IconButton,
    AppBar,
    Toolbar,
    Tooltip,
    Avatar,
    Menu
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// import { useSelector } from 'react-redux';
import { ViewModule, ViewList, FilterList } from '@mui/icons-material';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import jwtDecode from 'jwt-decode';
import {
    myCourses,
    myCoursesofInstructor,
    myCoursesOfStudent
} from '../../../API/Course';
// import { store } from '../../../store';
// import ToggleTheme from '../../../utils/ToggleTheme';
// import { Field, FormikProvider, useFormik } from 'formik';
// import {
//     initialValues,
//     validationSchema
// } from '../../../../src/containers/Pages/CreateCourse/Formik/courseFilterformikData';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GridView from '../../../common/components/GridView/index';
import ListView from '../../../common/components/ListView/index';
import PendingRequest from '../pendingRequest';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
    getAllCategories,
    getSubCategoriesById,
    getCourseByMajorCategory,
    getCourseBySubCategory
} from '../../../utils/StaticData/Course/index';

import './index.css';
import { border, Container } from '@mui/system';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { allCoursesBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: '20rem',
            maxWidth: '20rem'
            // overflow:"scroll",
        }
    }
};

const MyCourses = (setCourseId) => {
    const { courseId } = useParams();
    const [dataView, setView] = useState('gridView');
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [tempData, setTempData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [value, setValue] = useState('1');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const handleView = (view) => setView(view);
    const navigate = useNavigate();
    const theme = useTheme();
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);
    const [fake, setFake] = useState(false);
    const [allCategories, setAllCategories] = useState('');
    const [allSubCategory, setAllSubCategory] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedSubCat, setSelectedSubCat] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleCategories = async (e) => {
    //     // handleChange(e);
    //     // if (e.target.name === 'subCategory') {
    //     //     setSelectedSubCat(e.target.value);
    //     // } else if (e.target.name === 'majorCategory') {
    //     setSelectedMajor(e.target.value);
    //     const res = await getCourseByMajorCategory(e.target.value);

    //     console.log('res of majorcategory', res);
    //     console.log("prev data1", res)
    //     console.log("prev data", data)
    //     setData(res);
    //     // console.log("prev data1", data)
    //     setAnchorElUser(null);
    //     //     const filtreredSub = allCategories.filter(
    //         //         (cat) => cat.categoryName === e.target.value
    //         //     );
    //         //     console.log('Filtered category', filtreredSub[0]);
    //         //     // setCategoryId(filtreredSub[0]);

    //         //     // getCourseBySubCategory(filtreredSub[0]._id).then((response) =>
    //         //     //     setAllSubCategory(response)
    //         //     // );
    //         // }
    //     };
    console.log('prev1 data2', data);
    const handleCategories = async (e) => {
        setSelectedMajor(e.target.value);

        // Assuming getCourseByMajorCategory returns an array of objects
        const res = await getCourseByMajorCategory(e.target.value);
        console.log('tempData', tempData);
        setData(tempData);

        console.log('res of majorcategory', res);
        console.log('sprev data 1', res);
        console.log('prev1 dataq', data);
        // const tempData = tempData;

        // Compare '_id' field and create an array with objects having the same '_id' field value
        const newData = tempData
            ?.map((itemObj) => {
                const matchingResObj = res?.find(
                    (item) => item?._id === itemObj?._id
                );
                console.log('prev data2', matchingResObj);
                return matchingResObj;
            })
            .filter(Boolean); // Use filter(Boolean) to remove undefined values

        console.log('sprev data 2', newData);

        // Set newData to setData
        // setTempData(data);
        setData(newData);
        setAnchorElUser(null);
    };

    // const filterAllCategories = () => {
    // console.log("clicked");
    // }

    const fetchMajorCategories = () => {
        getAllCategories().then((res) => {
            setAllCategories(res);
        });
    };
    // const fetchSubCategories = () => {
    //     getCourseBySubCategory().then(() => {
    //         setAllSubCategory();
    //     });
    // };
    useEffect(() => {
        fetchMajorCategories();
    }, []);

    // useEffect(() => { fetchSubCategories() },[]);

    useEffect(() => {
        // setIsloading(true);
        console.log('page in mycourse', page);
        user.role === 'student'
            ? myCourses(setData, page, setCount, setIsloading, setTempData)
            : myCoursesofInstructor(
                  setData,
                  page,
                  setCount,
                  setIsloading,
                  setTempData
              );
    }, [user.role]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {user?.role === 'instructor' ? (
                <Box display={{ md: 'none' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleTabChange}
                                textColor="primary.light"
                                TabIndicatorProps={{
                                    sx: { backgroundColor: 'secondary.main' }
                                }}
                            >
                                <Tab label="Students" value="1" />
                                <Tab label="Courses" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box sx={{ minHeight: 'calc(100vh - 201px)' }}>
                                <PendingRequest fake={fake} fun={setFake} />
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box
                                pb={{ sm: 2, xs: 2 }}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: 4,
                                    mb: 3
                                }}
                            >
                                <Box>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="view"
                                        style={{
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onClick={() =>
                                            navigate(
                                                '/dashboard/courses/recently-deleted'
                                            )
                                        }
                                    >
                                        Recently Deleted <DeleteIcon />
                                    </Button>
                                </Box>
                                <Box>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            navigate(
                                                '/dashboard/courses/create-course'
                                            )
                                        }
                                    >
                                        Create Course
                                    </Button>
                                </Box>
                            </Box>
                            <GridView
                                data={data}
                                myCourse
                                page={page}
                                setPage={setPage}
                                count={count}
                                setCount={setCount}
                                myCourses={myCourses}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            ) : (
                <Box
                    px={{ md: 12, sm: 3, xs: 3 }}
                    display={{ md: 'none' }}
                    my={4}
                >
                    {user?.role === 'student' && (
                        // <Button
                        //     disableRipple
                        //     size="small"
                        //     startIcon={<KeyboardBackspaceIcon />}
                        //     sx={{
                        //         backgroundColor: 'transparent',
                        //         border: 'none',
                        //         cursor: 'pointer',
                        //         color: 'primary.light',
                        //         '&:hover': {
                        //             background: 'none'
                        //         },
                        //         mt: 2
                        //     }}
                        //     onClick={() => navigate(-1)}
                        // >
                        //     All Courses
                        // </Button>
                        <BreadCrumb breadItems={allCoursesBreadcrumb} />
                    )}
                    <GridView
                        data={data}
                        page={page}
                        setPage={setPage}
                        count={count}
                        setCount={setCount}
                        myCourses={myCourses}
                        myCourse
                    />
                </Box>
            )}

            <Box display={{ sm: 'none', xs: 'none', md: 'block', lg: 'block' }}>
                {user?.role === 'student' && (
                    // <Button
                    //     disableRipple
                    //     size="small"
                    //     startIcon={<KeyboardBackspaceIcon />}
                    //     sx={{
                    //         backgroundColor: 'transparent',
                    //         border: 'none',
                    //         cursor: 'pointer',
                    //         color: 'primary.light',
                    //         '&:hover': {
                    //             background: 'none'
                    //         },
                    //         mt: 2,
                    //         px: { md: 12 }
                    //     }}
                    //     onClick={() => navigate(-1)}
                    // >
                    //     All Courses
                    // </Button>
                    <Box px={{ md: 12 }} my={3}>
                        <BreadCrumb breadItems={allCoursesBreadcrumb} />
                    </Box>
                )}
                <Grid
                    container
                    justifyContent={'space-between'}
                    sx={{
                        px: { md: 10 },
                        // pl:{ md: 5 },
                        // pt: 1,
                        width: '97%',
                        margin: 'auto',
                        // px: 10,
                        minHeight: 'calc(100vh - 188px)'
                    }}
                >
                    {user.role === 'instructor' && (
                        <Grid
                            item
                            md={2.5}
                            sm={12}
                            xs={12}
                            px={{ md: 0, sm: 3, xs: 3 }}
                        >
                            <PendingRequest fake={fake} fun={setFake} />
                        </Grid>
                    )}

                    <Grid
                        item
                        md={user.role === 'instructor' ? 9 : 12}
                        sm={user.role === 'instructor' ? 12 : 12}
                        pt={5}
                    >
                        <Box>
                            {user?.role === 'instructor' && (
                                <Box
                                    px={{ md: 0, sm: 2.5, xs: 2.5 }}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        [theme.breakpoints.down('md')]: {
                                            // flexDirection: 'column',
                                            gap: 4
                                            // justifyContent: 'center',
                                            // alignItems: 'center'
                                        }
                                    }}
                                >
                                    <Box>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="view"
                                            style={{
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 5
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    '/dashboard/courses/recently-deleted'
                                                )
                                            }
                                        >
                                            Recently Deleted{' '}
                                            <DeleteIcon
                                                style={{ fontSize: 'large' }}
                                            />
                                        </Button>
                                    </Box>
                                    <Box display="flex" gap={2}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                navigate(
                                                    '/dashboard/courses/question-bank'
                                                )
                                            }
                                        >
                                            Pre-Assessment
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                navigate(
                                                    '/dashboard/courses/create-course'
                                                )
                                            }
                                        >
                                            Create Course
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                            {/* <Divider
                            sx={{
                                [theme.breakpoints.up('sm')]: {
                                    display: 'none'
                                }
                            }}
                        /> */}

                            <Box
                                mt={{ xs: 1.5 }}
                                md={user?.role === 'student' && 12}
                            >
                                {/* {data?.length !== 0 && ( */}
                                <Box
                                    textAlign="end"
                                    mb={3}
                                    pr={{ md: 0, sm: 3 }}
                                >
                                    <Box
                                        mt={4}
                                        sx={{
                                            [theme.breakpoints.down('sm')]: {
                                                display: 'none'
                                            },
                                            Zindex: 200,
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        {/* <BasicExampleDataGrid /> */}
                                        {/* <Button onClick={filterAllCategories} color="secondary" variant='outlined'>
                                                All
                                            </Button> */}

                                        <Box mr={2}>
                                            {/* <FormControl> */}
                                            {/* <IconButton
                                                    onClick={handleOpenUserMenu}
                                                    sx={{ p: 0 }}
                                                >
                                                    <FilterList color="secondary" />{' '}
                                                </IconButton> */}

                                            {/* <Menu
                                                    sx={{ mt: '45px' }}
                                                    id="menu-appbar"
                                                    anchorEl={anchorElUser}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    open={Boolean(anchorElUser)}
                                                    onClose={
                                                        handleCloseUserMenu
                                                    }
                                                > */}
                                            <MenuItem
                                                sx={{
                                                    minWidth: 230,
                                                    maxWidth: 280,
                                                    top: 1
                                                }}
                                            >
                                                <FormControl fullWidth>
                                                    <InputLabel id="category-select-label">
                                                        Major Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="category-select-label"
                                                        id="demo-simple-select"
                                                        name="majorCategory"
                                                        value={selectedMajor}
                                                        label="Major Category"
                                                        sx={{
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center'
                                                        }}
                                                        onChange={
                                                            handleCategories
                                                        }
                                                        MenuProps={MenuProps}
                                                    >
                                                        {/* <MenuItem value="All">
                                                            All
                                                        </MenuItem>{' '} */}
                                                        {/* Add an "All" option */}
                                                        {allCategories &&
                                                            allCategories?.map(
                                                                (
                                                                    obj,
                                                                    index
                                                                ) => (
                                                                    <MenuItem
                                                                        value={
                                                                            obj?.categoryName
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        subcategories={
                                                                            obj?.subCategories
                                                                        }
                                                                    >
                                                                        {
                                                                            obj?.categoryName
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                    </Select>
                                                </FormControl>
                                            </MenuItem>
                                            {/* </Menu> */}
                                            {/* <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel id="subCategory">
                                            Sub Category
                                        </InputLabel>
                                        <Select
                                            labelId="subCategory"
                                            id="subCategory"
                                            name="subCategory"
                                            value={selectedSubCat}
                                            label="Sub Category"
                                            onChange={handleCategories}
                                        >
                                            {allSubCategory?.map(
                                                (obj) => (
                                                    <MenuItem
                                                        value={obj.categoryName}
                                                    >
                                                        {obj.categoryName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                            {/* </Select> */}
                                            {/* </FormControl> */}
                                        </Box>
                                        <ViewModule
                                            className="view-icon"
                                            sx={
                                                dataView === 'gridView'
                                                    ? {
                                                          color: 'secondary.main'
                                                      }
                                                    : {
                                                          color: 'primary.light'
                                                      }
                                            }
                                            onClick={() =>
                                                handleView('gridView')
                                            }
                                        />
                                        <ViewList
                                            className="view-icon listIcon"
                                            sx={
                                                dataView === 'listView'
                                                    ? {
                                                          color: 'secondary.main'
                                                      }
                                                    : {
                                                          color: 'primary.light'
                                                      }
                                            }
                                            onClick={() =>
                                                handleView('listView')
                                            }
                                        />
                                    </Box>
                                </Box>
                                {/* // )} */}
                                {dataView === 'gridView' ? (
                                    isLoading ? (
                                        <Box textAlign="center">
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <GridView
                                            data={data}
                                            page={page}
                                            setPage={setPage}
                                            count={count}
                                            setCount={setCount}
                                            myCourses={myCourses}
                                            myCourse
                                        />
                                    )
                                ) : (
                                    <ListView
                                        data={data}
                                        page={page}
                                        setPage={setPage}
                                        count={count}
                                        setCount={setCount}
                                        myCourses={myCourses}
                                        myCourse
                                    />
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default MyCourses;
