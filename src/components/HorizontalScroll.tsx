import { Paper, Typography } from "@mui/material";
import React from "react";

interface HorizontalScrollProps {
  title: string;
}

export default function HorizontalScroll({
  children,
  title,
}: React.PropsWithChildren<HorizontalScrollProps>) {
  return (
    <>
      <Typography variant="h3" sx={{ marginTop: 2, marginLeft: 2 }}>
        {title}
      </Typography>
      <Paper
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          padding: 2,
        }}
      >
        {children}
      </Paper>
    </>
  );
}
