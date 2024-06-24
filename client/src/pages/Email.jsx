import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import NavBar from "../NavBar";

const Email = () => {
  const [email, setEmail] = useState([]);
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setEmail(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    console.log("first");
  }, []);

  return (
    <>
      <NavBar />
      <div className="h-auto bg-primarybackground text-white font-Poppins flex justify-center">
        <div className="w-11/12 h-screen flex mt-10 ">
          <div className="  w-full  bg-secondaybackground rounded-md  mb-10 flex flex-col gap-2">
            <div className="text-2xl shadow-lg flex justify-between  pb-2 py-6">
              <div className="tracking-wider font-semibold pl-6">Email</div>
            </div>
            <div className="  h-full w-full px-6 py-1">
              <div className=" dark:bg-slate-800 dark:text-cyan-50 transition-all  overflow-x-auto w-full font-Poppins">
                <table className="divide-dashed table-auto w-full sm:text-base ">
                  <thead>
                    <tr>
                      <th className="p-4 pl-6 w-20 text-xs text-start lg:text-lg ">
                        Sn
                      </th>
                      <th className="p-4 pl-6 w-auto text-xs text-start lg:text-lg ">
                        Email
                      </th>
                    </tr>
                  </thead>
                  {email.length === 0 ? (
                    <div className="pt-5 pl-6">Loading...</div>
                  ) : null}

                  <tbody>
                    {email.map((data, index) => {
                      return (
                        <tr className="cursor-pointer  hover:bg-primarybackground ">
                          <td className="p-4 pl-6 w-20 text-xs text-start lg:text-lg ">
                            {index}
                          </td>
                          <td className=" pl-6 text-start text-sm ">
                            {data.email}
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

export default Email;
