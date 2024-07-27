import React, { useState } from 'react';
import "./css/sidebar.css";
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from '@mui/material';
import { db, storage } from './firebase';
import firebase from "firebase";

function Sidebar({ onOptionSelect }) {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = (event) => {
        event.preventDefault();
        setUploading(true);

        storage.ref(`files/${file.name}`).put(file).then(snapshot => {
            storage.ref("files").child(file.name).getDownloadURL().then(url => {
                db.collection("myfiles").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    filename: file.name,
                    fileURL: url,
                    size: snapshot._delegate.bytesTransferred
                });
                setUploading(false);
                setFile(null);
                setOpen(false);
            });
        });
    };

    const handleSidebarOptionClick = (option) => {
        onOptionSelect(option);
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className='modal_pop'>
                    <form>
                        <div className='modelHeading'>
                            <h3>Select file you want to upload</h3>
                        </div>
                        <div className='modelBody'>
                            {
                                uploading ? (
                                    <p className='uploading'>Uploading</p>
                                ) : (
                                    <>
                                        <input type='file' onChange={handleChange} />
                                        <input type='submit' className='post_submit' onClick={handleUpload} />
                                    </>
                                )
                            }
                        </div>
                    </form>
                </div>
            </Modal>
            <div className='sidebar'>
                <div className='sidebar_btn'>
                    <button onClick={handleOpen}>
                        <img src='https://www.pngrepo.com/png/336351/180/plus.png' height="30px" width="30px" />
                        <span>New</span>
                    </button>
                </div>
                <div className='sidebar_options'>
                    <div
                        className='sidebar_option'
                        onClick={() => handleSidebarOptionClick("My Drive")}
                    >
                        <MobileScreenShareIcon />
                        <span><b>My Drive</b></span>
                    </div>
                    <div
                        className='sidebar_option'
                        onClick={() => handleSidebarOptionClick("Computers")}
                    >
                        <DevicesIcon />
                        <span>Computers</span>
                    </div>
                    <div
                        className='sidebar_option'
                        onClick={() => handleSidebarOptionClick("Shared with me")}
                    >
                        <PeopleAltOutlinedIcon />
                        <span>Shared with me</span>
                    </div>
                    <div
                        className='sidebar_option'
                        onClick={() => handleSidebarOptionClick("Recent")}
                    >
                        <QueryBuilderOutlinedIcon />
                        <span>Recent</span>
                    </div>
                    <div
                        className='sidebar_option'
                        onClick={() => handleSidebarOptionClick("Starred")}
                    >
                        <StarBorderOutlinedIcon />
                        <span>Starred</span>
                    </div>
                    <div
                        className='sidebar_option'
                        onClick={() => handleSidebarOptionClick("Trash")}
                    >
                        <DeleteOutlineOutlinedIcon />
                        <span>Trash</span>
                    </div>
                    <hr />
                    <div className='sidebar_options1'>
                        <CloudQueueIcon />
                        <span>Storage</span>
                    </div>
                    <div className='progress_bar'>
                        <progress size='tiny' value="50" max="100" />
                        <span>6.45GB of 15 GB Used</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
