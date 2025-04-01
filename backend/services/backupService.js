const mongoose = require('mongoose');
const axios = require('axios');

class BackupService {
    constructor() {
        this.mongoUri = process.env.MONGO_URI;
        this.atlasApiKey = process.env.ATLAS_API_KEY;
        this.atlasProjectId = process.env.ATLAS_PROJECT_ID;
        this.atlasClusterName = process.env.ATLAS_CLUSTER_NAME;
    }

    async createBackup() {
        try {
            // Get the current timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            
            // Create backup using MongoDB Atlas API
            const response = await axios.post(
                `https://cloud.mongodb.com/api/atlas/v1.0/groups/${this.atlasProjectId}/clusters/${this.atlasClusterName}/backup`,
                {
                    description: `Manual backup ${timestamp}`,
                    retentionInDays: 7
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.atlasApiKey}`
                    }
                }
            );

            return {
                success: true,
                backupId: response.data.id,
                timestamp: timestamp
            };
        } catch (error) {
            console.error('Backup failed:', error);
            throw error;
        }
    }

    async listBackups() {
        try {
            const response = await axios.get(
                `https://cloud.mongodb.com/api/atlas/v1.0/groups/${this.atlasProjectId}/clusters/${this.atlasClusterName}/backup`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.atlasApiKey}`
                    }
                }
            );

            return response.data.results.map(backup => ({
                id: backup.id,
                createdAt: new Date(backup.created).getTime(),
                description: backup.description,
                status: backup.status
            }));
        } catch (error) {
            console.error('Failed to list backups:', error);
            throw error;
        }
    }

    async restoreBackup(backupId) {
        try {
            // Initiate restore from backup
            const response = await axios.post(
                `https://cloud.mongodb.com/api/atlas/v1.0/groups/${this.atlasProjectId}/clusters/${this.atlasClusterName}/restore`,
                {
                    backupId: backupId,
                    targetClusterName: this.atlasClusterName,
                    targetGroupId: this.atlasProjectId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.atlasApiKey}`
                    }
                }
            );

            return {
                success: true,
                restoreJobId: response.data.id
            };
        } catch (error) {
            console.error('Restore failed:', error);
            throw error;
        }
    }
}

module.exports = new BackupService(); 