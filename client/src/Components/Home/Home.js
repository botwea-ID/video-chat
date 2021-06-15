import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../../SocketContext';
import './Home.css';
import Footer from '../Footer/Footer';
import homeIcon from '../../assets/video-call.png';
import homeIcon1 from '../../assets/home.png';
import noteIcon from '../../assets/note2.png';
import homeVideo from '../../assets/homeVideo1.mp4';
import ChatIcon from '@material-ui/icons/Chat';
import EventNoteIcon from '@material-ui/icons/EventNote';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import DuoIcon from '@material-ui/icons/Duo';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import Navbar from '../Navbar/Navbar';

const Home = (props) => {
  const paramsCode = props.location.search;

  const {
    stream,
    setStream,
    meetingCode,
    setMeetingCode,
    setCallEnded,
    setCallAccepted,
    setName,
    setShowEditor,
    setShowChatBox,
    setMessages,
    setNotes,
    setNotesOpen,
    setOtherUserStream,
    setNewMeet,
    setOtherUser,
    setMyVideoStatus,
    setMyMicStatus,
    setUserMicStatus,
    setUserVideoStatus,
    setOtherUserName,
  } = useContext(SocketContext);

  const setDatas = () => {
    setCallAccepted(false);
    setCallEnded(false);
    setName('');
    setStream(null);
    setShowEditor(false);
    setShowChatBox(false);
    setMessages([]);
    setNotes('');
    setNotesOpen(false);
    setMeetingCode(null);
    setOtherUserStream(null);
    setNewMeet(false);
    setOtherUser(null);
    setMyVideoStatus(true);
    setMyMicStatus(false);
    setUserMicStatus(false);
    setUserVideoStatus(false);
    setOtherUserName('');
  };

  useEffect(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setDatas();
    if (paramsCode.length) {
      setMeetingCode(paramsCode.substring(1));
    }
  }, []);

  useEffect(() => {
    console.log(meetingCode);
  }, [meetingCode]);

  return (
    <div className='home'>
      <Navbar />
      <div className='body-div'>
        <div className='flex-box'>
          <div className='left-div'>
            <div className='contents'>
              <div className='start-meet'>
                <Link
                  className='home-btn'
                  to='join'
                  onClick={() => {
                    setNewMeet(true);
                  }}
                >
                  Start Meeting
                </Link>
              </div>
              <div className='join-meet'>
                <input
                  type='text'
                  placeholder='Enter meeting code'
                  value={meetingCode || ''}
                  onChange={(e) => {
                    setMeetingCode(e.target.value);
                  }}
                />
                <button
                  className='home-btn'
                  onClick={() => {
                    if (!meetingCode || meetingCode.trim().length === 0) {
                      message.error('Please enter the meeting code');
                      return;
                    }
                    props.history.push('join');
                  }}
                >
                  Join Meeting
                </button>
              </div>
              <div className='features'>
                <h1>Features</h1>
                <div className='grid-div'>
                  <DuoIcon />
                  <p>1:1 Video chat</p>
                </div>
                <div className='grid-div'>
                  <SurroundSoundIcon />
                  <p>Live Editor for interview</p>
                </div>
                <div className='grid-div'>
                  <EventNoteIcon />
                  <p>Notes</p>
                </div>
                <div className='grid-div'>
                  <ChatIcon />
                  <p>Real time Chat</p>
                </div>
              </div>
              <img src={homeIcon1} alt='' className='chat-img' />
              <img src={noteIcon} alt='' className='note-img' />
            </div>
          </div>
          <div className='right-div'>
            {/* <img src={homeIcon} alt='' /> */}
            <video
              src={homeVideo}
              id='video'
              alt='video'
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
