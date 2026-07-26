
let currentPage = 1;

const limit = 10;

// Open Job Details
function viewJob(id) {

    window.location.href = `/job-details?id=${id}`;

}

// Read URL Parameters
const params = new URLSearchParams(window.location.search);

const type = params.get("type") || "";

const search = params.get("search") || "";

// Load Jobs
async function loadJobs(page = 1) {

    currentPage = page;

    try {

        let url =
            `http://localhost:5000/api/jobs?page=${page}&limit=${limit}`;

        if (type) {

            url += `&type=${encodeURIComponent(type)}`;

            document.getElementById("pageTitle").textContent = type;

        }

        if (search) {

            url += `&search=${encodeURIComponent(search)}`;

            document.getElementById("pageTitle").textContent =
                `Search Results for "${search}"`;

        }

        const response = await fetch(url);

        const data = await response.json();

        displayJobs(data.jobs);

        renderPagination(

            data.currentPage,

            data.totalPages

        );

    }

    catch (error) {

        console.log(error);

    }

}

// Display Jobs
function displayJobs(jobs) {

    const jobsContainer =

        document.getElementById("jobs");

    jobsContainer.innerHTML = "";

    if (jobs.length === 0) {

        jobsContainer.innerHTML =

            "<h2>No jobs found.</h2>";

        return;

    }

    jobs.forEach(job => {

        jobsContainer.innerHTML += `

        <div class="job-card">

            <img

                src="http://localhost:5000/${job.company_logo}"

                alt="${job.company}"

                class="company-logo">

            <h3>${job.title}</h3>

            <p><strong>Company:</strong> ${job.company}</p>

            <p><strong>Location:</strong> ${job.location}</p>

            <p><strong>Type:</strong> ${job.type}</p>

            <p><strong>Salary:</strong>

                ${job.salary || "Not Specified"}

            </p>

            <button

                onclick="viewJob(${job.id})">

                View Details

            </button>

        </div>

        `;

    });

}

// Pagination
function renderPagination(currentPage, totalPages) {

    const pagination =

        document.getElementById("pagination");

    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous
    if (currentPage > 1) {

        pagination.innerHTML +=

        `<button onclick="loadJobs(${currentPage - 1})">

            Previous

        </button>`;

    }

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML +=

        `<button

            class="${

                i === currentPage

                ? "active"

                : ""

            }"

            onclick="loadJobs(${i})">

            ${i}

        </button>`;

    }

    // Next
    if (currentPage < totalPages) {

        pagination.innerHTML +=

        `<button onclick="loadJobs(${currentPage + 1})">

            Next

        </button>`;

    }

}

// Initial Load
loadJobs();

