import {Box, CircularProgress, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from "@mui/icons-material/Logout";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {logoutAsync} from "../../app/storeSlices/userCredentialsSlice.ts";
import { mapRoleTypEnumToString } from "../../app/services/api.ts";
import { Link } from "react-router-dom";

function HeaderAccountMenu() {
    const dispatch = useAppDispatch();
    const { isLoading, user} = useAppSelector((root) => root.user);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleOpenAccountMenu(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    }

    function handleCloseAccountMenu(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        setAnchorEl(null);
    }

    async function handleLogout() {
        await dispatch(logoutAsync())
    }

    return (
        <>
            <Tooltip title="Open menu" arrow={true}>
                <IconButton
                    id="account-button"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    color="inherit"
                    size="large"
                    sx={{p: 0}}
                    onClick={(e) => handleOpenAccountMenu(e)}>
                    <AccountCircleOutlinedIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseAccountMenu}
            >
                {(user && !isLoading) &&
                    <Box sx={{
                        px: 2,
                        pb: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                        marginBottom: 1
                    }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                lineHeight: 1.2,
                                textTransform: 'capitalize'
                            }}
                        >
                            {user.username}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.8rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            Role: {mapRoleTypEnumToString(user.role)}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.8rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {user.email}
                        </Typography>
                    </Box> }

                <MenuItem
                    component={Link}
                    to="/account-settings"
                    sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                            backgroundColor: 'action.hover'
                        }
                    }}
                >
                    <ListItemIcon>
                        <ManageAccountsIcon sx={{
                            fontSize: {
                                xs: '1rem',
                                sm: '1.2rem',
                                md: '1.4rem',
                            },
                        }}/>
                    </ListItemIcon>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.primary',
                            fontSize: {
                                md: '1rem',
                            },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        Settings
                    </Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={{
                            fontSize: {
                                xs: '1rem',
                                sm: '1.2rem',
                                md: '1.4rem',
                            },
                        }}/>
                    </ListItemIcon>
                    {isLoading ?
                        <CircularProgress size={15} color="secondary"/>
                        :
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.primary',
                                fontSize: {
                                    md: '1rem',
                                },
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            Sign-out
                        </Typography>}
                </MenuItem>
            </Menu>
        </>
    )
}

export default HeaderAccountMenu;