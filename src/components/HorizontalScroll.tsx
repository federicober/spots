import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface HorizontalScrollProps {
    children: ReactNode
    title: string
}

export default function HorizontalScroll({ children, title }: HorizontalScrollProps) {
    return (
        <>
            <Typography
                variant="h3"
                sx={{ marginTop: 2, marginLeft: 2 }}
            >
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
                    padding: 2
                }}
                children={children}
            />
        </>
    )
}
