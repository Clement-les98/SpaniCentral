let allJobs = [];

async function loadJobs() {

  const response =
    await fetch(
      "http://localhost:5000/api/jobs"
    );

  allJobs =
    await response.json();

  displayJobs(allJobs);

}

function displayJobs(jobs) {

  const jobsContainer =
    document.getElementById("jobs");

  jobsContainer.innerHTML = "";

  jobs.forEach(job => {

    jobsContainer.innerHTML += `

      <div class="job-card">

        <h3>${job.title}</h3>

        <p>${job.company}</p>

        <p>${job.location}</p>

        <p>${job.type}</p>
        <p>${job.salary}</p>


      </div>

    `;

  });

}

function filterJobs(type) {

  const filteredJobs =

    allJobs.filter(job =>

      job.type === type

    );

  displayJobs(filteredJobs);

}

loadJobs();

function searchJobs() {

  const search =
    document
      .getElementById("search")
      .value
      .trim();

  if (!search) {

    alert("Please enter a job title or location.");

    return;

  }

  window.location.href =
    `/jobs?search=${encodeURIComponent(search)}`;

}

