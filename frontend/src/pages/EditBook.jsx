import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setpublishYear] = useState('');
  const [purchaseLink,setpurchaseLink] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=> {
    setLoading(true);
    axios.get(`https://book-management-system-umbb.onrender.com/books/${id}`)
    .then((res)=>{
      setAuthor(res.data.author);
      setpublishYear(res.data.publishYear);
      setTitle(res.data.title);
      setpurchaseLink(res.data.purchaseLink);
      setLoading(false);
    }).catch((error)=>{
      setLoading(false);
      alert('An error happened. Please Chack console');
      console.log(error)
    })
  }, []) ;
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      purchaseLink 
    };
    setLoading(true);
    axios
      .put(`https://book-management-system-umbb.onrender.com/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });;
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });;
        console.log(error);
      }); 
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center mb-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text' value={author} onChange={(e)=> setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type='number' value={publishYear} onChange={(e)=> setpublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Purchase Link</label>
          <input type='text' value={purchaseLink} onChange={(e)=> setpurchaseLink(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditBook