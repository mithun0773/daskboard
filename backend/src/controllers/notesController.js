import Note from "../models/Notes.js";

export async function getAllNotes(req, res) {
        try {
                const notes = await Note.find().sort({createAt:-1})//-1 willl be in desc order
                res.status(200).json(notes)
        } catch (error) {
                console.error("error in getAllNotes controller", error);
                res.status(500).json({ message: "Internal Server Error" });
        }
}

export async function getNoteById(req,res) {
try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"})
                res.json(note);
        
}       catch(error){
        console.error("Error in genotebyid controller",error);
        res.status(500).json({message:"Internal server error"});
} 
}
export async function createNotes(req, res) {
        try {
                const { title, content } = req.body
                const newNote = new Note({ title, content })
                await newNote.save()
                res.status(201).json({ message: "Note created successfully" })
        } catch (error) {
                console.error("Error in CreateNote controller", error);
                res.status(500).json({ message: "Internal Server Error" });
        }
}

export async function updateNotes(req, res) {
        try {
                const { title, content } = req.body;
                const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true, });
                if (!updatedNote) return res.status(404).json({ message: "Note Not Found" });
                res.status(200).json({ message: "Note Updated Successfully" });
        } catch (error) {
                console.error("Error in updateNote controller", error);
                res.status(500).json({ message: "Internal Server Error" });
        }
}

export async function deleteNotes(req, res) {
        try {
                const deleteNote = await Note.findByIdAndDelete(req.params.id)
                if (!deleteNote) return res.status(404).json({ message: "Note not found" });
                res.status(200).json({ message: "Note Deleted Successfully" })
        } catch (error) {
                console.error("Error in deleteNote controller", error);
                res.status(500).json({ message: "Internal Server Error" });
        }

}