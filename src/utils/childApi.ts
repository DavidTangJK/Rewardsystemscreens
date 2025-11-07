// src/utils/childApi.ts
// Based on API_DOCUMENTATION_kidID.md
const BASE_URL = 'https://task.csun.site/api/v1';

/**
 * Fetches the current points for a specific child.
 */
export async function getChildPoints(childId: number) {
  try {
    const response = await fetch(`${BASE_URL}/child/${childId}/points`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch points');
    }
    const data = await response.json();
    if (data.success) {
      return data.data; // { child_id, child_name, total_points }
    } else {
      throw new Error(data.error || 'API request failed');
    }
  } catch (error) {
    console.error('Error fetching child points:', error);
    throw error;
  }
}

/**
 * Deducts points from a child's account.
 */
export async function deductPoints(childId: number, points: number, reason: string) {
  try {
    const response = await fetch(`${BASE_URL}/child/${childId}/points/deduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points, reason }),
    });

    const data = await response.json();
    
    if (!response.ok || !data.success) {
      const errorMsg = data.error || 'Failed to deduct points';
      if (data.data?.available_points !== undefined) {
        throw new Error(`Insufficient points. Need ${data.data.required_points}, but only have ${data.data.available_points}.`);
      }
      throw new Error(errorMsg);
    }
    
    return data.data; // { child_id, points_before, points_deducted, points_after, ... }
  } catch (error) {
    console.error('Error deducting points:', error);
    throw error;
  }
}