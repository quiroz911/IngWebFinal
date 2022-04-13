import React, { useState } from 'react';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';

const FileUpload = ({
  name,
  type = 'auto',
  text = 'Open',
  onSuccess = (url) => url,
}) => {
  const [fileLink, setFileLink] = useState<string>(null);
  const successCallback = (e) => {
    setFileLink(e.info.url);
    onSuccess(e.info.url);
  };
  return (
    <div>
      {fileLink && (
        <input
          className='hidden'
          name={name}
          type='text'
          value={fileLink}
          onChange={(e) => {
            setFileLink(e.target.value);
          }}
        />
      )}
      <WidgetLoader />
      <Widget
        resourceType={type}
        sources={['local', 'camera']}
        cloudName='quiroz911'
        uploadPreset='akceka4e'
        buttonText={text}
        folder='my_folder'
        onSuccess={successCallback} // add success callback -> returns result
        use_filename
        autoClose={false}
        apiKey={622332951957644}
        withCredentials={false}
        unique_filename={false}
      />
    </div>
  );
};

export default FileUpload;
