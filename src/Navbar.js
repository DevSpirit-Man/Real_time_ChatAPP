import * as React from 'react';
// import './css/Re'

export default function AccountMenu(props) {
    return (
        <div className='navbarmenu' >
            {/* <TagIcon sx={{marginLeft:'0.95vw',}}/> */}
            
            <h5 style={{marginLeft:'0.9vw',font:'Noto Sans',fontWeight:'500',fontStyle:'normal',fontSize:'17px',letterSpacing:'-0.035em',color:'rgb(130, 130, 130)'}}><span style={{color:'white'}}>Room Id : </span> {props.roomid}</h5>
        </div>
    );
}
