// jquery selectors 
let saveButtonEl = $('.save');
let textAreaEl = $('textarea')
let deleteButtonEl = $('.delete')
let resetButtonEl = $('.reset')

// --------------   On page load ----------------

// load date to header
$('#currentDay').text(dayjs().format('MMMM D, YYYY'));

// get info in local storage and display it
let savedSchedule = JSON.parse(localStorage.getItem('savedSchedule'));

if (savedSchedule != null) {
    for(let eachTask of savedSchedule) {
        for(let eachTime of textAreaEl) {
            if(eachTask.time === eachTime.getAttribute("data-time")) {
                eachTime.value = eachTask.task
            }
        }
    }
}

// set colors based on current time
let timeNow = dayjs().hour() - 8 

for (let i = 0; i<textAreaEl.length; i++) {
    
    if(i<timeNow) {
        $(textAreaEl[i]).addClass('past')
    } else if(i===timeNow) {
        $(textAreaEl[i]).addClass('present')
    } else {
        $(textAreaEl[i]).addClass('future')
    }
}

// enable the delete and reset buttons as needed
enableDelete()

// --------- Functions ------------------

// save array function
function saveSchedule(event) {

    let savedEvent = {
        task: event.currentTarget.parentNode.childNodes[3].value,
        time: event.currentTarget.parentNode.childNodes[3].getAttribute("data-time")
    }

    if(savedEvent.task != ''){

        if (savedSchedule === null) {
            savedSchedule = [savedEvent];
            localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
            enableDelete()
            return

        } else {
            
            for(let each of savedSchedule) {
                if(each.time === savedEvent.time) {
                    each.task = savedEvent.task
                    each.time = savedEvent.time

                    localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
                    enableDelete()
                    return
                } 
            }

            savedSchedule.push(savedEvent)
            localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
            enableDelete()
            return

        } 
    } else {
        alert('You have not entered any task for ' + savedEvent.time + 'PM')
    }

}

// delete item function
function deleteItem(event) {

    let task = event.currentTarget.parentNode.childNodes[3]
    let time = event.currentTarget.parentNode.childNodes[3].getAttribute("data-time")
    task.value = '';

    for(let i=0; i<savedSchedule.length; i++) {
        if(savedSchedule[i].time === time) {
            savedSchedule.splice(i,1)
            localStorage.setItem('savedSchedule', JSON.stringify(savedSchedule))
            console.log('you deleted an item')
        }
    }

    if(savedSchedule.length === 0) {
        resetSchedule()
    }

    enableDelete()

}

// enable delete and reset buttons function
function enableDelete() {

    for(let i=0; i<textAreaEl.length; i++) {
        let delButt = textAreaEl[i].parentNode.childNodes[7]
        
        if(textAreaEl[i].value != '') {        
            $(delButt).removeClass('disabled')
        } else {
            $(delButt).removeClass('disabled')
            $(delButt).addClass('disabled')
        }

    }

    if (savedSchedule != null) {
       
        if(savedSchedule.length != 0) {
            $(resetButtonEl).removeClass('disabled')
        } else {
            $(resetButtonEl).removeClass('disabled')
            $(resetButtonEl).addClass('disabled')
        }
    }
}

// reset schedule function
function resetSchedule() {
    localStorage.clear();
    location.reload();
}

// ---------------------- event listeners --------------
saveButtonEl.on('click', saveSchedule)
deleteButtonEl.on('click', deleteItem) 
resetButtonEl.on('click',resetSchedule)

