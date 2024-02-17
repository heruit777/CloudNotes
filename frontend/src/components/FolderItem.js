import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";

const FolderItem = (props) => {
    const { folder, mode } = props;
    let navigate = useNavigate();

    const formatFolderName = (str) => {
        const formattedString = str.replace(/[^\w\s]/gi, '');
        const finalString = formattedString.replace(/\s+/g, '-');
        return finalString ? finalString+'-' : finalString;
    }

    const handleClick = () => {
        console.log(folder.name);
        navigate(`/${formatFolderName(folder.name)}${folder._id}`);
    }
    return (
        <div className='col-md-4' onClick={handleClick}>
            <div className=" card  my-1" title="folder">
                <div className={`card-body-folder pb-1 ${mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="">{folder.name}</div>
                    <i className="fa-regular fa-folder"></i>
                </div>
            </div>
        </div>
    )
}
export default FolderItem;