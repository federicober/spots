import { LibraryMusic } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  onLogout: () => void;
}
export default function Header(props: HeaderProps) {
  return (
    <AppBar position="static" sx={{ margin: 0, padding: 2, paddingLeft: 6 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ marginRight: 2 }}
          href={import.meta.env.BASE_URL}
        >
          <LibraryMusic />
        </IconButton>
        <Typography
          variant="h4"
          component="a"
          href="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Spots
        </Typography>
        <Button color="inherit" onClick={props.onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
