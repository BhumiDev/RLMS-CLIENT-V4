import * as React from "react";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import { Box } from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import { LinearProgress, TextField, Typography, useTheme } from "@mui/material";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { mailReminder, smsReminder, whatsappReminder } from "../../../API/Course";

function preventDefault(event) {
    event.preventDefault();
}

export default function StudentsScoreCard({ data, course }) {

    const tableRef = React.useRef();

    console.log("in student score card of data", data)
    console.log("in student scoreCard course", course)

    const [alignment, setAlignment] = React.useState("");
    const [totalMarks, setTotalMarks] = React.useState(0);
    const [message, setMessage] = useState("");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const theme = useTheme();

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Users table",
        sheet: "Users"
    });

    useEffect(() => {
        getTotallecturesofCourse(course)
    }, [])

    const getTotallecturesofCourse = (course) => {
        let marks = 0;

        for (let section of course?.sections) {
            console.log("section one by one", section)
            marks += section.question.length;
        }

        console.log("total questions =", marks);
        setTotalMarks(marks * 10);

    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const sendReminders = async () => {
        const smsRes = await smsReminder(message);
        console.log("respnse pf sms", smsRes);

        const whatsappRes = await whatsappReminder(message);
        console.log("respnse pf whatsappsms", whatsappRes);

        const mailRes = await mailReminder(message, data[0]._doc);
        console.log("response of mailrES", mailRes);

        setMessage("");
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Box item display='flex' justifyContent='flex-end' width="100%">
                <Button
                    size="small"
                    onClick={onDownload}
                    m="10px"
                    color='secondary'
                    style={{ textTransform: 'none' }}
                    startIcon={<DownloadIcon />}
                >
                    EXPORT TO EXCEL
                </Button>
            </Box>


            <Table ref={tableRef}
                size="small"
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "2px solid transparent",
                    },
                    padding: "10px",
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Marks Obtained out of {totalMarks}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data && data.map((row) => (
                        <TableRow key={row?._doc?.id}>
                            <TableCell>
                                <Link to={{
                                    pathname: `/dashboard/courses/view-student/${row?._doc?.userId}`
                                }}
                                    state={{
                                        course: course,
                                        id: row?._doc?._id,
                                        marks: row?.marks
                                    }}
                                >
                                    {row?._doc?.name}
                                </Link>
                            </TableCell>
                            <TableCell>{row?._doc?.userId}</TableCell>
                            <TableCell>{row?._doc?.email}</TableCell>
                            <TableCell>{row?.marks}</TableCell>
                            <TableCell>
                                <Button variant="text" color="secondary" onClick={handleClickOpen}>Send Reminder</Button>
                            </TableCell>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">
                                    Send Reminder
                                </DialogTitle>
                                <DialogContent >
                                    <Box mt={2} width="100%">
                                        <TextField
                                            name="message"
                                            label="Message"
                                            fullWidth
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" color="secondary" onClick={sendReminders}>
                                        Send
                                    </Button>
                                    <Button onClick={handleClose} sx={{ color: 'error.main' }}>
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </React.Fragment >
    );
}
