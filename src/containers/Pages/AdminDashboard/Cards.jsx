import React from "react";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import Counter from "./Counter";

const cardsData = [
  {
    title: "120",
    description: "Avg course completion time",
  },
  {
    title: "160",
    description: "Avg course completion time",
  },
  {
    title: "180",
    description: "Avg course completion time",
  },
];

const Cards = () => {
  const theme = useTheme();

  return (
    <>
      {cardsData.map((el, i) => {
        return (
          <Card
            xs={12}
            sm={12}
            item
            key={i}
            sx={{
              boxShadow: 3,
              bgcolor: "info.main",
              borderRadius: 3,
              p: 1,
              [theme.breakpoints.up('lg')]: {
                width: '100%',
              }
            }}
          >
            <CardContent
            >
              <Typography
                gutterBottom
                variant="h4"
                align="center"
                color="#fff"
              >
                {/* {el.title} hr */}
                <Counter number={el.title} />
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="#fff"
              >
                {el.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Cards;
