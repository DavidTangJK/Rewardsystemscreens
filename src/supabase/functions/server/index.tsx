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

Deno.serve(app.fetch);