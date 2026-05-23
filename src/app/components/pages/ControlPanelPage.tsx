import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings, RefreshCw, CheckCircle, AlertCircle, Link2, Unlink,
  Globe, Target, Megaphone, Palette, Database, ChevronDown,
  Edit2, Save, X, Plus, Trash2, Play, Pause, Clock,
  FileText, Image, Mail, Presentation, Check, Loader2,
  LayoutDashboard, ArrowRight, Wifi, WifiOff
} from 'lucide-react';
import {
  SyncConnection,
  SyncJob,
  loadConnections,
  saveConnections,
  loadSyncQueue,
  saveSyncQueue,
  queueSync,
  processSyncQueue,
  testConnection,
  getSyncStats,
  clearCompletedJobs,
  autoSyncContent
} from '../../services/sync';

// Icons for connection types
const TYPE_ICONS = {
  sales: Database,
  gtm: Target,
  marketing: Megaphone,
  branding: Palette,
  website: Globe,
  crm: Database
};

const TYPE_COLORS = {
  sales: 'var(--success-color)',
  gtm: 'var(--warning-color)',
  marketing: 'var(--accent-color)',
  branding: 'var(--primary-color)',
  website: 'var(--slate)',
  crm: 'var(--slate)'
};

// Connection Card Component
function ConnectionCard({
  connection,
  isEditing,
  onChange,
  onTest,
  onToggle
}: {
  connection: SyncConnection;
  isEditing: boolean;
  onChange: (c: SyncConnection) => void;
  onTest: () => void;
  onToggle: () => void;
}) {
  const Icon = TYPE_ICONS[connection.type];
  const color = TYPE_COLORS[connection.type];
  const [isTesting, setIsTesting] = useState(false);

  const handleTest = async () => {
    setIsTesting(true);
    await onTest();
    setIsTesting(false);
  };

  return (
    <motion.div
      layout
      className="rounded-xl border border-[var(--border-subtle)] overflow-hidden" style={{ background: 'var(--paper)' }}
    >
      {/* Header */}
      <div className="p-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              {isEditing ? (
                <input
                  value={connection.name}
                  onChange={(e) => onChange({ ...connection, name: e.target.value })}
                  className="font-semibold text-[var(--text-color)] px-2 py-1 border border-[var(--border-base)] rounded"
                />
              ) : (
                <h3 className="font-semibold text-[var(--text-color)]">{connection.name}</h3>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs px-2 py-0.5 rounded-full uppercase font-medium"
                  style={{ background: `${color}15`, color }}
                >
                  {connection.type}
                </span>
               <span
                 className={`text-xs flex items-center gap-1 ${
                   connection.status === 'connected'
                  ? ''
                 : connection.status === 'error'
                  ? ''
                 : 'text-[var(--text-muted)]'
                 }`}
                 style={connection.status === 'connected' ? { color: 'var(--forest-bright)' } : connection.status === 'error' ? { color: 'var(--error-color)' } : {}}
               >
                  {connection.status === 'connected' ? (
                    <><Wifi className="w-3 h-3" /> Connected</>
                  ) : connection.status === 'error' ? (
                    <><AlertCircle className="w-3 h-3" /> Error</>
                  ) : (
                    <><WifiOff className="w-3 h-3" /> Disconnected</>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleTest}
                  disabled={isTesting}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[var(--border-base)] rounded-lg hover:bg-[var(--surface)] disabled:opacity-50"
                >
                  {isTesting ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  Test
                </button>
              </>
            ) : (
              <button
                onClick={onToggle}
               className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                 connection.status === 'connected'
                    ? ''
                    : ''
               }`}
               style={connection.status === 'connected' ? { background: 'color-mix(in srgb, var(--error-color, #B33A3A) 10%, var(--surface-raised))', color: 'var(--error-color, #B33A3A)' } : { background: 'color-mix(in srgb, var(--forest-bright) 10%, var(--surface-raised))', color: 'var(--forest-bright)' }}
              >
                {connection.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="p-5 space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] mb-1 block">Endpoint URL</label>
              <input
                type="url"
                value={connection.endpoint}
                onChange={(e) => onChange({ ...connection, endpoint: e.target.value })}
                placeholder="https://api.example.com/v1"
                className="w-full px-3 py-2 text-sm border border-[var(--border-base)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] mb-1 block">API Key</label>
              <input
                type="password"
                value={connection.apiKey}
                onChange={(e) => onChange({ ...connection, apiKey: e.target.value })}
                placeholder="Enter API key"
                className="w-full px-3 py-2 text-sm border border-[var(--border-base)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`autosync-${connection.id}`}
                checked={connection.autoSync}
                onChange={(e) => onChange({ ...connection, autoSync: e.target.checked })}
                className="w-4 h-4 rounded border-[var(--border-base)] text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
              />
              <label htmlFor={`autosync-${connection.id}`} className="text-sm text-[var(--text-color)]">
                Enable auto-sync
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">Endpoint</span>
              <span className="text-[var(--text-color)] font-mono text-xs truncate max-w-[200px]">
                {connection.endpoint || 'Not configured'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">API Key</span>
              <span className="text-[var(--text-color)] font-mono text-xs">
                {connection.apiKey ? '••••••••' : 'Not set'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-muted)]">Auto-sync</span>
              <span className={connection.autoSync ? '' : 'text-[var(--text-muted)]'} style={connection.autoSync ? { color: 'var(--forest-bright)' } : {}}>
                {connection.autoSync ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            {connection.lastSync && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">Last Sync</span>
                <span className="text-[var(--text-color)]">
                  {new Date(connection.lastSync).toLocaleString()}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// Sync Job Item
function SyncJobItem({ job, connection }: { job: SyncJob; connection?: SyncConnection }) {
  const statusIcons = {
    pending: Clock,
    syncing: Loader2,
    completed: CheckCircle,
    failed: AlertCircle
  };

  const Icon = statusIcons[job.status];
  const statusColors = {
    pending: 'var(--text-faint)',
    syncing: 'var(--primary-color)',
    completed: 'var(--success-color)',
    failed: 'var(--red)'
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border-subtle)]" style={{ background: 'var(--surface-raised)' }}>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: `${statusColors[job.status]}15` }}
      >
        <Icon
          className={`w-5 h-5 ${job.status === 'syncing' ? 'animate-spin' : ''}`}
          style={{ color: statusColors[job.status] }}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[var(--text-color)]">{job.entityType}</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: statusColors[job.status] + '15', color: statusColors[job.status] }}
          >
            {job.status}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          {connection?.name || 'Unknown'} • {job.action} • {new Date(job.createdAt).toLocaleTimeString()}
        </p>
        {job.error && (
          <p className="text-xs mt-1" style={{ color: 'var(--error-color, #B33A3A)' }}>{job.error}</p>
        )}
      </div>
    </div>
  );
}

// Quick Sync Actions
function QuickSyncActions({ onSync }: { onSync: (type: string) => void }) {
  const actions = [
    { id: 'all', label: 'Sync All', icon: RefreshCw, color: 'var(--primary-color)' },
    { id: 'linkedin', label: 'LinkedIn', icon: Megaphone, color: 'var(--slate)' },
    { id: 'email', label: 'Email Templates', icon: Mail, color: 'var(--primary-color)' },
    { id: 'presentations', label: 'Presentations', icon: Presentation, color: 'var(--slate)' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSync(action.id)}
          className="flex items-center gap-2 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[var(--primary-color)]/30 hover:bg-[var(--surface)] transition-all text-left"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${action.color}15` }}
          >
            <action.icon className="w-5 h-5" style={{ color: action.color }} />
          </div>
          <span className="text-sm font-medium text-[var(--text-color)]">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

// Main Component
export function ControlPanelPage() {
  const [connections, setConnections] = useState<SyncConnection[]>([]);
  const [syncQueue, setSyncQueue] = useState<SyncJob[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'connections' | 'queue'>('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, failed: 0, syncing: 0 });

  useEffect(() => {
    setConnections(loadConnections());
    setSyncQueue(loadSyncQueue());
    setStats(getSyncStats());
  }, []);

  const saveAll = () => {
    saveConnections(connections);
    setIsEditing(false);
  };

  const handleTestConnection = async (id: string) => {
    const conn = connections.find(c => c.id === id);
    if (!conn) return;

    const success = await testConnection(conn);
    const updated = connections.map(c =>
      c.id === id ? { ...c, status: success ? 'connected' : 'error' } : c
    );
    setConnections(updated);
    saveConnections(updated);
  };

  const handleToggleConnection = async (id: string) => {
    const conn = connections.find(c => c.id === id);
    if (!conn) return;

    if (conn.status === 'connected') {
      const updated = connections.map(c =>
        c.id === id ? { ...c, status: 'disconnected' } : c
      );
      setConnections(updated);
      saveConnections(updated);
    } else {
      await handleTestConnection(id);
    }
  };

  const processQueue = async () => {
    setIsProcessing(true);
    await processSyncQueue((job) => {
      setSyncQueue(loadSyncQueue());
      setStats(getSyncStats());
    });
    setIsProcessing(false);
    setSyncQueue(loadSyncQueue());
    setStats(getSyncStats());
  };

  const handleQuickSync = (type: string) => {
    // Queue sync jobs based on type
    const connectedConns = connections.filter(c => c.status === 'connected');
    
    if (type === 'all') {
      // Queue all content types
      connectedConns.forEach(conn => {
        queueSync(conn.id, 'content', 'all', 'update', { type: 'bulk' });
      });
    } else {
      // Queue specific type
      connectedConns.forEach(conn => {
        queueSync(conn.id, type as any, 'bulk', 'update', { type });
      });
    }
    
    setSyncQueue(loadSyncQueue());
    setStats(getSyncStats());
    processQueue();
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 flex items-start justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="w-5 h-5 text-[var(--primary-color)]" />
            <span className="text-xs font-semibold text-[var(--primary-color)] uppercase tracking-wider">Command Center</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">Control Panel</h1>
          <p className="text-[var(--text-muted)]">Manage sync connections and deploy content to all channels</p>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={saveAll}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--forest)', color: 'var(--paper)' }}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--border-base)] text-[var(--text-color)] rounded-lg text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] rounded-lg text-sm font-medium"
              style={{ color: 'var(--paper)' }}
            >
              <Edit2 className="w-4 h-4" />
              Configure
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Connections', value: connections.filter(c => c.status === 'connected').length, total: connections.length, color: 'var(--primary-color)' },
          { label: 'Pending', value: stats.pending, color: 'var(--warning-color)' },
          { label: 'Syncing', value: stats.syncing, color: 'var(--forest-bright)' },
          { label: 'Completed', value: stats.completed, color: 'var(--success-color)' },
          { label: 'Failed', value: stats.failed, color: 'var(--red)' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-xl border border-[var(--border-subtle)] text-center"
            style={{ background: 'var(--surface-raised)' }}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            {stat.total && <p className="text-xs text-[var(--text-faint)]">/ {stat.total}</p>}
            <p className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[var(--border-subtle)]">
        {[
          { key: 'overview', label: 'Overview', icon: LayoutDashboard },
          { key: 'connections', label: 'Connections', icon: Link2 },
          { key: 'queue', label: 'Sync Queue', icon: RefreshCw },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.key
                ? 'border-[var(--primary-color)] text-[var(--primary-color)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--primary-color)]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Quick Actions */}
            <section>
              <h2 className="text-lg font-semibold text-[var(--text-color)] mb-4">Quick Sync</h2>
              <QuickSyncActions onSync={handleQuickSync} />
            </section>

            {/* Connection Status */}
            <section>
              <h2 className="text-lg font-semibold text-[var(--text-color)] mb-4">Connection Status</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {connections.map((conn) => (
                  <div
                    key={conn.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-subtle)]"
                    style={{ background: 'var(--surface-raised)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: TYPE_COLORS[conn.type] + '15' }}
                    >
                      {(() => {
                        const Icon = TYPE_ICONS[conn.type];
                        return <Icon className="w-6 h-6" style={{ color: TYPE_COLORS[conn.type] }} />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[var(--text-color)]">{conn.name}</h4>
                      <p className="text-xs text-[var(--text-muted)]">
                        {conn.status === 'connected' ? (
                          <span className="flex items-center gap-1" style={{ color: 'var(--forest-bright)' }}>
                            <Check className="w-3 h-3" /> Connected
                          </span>
                        ) : (
                          <span className="text-[var(--text-muted)] flex items-center gap-1">
                            <WifiOff className="w-3 h-3" /> Disconnected
                          </span>
                        )}
                      </p>
                    </div>
                    {conn.status === 'connected' && conn.autoSync && (
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'color-mix(in srgb, var(--forest-bright) 10%, var(--surface-raised))', color: 'var(--forest-bright)' }}>
                        Auto
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-lg font-semibold text-[var(--text-color)] mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {syncQueue.slice(-5).reverse().map((job) => (
                  <SyncJobItem
                    key={job.id}
                    job={job}
                    connection={connections.find(c => c.id === job.connectionId)}
                  />
                ))}
                {syncQueue.length === 0 && (
                  <p className="text-center text-[var(--text-faint)] py-8">No sync activity yet</p>
                )}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'connections' && (
          <motion.div
            key="connections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {connections.map((conn) => (
              <ConnectionCard
                key={conn.id}
                connection={conn}
                isEditing={isEditing}
                onChange={(updated) => {
                  const updatedConns = connections.map(c => c.id === conn.id ? updated : c);
                  setConnections(updatedConns);
                }}
                onTest={() => handleTestConnection(conn.id)}
                onToggle={() => handleToggleConnection(conn.id)}
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'queue' && (
          <motion.div
            key="queue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--text-color)]">Sync Queue</h2>
              <div className="flex gap-2">
                <button
                  onClick={processQueue}
                  disabled={isProcessing || stats.pending === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] rounded-lg text-sm font-medium disabled:opacity-50"
                  style={{ color: 'var(--paper)' }}
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  {isProcessing ? 'Processing...' : 'Process Queue'}
                </button>
                <button
                  onClick={() => {
                    clearCompletedJobs();
                    setSyncQueue(loadSyncQueue());
                    setStats(getSyncStats());
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--border-base)] text-[var(--text-color)] rounded-lg text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Completed
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {syncQueue.slice().reverse().map((job) => (
                <SyncJobItem
                  key={job.id}
                  job={job}
                  connection={connections.find(c => c.id === job.connectionId)}
                />
              ))}
              {syncQueue.length === 0 && (
                <div className="text-center py-12 bg-[var(--surface)] rounded-xl border border-dashed border-[var(--border-base)]">
                  <RefreshCw className="w-12 h-12 text-[var(--text-faint)] mx-auto mb-4" />
                  <p className="text-[var(--text-muted)]">Sync queue is empty</p>
                  <p className="text-sm text-[var(--text-faint)]">Changes will appear here when you sync content</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ControlPanelPage;
