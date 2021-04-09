// jquery selector for all save buttons
let saveButtonEl = $('.save');

console.log(saveButtonEl)

// jquery selector for all text areas
let textAreaEl = $('textarea')
// let textAreaEl = document.querySelectorAll('textarea')

console.log(textAreaEl[4].value)

// jquery selector for all delete buttons
let deleteButtonEl = $('.delete')

console.log(deleteButtonEl)

// jquery selector for reset button
let resetButtonEl = $('.reset')

console.log(resetButtonEl)

// On page load: load date to header
$('#currentDay').text(moment().format('MMMM Do, YYYY'));

// On page load: get info in local storage and display it
let savedSchedule = JSON.parse(localStorage.getItem('savedSchedule'));
console.log(savedSchedule)

if (savedSchedule != null) {
    for(let eachTask of savedSchedule) {
        for(let eachTime of textAreaEl) {
            console.log(eachTime.getAttribute("data-time"))
            console.log(eachTask)
            if(eachTask.time === eachTime.getAttribute("data-time")) {
                eachTime.value = eachTask.task
                console.log(eachTime.value)
                console.log(eachTask.task)
            }
        }
    }
}

// on page load compare current time with the value of each span

let timeNow = moment().hour() - 8 

console.log(timeNow)

for (let i = 0; i<textAreaEl.length; i++) {
    // if the time has passed, assign background color of next text area to gray
    if(i<timeNow) {
        $(textAreaEl[i]).addClass('past')

    // if the time now, assign the color to be yellow
    } else if(i===timeNow) {
        $(textAreaEl[i]).addClass('present')

    // if the time is in the future, assign the background color to red
    } else {
        $(textAreaEl[i]).addClass('future')
    }
}


// Functions

// save array function
function saveSchedule(event) {

// get the value of all the text areas and save to an array and save the array to local storage

    let savedEvent = {
        task: event.currentTarget.parentNode.childNodes[3].value,
        time: event.currentTarget.parentNode.childNodes[3].getAttribute("data-time")
    }

    console.log(savedEvent.task)
    console.log(savedEvent.time)

    if (savedSchedule === null) {
        savedSchedule = [savedEvent];
        localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
        console.log('you added your first item. it is ' + savedSchedule.task)
        return

    } else {
        // let savedSchedule = JSON.parse(localStorage.getItem('savedSchedule'));
        for(let each of savedSchedule) {
            if(each.time === savedEvent.time) {
                each.task = savedEvent.task
                each.time = savedEvent.time

                localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
                console.log('you replaced an item')
                return
            } 
        }

        savedSchedule.push(savedEvent)
        localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
        console.log('you added an item to the array')
        return

    } 

}


// reload page?



// delete item function
function deleteItem(event) {

    let task = event.target.parentNode.childNodes[3]
    let time = task.getAttribute("data-time")
    console.log(task.value)
    console.log(time)



// nav to the closest text area and remove content

// call save schedule function
// saveSchedule()

}

// jquery event listener for the save button
saveButtonEl.on('click', saveSchedule)




// jquery event listener for the delete buttons
deleteButtonEl.on('click', deleteItem) 


// get the value of all the text areas and save to an array and save the array to local storage



// considerations - the delete button should be disabled unless there is some thing in the text area.

// a couple of building block functions



// function to evaluate if there is information in a text area and enable the delete button and reset button

// function for setting background colors
