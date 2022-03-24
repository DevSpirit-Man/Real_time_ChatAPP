import * as React from 'react';
import TagIcon from '@mui/icons-material/Tag';
// import './css/Re'
export default function AccountMenu(props) {
    return (
        <div className='navbarmenu' >
            <TagIcon color="diabled" ></TagIcon>
            <h5 style={{marginLeft:'1.5px',color:'white'}}>{props.roomid}</h5>
        </div>
    );
}
