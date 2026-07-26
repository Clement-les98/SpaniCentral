//load jobs

const db = require("../config/db");

exports.getJobs = (req, res) => {

    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const search = req.query.search?.trim() || "";

    const type = req.query.type?.trim() || "";

    let whereClause = "WHERE 1=1";

    const values = [];

    // Search
    if (search) {

        whereClause += `
            AND (
                title LIKE ?
                OR company LIKE ?
                OR location LIKE ?
            )
        `;

        values.push(
            `%${search}%`,
            `%${search}%`,
            `%${search}%`
        );

    }

    // Filter by job type
    if (type) {

        whereClause += " AND LOWER(type) = LOWER(?)";

        values.push(type);

    }

    // Count all matching jobs
    const countQuery = `
        SELECT COUNT(*) AS total
        FROM jobs
        ${whereClause}
    `;

    db.query(

        countQuery,

        values,

        (err, countResult) => {

            if (err) {

                return res.status(500).json(err);

            }

            const totalJobs = countResult[0].total;

            const totalPages =
                Math.ceil(totalJobs / limit);

            const jobsQuery = `
                SELECT *
                FROM jobs
                ${whereClause}
                ORDER BY created_at DESC
                LIMIT ?
                OFFSET ?
            `;

            db.query(

                jobsQuery,

                [...values, limit, offset],

                (err, jobs) => {

                    if (err) {

                        return res.status(500).json(err);

                    }

                    res.json({

                        jobs,

                        currentPage: page,

                        totalPages,

                        totalJobs

                    });

                }

            );

        }

    );

};
//add job
exports.addJob = (req, res) => {

  const {
    title,
    company,
    location,
    type,
    qualification,
    salary,
    closing_date,
    experience_level,
    work_mode,
    application_email,
    description,
    apply_link
  } = req.body;

  const company_logo = req.file
    ? req.file.path
    : null;

  const sql = `
    INSERT INTO jobs (
      title,
      company,
      location,
      type,
      qualification,
      salary,
      closing_date,
      experience_level,
      work_mode,
      application_email,
      company_logo,
      description,
      apply_link
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      company,
      location,
      type,
      qualification,
      salary,
      closing_date,
      experience_level,
      work_mode,
      application_email,
      company_logo,
      description,
      apply_link
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to add job"
        });
      }

      res.status(201).json({
        message: "Job added successfully"
      });

    }
  );
};
 //get job by id

exports.getJobById = (req, res) => {

  const id = req.params.id;

  const sql =
    "SELECT * FROM jobs WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(result[0]);

  });

};

//delete job

exports.deleteJob = (req, res) => {

  const id = req.params.id;

  const sql =
    "DELETE FROM jobs WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Job deleted successfully"
    });

  });

};
//update
exports.updateJob = (req, res) => {

  const id = req.params.id;

  const {
    title,
    company,
    location,
    type,
    qualification,
    salary,
    closing_date,
    experience_level,
    work_mode,
    application_email,
    description,
    apply_link
  } = req.body;

  const getCurrentLogoSql =
    "SELECT company_logo FROM jobs WHERE id = ?";

  db.query(
    getCurrentLogoSql,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Failed to fetch current logo"
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Job not found"
        });
      }

      const company_logo = req.file
        ? req.file.path
        : result[0].company_logo;

      const updateSql = `
        UPDATE jobs
        SET
          title = ?,
          company = ?,
          location = ?,
          type = ?,
          qualification = ?,
          salary = ?,
          closing_date = ?,
          experience_level = ?,
          work_mode = ?,
          application_email = ?,
          company_logo = ?,
          description = ?,
          apply_link = ?
        WHERE id = ?
      `;

      db.query(
        updateSql,
        [
          title,
          company,
          location,
          type,
          qualification,
          salary,
          closing_date,
          experience_level,
          work_mode,
          application_email,
          company_logo,
          description,
          apply_link,
          id
        ],
        (err, result) => {

          if (err) {
            console.log(err);

            return res.status(500).json({
              message: "Failed to update job"
            });
          }

          res.json({
            message: "Job updated successfully"
          });

        }
      );

    }
  );

};