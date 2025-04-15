'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { indigo, pink } from '@mui/material/colors';
import styles from "./styles.modules.css"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pages = ['collection', 'admin']

export default function NavBar()
{
    const pathname = usePathname()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: indigo[300]}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LibraryBooksIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/collection"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bookie
                    </Typography>
        
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography sx={{ 
                                        textAlign: 'center', 
                                        textTransform: 'capitalize',
                                        fontWeight: pathname === `/${page}` ? 'bold' : 'normal',
                                        color: pathname === `/${page}` ? indigo[300]: '',                                    }}>
                                    <Link href={`/${page}`}>
                                        {page}
                                    </Link>
                                </Typography>
                            </MenuItem>
                            ))}
                        </Menu>
                        </Box>
                    <LibraryBooksIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bookie
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ 
                                my: 2, 
                                color: 'white', 
                                display: 'block', 
                                textTransform: 'capitalize',
                                fontWeight: pathname === `/${page}` ? 'bold' : 'normal',
                                color: pathname === `/${page}` ? pink[100] : 'white',
                            }}
                            >
                                <Link 
                                    className={ pathname === `/${page}` ? styles.active : ''}
                                    href={`/${page}`}
                                >
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}