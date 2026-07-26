const params =
  new URLSearchParams(
    window.location.search
  );

const jobId =
  params.get("id");



async function loadJob() {

  const response =
    await fetch(
      `http://localhost:5000/api/jobs/${jobId}`
    );

  const job =
    await response.json();

  displayJob(job);

}

loadJob();

function displayJob(job) {

    document.getElementById("jobTitle").textContent =
        job.title;

    document.getElementById("companyName").textContent =
        job.company;

    document.getElementById("jobLocation").textContent =
        "📍 " + job.location;

    document.getElementById("jobType").textContent =
        job.type;

    document.getElementById("workMode").textContent =
        job.work_mode;

    document.getElementById("experience").textContent =
        job.experience_level;

    document.getElementById("salary").textContent =
        job.salary || "Negotiable";

    document.getElementById("qualification").textContent =
        job.qualification;

    document.getElementById("description").textContent =
        job.description;

    document.getElementById("closingDate").textContent =
        new Date(job.closing_date).toLocaleDateString(
            "en-ZA",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    document.getElementById("applicationEmail").textContent =
        job.application_email || "Not Provided";

    document.getElementById("companyLogo").src =
        `http://localhost:5000/${job.company_logo}`;

    document.getElementById("applyBtn").onclick = () => {

        window.open(job.apply_link, "_blank");

    };

}

