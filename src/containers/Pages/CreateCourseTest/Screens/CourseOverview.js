import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Button,
    Card,
    CardContent,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Container,
    InputAdornment,
    useTheme,
    Chip
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Add } from '@mui/icons-material';
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
import { ToastContainer, toast } from 'react-toastify';
import {
    getAllCategories,
    getSubCategoriesById
} from '../../../../utils/StaticData/Course/index';
import breadcrumb from '../../../../utils/StaticData/Breadcrumbs/createCourse';
import BreadCrumb from '../../../../common/components/Breadcrumb';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CourseOverView = ({ setOverview, setCourseId, toggleUpdate }) => {
    const { courseId } = useParams();
    const [thumbnail, setThumbnail] = useState();
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategory, setAllSubCategory] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState([]);
    const [selectedSubCat, setSelectedSubCat] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    // ------------- Formik handle submit -----------------
    console.log('Course Id in params', courseId);
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            const Id = courseId
                ? await editCourse(values, courseId)
                : await createCourse(
                      values,
                      setOverview,
                      setCourseId,
                      toggleUpdate,
                      navigate
                  );
            console.log('redux', Id);

            if (!courseId) {
                await uploadThumbnail(thumbnail, navigate, Id);
            }
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
        getAllCategories().then((allFetchedCats) => {
            setAllCategories(allFetchedCats);
            getIndividualCourse(courseId).then((response) => {
                setSelectedMajor(response.majorCategory);
                const requiredMajorCat = allFetchedCats.filter(
                    (category) =>
                        category.categoryName === response.majorCategory
                );
                requiredMajorCat.length > 0 &&
                    getSubCategoriesById(requiredMajorCat[0]?._id).then(
                        (response) => setAllSubCategory(response)
                    );

                setSelectedSubCat(response.subCategory);
                setFieldValues(
                    {
                        courseCode: response.courseCode,
                        courseName: response.courseName,
                        description: response.description,
                        majorCategory: response.majorCategory,
                        subCategory: response.subCategory,
                        thumbnail: response.thumbnail
                    },
                    false
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
            <Box mb={5} mx={{ xs: 4, md: 9 }}>
                <BreadCrumb breadItems={breadcrumb} />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                px={{ xs: 2, sm: 2, md: 0 }}
            >
                <Card>
                    <CardContent>
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
                                    <FormControl fullWidth sx={{ mt: 3 }}>
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
                                        disabled
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
                                                            sx={{ mr: 1 }}
                                                        />
                                                    )}
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <div className="upload-btn-wrapper">
                                                        <Button
                                                            variant="contained"
                                                            // color="secondary"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .secondary
                                                                        .light,
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .light
                                                            }}
                                                        >
                                                            <Add />
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
                    </CardContent>
                </Card>
                <ToastContainer />
            </Box>
        </>
    );
};

export default CourseOverView;
