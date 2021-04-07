// jquery selector for all save buttons
let saveButtonEl = $('.save');

console.log(saveButtonEl)

// jquery selector for all text areas
let textAreaEl = $('textarea')

console.log(textAreaEl)

// jquery selector for all delete buttons
let deleteButtonEl = $('.delete')

console.log(deleteButtonEl)

// jquery selector for reset button
let resetButtonEl = $('.reset')

console.log(resetButtonEl)

// On page load: load date to header
$('#currentDay').text(moment().format('MMMM Do, YYYY'));

// On page load: get info in local storage and display it

// on page load compare current time with the value of each span

let timeNow = moment().hour() - 8 

console.log(timeNow)

for (let i = 0; i<textAreaEl.length; i++) {
    if(i<timeNow) {
        $(textAreaEl[i]).addClass('bg-primary')
    }
}

// if the time has passed, assign background color of next text area to gray
// if the time is in the future, assign the background color to beg green
// if the time now, assign the color to be yellow

// Functions

// save array function
function saveSchedule() {

// get the value of all the text areas and save to an array and save the array to local storage

// reload page?

}



// jquery event listener for the save button
saveButtonEl.on('click', saveSchedule)



// jquery event listener for the delete buttons
// nav to the closest text area and remove content
// get the value of all the text areas and save to an array and save the array to local storage



// considerations - the delete button should be disabled unless there is some thing in the text area.

// a couple of building block functions



// function to evaluate if there is information in a text area and enable the delete button and reset button

// function for setting background colors
