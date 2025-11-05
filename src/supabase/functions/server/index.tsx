import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f53ad318/health", (c) => {
  return c.json({ status: "ok" });
});

// Wipe database endpoint (for development)
app.delete("/make-server-f53ad318/wipe-database", async (c) => {
  try {
    // Get all keys with our prefixes
    const familyMembers = await kv.getByPrefix("family_member:");
    const families = await kv.getByPrefix("family:");
    const children = await kv.getByPrefix("child:");
    
    // Delete all family members
    for (const member of familyMembers) {
      await kv.del(`family_member:${member.id}`);
    }
    
    // Delete all families
    for (const family of families) {
      await kv.del(`family:${family.id}`);
    }
    
    // Delete all children
    for (const child of children) {
      await kv.del(`child:${child.id}`);
    }
    
    return c.json({ success: true, message: "Database wiped successfully" });
  } catch (error) {
    console.error("Error wiping database:", error);
    return c.json({ error: "Failed to wipe database" }, 500);
  }
});

// Get all family members
app.get("/make-server-f53ad318/family-members", async (c) => {
  try {
    const members = await kv.getByPrefix("family_member:");
    return c.json({ members: members || [] });
  } catch (error) {
    console.error("Error fetching family members:", error);
    return c.json({ error: "Failed to fetch family members" }, 500);
  }
});

// Create a new family member
app.post("/make-server-f53ad318/family-members", async (c) => {
  try {
    const body = await c.req.json();
    const { id, name, emoji, color, avatarConfig } = body;
    
    if (!id || !name || !emoji || !color) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const member = { id, name, emoji, color, avatarConfig };
    await kv.set(`family_member:${id}`, member);
    
    return c.json({ member });
  } catch (error) {
    console.error("Error creating family member:", error);
    return c.json({ error: "Failed to create family member" }, 500);
  }
});

// Update a family member
app.put("/make-server-f53ad318/family-members/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { name, emoji, color, avatarConfig } = body;
    
    const existingMember = await kv.get(`family_member:${id}`);
    if (!existingMember) {
      return c.json({ error: "Family member not found" }, 404);
    }
    
    const updatedMember = {
      ...existingMember,
      name: name !== undefined ? name : existingMember.name,
      emoji: emoji !== undefined ? emoji : existingMember.emoji,
      color: color !== undefined ? color : existingMember.color,
      avatarConfig: avatarConfig !== undefined ? avatarConfig : existingMember.avatarConfig,
    };
    
    await kv.set(`family_member:${id}`, updatedMember);
    
    return c.json({ member: updatedMember });
  } catch (error) {
    console.error("Error updating family member:", error);
    return c.json({ error: "Failed to update family member" }, 500);
  }
});

// Delete a family member
app.delete("/make-server-f53ad318/family-members/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingMember = await kv.get(`family_member:${id}`);
    if (!existingMember) {
      return c.json({ error: "Family member not found" }, 404);
    }
    
    await kv.del(`family_member:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting family member:", error);
    return c.json({ error: "Failed to delete family member" }, 500);
  }
});

// Get or create a family
app.get("/make-server-f53ad318/families/:id", async (c) => {
  try {
    const id = c.req.param("id");
    let family = await kv.get(`family:${id}`);
    
    // If family doesn't exist, create it
    if (!family) {
      family = {
        id,
        name: "My Family",
        createdAt: new Date().toISOString(),
      };
      await kv.set(`family:${id}`, family);
    }
    
    return c.json({ family });
  } catch (error) {
    console.error("Error fetching/creating family:", error);
    return c.json({ error: "Failed to fetch/create family" }, 500);
  }
});

// Get all children in a family
app.get("/make-server-f53ad318/families/:familyId/children", async (c) => {
  try {
    const familyId = c.req.param("familyId");
    const allChildren = await kv.getByPrefix("child:");
    const familyChildren = allChildren.filter(child => child.familyId === familyId);
    
    return c.json({ children: familyChildren || [] });
  } catch (error) {
    console.error("Error fetching family children:", error);
    return c.json({ error: "Failed to fetch family children" }, 500);
  }
});

// Create a child in a family
app.post("/make-server-f53ad318/families/:familyId/children", async (c) => {
  try {
    const familyId = c.req.param("familyId");
    const body = await c.req.json();
    const { id, name, color, avatarConfig } = body;
    
    if (!id || !name || !color) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    // Ensure family exists
    let family = await kv.get(`family:${familyId}`);
    if (!family) {
      family = {
        id: familyId,
        name: "My Family",
        createdAt: new Date().toISOString(),
      };
      await kv.set(`family:${familyId}`, family);
    }
    
    const child = { id, name, color, avatarConfig, familyId, emoji: '👤' };
    await kv.set(`child:${id}`, child);
    
    return c.json({ child });
  } catch (error) {
    console.error("Error creating child:", error);
    return c.json({ error: "Failed to create child" }, 500);
  }
});

// Update a child
app.put("/make-server-f53ad318/children/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { name, color, avatarConfig } = body;
    
    const existingChild = await kv.get(`child:${id}`);
    if (!existingChild) {
      return c.json({ error: "Child not found" }, 404);
    }
    
    const updatedChild = {
      ...existingChild,
      name: name !== undefined ? name : existingChild.name,
      color: color !== undefined ? color : existingChild.color,
      avatarConfig: avatarConfig !== undefined ? avatarConfig : existingChild.avatarConfig,
    };
    
    await kv.set(`child:${id}`, updatedChild);
    
    return c.json({ child: updatedChild });
  } catch (error) {
    console.error("Error updating child:", error);
    return c.json({ error: "Failed to update child" }, 500);
  }
});

// Delete a child
app.delete("/make-server-f53ad318/children/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingChild = await kv.get(`child:${id}`);
    if (!existingChild) {
      return c.json({ error: "Child not found" }, 404);
    }
    
    await kv.del(`child:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting child:", error);
    return c.json({ error: "Failed to delete child" }, 500);
  }
});

Deno.serve(app.fetch);