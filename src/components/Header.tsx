import { LibraryMusic } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { LOGIN_URL } from "../auth";



interface HeaderProps {
    loggedIn: boolean
    onLogout: () => void
}
export default function Header(props: HeaderProps) {
    return <AppBar position="static" sx={{ margin: 0, padding: 2, paddingLeft: 6 }}>
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ marginRight: 2 }}
                href="/"
            >
                <LibraryMusic />
            </IconButton>
            <Typography
                variant="h4" component="a" href="/"
                sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
                Spots
            </Typography>
            {props.loggedIn ?
                <Button color="inherit" onClick={props.onLogout}>Logout</Button>
                :
                <Button color="inherit" href={LOGIN_URL}>Login</Button>
            }
        </Toolbar>

    </AppBar>
}