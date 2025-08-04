import React, { useState } from 'react'
import TagInput from './TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';
const AddEditNotes = ({noteData , type, getAllNotes, onClose}) => {
   // console.log(noteData);
    
    const[title,setTitle] = useState(noteData?.title || "");
    const[content,setContent] = useState(noteData?.content || "")
    const[tags, setTags] = useState(noteData?.tags || []);

    const [error, setError] = useState(null);

    //add note
    const addNewNote = async() =>{
        try{
         const response = await axiosInstance.post("/api/note/addnote/",{
            title,
            content,
            tags,
         })
         if(response.data && response.data.note){
            getAllNotes();
            onClose();
         }
        }catch(error){
           if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message);
           }
        }
    }

    //edit Note
    const editNote = async() =>{
        // const noteId = noteData._id;
        try{
            const response = await axiosInstance.put(`/api/note/editnote/${noteData._id}`,{
               title,
               content,
               tags,
            })
            if(response.data && response.data.note){
               getAllNotes();
               onClose();
            }
           }catch(error){
              if(error.response && error.response.data && error.response.data.message){
               setError(error.response.data.message);
              }
           }
    }

    const handleAddNote = () =>{
        if(!title){
            setError("PLease Enter the title");
            return;
        }

        if(!content){
            setError("PLease Enter the Content");
            return;
        }

        setError("");

        if(type === "edit"){
            editNote()
        }else{
            addNewNote()
        }
    }
  return (
    <div className='relative'>

        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
        onClick={onClose}
        >
            <MdClose className='text-xl text-slate-400'/>
        </button>

        <div className='flex flex-col gap-2'>
           <label className='input-label'>TITLE</label>
           <input
           type='text'
           className='text-2xl border border-gray-300 rounded p-2 text-slate-500 outline-none'
           placeholder='Enter Title'
           value={title}
           onChange={({target}) =>setTitle(target.value)}
           />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
           <label className='input-label'>CONTENT</label>
           <textarea
           type='text'
           className='text-2xl border border-gray-300  bg-gray-300 rounded p-2 text-slate-500 outline-none'
           placeholder='Content'
           rows={10}
           value={content}
           onChange={({target}) =>setContent(target.value)}
           />
        </div>
        <div className='mt-3'>
            <label className='input-label'>TAGS</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>
        
        {error && <p className='text-red-500 text-xs pt-4 '>{error}</p>}

        <button 
        className=' w-[100%] bg-blue-600 font-medium mt-5 py-2 rounded-xl'
        onClick={handleAddNote}>
            {type === "edit" ? "UPDATE" : "ADD"}
        </button>
    </div>
  )
}

export default AddEditNotes