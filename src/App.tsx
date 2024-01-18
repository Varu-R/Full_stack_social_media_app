import {Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import { Toaster } from "@/components/ui/toaster"


const App = () => {
  return (
    <main className="flex h-screen">
      
          
   <Routes>
    {/* public routes are the routes everybody will see UI whether you sign in or not 
    private routes are the routes if you have to see UI you have to sign in first */}
   {/* public routes */}
    {/* private routes */}
    {/* index means starting page */}
   <Route element={<AuthLayout />} >   
    <Route path="/sign-in" element={<SigninForm/>}/>    
    <Route path="/sign-up" element={<SignupForm/>}/>    
   
    <Route index element={<Home />} />   
    </Route>
   </Routes>

   <Toaster />
    </main>
  )
}

export default App