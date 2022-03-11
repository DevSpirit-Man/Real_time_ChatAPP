import * as React from 'react';
import TagIcon from '@mui/icons-material/Tag';
export default function AccountMenu(props) {
    return (
        <div style={{height:'49px',backgroundColor:'white',borderBottom:'1px solid #eaeaea',display:'flex',alignItems:'center',paddingLeft:'24px'}}>
            <TagIcon color="action" ></TagIcon>
            <h5 style={{marginLeft:'1.5px',color:'#3d3d3d'}}>{props.roomid}</h5>
        </div>
    );
}
