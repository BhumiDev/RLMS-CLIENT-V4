import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../../common/components/Breadcrumb';
import { QuestionCategoryBreadcrumb } from '../../../utils/StaticData/Breadcrumbs/Course';
import { getAssessmentQuestions } from '../../../API/Course';
import jwtDecode from 'jwt-decode';
import AddIcon from '@mui/icons-material/Add';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const QuestionBank = () => {
    const token = localStorage.getItem('token');
    const user = token && jwtDecode(token);

    console.log('user', user);

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const getQuestions = async () => {
        const res = await getAssessmentQuestions();
        console.log('res of question', res);
        setData(res);
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <>
            <Box px={{ md: 12, sm: 3, xs: 3 }} minHeight="74.1vh" mb={5}>
                <Box my={3}>
                    <BreadCrumb breadItems={QuestionCategoryBreadcrumb} />
                </Box>
                <Grid container>
                    <Grid
                        item
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                    >
                        <Typography variant="h3">
                            Questions of {user?.majorCategory}
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() =>
                                navigate(
                                    '/dashboard/courses/add-assessment-question'
                                )
                            }
                        >
                            Add Question
                        </Button>
                    </Grid>

                    <Grid item>
                        {data?.map((item, index) => {
                            return (
                                <Box mt={5}>
                                    {item?.questions.map((question, index) => {
                                        return (
                                            <>
                                                <Box ml={5} mt={3} width="100%">
                                                    <Box
                                                        width="100%"
                                                        display="flex"
                                                        gap={1}
                                                        alignItems="center"
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            color="secondary.onDarkContrastText"
                                                            sx={{
                                                                // display: 'flex',
                                                                // gap: 1,
                                                                // alignItems:
                                                                //     'center',
                                                                fontWeight: 600,
                                                                textAlign:
                                                                    'justify',
                                                                textJustify:
                                                                    'inter-word',
                                                                width: '5%'
                                                            }}
                                                        >
                                                            Ques {index + 1} :
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: 'text.primary',
                                                                width: '95%'
                                                            }}
                                                        >
                                                            {question?.question}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        display="flex"
                                                        flexDirection="column"
                                                        ml={12}
                                                    >
                                                        <FormControlLabel
                                                            sx={{
                                                                color: 'secondary.onDarkContrastText'
                                                            }}
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        question.answer ==
                                                                        'option1'
                                                                    }
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label={
                                                                question
                                                                    ?.options
                                                                    .option1
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            sx={{
                                                                color: 'secondary.onDarkContrastText'
                                                            }}
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        question.answer ==
                                                                        'option2'
                                                                    }
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label={
                                                                question
                                                                    ?.options
                                                                    .option2
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            sx={{
                                                                color: 'secondary.onDarkContrastText'
                                                            }}
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        question.answer ==
                                                                        'option3'
                                                                    }
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label={
                                                                question
                                                                    ?.options
                                                                    .option3
                                                            }
                                                        />
                                                        <FormControlLabel
                                                            sx={{
                                                                color: 'secondary.onDarkContrastText'
                                                            }}
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        question.answer ==
                                                                        'option4'
                                                                    }
                                                                    color="secondary"
                                                                />
                                                            }
                                                            label={
                                                                question
                                                                    ?.options
                                                                    .option4
                                                            }
                                                        />
                                                    </Box>
                                                </Box>
                                            </>
                                        );
                                    })}
                                </Box>
                            );
                        })}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
