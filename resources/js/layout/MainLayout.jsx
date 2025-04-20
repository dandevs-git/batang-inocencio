import React, { useEffect } from 'react';
import Header from '../component/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer';
import ModalAnnouncement from '../component/modals/ModalAnnouncement';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

function MainLayout() {
  useEffect(() => {
    handleAnnouncementModal();
  }, []);
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ModalAnnouncement />
    </>
  );
}

function handleAnnouncementModal() {
  const announcementModal = document.getElementById("announcement_modal");
  if (announcementModal && !sessionStorage.getItem("announcement_modal_shown")) {
    new Modal(announcementModal).show();
    sessionStorage.setItem("announcement_modal_shown", "true");
  }
}

export default MainLayout;
