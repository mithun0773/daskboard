import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/noteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {
  const [israteLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.error("Error Fetching notes", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Falied to Load Notes")
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  },[]);


  return (
    <div className="min-h-screen">
      <Navbar />
      {israteLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && !israteLimited && <NotesNotFound />}
        {notes.length > 0 && !israteLimited && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
