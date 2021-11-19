import React from "react";
import { useDropzone } from "react-dropzone";
import "../asset/components.css";

function UploadImage(props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted: (files) => props.handleImg(files),
  });

  return (
    <section className="uploadimage-container">
      <div {...getRootProps({ className: "uploadimage-dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <div className="uploadimage-preview">
          {props.img.src && (
            <img src={props.img.src} width={"100%"} height={"300px"} alt="preview-image"></img>
          )}
        </div>
      </div>
      {props.img.src && (
        <button type="button" className="uploadimage-resetButton" onClick={props.resetImg}>
          X
        </button>
      )}
    </section>
  );
}

export default UploadImage;
