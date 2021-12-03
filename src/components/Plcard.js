import React from 'react';
import { Link } from 'react-router-dom';

function PLcard(props) {
  const Urlcheck = () =>{
    if(props.PL_URL !== 'none'){
      return <a className="external_link" href={props.PL_URL} target="blank" >{props.PL_URL}</a>
    }
  }
  return (
    
    <div className="show_card">

      <div className="card_img">
        <img src={props.PL_img} alt={props.PL_image}></img>
      </div>
      <div className="text">
        <h1>{props.PL_name}</h1>
        <p>{props.PL_type}</p>
        {Urlcheck()}
        <p>{props.PL_infos}</p>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem', alignItems: 'center', flex: 'wrap' }}>
          <Link to={"/Forum/"+props.PL_name} className="highlighted" style={{ marginRight: '0.25rem', padding: '0.25rem 0.75rem' }}>Forum</Link>
          <Link to={"/Learn/"+props.PL_name+"/"+props._id} className="navitems-effect">Learn {props.title}</Link>
        </div>
      </div>
    </div>

  );
}

export default PLcard;