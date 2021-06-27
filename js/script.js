var input = document.getElementById("filter-jobs");

input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector(".button-container").click();
    }
});

document.querySelector(".button-container").addEventListener("click", () => {
    let searchText = document.getElementById("filter-jobs").value;
    console.log("Filter: ", searchText);
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, searchText);
        console.log("Filtered Jobs: ", filteredJobs);
        showJobs(filteredJobs);
    })
})

function getJobs() {
    return fetch("data.json")
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function filterJobs(jobs, searchText) {
    if (searchText) {
        let filteredItems = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.requirements.content.toLowerCase().
                    includes(searchText)) {
                return true;
            }
            else {
                return false;
            }
        })
        return filteredItems;
    }
    else {
        return jobs;
    }
}

function showJobs(jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    let jobCount = 0;
    let jobsListHeading = document.querySelector(".jobs-list h1");

    jobs.forEach(job => {
        jobCount++;
        jobsHTML += `
            <div class="job-card">
                <div class="top">
                    <img src="${job.logo}" alt="Company Logo">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="roleName">
                    <h2>
                        ${job.roleName}
                    </h2>
                </div>
                <div class="description">
                    ${job.requirements.content}
                </div>
                <div class="buttons">
                    <a href="${job.applicationLink}" class="button apply-now">
                        Apply Now
                    </a>
                    <a href="${job.website}" class="button message">
                        Message
                    </a>
                </div>
            </div>
        `
    });

    jobsContainer.innerHTML = jobsHTML;

    jobsListHeading.innerHTML = `Showing ${jobCount} Jobs`;

}

// Initial loaded application content
getJobs().then(data => {
    showJobs(data);
})