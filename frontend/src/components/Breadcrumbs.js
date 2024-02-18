import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const BreadCrumbs = () => {
    const context = useContext(noteContext);
    const {breadCrumbPath} = context;
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === '/'){
            breadCrumbPath.current = [];
        }
    })
    const handleClick = (e) => {
        let flag = false;
        let res = breadCrumbPath.current.reduce((acc, val)=>{
            if(val.name === e.target.name){
                flag = true;
                acc.push(val);
            } else if(!flag){
                acc.push(val);
            }
            return acc;
        }, [])
        breadCrumbPath.current = res;
        console.log(res);
    }

    return (
        <div>
            <ul style={{ listStyleType: "none", display: "flex", width: 'fit-content' }}>
                {breadCrumbPath.current.map((directoryObj, index) => {
                    return <li style={{listStyleType: "none"}} key={index}>
                        <Link to={'/'+directoryObj.url} onClick={handleClick} name={directoryObj.name}>
                            {directoryObj.name}/
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default BreadCrumbs;