const addCourseBtn = document.querySelector(".add-btn");
const form = document.getElementById('form');
const formGroupCourse = form.querySelector('.form_group_course')

formGroupCourse.querySelector(".remove-btn").addEventListener("click", (e) => removeCourse(e, formGroupCourse.querySelector(".remove-btn")));;

form.addEventListener("submit", (e) => {
    e.preventDefault();
})
let removeCourseBtns;

// Add course
const addCourse = () => {
    // Create a new course and attach an event listener to the remove button
    const newFormGroup = form.children[0].cloneNode(true);
    form.append(newFormGroup);
    newFormGroup.querySelector(".remove-btn").addEventListener("click", (e) => removeCourse(e, newFormGroup.querySelector(".remove-btn")));;
}

addCourseBtn.addEventListener("click", addCourse)

// Remove course
const removeCourse = (e, removeCourseBtn) => {
    e.preventDefault();

    if (form.children.length > 1) {
        const formGroup = removeCourseBtn.parentNode.parentNode;
        formGroup.remove();
    }
}

// on form submit

const submitBtn = document.querySelector(".submit-btn");
const reducedInputs = [];
const submitForm = (e) => {
    e.preventDefault();
    
    const inputs = form.querySelectorAll("input");

    // Clean form data
    inputs.forEach((item, id) => {
        if (id % 2 != 0) {
            reducedInputs[(id - 1) / 2] = [inputs[id - 1].value, inputs[id].value];
        }
    });

    const selects = form.querySelectorAll("select");

    selects.forEach((item, id) => {
        reducedInputs[id].push(item.value);
    })

    var formData = reducedInputs.map((el) => {
        return {
            course: el[0],
            cu: el[1],
            grade: el[2],
        }
    });

    const resultTable = document.getElementById("result-table");

    const resultTableBody = document.createElement("tbody");

    const cuList = [];
    const qpList = [];
    formData.forEach((el, id) => {
        const tr = document.createElement('tr');

        const course = document.createElement('td');
        const cu = document.createElement('td');
        const grade = document.createElement('td');
        const qp = document.createElement('td');


        course.innerText = reducedInputs[id][0];
        cu.innerText = reducedInputs[id][1];
        grade.innerText = reducedInputs[id][2];

        // Calculate QP
        let qpValue;
        switch (reducedInputs[id][2]) {
            case 'A':
                qpValue = reducedInputs[id][1] * 5
                break;
            case 'B':
                qpValue = reducedInputs[id][1] * 4
                break;
            case 'C':
                qpValue = reducedInputs[id][1] * 3
                break;
            case 'D':
                qpValue = reducedInputs[id][1] * 2
                break;
            case 'E':
                qpValue = reducedInputs[id][1] * 1
                break;

            default:
                qpValue = 0
                break;
        }

        qp.textContent = qpValue;

        cuList.push(reducedInputs[id][1]);
        qpList.push(qpValue);

        // attach table data to table row
        tr.append(course);
        tr.append(cu);
        tr.append(grade);
        tr.append(qp);

        // attach table row to table body
        resultTableBody.append(tr);
    })

    // attach table body to table
    resultTable.appendChild(resultTableBody);

    // calculate and display total QP an CU
    console.log(qpList);
    console.log(cuList);
    const totalQP = qpList.reduce((curr, el) => { return curr + +el }, 0);
    console.log("totalQP: ", totalQP);
    const totalCU = cuList.reduce((curr, el) => { return curr + +el }, 0);
    console.log("totalCU: ", totalCU);


    // create last table row
    const finalRow = document.createElement('tr');

    const finalRowCourse = document.createElement('td');
    const finalRowCU = document.createElement('td');
    const finalRowGrade = document.createElement('td');
    const finalRowQP = document.createElement('td');

    finalRowCourse.innerText = 'Total: ';
    finalRowCU.innerText = totalCU;
    finalRowGrade.innerText = "Total QP: ";
    finalRowQP.innerText = totalQP;


    // attach table data to table row
    finalRow.append(finalRowCourse);
    finalRow.append(finalRowCU);
    finalRow.append(finalRowGrade);
    finalRow.append(finalRowQP);

    // style last row
    finalRow.style.fontWeight = 'bold';
    finalRow.style.background = 'chartreuse';

    // attach table body to table
    resultTableBody.appendChild(finalRow);

    // Calculate GPA
    const GPA = totalQP / totalCU;

    const GPAElement = document.createElement('div');

    GPAElement.innerText = `GPA = ${GPA}`;
    GPAElement.style.fontSize = '2rem';
    GPAElement.style.width = 'fit-content';
    GPAElement.style.margin = '2rem auto';

    const resultElement = document.querySelector(".result");

    resultElement.appendChild(GPAElement);

    GPAElement.scrollIntoView({behavior: "smooth"})
}
submitBtn.addEventListener("click", (e) => submitForm(e));