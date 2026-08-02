
 //Get the job
const jobsTableBody =
  document.getElementById("jobsTableBody");

async function loadJobs() {

  try {

    const response =
    await fetch(
       "/api/jobs?page=1&limit=10000"
    );

const data =
    await response.json();

const jobs =
    data.jobs;

    jobsTableBody.innerHTML = "";

    jobs.forEach(job => {

      jobsTableBody.innerHTML += `

      <tr>

        <td>${job.title}</td>

        <td>${job.company}</td>

        <td>${job.location}</td>

        <td>${job.type}</td>

        <td>${job.salary || "N/A"}</td>

        <td>

          <button
            onclick="editJob(${job.id})">

            Edit

          </button>

          <button
            onclick="deleteJob(${job.id})">

            Delete

          </button>

        </td>

      </tr>

      `;

    });

  }

  catch(error) {

    console.log(error);

  }

}
console.log("JS Loaded");

loadJobs();


//Add job
const form = document.getElementById("jobForm");


form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData();

  formData.append(
    "title",
    document.getElementById("title").value
  );

  formData.append(
    "company",
    document.getElementById("company").value
  );

  formData.append(
    "location",
    document.getElementById("location").value
  );

  formData.append(
    "type",
    document.getElementById("type").value
  );

  formData.append(
    "qualification",
    document.getElementById("qualification").value
  );

  formData.append(
    "salary",
    document.getElementById("salary").value
  );

  formData.append(
    "closing_date",
    document.getElementById("closing_date").value
  );

  formData.append(
    "experience_level",
    document.getElementById("experience_level").value
  );

  formData.append(
    "work_mode",
    document.getElementById("work_mode").value
  );

  formData.append(
    "application_email",
    document.getElementById("application_email").value
  );

  formData.append(
    "description",
    document.getElementById("description").value
  );

  formData.append(
    "apply_link",
    document.getElementById("apply_link").value
  );

  formData.append(
    "company_logo",
    document.getElementById("company_logo").files[0]
  );

 let url =
  "/api/jobs";

let method =
  "POST";

if (jobId) {

 url =
    `/api/jobs/${jobId}`;

  method =
    "PUT";

}

const response = await fetch(url, {
  method,
  credentials: "include",
  body: formData
});

const data =
  await response.json();

alert(data.message);

window.location.href =
  "/admin/dashboard";

});

  // edit job
const params =
  new URLSearchParams(
    window.location.search
  );

const jobId =
  params.get("id");

  if (jobId) {

  loadJob(jobId);

}

 function editJob(id) {

    window.location.href =
        `/admin/add-job?id=${id}`;

}

async function loadJob(id) {

  try {
const response = await fetch(
  `/api/jobs/${id}`
);
    const job = await response.json();

    document.getElementById("title").value =
      job.title || "";

    document.getElementById("company").value =
      job.company || "";

    document.getElementById("location").value =
      job.location || "";

    document.getElementById("type").value =
      job.type || "";

    document.getElementById("qualification").value =
      job.qualification || "";

    document.getElementById("salary").value =
      job.salary || "";

    document.getElementById("experience_level").value =
      job.experience_level || "";

    document.getElementById("work_mode").value =
      job.work_mode || "";

    document.getElementById("closing_date").value =
      job.closing_date
        ? job.closing_date.split("T")[0]
        : "";

    document.getElementById("application_email").value =
      job.application_email || "";

    document.getElementById("apply_link").value =
      job.apply_link || "";

    document.getElementById("description").value =
      job.description || "";

    if (job.company_logo) {

      document.getElementById(
        "logoPreview"
      ).src =
       `/${job.company_logo}`;

    }

    document.getElementById(
      "submitBtn"
    ).textContent =
      "Update Job";

  }

  catch(error) {

    console.log(
      "Error loading job:",
      error
    );

  }

}
//delete job

async function deleteJob(id) {

  const confirmed =
    confirm("Delete this job?");

  if (!confirmed) return;

  try {
await fetch(
  `/api/jobs/${id}`,
  {
        method: "DELETE"
      }
    );

    loadJobs();

  }

  catch(error) {

    console.log(error);

  }

}
 //logout
 async function logout(){

    await fetch(

    "/api/auth/logout",

    {

            method:"POST",

            credentials:"include"

        }

    );

    window.location.href="/admin/login";

}