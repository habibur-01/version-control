import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
import { db } from "../../firebase/firebase";
// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  color: Yup.string().required("Please select a color"),
  description: Yup.string().required("Please write a description"),
});

const AddProject = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/5 flex items-center justify-center p-4 ">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6 relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl hover:cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
          <span className="flex items-center justify-center font-semibold h-6 w-6 bg-[#cde6f1] text-blue-500 px-2 rounded-md">
            <AiOutlinePlus size={18} />
          </span>
          Add Project
        </h2>
        <Formik
          initialValues={{ name: "", color: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            try {
              await addDoc(collection(db, "projects"), values);

              resetForm();
              toast.success("Project added successfully!");
              onClose();
            } catch (error) {
              console.error("Error adding project:", error);
              toast.error("Failed to add project. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Version */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. YaOption"
                  onChange={handleChange("name")}
                  value={values.name}
                  className="mt-1 block w-full border-[1px] border-gray-300 rounded-md p-2 text-sm focus:border-gray-500"
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
                  onChange={handleChange("color")}
                  value={values.color}
                >
                  <option value="">Select a color</option>
                  <option value="#ff0000">Red</option>
                  <option value="#008000">Green</option>
                  <option value="#02448E">Blue</option>
                  <option value="#FFFF00">Yellow</option>
                </select>
                {errors.color && touched.color && (
                  <div className="text-red-500 text-xs">{errors.color}</div>
                )}
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  type="text"
                  placeholder="Write short description"
                  onChange={handleChange("description")}
                  value={values.description}
                  className="mt-1 block w-full border-[1px] border-gray-300 rounded-md p-2 text-sm focus:border-gray-500"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-xs">
                    {errors.description}
                  </div>
                )}
              </div> */}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#1D89E5] text-white py-2 px-4 rounded-md hover:cursor-pointer hover:bg-[#1D89E5]/90"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProject;
