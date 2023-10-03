import { Typography, useTheme, Box, Stack } from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      color: "primary.light",
      cursor: "default",
    },
  })
);

const StudentsDetailsCard = ({ item }) => {
  const theme = useTheme();

  const classes = useStyles();
  return (

    <Stack
      flexDirection="row"
      justifyContent={"space-between"}
      alignItems="center"
      width='100%'
      sx={{
        borderRadius: "10px",
        borderLeft: "14px solid",
        borderLeftColor:"primary.light",
        padding: "20px",
        boxShadow: 10,
        [theme.breakpoints.down('md')]: {
          marginBottom: "20px"
        }
      }}>
      <Box>

        <Typography>{item.number}</Typography>
        <Typography variant="body1" color="text.primary">{item.courseStatus}</Typography>
      </Box>
      <Box>
        {item.component}
      </Box>
    </Stack>
  );
};

StudentsDetailsCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.object, PropTypes.array, PropTypes.bool, PropTypes.number]
  )).isRequired,
};

export default StudentsDetailsCard;
