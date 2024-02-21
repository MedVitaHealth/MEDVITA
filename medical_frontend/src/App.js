import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './landing/pages/home';
import './App.css';
import Auth from './users/pages/Auth';
import Doctors from './landing/pages/doctor';
import Voice_Mental from './landing/components/Mental/voice_Mental';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/components/hooks/auth-hook';
import { AnimatePresence, motion } from 'framer-motion';
import Yoga_Cam from './landing/components/Yoga/yog_cam';
import Yoga from './landing/components/Yoga/yoga';
import Pregency from './landing/components/Pregnancy/Pregnancy';
import Mental from './landing/components/Mental/Mental';
import CommunityGeneral from './landing/components/Community/communityGen';
import CommunityEpidemic from './landing/components/Community/communityEpi';
import CommunityPandemic from './landing/components/Community/communityPan';
import CommunityPregnency from './landing/components/Community/communityPreg';
import Chat_Mental from './landing/components/Mental/chat_mental';

const RouteTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence >
      <motion.div key={location.pathname}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voice_mental" element={<Voice_Mental />} />
        <Route path="/chat_mental" element={<Chat_Mental />} />
        <Route path="/yoga" element={<Yoga/>}/>
        <Route path="/pregnency" element={<Pregency/>}/>
        <Route path="/community/general" element={<CommunityGeneral/>}/>
        <Route path="/community/epidemic" element={<CommunityEpidemic/>}/>
        <Route path="/community/pandemic" element={<CommunityPandemic/>}/>
        <Route path="/community/pregnency" element={<CommunityPregnency/>}/>
        <Route path="/mental" element={<Mental />} />
        <Route path="/patients_profile/:patient_id" element={
          <RouteTransition>
          </RouteTransition>
        } />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/yoga_cam" element={<Yoga_Cam />} />
        <Route path="*" element={<Navigate to="/doctors" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {routes}
    </AuthContext.Provider>
  );
}

export default App;