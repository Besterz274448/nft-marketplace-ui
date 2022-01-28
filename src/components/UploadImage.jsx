import React from "react";
import { useDropzone } from "react-dropzone";
import "../asset/components.css";

function UploadImage(props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDropAccepted: (files) => props.handleImg(files),
  });

  const maxSize = props.maxSize;
  const style = { width: "100%", height: "300px" };
  const word = props.maxSize
    ? "Upload Your Avatar"
    : "Drag 'n' drop some files here, or click to select files";
  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <section className="uploadimage-container" style={maxSize && style}>
      <div {...getRootProps({ className: "uploadimage-dropzone" })}>
        <input type="file" id={props.id} {...getInputProps()} />
        <p>{word}</p>
        <div className="uploadimage-preview">
          {props.img.src && (
            <img
              src={`data:${props.img.type};base64,${_arrayBufferToBase64(
                props.img.src
              )}`}
              width={"100%"}
              height={"300px"}
              alt="preview"
            ></img>
          )}
        </div>
      </div>
      {props.img.src && (
        <button
          type="button"
          className="uploadimage-resetButton"
          onClick={props.resetImg}
        >
          X
        </button>
      )}
    </section>
  );
}

export default UploadImage;
