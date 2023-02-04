import { Typography, Paper, styled, Box } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "100%",
  color: theme.palette.text.secondary,
}));
export const H1 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
}));
export const H2 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
}));
export const H3 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
}));
export const H4 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: "center",
}));
export const H5 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
}));
export const H6 = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
}));
export const ListTitleBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: theme.palette.grey[100],
  borderRadius: 10,
}));
