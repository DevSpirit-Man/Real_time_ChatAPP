import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import './css/chatpage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleLogout(){
        props.logout()
    }
    function handleroomswitch(){
        props.hadleswitch()
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 38, height: 37, marginLeft: '-19px' }} src={props.uimg}></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleroomswitch()}>
                    <ArrowBackIcon color="disabled" sx={{marginLeft:'-2px'}}>
                        <Logout fontSize="small" />
                    </ArrowBackIcon >
                    Switch Room
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon >
                    Logout
                </MenuItem>
            </Menu>
            <div className="roomanduser">
            <div className="chat__header__name">
                <h5 style={{ marginLeft: '19px' }}>{props.name}</h5>
            </div>
            <div className="roomidtext" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'fit-content',marginRight:'39px',marginLeft:'15px',marginTop:'6px'}}>
                <h6 style={{fontSize:'12.5px',color:'#676565'}}> Room id: </h6>
                <p style={{fontSize:'12.1px',marginLeft:'4px',userSelect:'all',color:'#676565'}}>{props.roomid}</p>
            </div>
            </div>
        </React.Fragment>
    );
}
