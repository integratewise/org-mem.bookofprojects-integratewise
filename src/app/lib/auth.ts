/**
 * Authentication & Authorization System
 * User management, roles, permissions, and session handling
 */

import { loadJson, saveJson } from './storage';
import { audit } from './auditLog';

// User types
export type UserRole = 'admin' | 'editor' | 'viewer' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: number;
  lastLogin?: number;
  isActive: boolean;
  permissions?: string[];
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    sidebarCollapsed?: boolean;
    notifications?: boolean;
  };
}

export interface Session {
  user: User;
  token: string;
  expiresAt: number;
  ipAddress?: string;
  userAgent?: string;
}

// Permissions
export const PERMISSIONS = {
  // Document permissions
  'document.read': 'Read documents',
  'document.create': 'Create documents',
  'document.update': 'Edit documents',
  'document.delete': 'Delete documents',
  'document.publish': 'Publish documents',
  'document.export': 'Export documents',
  
  // Asset permissions
  'asset.read': 'View assets',
  'asset.upload': 'Upload assets',
  'asset.update': 'Edit assets',
  'asset.delete': 'Delete assets',
  
  // System permissions
  'user.manage': 'Manage users',
  'settings.manage': 'Manage settings',
  'sync.manage': 'Manage sync connections',
  'audit.view': 'View audit logs',
  'backup.manage': 'Manage backups',
} as const;

export type Permission = keyof typeof PERMISSIONS;

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: Object.keys(PERMISSIONS) as Permission[],
  editor: [
    'document.read',
    'document.create',
    'document.update',
    'document.export',
    'asset.read',
    'asset.upload',
    'asset.update',
  ],
  viewer: [
    'document.read',
    'document.export',
    'asset.read',
  ],
  guest: [
    'document.read',
    'asset.read',
  ],
};

// Storage keys
const STORAGE_KEYS = {
  users: 'auth_users',
  session: 'auth_session',
  sessions: 'auth_sessions',
  invites: 'auth_invites',
};

