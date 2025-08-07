import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [versions, setVersions] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearchText = (text) => {
    setSearchText(text);
  };
  const handleVersion = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setProjectTypes(items);
      }
    );

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // ✅ start loading
      try {
        const querySnapshot = await getDocs(collection(db, "versions"));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setVersions(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // ✅ end loading
      }
    };

    fetchData();
  }, []);

  const authInfo = {
    loading,
    projectTypes,
    versions,
    handleSearchText,
    showModal,
    handleVersion,
    searchText,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
