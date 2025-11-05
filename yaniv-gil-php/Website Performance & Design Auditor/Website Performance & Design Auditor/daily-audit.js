#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

class DailyAuditScheduler {
  constructor() {
    this.websiteUrl = process.argv[2] || 'https://gilyaniv.vercel.app';
    this.reportsDir = './daily-reports';
    this.logFile = './audit-scheduler.log';
    this.scriptDir = process.cwd();
  }

  async log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    
    try {
      fs.appendFileSync(this.logFile, logMessage);
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  async ensureReportsDirectory() {
    if (!fs.existsSync(this.reportsDir)) {
      fs.mkdirSync(this.reportsDir, { recursive: true });
      await this.log(`Created reports directory: ${this.reportsDir}`);
    }
  }

  async runAudit() {
    await this.log(`Starting daily audit for ${this.websiteUrl}`);
    
    try {
      // Change to reports directory
      process.chdir(this.reportsDir);
      
      // Run the audit
      const { stdout, stderr } = await execAsync(`node "${this.scriptDir}/index.js" "${this.websiteUrl}"`);
      
      if (stderr) {
        await this.log(`Audit warnings: ${stderr}`);
      }
      
      await this.log(`Audit completed successfully`);
      await this.log(`Output: ${stdout}`);
      
      return true;
    } catch (error) {
      await this.log(`Audit failed: ${error.message}`);
      return false;
    }
  }

  async analyzeResults() {
    await this.log('Analyzing audit results...');
    
    try {
      // Run the analyzer
      const { stdout, stderr } = await execAsync(`node "${this.scriptDir}/analyze-reports.js"`);
      
      if (stderr) {
        await this.log(`Analysis warnings: ${stderr}`);
      }
      
      await this.log(`Analysis completed`);
      await this.log(`Analysis output: ${stdout}`);
      
      return true;
    } catch (error) {
      await this.log(`Analysis failed: ${error.message}`);
      return false;
    }
  }

  async cleanupOldReports() {
    await this.log('Cleaning up old reports...');
    
    try {
      const files = fs.readdirSync('.');
      const auditFiles = files.filter(file => file.startsWith('audit-') && file.endsWith('.json'));
      const analysisFiles = files.filter(file => file.startsWith('audit-analysis-') && file.endsWith('.json'));
      
      // Keep only the last 7 days of reports
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      
      let deletedCount = 0;
      
      [...auditFiles, ...analysisFiles].forEach(file => {
        const stats = fs.statSync(file);
        if (stats.mtime < cutoffDate) {
          fs.unlinkSync(file);
          deletedCount++;
        }
      });
      
      await this.log(`Cleaned up ${deletedCount} old report files`);
    } catch (error) {
      await this.log(`Cleanup failed: ${error.message}`);
    }
  }

  async generateSummary() {
    await this.log('Generating daily summary...');
    
    try {
      const files = fs.readdirSync('.');
      const today = new Date().toISOString().split('T')[0];
      const todayFiles = files.filter(file => file.includes(today));
      
      const summary = {
        date: today,
        website: this.websiteUrl,
        auditFiles: todayFiles.filter(f => f.startsWith('audit-')),
        analysisFiles: todayFiles.filter(f => f.startsWith('audit-analysis-')),
        totalFiles: todayFiles.length
      };
      
      const summaryFile = `daily-summary-${today}.json`;
      fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
      
      await this.log(`Daily summary saved: ${summaryFile}`);
      await this.log(`Files generated today: ${summary.totalFiles}`);
      
      return summary;
    } catch (error) {
      await this.log(`Summary generation failed: ${error.message}`);
      return null;
    }
  }

  async run() {
    await this.log('=== DAILY AUDIT SCHEDULER STARTED ===');
    
    try {
      // Ensure reports directory exists
      await this.ensureReportsDirectory();
      
      // Run the audit
      const auditSuccess = await this.runAudit();
      if (!auditSuccess) {
        await this.log('Audit failed, skipping analysis');
        return;
      }
      
      // Analyze the results
      const analysisSuccess = await this.analyzeResults();
      if (!analysisSuccess) {
        await this.log('Analysis failed');
      }
      
      // Clean up old reports
      await this.cleanupOldReports();
      
      // Generate summary
      const summary = await this.generateSummary();
      
      await this.log('=== DAILY AUDIT SCHEDULER COMPLETED ===');
      
      if (summary) {
        console.log('\n📊 Daily Audit Summary:');
        console.log(`Date: ${summary.date}`);
        console.log(`Website: ${summary.website}`);
        console.log(`Files generated: ${summary.totalFiles}`);
        console.log(`Audit files: ${summary.auditFiles.length}`);
        console.log(`Analysis files: ${summary.analysisFiles.length}`);
      }
      
    } catch (error) {
      await this.log(`Daily audit scheduler failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Run the daily audit
const scheduler = new DailyAuditScheduler();
scheduler.run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});