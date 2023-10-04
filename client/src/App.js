
import React from 'react';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';

import Batches from './pages/batches';
import Batch from './pages/batch';
import AddBatch from './pages/add-batch';
import EditBatch from './pages/edit-batch';

import Students from './pages/students';
import Student from './pages/student';
import AddStudent from './pages/add-student';
import CopyStudent from './pages/copy-student';
import EditStudent from './pages/edit-student';
import Fees from './pages/fees';
import SignIn from './pages/SignIn';
import Signup from './pages/signup';
import About from './pages/about';
import NotFound from './pages/not-found';

import PageTemplate from './templates/page-template';
 
function App() {
    return (
        <Router>
            <PageTemplate>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/login' element={<SignIn />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route path='/batches' element={<Batches />} />
                    <Route path='/batch' element={<Batch />} />
                    <Route path='/students' element={<Students />} />
                    <Route path='/student' element={<Student />} />
                    <Route path='/fees' element={<Fees />} />


                    <Route path='/add-batch' element={<AddBatch />} />
                    <Route path='/edit-batch' element={<EditBatch />} />
                    <Route path='/add-student' element={<AddStudent />} />
                    <Route path='/copy-student' element={<CopyStudent />} />
                    <Route path='/edit-student' element={<EditStudent />} />

                    <Route path='/about' element={<About />} />
                    <Route path="*" element={<NotFound />} />
                    
                </Routes>
            </PageTemplate>
        </Router>
    );
}
 
export default App;