import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import {MdAdd} from 'react-icons/md';
import Modal from 'react-modal'
import AddEditNotes from '../components/AddEditNotes';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import moment from 'moment';
import EmptyCard from '../components/EmptyCard';
import { toast } from "react-toastify";

const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        date: null,
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (noteDetails) =>{
      setOpenAddEditModal({isShown: true, data: noteDetails, type:"edit"});
    }

   //Get User Info 
    const getUserInfo = async() =>{
      try{
        const response = await axiosInstance.get("/api/user/getuser");
        if(response.data && response.data.user){
          setUserInfo(response.data.user);
        } 
      }catch(error){
        if(error.response.status === 401){
          localStorage.clear();
          navigate("/login");
        }
      }
    }

    //Get all notes
    const getAllNotes = async() =>{
      try{
        const response = await axiosInstance.get("/api/note/getnote");
        if(response.data && response.data.notes){
          setAllNotes(response.data.notes);
        }
      }catch(error){
        console.log("An error occured try again");
        
      }
    }

    //Delete Note
    const deleteNote = async(noteData) =>{
      try{
        const response = await axiosInstance.delete(`/api/note/deletenote/${noteData._id}`)
        if(response.data && response.data.note){
           getAllNotes();
        }
       }catch(error){
          if(error.response && error.response.data && error.response.data.message){
           console.log("An unexpected error occured. Please try again");
           
          }
       }
    }

    const onSearchNote = async(searchQuery) =>{
      try{
        const response = await axiosInstance.get(`/api/note/search?query=${searchQuery}`);

        if(response.data && response.data.notes){
          setIsSearch(true);
          setAllNotes(response.data.notes);
        }
      }catch(error){
        console.log(error);
        
      }
    }


    const updateIsPinned = async (noteData) =>{
      try{
         const response = await axiosInstance.put(`/api/note/pin/${noteData._id}`,{
          isPinned: !noteData._id.isPinned
         });

         if(response.data && response.data.note){
          toast.success("Note Pinned Successfully")
          getAllNotes();
         }

      }catch(error){
        console.log(error);
        
      }
    }
    const hnadleClearSearch = () =>{
      setIsSearch(false);
      getAllNotes();
    }
    useEffect(() =>{
      getAllNotes();
      getUserInfo();
      return () =>{}
    },[])
  return (
    <>
    <Navbar  userInfo={userInfo} onSearchNote={onSearchNote} hnadleClearSearch = {hnadleClearSearch}/>

    <div className=' mx-auto px-20'>
      {
        allNotes.length > 0 ? (
      
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item,index) =>{
            return(
             <NoteCard 
             key={item._id}
             title={item.title}
             date={moment(item.createdAt).format("DD MMM YYYY")
             }
             content={item.content}
             tags={item.tags}
             isPinned={item.isPinned}
             onEdit={() => handleEdit(item)}
             onDelete={() =>deleteNote(item)}
             onPinNote={() =>updateIsPinned(item)}
             />
            )
          })}
        </div>
        ): (
          <EmptyCard />
        )}

    </div>

    <button className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10' onClick={() =>{
        setOpenAddEditModal({isShown : true, type: "add", data:null})
    }}>
        <MdAdd className="text-[32px] text-white"/> 
    </button>

    <Modal 
      isOpen= {openAddEditModal.isShown}
      onRequestClose = {() => {}}
      style={{
        overlay: {
            backgroundColor:"rgba(0,0,0,0.2)",
        },
      }}
      contentLabel=""
      
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
    >
     <AddEditNotes 
     type={openAddEditModal.type}
     noteData={openAddEditModal.data}
     onClose={() =>{
        setOpenAddEditModal({isShown : false,type:"add", date:null})
     }}
     getAllNotes = {getAllNotes}
     />
    </Modal>
    </>
  )
}

export default Home