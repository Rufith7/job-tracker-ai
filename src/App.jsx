import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Firebase
import { db, auth } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Track User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 📦 Fetch Jobs (User-specific)
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "jobs"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ Add Job
  const addJob = async (job) => {
    await addDoc(collection(db, "jobs"), {
      ...job,
      userId: user.uid,
    });
  };

  // ✏️ Edit Job
  const editJob = async (id, updatedJob) => {
    await updateDoc(doc(db, "jobs", id), updatedJob);
  };

  // ❌ Delete Job
  const deleteJob = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  // 🔓 Logout
  const logout = () => signOut(auth);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <BrowserRouter>
      {user && <Navbar logout={logout} />}

      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <Dashboard
                  jobs={jobs}
                  editJob={editJob}
                  deleteJob={deleteJob}
                />
              }
            />
            <Route path="/add" element={<AddJob addJob={addJob} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;