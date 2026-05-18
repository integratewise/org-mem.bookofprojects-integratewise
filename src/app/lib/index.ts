/**
 * IntegrateWise Brand Hub - Core Library Exports
 * All systems unified in one place
 */

// Brand Constants
export { BRAND, TAGLINES, CONTACT, FOOTER_LINE } from './brand';

// Version Control
export {
  type Version,
  type Branch,
  type Stash,
  getAllVersions,
  getDocumentVersions,
  getLatestVersion,
  commit,
  getVersion,
  revertToVersion,
  compareVersions,
  getBranches,
  createBranch,
  getCurrentBranch,
  switchBranch,
  stash,
  getStashes,
  popStash,
  getVersionStats,
  exportVersionHistory,
} from './versionControl';

// Export System
export {
  type ExportFormat,
  type ExportOptions,
  type ExportResult,
  exportDocument,
  downloadExport,
  batchExport,
  getExportPreview,
} from './exportFormats';

// Asset Management
export {
  type Asset,
  type AssetVersion,
  type AssetFolder,
  type CloudProvider,
  getAllAssets,
  getAsset,
  getAssetsByFolder,
  searchAssets,
  getAssetsByTag,
  createAsset,
  updateAsset,
  deleteAsset,
  addAssetVersion,
  getFolders,
  createFolder,
  deleteFolder,
  exportAssetsList,
  getAssetStats,
  cloudProviders,
} from './assetManager';

// Audit Logging
export {
  type AuditAction,
  type AuditEntry,
  type AuditFilter,
  PERMISSIONS,
  logAudit,
  getAllEntries,
  filterEntries,
  getResourceHistory,
  getUserActivity,
  getRecentActivity,
  getActivityStats,
  exportAuditLog,
  clearOldEntries,
  audit,
  initAuditSystem,
} from './auditLog';

// Authentication
export {
  type UserRole,
  type User,
  type Session,
  type Permission,
  PERMISSIONS as AUTH_PERMISSIONS,
  ROLE_PERMISSIONS,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  hasPermission,
  checkPermission,
  getCurrentSession,
  login,
  logout,
  validateSession,
  type Invitation,
  createInvitation,
  getInvitation,
  useInvitation,
  updateUserPreferences,
  getUserStats,
  initAuth,
  requireAuth,
} from './auth';

// Backup & Restore
export {
  type Backup,
  type BackupData,
  type BackupSchedule,
  createBackup,
  getBackups,
  getBackup,
  downloadBackup,
  restoreBackup,
  importBackupFile,
  deleteBackup,
  getSchedule,
  saveSchedule,
  checkScheduledBackup,
  exportFullSystem,
  getBackupStats,
  initBackupSystem,
} from './backup';

// Webhook Sync
export {
  type WebhookEndpoint,
  type SyncPayload,
  type SyncResult,
  getEndpoints,
  saveEndpoint,
  deleteEndpoint,
  testEndpoint,
  sendWebhook,
  getSyncHistory,
  getRetryQueue,
  processRetryQueue,
  bulkSync,
  presetIntegrations,
  getWebhookStats,
} from '../services/webhookSync';

// Storage utilities
export {
  storageKey,
  loadJson,
  saveJson,
  loadText,
  saveText,
} from './storage';

// Documentation content
export {
  documentContent,
  getDocumentContent,
} from './documentationContent';

// Section extractor
export {
  extractSection,
} from './sectionExtractor';

// Canonical knowledge runtime foundation
export {
  APPROVED_KNOWLEDGE_DOMAINS,
  KNOWLEDGE_STATES,
  KNOWLEDGE_ITEM_TYPES,
  CANONICAL_DOMAIN_STATE_CONTAINERS,
  type KnowledgeDomain,
  type KnowledgeState,
  type KnowledgeItemType,
  type CanonicalKnowledgePath,
  type CanonicalKnowledgeItem,
  type DomainStateContainer,
  type KnowledgeLineage,
  type KnowledgeReference,
  isKnowledgeDomain,
  isKnowledgeState,
  buildKnowledgePath,
  parseKnowledgePath,
  isCanonicalKnowledgePath,
  createDomainStateContainers,
} from './knowledgeRuntime';
