import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RiDownloadCloud2Line, RiRefreshLine, RiRestartLine } from 'react-icons/ri';

const BackupManager = () => {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchBackups = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/backup/list`);
            setBackups(response.data.backups);
        } catch (error) {
            console.error('Error fetching backups:', error);
            toast.error('Failed to fetch backup list');
        }
    };

    useEffect(() => {
        fetchBackups();
    }, []);

    const handleCreateBackup = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/backup/create`);
            toast.success('Backup created successfully');
            fetchBackups();
        } catch (error) {
            console.error('Error creating backup:', error);
            toast.error('Failed to create backup');
        } finally {
            setLoading(false);
        }
    };

    const handleRestoreBackup = async (backupId) => {
        if (!window.confirm('Are you sure you want to restore this backup? This will replace all current data.')) {
            return;
        }

        try {
            await axios.post(`${API_URL}/api/backup/restore/${backupId}`);
            toast.success('Backup restore initiated successfully');
        } catch (error) {
            console.error('Error restoring backup:', error);
            toast.error('Failed to restore backup');
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Backup Management</h2>
                <button
                    onClick={handleCreateBackup}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50"
                >
                    <RiDownloadCloud2Line className="text-xl" />
                    {loading ? 'Creating Backup...' : 'Create Backup'}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Backup Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {backups.map((backup) => (
                            <tr key={backup.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatDate(backup.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {backup.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        backup.status === 'completed' 
                                            ? 'bg-green-100 text-green-800'
                                            : backup.status === 'failed'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {backup.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleRestoreBackup(backup.id)}
                                        disabled={backup.status !== 'completed'}
                                        className={`text-green-600 hover:text-green-900 flex items-center gap-1 ${
                                            backup.status !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <RiRestartLine className="text-lg" />
                                        Restore
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BackupManager; 