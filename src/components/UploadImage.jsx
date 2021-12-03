import React from "react";
import { useDropzone } from "react-dropzone";
import "../asset/components.css";

function UploadImage(props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted: (files) => props.handleImg(files),
  });

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  return (
    <section className="uploadimage-container">
      <div {...getRootProps({ className: "uploadimage-dropzone" })}>
        <input type="file" id={props.id} {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <div className="uploadimage-preview">
          {props.img.src &&
            <img src={`data:${props.img.type};base64,${_arrayBufferToBase64(props.img.src)}`} width={"100%"} height={"300px"} alt="preview-image"></img>
          }
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
