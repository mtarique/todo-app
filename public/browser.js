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