import React, { useEffect, useState } from 'react';
import "./css/data.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';  // For generating unique links

function Data({ searchTerm, selectedOption }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("myfiles").onSnapshot(snapshot => {
      setFiles(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return () => unsubscribe();
  }, []);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.data.filename.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedOption === "Recent") {
      return matchesSearch && file.data.timestamp;
    }
    if (selectedOption === "Starred") {
      return matchesSearch && file.data.starred;
    }
    if (selectedOption === "Trash") {
      return matchesSearch && file.data.trashed;
    }
    if (selectedOption === "Shared with me") {
      return matchesSearch && file.data.shared;
    }
    return matchesSearch && !file.data.trashed;
  });

  const formateBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleStar = (id) => {
    db.collection("myfiles").doc(id).update({
      starred: true
    });
  };

  const handleTrash = (id) => {
    db.collection("myfiles").doc(id).update({
      trashed: true
    });
  };

  const handleShare = (id) => {
    db.collection("myfiles").doc(id).update({
      shared: true,
      shareLink: `https://driveapp.example.com/share/${uuidv4()}`
    });
  };

  return (
    <div className='data'>
      <div className='data__header'>
        <div className='data__headerLeft'>
          <p>{selectedOption}</p>
          <ArrowDropDownIcon />
        </div>
        <div className='data__headerRight'>
          <ListIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      <div className='data__content'>
        <div className='data_grid'>
          {filteredFiles.map(file => (
            <div className='data__file' key={file.id}>
              <InsertDriveFileIcon />
              <p>{file.data.filename}</p>
              <div className='file_actions'>
                <StarIcon 
                  onClick={() => handleStar(file.id)} 
                  className={`file_action_icon ${file.data.starred ? 'active' : ''}`}
                />
                <DeleteIcon 
                  onClick={() => handleTrash(file.id)} 
                  className='file_action_icon'
                />
                <ShareIcon 
                  onClick={() => handleShare(file.id)} 
                  className='file_action_icon'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='detailsHeader'>
          <p><b>Name</b><ArrowDownwardIcon /></p>
          <p><b>Owner</b></p>
          <p><b>Last Modified</b></p>
          <p><b>File Size</b></p>
        </div>
        {filteredFiles.map(file => (
          <div className='detailsRow' key={file.id}>
            <p>
              <a href={file.data.fileURL} target="_blank" rel="noopener noreferrer">
                {file.data.filename}<InsertDriveFileIcon />
              </a>
            </p>
            <p>Akshit Kr. Tiwari</p>
            <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
            <p>{formateBytes(file.data.size)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
