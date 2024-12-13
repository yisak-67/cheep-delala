import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import houseImg from "./House.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { LoginStatusContext } from "../../App";

const Posts = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [submitedInfo, setSubmitedInfo] = useState({});
  const [submittedInput, setSubmittedInput] = useState({});

  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitedInfo((prevInfo) => ({
      ...prevInfo,
      ...submittedInput,
      uploadedImgs,
      user: loginStatus,
      time: time(),
    }));
    console.log(uploadedImgs);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSubmittedInput((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function time() {
    return new Date().toISOString();
  }
  useEffect(() => {
    const submitForm = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/post",
          submitedInfo
        );
        console.log("Form submitted successfully");
      } catch (error) {
        console.error("Error submitting form", error);
      }
    };

    submitForm();
  }, [submitedInfo]);

  const readURL = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setUploadedImgs((prevFiles) => {
        return [...prevFiles, reader.result];
      });
    };
    reader.onerror = (error) => {
      console.log("Reader: ", error);
    };
  };

  const addNewUpload = () => {
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      { id: Date.now(), note: "" },
    ]);
  };

  const deleteUpload = (id) => {
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((file) => file.id !== id)
    );
  };

  const handleDeleteUpload = (e) => {
    if (document.querySelectorAll(".uploadDoc").length > 4) {
      const closestUploadDoc = e.target.closest(".uploadDoc");
      closestUploadDoc.remove();
    } else {
      alert("You have to upload at least 4 document.");
    }
  };

  return (
    <>
      <div className="backgroundPost1"></div>
      <div className="backgroundPost2"></div>
      <div className="backgroundPost3"></div>
      <div className="backgroundPost4"></div>
      <div className="backgroundPost5"></div>
      <div className="backgroundPost">
        <img src={houseImg} alt="houseimage" />
      </div>

      <div className="container">
        <div className="row it">
          <div className="col-sm-offset-1 col-sm-10" id="one">
            <p>Please upload documents only in 'jpg', 'jpeg', 'png' format.</p>
            <br />
            <div className="row">
              <div className="col-sm-offset-4 col-sm-4 form-group">
                <h3 className="text-center">Upload at least 4 Images</h3>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div id="uploader">
                  {uploadedFiles.map((file) => (
                    <div className="row uploadDoc" key={file.id}>
                      <div className="col-sm-3">
                        <div className="docErr">Please upload valid file</div>
                        <div className="fileUpload btn btn-orange">
                          <input
                            type="file"
                            className="upload-img up"
                            id="up"
                            onChange={readURL}
                            required
                            accept=".jpg, .jpeg, .png"
                          />
                        </div>
                      </div>

                      <div className="closeBtn">
                        <a className="b" onClick={handleDeleteUpload}>
                          <FontAwesomeIcon icon={faClose} />
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="text-center">
                    <a className="btn btn-new" onClick={addNewUpload}>
                      <FontAwesomeIcon icon={faPlus} /> Add Image
                    </a>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title: eg - The White House"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location eg: Mekanisa Street,
                  A.A,Ethiopia"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  placeholder="Area (sqMeter)"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="bedrooms"
                  placeholder="Number of Bedroom eg: 2"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  placeholder="Price in ETB"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control"
                  name="for"
                  placeholder="what is the for, sale or rent"
                  onChange={handleInputChange}
                  required
                />

                <div className="text-center">
                  <button className="btn btn-next" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