// Generate ID
function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2)}-${Math.random().toString(36).substr(2)}`;
}

// Password hashing (simple - in production use bcrypt)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// User management
export function getUsers(): User[] {
  return loadJson<User[]>(STORAGE_KEYS.users, [
    // Default admin user
    {
      id: 'admin-001',
      email: 'admin@integratewise.ai',
      name: 'System Administrator',
      role: 'admin',
      createdAt: Date.now(),
      isActive: true,
      preferences: {
        theme: 'system',
        sidebarCollapsed: false,
        notifications: true,
      },
    },
  ]);
}

export function getUserById(id: string): User | null {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function createUser(
  email: string,
  name: string,
  role: UserRole = 'viewer'
): User {
  const users = getUsers();
  
  if (getUserByEmail(email)) {
    throw new Error('User with this email already exists');
  }
  
  const user: User = {
    id: generateId(),
    email,
    name,
    role,
    createdAt: Date.now(),
    isActive: true,
    permissions: [],
    preferences: {
      theme: 'system',
      sidebarCollapsed: false,
      notifications: true,
    },
  };
  
  users.push(user);
  saveJson(STORAGE_KEYS.users, users);
  
  audit.user.update(user.id, user.name, { action: 'created', role });
  
  return user;
}

export function updateUser(
  userId: string,
  updates: Partial<Pick<User, 'name' | 'role' | 'isActive' | 'preferences'>>
): User {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) {
    throw new Error('User not found');
  }
  
  users[index] = { ...users[index], ...updates };
  saveJson(STORAGE_KEYS.users, users);
  
  audit.user.update(userId, users[index].name, { action: 'updated', updates });
  
  return users[index];
}

export function deleteUser(userId: string): void {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (user) {
    audit.user.update(userId, user.name, { action: 'deleted' });
  }
  
  const filtered = users.filter(u => u.id !== userId);
  saveJson(STORAGE_KEYS.users, filtered);
  
  // Also remove their sessions
  const sessions = getAllSessions();
  const filteredSessions = sessions.filter(s => s.user.id !== userId);
  saveJson(STORAGE_KEYS.sessions, filteredSessions);
}

// Permission checking
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user || !user.isActive) return false;
  
  // Check custom permissions first
  if (user.permissions?.includes(permission)) return true;
  
  // Check role-based permissions
  return ROLE_PERMISSIONS[user.role].includes(permission);
}

export function checkPermission(user: User | null, permission: Permission): void {
  if (!hasPermission(user, permission)) {
    throw new Error(`Permission denied: ${PERMISSIONS[permission]}`);
  }
}

// Session management
export function getCurrentSession(): Session | null {
  return loadJson<Session | null>(STORAGE_KEYS.session, null);
}

function getAllSessions(): Session[] {
  return loadJson<Session[]>(STORAGE_KEYS.sessions, []);
}

export async function login(
  email: string,
  password: string,
  ipAddress?: string,
  userAgent?: string
): Promise<Session> {
  const user = getUserByEmail(email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  if (!user.isActive) {
    throw new Error('Account is deactivated');
  }
  
  // In production, verify password hash
  // const passwordHash = await hashPassword(password);
  // if (storedHash !== passwordHash) throw new Error('Invalid email or password');
  
  // Update last login
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  users[index].lastLogin = Date.now();
  saveJson(STORAGE_KEYS.users, users);
  
  // Create session
  const session: Session = {
    user,
    token: generateToken(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    ipAddress,
    userAgent,
  };
  
  saveJson(STORAGE_KEYS.session, session);
  
  // Track all sessions
  const sessions = getAllSessions();
  sessions.push(session);
  saveJson(STORAGE_KEYS.sessions, sessions);
  
  audit.user.login(user.id, user.name, { ipAddress });
  
  return session;
}

export function logout(): void {
  const session = getCurrentSession();
  if (session) {
    audit.user.logout(session.user.id, session.user.name);
    
    // Remove from sessions list
    const sessions = getAllSessions();
    const filtered = sessions.filter(s => s.token !== session.token);
    saveJson(STORAGE_KEYS.sessions, filtered);
  }
  
  saveJson(STORAGE_KEYS.session, null);
}

export function validateSession(): Session | null {
  const session = getCurrentSession();
  
  if (!session) return null;
  
  if (Date.now() > session.expiresAt) {
    logout();
    return null;
  }
  
  // Refresh expiry on validation
  session.expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000);
  saveJson(STORAGE_KEYS.session, session);
  
  return session;
}

// Invitation system
export interface Invitation {
  id: string;
  email: string;
  role: UserRole;
  invitedBy: string;
  invitedAt: number;
  expiresAt: number;
  used: boolean;
}

export function createInvitation(
  email: string,
  role: UserRole,
  invitedBy: string
): Invitation {
  const invites = loadJson<Invitation[]>(STORAGE_KEYS.invites, []);
  
  const invitation: Invitation = {
    id: generateId(),
    email,
    role,
    invitedBy,
    invitedAt: Date.now(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    used: false,
  };
  
  invites.push(invitation);
  saveJson(STORAGE_KEYS.invites, invites);
  
  return invitation;
}

export function getInvitation(id: string): Invitation | null {
  const invites = loadJson<Invitation[]>(STORAGE_KEYS.invites, []);
  return invites.find(i => i.id === id && !i.used && Date.now() < i.expiresAt) || null;
}

export function useInvitation(
  invitationId: string,
  name: string
): User {
  const invites = loadJson<Invitation[]>(STORAGE_KEYS.invites, []);
  const index = invites.findIndex(i => i.id === invitationId);
  
  if (index === -1) {
    throw new Error('Invalid or expired invitation');
  }
  
  const invitation = invites[index];
  
  if (invitation.used) {
    throw new Error('Invitation already used');
  }
  
  if (Date.now() > invitation.expiresAt) {
    throw new Error('Invitation expired');
  }
  
  // Create user
  const user = createUser(invitation.email, name, invitation.role);
  
  // Mark invitation as used
  invites[index].used = true;
  saveJson(STORAGE_KEYS.invites, invites);
  
  return user;
}

// User preferences
export function updateUserPreferences(
  userId: string,
  preferences: Partial<User['preferences']>
): void {
  const user = getUserById(userId);
  if (!user) return;
  
  updateUser(userId, {
    preferences: { ...user.preferences, ...preferences },
  });
}

// Get user stats
export function getUserStats(): {
  totalUsers: number;
  byRole: Record<UserRole, number>;
  activeUsers: number;
  recentLogins: number;
  pendingInvites: number;
} {
  const users = getUsers();
  const invites = loadJson<Invitation[]>(STORAGE_KEYS.invites, []);
  const now = Date.now();
  
  const byRole: Record<UserRole, number> = { admin: 0, editor: 0, viewer: 0, guest: 0 };
  users.forEach(u => {
    byRole[u.role] = (byRole[u.role] || 0) + 1;
  });
  
  return {
    totalUsers: users.length,
    byRole,
    activeUsers: users.filter(u => u.isActive).length,
    recentLogins: users.filter(u => u.lastLogin && now - u.lastLogin < 7 * 24 * 60 * 60 * 1000).length,
    pendingInvites: invites.filter(i => !i.used && now < i.expiresAt).length,
  };
}

// Initialize with demo users
export function initAuth(): void {
  const users = getUsers();
  
  if (users.length === 0) {
    // Create default users
    createUser('admin@integratewise.ai', 'Admin User', 'admin');
    createUser('editor@integratewise.ai', 'Editor User', 'editor');
    createUser('viewer@integratewise.ai', 'Viewer User', 'viewer');
  }
}

// Require auth hook helper
export function requireAuth(): Session {
  const session = validateSession();
  if (!session) {
    throw new Error('Authentication required');
  }
  return session;
}
