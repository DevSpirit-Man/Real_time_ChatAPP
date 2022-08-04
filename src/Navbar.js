import * as React from 'react';
// import './css/Re'
import TagIcon from '@mui/icons-material/Tag';

export default function AccountMenu(props) {
    return (
        <div className='navbarmenu' >
            <TagIcon sx={{marginLeft:'0.95vw',}}/>
            <h5 style={{marginLeft:'4px',color:'white',font:'Noto Sans',fontWeight:'500',fontStyle:'normal',fontSize:'17px',letterSpacing:'-0.035em'}}>{props.roomid}</h5>
        </div>
    );
}
