const express = require('express');
const router = express.Router();
const backupService = require('../services/backupService');

// Create backup
router.post('/create', async (req, res) => {
    try {
        const result = await backupService.createBackup();
        res.json({
            success: true,
            message: 'Backup created successfully',
            backupId: result.backupId,
            timestamp: result.timestamp
        });
    } catch (error) {
        console.error('Backup creation failed:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create backup'
        });
    }
});

// Get list of backups
router.get('/list', async (req, res) => {
    try {
        const backups = await backupService.listBackups();
        res.json({
            success: true,
            backups: backups
        });
    } catch (error) {
        console.error('Failed to list backups:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to list backups'
        });
    }
});

// Restore backup
router.post('/restore/:backupId', async (req, res) => {
    try {
        const result = await backupService.restoreBackup(req.params.backupId);
        res.json({
            success: true,
            message: 'Backup restore initiated successfully',
            restoreJobId: result.restoreJobId
        });
    } catch (error) {
        console.error('Failed to restore backup:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to restore backup'
        });
    }
});

module.exports = router; 