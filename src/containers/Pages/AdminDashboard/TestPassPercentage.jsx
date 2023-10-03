import { Stack, Typography } from "@mui/material";



const TestPassPercentage = () => {
  return (
    <>
      <Stack sx={{flexDirection: "row", justifyContent: "space-between", p: 2, color: "white"}}>
        <Typography>Test Pass Percentage</Typography>
        <Typography>74%</Typography>
      </Stack>
    </>
  );
};

export default TestPassPercentage;
