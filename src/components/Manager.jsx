import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/eye.png")) {
      ref.current.src = "/view.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eye.png";
    }
  };

  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log(passwordArray);
    setForm({ site: "", username: "", password: "" }); // Reset form after saving
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showData = () => {
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/ &gt;</span>
        </h1>
        <p className="text-lg text-green-900 text-center">
          Your own Password Manager
        </p>

        <div className="text-white flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            name="site"
            className="border border-green-500 w-full rounded-full text-black px-4 py-1.5"
            type="text"
          />

          <div className="flex w-full gap-8 flex-col md:flex-row">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              name="username"
              className="border border-green-500 w-full rounded-full text-black px-4 py-1.5"
              type="text"
            />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                name="password"
                className="border border-green-500 w-full rounded-full text-black px-4 py-1.5"
                type="password"
              />
              <span
                className="absolute right-0 text-black top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={35}
                  src="/view.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div className="flex gap-8 flex-col sm:flex-row w-full sm:w-auto">
            <button
              onClick={savePassword}
              className="text-black flex justify-center items-center bg-green-400 hover:bg-green-500 cursor-pointer rounded-full px-8 py-2 gap-1 w-full sm:w-fit"
            >
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
                colors="primary:#121331,secondary: #002608"
              ></lord-icon>
              Add Password
            </button>

            <button
              onClick={showData}
              className="text-black flex justify-center items-center bg-green-400 hover:bg-green-500 cursor-pointer rounded-full px-8 py-2 gap-1 w-full sm:w-fit"
            >
              <lord-icon
                src="https://cdn.lordicon.com/fjvfsqea.json"
                trigger="hover"
                colors="primary:#121331,secondary:#002608"
                style={{"width":"28px","height":"28px"}}
              ></lord-icon>
              Show All Data
            </button>
          </div>
        </div>

        <div className="passwords overflow-x-auto">
          <h2 className="text-xl py-4 font-bold">Your Passwords</h2>

          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto text-black w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-1 cursor-pointer ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <lord-icon
                            src="https://cdn.lordicon.com/xljvqlng.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-1 cursor-pointer ">
                          {item.username}
                          <lord-icon
                            src="https://cdn.lordicon.com/xljvqlng.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => copyToClipboard(item.username)}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-1 cursor-pointer ">
                          {item.password}
                          <lord-icon
                            src="https://cdn.lordicon.com/xljvqlng.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => copyToClipboard(item.password)}
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Password Data Popup */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-lg p-4 sm:p-6 w-11/12 max-w-2xl max-h-[80vh] overflow-auto shadow-xl border border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-800">All Password Data</h2>
              <button 
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {passwordArray.length === 0 ? (
              <div className="text-center py-8">No passwords to show</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto text-black w-full rounded-lg overflow-hidden border-collapse">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="py-2 px-2 sm:px-4 text-left">Site</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Username</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passwordArray.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-green-50" : "bg-green-100"}>
                        <td className="py-2 px-2 sm:px-4 border-t border-green-200">
                          <div className="flex items-center gap-1">
                            <a 
                              href={item.site} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-[150px] sm:max-w-full"
                            >
                              {item.site}
                            </a>
                            <lord-icon
                              src="https://cdn.lordicon.com/xljvqlng.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                              onClick={() => copyToClipboard(item.site)}
                            ></lord-icon>
                          </div>
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-t border-green-200">
                          <div className="flex items-center gap-1">
                            <span className="truncate max-w-[100px] sm:max-w-full">{item.username}</span>
                            <lord-icon
                              src="https://cdn.lordicon.com/xljvqlng.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                              onClick={() => copyToClipboard(item.username)}
                            ></lord-icon>
                          </div>
                        </td>
                        <td className="py-2 px-2 sm:px-4 border-t border-green-200">
                          <div className="flex items-center gap-1">
                            <span className="truncate max-w-[100px] sm:max-w-full">{item.password}</span>
                            <lord-icon
                              src="https://cdn.lordicon.com/xljvqlng.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                              onClick={() => copyToClipboard(item.password)}
                            ></lord-icon>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-4 sm:mt-6 flex justify-end">
              <button
                onClick={closePopup}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Manager;