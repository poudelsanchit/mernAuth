import React, { useState } from "react";
import { IoIosAdd, IoIosRemove, IoIosTrash } from "react-icons/io";
import { db } from "../firebase-config";

import { collection, addDoc } from "firebase/firestore";

const AddProjectModal = ({ onClose }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    location: "",
    client: "",
    year: "",
    area: "",
    status: "",
    description: "",
    images: [""],
  });
console.log(projectData)
  const userCollectionRef = collection(db, "portfolio");

  const handleInputChange = (key, value) => {
    setProjectData({ ...projectData, [key]: value });
  };

  const handleImageUrlChange = (index, e) => {
    const newImages = [...projectData.images];
    newImages[index] = e.target.value;
    setProjectData({ ...projectData, images: newImages });
  };

  const addImageUrlInput = () => {
    setProjectData({ ...projectData, images: [...projectData.images, ""] });
  };

  const removeInputUrlInput = () => {
    if (projectData.images.length > 1) {
      const newImages = projectData.images.slice(0, -1);
      setProjectData({ ...projectData, images: newImages });
    }
  };

  const handleSubmit = async () => {
    try {
      await addDoc(userCollectionRef, {
        Name: projectData.name,
        Location: projectData.location,
        Client: projectData.client,
        Year: projectData.year,
        Area: projectData.area,
        Status: projectData.status,
        Images: projectData.images,
        Description: projectData.description,
        projectImage: projectData.images[0]
      });
      console.log("Data Added");
      alert("Data Added succesfully")
      onClose();

    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-60 z-50">
      <div className="bg-primarybackground p-8 rounded-md shadow-lg w-full sm:w-6/12 h-auto max-h-full overflow-y-auto flex flex-col gap-4">
        <div className="text-xl font-semibold mb-4">Add New Project</div>

        {/* Name and Location */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Your Project Name"
              className="bg-primarybackground placeholder:text-xs w-full border-2  border-border h-10 rounded-md focus:outline-none pl-4 text-xs font-Poppins font-normal tracking-wide"
              value={projectData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Location</label>
            <input
              type="text"
              placeholder="Project Location"
              className="bg-primarybackground placeholder:text-xs w-full border-2 border-border h-10 rounded-md focus:outline-none pl-4 text-xs font-Poppins font-normal tracking-wide"
              value={projectData.location}
              onChange={(e) =>
                handleInputChange("location", e.target.value)
              }
            />
          </div>
        </div>

        {/* Client and Year */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Client's name</label>
            <input
              type="text"
              placeholder="Your Client's name"
              className="bg-primarybackground placeholder:text-xs w-full border-2 border-border h-10 rounded-md focus:outline-none pl-4 text-xs font-Poppins font-normal tracking-wide"
              value={projectData.client}
              onChange={(e) => handleInputChange("client", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Year</label>
            <input
              type="text"
              placeholder="Project Year"
              className="bg-primarybackground placeholder:text-xs w-full border-2 border-border h-10 rounded-md focus:outline-none pl-4 text-xs font-Poppins font-normal tracking-wide"
              value={projectData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
            />
          </div>
        </div>
        {/* Area and Status */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Area</label>
            <input
              type="text"
              placeholder="Project Area"
              className="bg-primarybackground placeholder:text-xs w-full border-2 border-border h-10 rounded-md focus:outline-none pl-4 text-xs font-Poppins font-normal tracking-wide"
              value={projectData.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Status</label>
            <input
              type="text"
              placeholder="Project Status"
              className="bg-primarybackground placeholder:text-xs w-full border-2 border-border h-10 rounded-md focus:outline-none pl-4 text-xs font-Poppins font-normal tracking-wide"
              value={projectData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            />
          </div>
        </div>
        {/* Description */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 w-full text-xs">
            <label htmlFor="">Description</label>
            <textarea
              placeholder="Project description"
              className="bg-primarybackground placeholder:text-xs w-full border-2 border-border rounded-md focus:outline-none p-4 text-xs font-Poppins h-32 font-normal tracking-wide"
              value={projectData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
            />
          </div>
        </div>
        {/* Image Url's */}
        <label htmlFor="" className="text-sm">
          Image Url's
        </label>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {projectData.images.map((imageUrl, index) => (
            <div key={index} className="flex gap-5">
              <div className="flex flex-col gap-1 w-full text-xs">
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  className="bg-primarybackground placeholder:text-xs w-full border-2 border-border rounded-md focus:outline-none p-4 text-xs font-Poppins h-10 font-normal tracking-wide"
                  value={imageUrl}
                  onChange={(e) => handleImageUrlChange(index, e)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Button to add more image URL inputs */}
        <div className="flex justify-end gap-4">
          <div
            className="h-12 w-12 bg-purple-600 rounded-md flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
            onClick={addImageUrlInput}
          >
            <IoIosAdd className="text-4xl" />
          </div>
          <div
            className="h-12 w-12 border-2 rounded-md flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
            onClick={removeInputUrlInput}
          >
            <IoIosTrash className="text-2xl" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex h-10 gap-5">
          <div
            className="text-base bg-purple-700 rounded-md px-4 cursor-pointer hover:bg-blue-800 flex justify-center items-center"
            onClick={handleSubmit}
          >
            Add Project
          </div>
          <div
            className="text-base rounded-md px-4 cursor-pointer border-2 flex justify-center items-center"
            onClick={onClose}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
