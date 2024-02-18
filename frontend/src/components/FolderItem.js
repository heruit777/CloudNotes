import React, { useContext, useEffect } from "react"
import noteContext from "../context/notes/noteContext";
import { useLocation, useNavigate } from "react-router-dom";

const FolderItem = (props) => {
    const { folder, mode, path, showAlert } = props;
    // console.log(path);
    const context = useContext(noteContext);
    const { getDirectoryContent, deleteFolder, breadCrumbPath } = context;
    let navigate = useNavigate();
    let location = useLocation();
    // console.log(location.state)
    useEffect(() => {
        getDirectoryContent(location.pathname);
        // console.log(location.pathname);
        //eslint-disable-next-line
    }, [location])

    const formatFolderName = (str) => {
        const formattedString = str.replace(/[^\w\s]/gi, '');
        const finalString = formattedString.replace(/\s+/g, '-');
        return finalString ? finalString + '-' : finalString;
    }

    const handleClick = async () => {
        navigate(`/${formatFolderName(folder.name)}${folder._id}`);
        if(breadCrumbPath.current.length === 0){
            breadCrumbPath.current.push({
                name: 'Home',
                url:''
            });
        }
        breadCrumbPath.current.push(
            {
                name: folder.name,
                url: formatFolderName(folder.name)+folder._id
            }
        );
    }

    const handleDeleteFolderClick = (e) => {
        e.stopPropagation();
        deleteFolder(folder);
        showAlert("deleted Successfully", "success");
    }
    return (
        <div className='col-md-4' onClick={handleClick}>
            <div className=" card  my-1" title="folder">
                <div className={`card-body-folder pb-1 ${mode === 'light' ? 'signupContainer-light' : 'signupContainer-dark'}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="">{folder.name}</div>
                    <div>
                        <i className="fa-regular fa-folder"></i>
                        <i className="fa-solid fa-trash" title="Delete folder" onClick={handleDeleteFolderClick}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FolderItem;