const arr = JSON.parse(localStorage.getItem('random'));

localStorage.removeItem('random');

const rowColumnObject = JSON.parse(localStorage.getItem('rows-columns-object'));
localStorage.removeItem('rows-columns-object');

const noOfRows = Number(rowColumnObject.rows);
const gridTemplateRowsStr = generateGridTemplateStr(noOfRows);
const noOfColumns = Number(rowColumnObject.columns);
const gridTemplateColumnsStr = generateGridTemplateStr(noOfColumns);
let roomNumber = 1;

const roomStudents = noOfRows * noOfColumns;
const noOfRooms = Math.ceil(arr.length / roomStudents);
const roomsClassArray = [];


for (let i = 0; i < noOfRooms; i++){
    roomsClassArray.push(`room-number-${i+1}`);
}

let html = totalHTML();
document.querySelector('body').innerHTML = html;
roomsClassArray.forEach((classItem) => {
    changeGridProperty(classItem);
})


function totalHTML() {
    let html = '';
    html += ` 
        <div style="display: flex; justify-content: center;">
        <div class="main-container">
    `;
    while (arr.length > 0) {
        html += roomContainerHTML();
    }
    html += `
        </div>
        </div>
    `;
    return html;
}

function roomContainerHTML () {
    let html = '<div class="room-elements-container">';
    const roomNumberContainerHTMLString = roomNumberContainerHTML();
    const individualRoomStudentsContainerHTMLString = individualRoomStudentsContainerHTML();
    html += roomNumberContainerHTMLString;
    html += individualRoomStudentsContainerHTMLString;
    html += '</div>';
    roomNumber++;
    return html;
}

function roomNumberContainerHTML () {
    let html = `
        <div class="room-number-container">ROOM ${roomNumber}</div>
    `;
    return html;
}

function individualRoomStudentsContainerHTML () {
    let html = `<div class="seating-container room-number-${roomNumber}">`;
    const generatedHTML = individualRoomStudentsHTML();
    html += generatedHTML;
    html += `</div>`;
    return html;
}

function  individualRoomStudentsHTML () {
    let html = '';

    let count = roomStudents;
    let pointingIndex = 0;
    let index = 0;
    let columnCount = 0;

    while (count > 0) {
        while (columnCount < noOfColumns) {
            try {   
                html += `
                    <div class="seat-container">
                        <div class="seat">
                            <div class="roll-no">
                                ${arr[index].rollNo} 
                            </div>
                            <div class="branch">
                                ${arr[index].generatedId} 
                            </div>
                        </div>
                    </div>
                `;
            } catch (error) {

            }
            index += noOfRows;
            columnCount ++;
            count--;
        }
        columnCount = 0;
        pointingIndex++;
        index = pointingIndex;
    }

    arr.splice(0,roomStudents);
    return html;
}

function changeGridProperty (str) {
    const element = document.querySelector(`.${str}`);
    element.style.setProperty('grid-template-columns',gridTemplateColumnsStr)
    element.style.setProperty('grid-template-rows',gridTemplateRowsStr)
}

function generateGridTemplateStr (input) {
    let html = '';
    for(let i = 0; i < input; i++) {
        html += '1fr ';
    }
    return html;
}
