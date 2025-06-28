import React, { useContext, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CaptainProfile = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [editMode, setEditMode] = useState(null); // null | 'profile' | 'password'
  const [formData, setFormData] = useState({
    firstname: captain.fullname.firstname,
    lastname: captain.fullname.lastname,
    color: captain.vehicle.color,
    plate: captain.vehicle.plate,
    capacity: captain.vehicle.capacity,
    vehicleType: captain.vehicle.vehicleType
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        vehicle: {
          color: formData.color,
          plate: formData.plate,
          capacity: formData.capacity,
          vehicleType: formData.vehicleType
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res);
      setCaptain(res.data);
      setEditMode(null);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      console.log(err);
      setError(`${err}` || 'Update failed');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (passwordData.newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/captains/change-password`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setCaptain(res.data.captain);
      setEditMode(null);
      setSuccess('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed');
    }
  };

  const logout = async () => {
    await axios.get('/captains/logout');
    setCaptain(null);
  };

  return (
    <>
      <div className='fixed top-0 left-0 p-3'>
        <Link to="/captain-home"><img className='w-10 h-10 invert rotate-180' src="/src/assets/arrow.svg" alt="" /></Link>
      </div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-2">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-2 capitalize">
              {captain.fullname.firstname[0]}{captain.fullname.lastname[0]}
            </div>
            <h2 className="text-2xl font-bold mb-1">Captain Profile</h2>
            <p className="text-gray-500 text-sm">Manage your account & vehicle</p>
          </div>
          {error && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3 text-center">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 px-3 py-2 rounded mb-3 text-center">{success}</div>}
          {editMode === 'profile' ? (
            <form className="space-y-4" onSubmit={handleProfileSubmit}>
              <div>
                <label className="block text-xs text-gray-500 mb-1">First Name</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 capitalize"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 capitalize"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Vehicle Color</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 capitalize"
                  name="color"
                  value={formData.color}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Vehicle Plate</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 uppercase"
                  name="plate"
                  value={formData.plate}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Capacity</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Vehicle Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 capitalize"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleProfileChange}
                  required
                >
                  <option value="car" className="capitalize">Car</option>
                  <option value="motorcycle" className="capitalize">Motorcycle</option>
                  <option value="auto" className="capitalize">Auto</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-200 text-black py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                  onClick={() => setEditMode(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : editMode === 'password' ? (
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Old Password</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">New Password</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="At least 8 characters"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Confirm New Password</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-200 text-black py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                  onClick={() => setEditMode(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-400">NAME</div>
                <div className="text-lg font-semibold capitalize">{captain.fullname.firstname} {captain.fullname.lastname}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">EMAIL</div>
                <div className="text-lg font-semibold">{captain.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">VEHICLE</div>
                <div className="text-lg font-semibold capitalize">{captain.vehicle.color} {captain.vehicle.vehicleType} <span className="uppercase">(Plate: {captain.vehicle.plate})</span></div>
              </div>
              <div>
                <div className="text-xs text-gray-400">CAPACITY</div>
                <div className="text-lg font-semibold">{captain.vehicle.capacity}</div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => setEditMode('profile')}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setEditMode('password')}
                  className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full mt-8 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default CaptainProfile;