import { Box } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import GridView from "../../../common/components/GridView";




export const Search = () => {
    let token = localStorage.getItem("token");
    let user = token && jwtDecode(token);
    console.log("user of search", user)
    const { state } = useLocation();
    return (
        <Box px={{ md: 12 }}>
            {user?.role === "instructor" ?
                <GridView searchData={true} data={state} myCourse /> :
                <GridView searchData={true} data={state} browseCourses />
            }
        </Box>
    )

}
