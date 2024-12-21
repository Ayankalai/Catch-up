import { Route, Routes } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Hero from '../components/Main_page/Hero';
import Logout from '../components/Logout';
import Search from '../components/search/Search';
import Profile from '../components/profile/Profile';
import Reels from '../components/reels/Reels';
import Editprofile from '../components/profile/Editprofile';
import Changepassword from '../components/profile/Changepassword';
import Navbar from '../components/nav/Navbar';
import ChangeDp from '../components/profile/ChangeDp';
import UploadVideo from '../components/reels/UploadVideo';
import MainPost from '../components/Post/MainPost';
import DisplayUserImage from '../components/Post/DisplayUserImage';
import UploadImage from '../components/Post/UploadImage';
import EditImage from '../components/Post/EditImage';
import DeleteImage from '../components/Post/DeleteImage';
import DisplayVideos from '../components/reels/DisplayVideos';
import OtherUserProfile from '../components/search/OtherUserProfile';
const Index = () => {
 
    
    
  return (
    <div className='p-2'>
     

      <Routes>
        <Route path="/" element={<Register  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/logout" element={<Logout  />} />
        <Route path="/hero" element={<Hero  />} />
        <Route path="/search" element={<Search  />} />
        <Route path="/post" element={<MainPost  />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/reels" element={<Reels  />} />
        <Route path="/editprofile" element={<Editprofile  />} />
        <Route path="/changePassword" element={<Changepassword  />} />
        <Route path="/navbar" element={<Navbar  />} />
        <Route path="/changeDp" element={<ChangeDp  />} />
        <Route path="/uploadvideo" element={<UploadVideo  />} />
        <Route path="/displayVideos" element={<DisplayVideos  />} />
        <Route path="/uploadImage" element={<UploadImage  />} />
        <Route path="/userImages" element={<DisplayUserImage  />} />
        <Route path="/editImage" element={<EditImage  />} />
        <Route path="/deleteImage" element={<DeleteImage  />} />
        <Route path="/otherUserProfile" element={<OtherUserProfile  />} />
      </Routes>
    </div>
  )
}

export default Index