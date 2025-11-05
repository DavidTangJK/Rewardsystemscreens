import { projectId, publicAnonKey } from './supabase/info';
import type { AvatarConfig } from '../data/avatar-options';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-f53ad318`;

interface FamilyMember {
  id: string;
  name: string;
  emoji: string;
  color: string;
  avatarConfig?: AvatarConfig;
}

interface Child {
  id: string;
  name: string;
  color: string;
  emoji: string;
  avatarConfig?: AvatarConfig;
  familyId: string;
}

interface Family {
  id: string;
  name: string;
  createdAt: string;
}

export async function getFamilyMembers(): Promise<FamilyMember[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/family-members`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch family members: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.members || [];
  } catch (error) {
    console.error('Error fetching family members from API:', error);
    throw error;
  }
}

export async function createFamilyMember(member: FamilyMember): Promise<FamilyMember> {
  try {
    const response = await fetch(`${API_BASE_URL}/family-members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create family member: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.member;
  } catch (error) {
    console.error('Error creating family member via API:', error);
    throw error;
  }
}

export async function updateFamilyMember(id: string, updates: Partial<Omit<FamilyMember, 'id'>>): Promise<FamilyMember> {
  try {
    const response = await fetch(`${API_BASE_URL}/family-members/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update family member: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.member;
  } catch (error) {
    console.error('Error updating family member via API:', error);
    throw error;
  }
}

export async function deleteFamilyMember(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/family-members/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete family member: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting family member via API:', error);
    throw error;
  }
}

// Wipe database
export async function wipeDatabase(): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/wipe-database`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to wipe database: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error wiping database via API:', error);
    throw error;
  }
}

// Get or create family
export async function getOrCreateFamily(familyId: string): Promise<Family> {
  try {
    const response = await fetch(`${API_BASE_URL}/families/${familyId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get/create family: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.family;
  } catch (error) {
    console.error('Error getting/creating family via API:', error);
    throw error;
  }
}

// Get children in a family
export async function getFamilyChildren(familyId: string): Promise<Child[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/families/${familyId}/children`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch family children: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.children || [];
  } catch (error) {
    console.error('Error fetching family children from API:', error);
    throw error;
  }
}

// Create child in family
export async function createChild(familyId: string, child: Omit<Child, 'familyId' | 'emoji'>): Promise<Child> {
  try {
    const response = await fetch(`${API_BASE_URL}/families/${familyId}/children`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(child),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create child: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.child;
  } catch (error) {
    console.error('Error creating child via API:', error);
    throw error;
  }
}

// Update child
export async function updateChild(id: string, updates: Partial<Omit<Child, 'id' | 'familyId'>>): Promise<Child> {
  try {
    const response = await fetch(`${API_BASE_URL}/children/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update child: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.child;
  } catch (error) {
    console.error('Error updating child via API:', error);
    throw error;
  }
}

// Delete child
export async function deleteChild(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/children/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete child: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting child via API:', error);
    throw error;
  }
}
