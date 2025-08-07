import { Formik } from "formik";
import React, { useContext, useState, version } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Editor from "react-simple-wysiwyg";
import * as Yup from "yup";
// import { data } from "../../../public/data";
// import { insertVersion, saveDB } from "../../db/sqlite";
import toast from "react-hot-toast";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

// Validation schema
const validationSchema = Yup.object({
  version: Yup.string().required("Version is required"),
  platform: Yup.string().required("Please select a platform"),
  type: Yup.string().required("Please select a type"),
  //   description: Yup.string().required("Please write description"),
});

const AddVersion = ({ onClose }) => {
  const auth = useContext(AuthContext);
  const { handleVersion } = auth;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [projectTypes, setProjectTypes] = useState([]);
  // console.log("🚀 ~ AddProject ~ value:", value);
  function onChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProjectTypes(items);
    };

    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/5 flex items-center justify-center px-4 pt-6 pb-20 md:p-4 h-full overflow-y-scroll">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6 relative max-h-full overflow-y-auto version-add">
        <button
          onClick={handleVersion}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl hover:cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
          <span className="flex items-center justify-center font-semibold h-6 w-6 bg-[#cde6f1] text-blue-500 px-2 rounded-md">
            <AiOutlinePlus size={18} />
          </span>
          Add Version
        </h2>
        <Formik
          initialValues={{
            version: "",
            platform: "",
            type: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            try {
              await addDoc(collection(db, "versions"), {
                version: values.version,
                platform: values.platform,
                type: values.type,
                description: value,
                createdAt: new Date(),
              });

              resetForm();
              setValue("");
              toast.success("Version added successfully!");

              onClose();
            } catch (error) {
              console.error("Error adding version:", error);
              toast.error("Failed to add version. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Version */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Version
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1.0.0"
                  onChange={handleChange("version")}
                  value={values.version}
                  className="mt-1 block w-full border-[1px] border-gray-300 rounded-md p-2 text-sm focus:border-gray-500"
                />
                {errors.version && touched.version && (
                  <div className="text-red-500 text-xs">{errors.version}</div>
                )}
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  onChange={handleChange("platform")}
                  value={values.platform}
                >
                  <option value="">Select a platform</option>
                  <option value="web">Web</option>
                  <option value="ios">iOS</option>
                  <option value="android">Android</option>
                  <option value="linux">Linux</option>
                </select>
                {errors.platform && touched.platform && (
                  <div className="text-red-500 text-xs">{errors.platform}</div>
                )}
              </div>
              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  onChange={handleChange("type")}
                  value={values.type}
                >
                  <option value="">Select a type</option>
                  {projectTypes.map((item) => (
                    <option key={item?.id} value={item?.name}>
                      {item?.name}
                    </option>
                  ))}
                </select>
                {/* <input
                  type="text"
                  placeholder="e.g. YaOption"
                  onChange={handleChange("type")}
                  value={values.type}
                  className="mt-1 block w-full border-[1px] border-gray-300 rounded-md p-2 text-sm focus:border-gray-500"
                /> */}
                {errors.type && touched.type && (
                  <div className="text-red-500 text-xs">{errors.type}</div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <Editor
                  value={value}
                  onChange={onChange}
                  className="h-72"
                ></Editor>
                {errors.description && touched.description && (
                  <div className="text-red-500 text-xs">
                    {errors.description}
                  </div>
                )}
                {/* <textarea
              rows={4}
              placeholder="Enter a brief description..."
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              required
            ></textarea> */}
                {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#1D89E5] text-white py-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#1D89E5]/90"
                >
                  {loading ? "Adding..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddVersion;
