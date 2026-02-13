// updateJob – include contractor_id so "Assign contractor" on the job detail page persists.
// Only updates fields that are present in req.body, so you can send just { status } or
// just { contractor_id: null } to unassign. Copy this into your backend.

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const body = req.body as Record<string, unknown>;

    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (body.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(body.title);
    }
    if (body.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(body.description);
    }
    if (body.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(body.status);
    }
    if (body.priority !== undefined) {
      updates.push(`priority = $${paramIndex++}`);
      values.push(body.priority);
    }
    // contractor_id can be null to unassign
    if (body.contractor_id !== undefined) {
      updates.push(`contractor_id = $${paramIndex++}`);
      values.push(body.contractor_id ?? null);
    }
    if (body.customer_id !== undefined) {
      updates.push(`customer_id = $${paramIndex++}`);
      values.push(body.customer_id);
    }
    if (body.address !== undefined) {
      updates.push(`address = $${paramIndex++}`);
      values.push(body.address);
    }
    if (body.city !== undefined) {
      updates.push(`city = $${paramIndex++}`);
      values.push(body.city);
    }
    if (body.state !== undefined) {
      updates.push(`state = $${paramIndex++}`);
      values.push(body.state);
    }
    if (body.zip_code !== undefined) {
      updates.push(`zip_code = $${paramIndex++}`);
      values.push(body.zip_code);
    }
    if (body.pay_type !== undefined) {
      updates.push(`pay_type = $${paramIndex++}`);
      values.push(body.pay_type ?? null);
    }
    if (body.scheduled_date !== undefined) {
      updates.push(`scheduled_date = $${paramIndex++}`);
      values.push(body.scheduled_date ?? null);
    }
    if (body.scheduled_time !== undefined) {
      updates.push(`scheduled_time = $${paramIndex++}`);
      values.push(body.scheduled_time ?? null);
    }

    if (updates.length === 0) {
      res.status(400).json({ success: false, message: "No fields to update" });
      return;
    }

    updates.push("updated_at = NOW()");
    values.push(id);
    const result = await pool.query(
      `UPDATE jobs SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
      values,
    );

    if (result.rowCount === 0) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
