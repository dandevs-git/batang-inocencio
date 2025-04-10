import { Link, Outlet } from 'react-router-dom';
import AdminSidebar from '../component/AdminSidebar';
import AdminHeader from '../component/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div  style={{ width: '350px' }}></div>
      <div className="w-100">
        <AdminHeader />
        <main className="container-fluid px-5 py-4">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
