function itemTemplate(item) {
    return `
        <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
            <button data-id="${item._id}" class="edit-task btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${item._id}" class="delete-task btn btn-danger btn-sm">Delete</button>
            </div>
        </li>
    `
}

// Initial Page Load Render
let ourHTML = items.map(function(item) {
    return `
        <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
            <button data-id="${item._id}" class="edit-task btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${item._id}" class="delete-task btn btn-danger btn-sm">Delete</button>
            </div>
        </li>
    `
}).join('')

document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)

// Create Feature
let new_task = document.getElementById('create-field')
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault()

    axios.post('/create-item', {text: new_task.value}).then(function(response) {
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))

        new_task.value = ""
        new_task.focus()
    }).catch(function() {
        console.log("Please try again later.")
    }) 
})

document.addEventListener("click", function(e) {
    // Delete task 
    if(e.target.classList.contains("delete-task")) { 
        if(confirm("Are you sure you want to delete this task?")) {
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function() {
                // Do something intresting here in the next video
                e.target.parentElement.parentElement.remove()
            }).catch(function() {
                console.log("Please try again later.")
            }) 
        }
    }

    // Update task
    if(e.target.classList.contains("edit-task")) {
        let userInput = prompt("Enter your desired new text.", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

        if(userInput) {
            axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
                // Do something intresting here in the next video
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function() {
                console.log("Please try again later.")
            })   
        }
    }
})