import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Button,
    // Card,
    // CardContent,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Container,
    InputAdornment,
    useTheme,
    Chip,
    CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Field, FormikProvider, useFormik } from 'formik';
import {
    initialValues,
    validationSchema
} from '../Formik/courseOverviewformikData';
import {
    createCourse,
    editCourse,
    uploadThumbnail,
    getIndividualCourse
} from '../../../../API/Course';
// import { setCurrentCourseAction } from './action';
import {
    getAllCategories,
    getSubCategoriesById
} from '../../../../utils/StaticData/Course/index';
import breadcrumb from '../../../../utils/StaticData/Breadcrumbs/createCourse';
import BreadCrumb from '../../../../common/components/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    setCurrentScreenLoading,
    setCurrentScreenName
} from '../Slices/currentScreen';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../store';

const CourseOverView = ({ setOverview, setCourseId, toggleUpdate }) => {
    const loader = useSelector((state) => state?.currentScreen?.isLoading);
    console.log('loader', loader);
    const { courseId } = useParams();
    const [thumbnail, setThumbnail] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategory, setAllSubCategory] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState([]);
    const [selectedSubCat, setSelectedSubCat] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    // const editManual = useSelector((state) => state?.currentScreen?.editable);
    const navigate = useNavigate();
    const theme = useTheme();

    // ------------- Formik handle submit -----------------
    console.log('Course Id in params', courseId);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            const Id = courseId
                ? (await editCourse(values, courseId),
                  thumbnail && uploadThumbnail(thumbnail, dispatch, courseId))
                : await createCourse(
                      values,
                      setCourseId,
                      toggleUpdate,
                      navigate,
                      thumbnail
                  );
            dispatch;

            console.log('redux', Id);

            //     if (!courseId) {
            //         await uploadThumbnail(thumbnail, dispatch, Id);
            //         toast.error('cant create course');
            // }
        }
    });

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false
        }
    };

    // const handleChange = (e) => {
    // **************  End of Formik handle submit ***************

    // -------------Handlers for formik form----------------------

    const handleCategories = (e) => {
        formik.handleChange(e);
        if (e.target.name === 'subCategory') {
            setSelectedSubCat(e.target.value);
        } else if (e.target.name === 'majorCategory') {
            setSelectedMajor(e.target.value);
            const filtreredSub = allCategories.filter(
                (cat) => cat.categoryName === e.target.value
            );
            console.log('Filtered category', filtreredSub[0]);
            setCategoryId(filtreredSub[0]);

            getSubCategoriesById(filtreredSub[0]._id).then((response) =>
                setAllSubCategory(response)
            );
        }
    };

    // *************** End of Handlers for formik form ****************

    const uploadFile = (e) => {
        const img = e.target.files[0];
        console.log('img', img);
        let data = img.type;
        console.log('img type', data);
        let result = data.substring(0, 5);
        console.log('result', result);
        if (result === 'image') {
            setThumbnail(img);
            return;
        } else {
            toast.error('Please upload image');
            return;
        }
    };
    const removeThumb = () => {
        setThumbnail('');
    };
    const setupForEditCourse = (setFieldValues) => {
        store.dispatch(setCurrentScreenLoading(true));
        getAllCategories().then((allFetchedCats) => {
            setAllCategories(allFetchedCats);
            getIndividualCourse(courseId).then((response) => {
                setSelectedMajor(response?.majorCategory);
                const requiredMajorCat = allFetchedCats.filter(
                    (category) =>
                        category.categoryName === response?.majorCategory
                );
                requiredMajorCat.length > 0 &&
                    getSubCategoriesById(requiredMajorCat[0]?._id).then(
                        (response) => setAllSubCategory(response)
                    );

                setSelectedSubCat(response.subCategory);
                setFieldValues(
                    {
                        courseCode: response?.courseCode,
                        courseName: response?.courseName,
                        description: response?.description,
                        majorCategory: response?.majorCategory,
                        subCategory: response?.subCategory,
                        thumbnail: response?.thumbnail
                    },
                    false,
                    store.dispatch(setCurrentScreenLoading(false))
                );
                // setCurrentCourse(response);
            });
        });
    };

    const fetchAllcategories = () => {
        getAllCategories().then((allFetchedCats) => {
            setAllCategories(allFetchedCats);
        });
    };
    useEffect(
        () =>
            courseId
                ? setupForEditCourse(formik.setValues)
                : fetchAllcategories(),
        [courseId]
    );

    return (
        <>
            {loader ? (
                <Box
                    textAlign="center"
                    height="60vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box mb={5} mx={{ sm: 2, xs: 2 }}>
                        <BreadCrumb breadItems={breadcrumb} />
                    </Box>
                    <Box mx={{ sm: 2, xs: 2 }}>
                        <FormikProvider value={formik}>
                            <form
                                onSubmit={formik.handleSubmit}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px'
                                }}
                            >
                                {/* <Grid
                                            container
                                            flexDirection="column"
                                            spacing={4}
                                            maxWidth="lg"
                                        > */}
                                <Grid item>
                                    <TextField
                                        label="Course Code"
                                        fullWidth
                                        name="courseCode"
                                        variant="outlined"
                                        value={formik.values.courseCode}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.courseCode &&
                                            Boolean(formik.errors.courseCode)
                                        }
                                        helperText={
                                            formik.touched.courseCode &&
                                            formik.errors.courseCode
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Course Name"
                                        fullWidth
                                        name="courseName"
                                        variant="outlined"
                                        inputProps={{ maxLength: 50 }}
                                        value={formik.values.courseName}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.courseName &&
                                            Boolean(formik.errors.courseName)
                                        }
                                        helperText={
                                            formik.touched.courseName &&
                                            formik.errors.courseName
                                        }
                                    />
                                </Grid>
                                <Grid item>
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
                                            onChange={handleCategories}
                                            error={
                                                formik.touched.majorCategory &&
                                                Boolean(
                                                    formik.errors.majorCategory
                                                )
                                            }
                                            helperText={
                                                formik.touched.majorCategory &&
                                                formik.errors.majorCategory
                                            }
                                        >
                                            {allCategories?.map(
                                                (obj, index) => (
                                                    <MenuItem
                                                        value={obj.categoryName}
                                                        key={index}
                                                        subcategories={
                                                            obj.subCategories
                                                        }
                                                    >
                                                        {obj.categoryName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel id="subCategory">
                                            Sub Category
                                        </InputLabel>
                                        <Select
                                            labelId="subCategory"
                                            id="subCategory"
                                            name="subCategory"
                                            disabled={
                                                selectedMajor.length === 0
                                                    ? true
                                                    : false
                                            }
                                            value={selectedSubCat}
                                            label="Sub Category"
                                            onChange={handleCategories}
                                        >
                                            {allSubCategory?.map(
                                                (obj, majorId) => (
                                                    <MenuItem
                                                        key={majorId}
                                                        value={obj.categoryName}
                                                        id={majorId}
                                                    >
                                                        {obj.categoryName}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    {' '}
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        multiline
                                        error={
                                            formik.touched.description &&
                                            Boolean(formik.errors.description)
                                        }
                                        helperText={
                                            formik.touched.description &&
                                            formik.errors.description
                                        }
                                        // disabled
                                        sx={{
                                            '& .MuiInputBase-root.Mui-disabled':
                                                {
                                                    '& > fieldset': {
                                                        borderColor: 'black'
                                                    }
                                                }
                                        }}
                                        InputProps={{
                                            style: {
                                                display: 'block',
                                                paddingBottom: 0
                                            },
                                            startAdornment: (
                                                <Field name="description">
                                                    {({ field }) => (
                                                        <ReactQuill
                                                            placeholder="Write Description..."
                                                            theme="snow"
                                                            name="description"
                                                            value={field.value}
                                                            onChange={field.onChange(
                                                                field.name
                                                            )}
                                                            modules={modules}
                                                        />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        placeholder={formik.values.thumbnail}
                                        disabled
                                        fullWidth
                                        name="pdf"
                                        variant="outlined"
                                        style={{
                                            marginBottom: '20px'
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {' '}
                                                    {thumbnail && (
                                                        <Chip
                                                            label={
                                                                thumbnail.name
                                                            }
                                                            onDelete={
                                                                removeThumb
                                                            }
                                                            sx={{
                                                                mr: 1
                                                            }}
                                                        />
                                                    )}
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div className="upload-btn-wrapper">
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            size="small"
                                                            sx={{
                                                                display: 'flex',
                                                                gap: '4px'
                                                            }}
                                                        >
                                                            <Add
                                                                sx={{
                                                                    color: '#fff !important',
                                                                    fontSize:
                                                                        'large'
                                                                }}
                                                            />
                                                            Upload
                                                        </Button>
                                                        <input
                                                            type="file"
                                                            name="myfile"
                                                            onChange={
                                                                uploadFile
                                                            }
                                                        />
                                                    </div>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                                {/* </Grid> */}
                                <Box textAlign="center" mt={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={formik.handleSubmit}
                                    >
                                        {courseId ? 'Edit' : 'Create'}
                                    </Button>
                                </Box>
                            </form>
                        </FormikProvider>
                        <ToastContainer />
                    </Box>
                </>
            )}
        </>
    );
};

export default CourseOverView;
