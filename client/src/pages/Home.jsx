import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AddProjectModal from "../components/AddProjectModal ";
import { FiTrash } from "react-icons/fi";
import NavBar from "../NavBar";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility

  const userCollectionRef = collection(db, "portfolio");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    console.log("first");
  }, []);

  console.log(users);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(userCollectionRef, id));
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <>
    <NavBar/>
      <div className="h-auto bg-primarybackground text-white font-Poppins flex justify-center">
      <div className="w-11/12 h-screen flex mt-10 ">
        <div className="  w-full  bg-secondaybackground rounded-md  mb-10 flex flex-col gap-2">
          <div className="text-2xl shadow-lg flex justify-between  pb-2 py-6">
            <div className="tracking-wider font-semibold pl-6">Portfolio</div>
            <div
              className="text-base bg-purple-700 rounded-md mr-6 px-4 py-2 cursor-pointer hover:bg-blue-800 flex justify-center items-center"
              onClick={handleOpenModal}
            >
              Add Project
            </div>
            {/* Render the modal if isModalOpen is true */}
            {isModalOpen && <AddProjectModal onClose={handleCloseModal} />}
            {/* Your existing code */}
          </div>
          <div className="  h-full w-full px-6 py-1">
            <div className=" dark:bg-slate-800 dark:text-cyan-50 transition-all  overflow-x-auto w-full font-Poppins">
              <table className="divide-dashed table-auto w-full sm:text-base ">
                <thead>
                  <tr>
                    <th className="w-6  pl-2">sn</th>
                    <th className="p-4 pl-6 w-auto text-xs text-start lg:text-lg ">
                      Name
                    </th>
                    <th className="p-4 text-xs text-start lg:text-lg">
                      Location
                    </th>
                    <th className="p-4 text-xs text-start lg:text-lg">
                      Client
                    </th>
                    <th className="p-4 text-xs text-start lg:text-lg">Year</th>
                    <th className="p-4 text-xs text-start lg:text-lg">Area</th>
                    <th className="p-4 text-xs text-start lg:text-lg">
                      Status
                    </th>
                    <th className="p-4 text-xs text-start lg:text-lg">
                      Images
                    </th>
                    <th className="p-4 text-xs text-start lg:text-lg">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                {users.length === 0 ? <div >loading...</div> : null}

                  {users.map((data, index) => {
                    return (
                      <tr className="cursor-pointer  hover:bg-primarybackground " key={index}>

                        <td className="w-6 pl-2">{index}</td>
                        <td className=" pl-6 text-start text-sm ">
                          {data.Name}
                        </td>
                        <td className=" text-start text-sm ">
                          {data.Location}
                        </td>
                        <td className=" text-start text-sm ">{data.Client}</td>
                        <td className=" text-start text-sm ">{data.Year}</td>
                        <td className=" text-start text-sm ">{data.Year}</td>
                        <td className=" text-start text-sm ">{data.Status}</td>
                        <td className=" text-start flex">
                          {data.Images.map((image, i) => (
                            <img
                              key={i}
                              src={image}
                              alt={`Image ${i}`}
                              className="h-10 w-10 mr-1 rounded-sm object-cover"
                            />
                          ))}
                        </td>
                        <td  className="w-10     text-center">
                          <button className="bg-red-500  hover:bg-red-700 text-white font-bold p-1    rounded-md" onClick={() => handleDelete(data.id)}>
                            <FiTrash className="text-xl"/>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default Home;
