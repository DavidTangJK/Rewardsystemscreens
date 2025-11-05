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
