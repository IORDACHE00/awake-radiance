import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { supabase } from "../..";
import { noteFormDataSchema } from "../../schema/note.schema";
import { authMiddleware } from "../../middleware/auth-middleware";
import { TUser } from "../../schema/user.schema";

type Variables = {
  user: TUser;
};

const notes = new Hono<{ Variables: Variables }>().basePath("/notes");

notes.post(
  "/",
  zValidator("json", noteFormDataSchema),
  authMiddleware,
  async (c) => {
    try {
      const { id: userId } = c.get("user");

      const { title, content } = await c.req.json();

      const { data: insertedNote, error: insertNoteError } = await supabase
        .from("notes")
        .insert({
          user_id: userId,
          title,
          content,
        })
        .select("*")
        .single();

      if (insertNoteError) {
        return c.json(
          { success: false, error: { message: "Failed to create note" } },
          500
        );
      }

      return c.json({
        success: true,
        message: "Note created successfully",
        data: {
          note: insertedNote,
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        return c.json(
          { success: false, error: { message: "Internal server error!" } },
          500
        );
      }

      return c.json({ success: false, error: { message: error.message } }, 500);
    }
  }
);

notes.get("/", authMiddleware, async (c) => {
  try {
    const { id: userId } = c.get("user");

    const { search, isArchived, page } = c.req.query();

    const pageSize = 12;
    const start = (parseInt(page, 10) - 1) * pageSize;
    const end = start + pageSize - 1;

    let query = supabase.from("notes").select("*").eq("user_id", userId);

    if (search) query.ilike("title", `%${search}%`);

    if (isArchived) query.eq("is_archived", isArchived);

    const { data: notes, error: fetchNotesError } = await query.range(
      start,
      end
    );

    if (fetchNotesError) {
      return c.json(
        { success: false, error: { message: "Failed to fetch notes" } },
        500
      );
    }

    return c.json({
      success: true,
      data: {
        notes,
      },
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      return c.json(
        { success: false, error: { message: "Internal server error!" } },
        500
      );
    }

    return c.json({ success: false, error: { message: error.message } }, 500);
  }
});

notes.get("/:noteId", authMiddleware, async (c) => {
  try {
    const noteId = c.req.param("noteId");

    const { data: note, error: fetchNoteError } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .single();

    if (fetchNoteError) {
      return c.json(
        { success: false, error: { message: "Failed to fetch note" } },
        500
      );
    }

    if (!note) {
      return c.json(
        { success: false, error: { message: "Note not found" } },
        404
      );
    }

    return c.json({
      success: true,
      data: {
        note,
      },
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      return c.json(
        { success: false, error: { message: "Internal server error!" } },
        500
      );
    }

    return c.json({ success: false, error: { message: error.message } }, 500);
  }
});

notes.patch(
  "/:noteId",
  zValidator("json", noteFormDataSchema),
  authMiddleware,
  async (c) => {
    try {
      const { id: userId } = c.get("user");
      const noteId = c.req.param("noteId");

      const { title, content, is_archived } = await c.req.json();

      const { data: updatedNote, error: updateNoteError } = await supabase
        .from("notes")
        .update({
          title,
          content,
          is_archived,
          updated_at: new Date().toISOString(),
        })
        .eq("id", noteId)
        .eq("user_id", userId)
        .select("*")
        .single();

      if (updateNoteError) {
        return c.json(
          { success: false, error: { message: "Failed to update note" } },
          500
        );
      }

      if (!updatedNote) {
        return c.json(
          { success: false, error: { message: "Note not found" } },
          404
        );
      }

      return c.json({
        success: true,
        message: "Note updated successfully",
        data: {
          note: updatedNote,
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        return c.json(
          { success: false, error: { message: "Internal server error!" } },
          500
        );
      }

      return c.json({ success: false, error: { message: error.message } }, 500);
    }
  }
);

notes.delete("/:noteId", authMiddleware, async (c) => {
  try {
    const { id: userId } = c.get("user");
    const noteId = c.req.param("noteId");

    const { error: deleteNoteError } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("user_id", userId)
      .select("*")
      .single();

    if (deleteNoteError) {
      return c.json(
        { success: false, error: { message: "Failed to delete note" } },
        500
      );
    }

    return c.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    if (!(error instanceof Error)) {
      return c.json(
        { success: false, error: { message: "Internal server error!" } },
        500
      );
    }

    return c.json({ success: false, error: { message: error.message } }, 500);
  }
});

export default notes;
