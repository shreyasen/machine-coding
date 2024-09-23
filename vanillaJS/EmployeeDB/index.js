(async function () {
  try {
    const data = await fetch("./employeeData.json");
    const res = await data.json();

    let employees = res;

    let selectedEmployeeId = employees[0].id;
    let selectedEmployeeObj = employees[0];

    const empNameList = document.querySelector(".employees__names--list");
    const empInfo = document.querySelector(".employees__single--info");

    const createEmpButton = document.querySelector(".createEmployee");
    const addEmployeeContainer = document.querySelector(".addEmployee");
    const addEmpForm = document.querySelector(".addEmployee__create");

    //open modal on button click
    createEmpButton.addEventListener("click", () => {
      addEmployeeContainer.style.display = "flex";
    });

    // close modal if clicked on gray outside area
    addEmployeeContainer.addEventListener("click", (e) => {
      if (e.target.className === "addEmployee")
        addEmployeeContainer.style.display = "none";
    });

    //add employee
    addEmpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(addEmpForm);

      const values = [...formData.entries()];

      const newEmpObj = {};

      values.forEach((val) => {
        newEmpObj[val[0]] = val[1];
      });
      newEmpObj.id = employees.length + 1;

      employees.push(newEmpObj);

      addEmployeeContainer.style.display = "none";
      renderEmployees();
    });

    // select one employee
    empNameList.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
        selectedEmployeeId = e.target.id;
        renderEmployees();
        renderEmpInfo();
      }

      //delete
      if (e.target.tagName === "I") {
        employees = employees.filter(
          (emp) => String(emp.id) !== e.target.parentNode.id
        );
        if (String(selectedEmployeeId) === e.target.parentNode.id) {
          selectedEmployeeId = employees[0]?.id || -1;
          selectedEmployeeObj = employees[0];
        }
        renderEmpInfo();
        renderEmployees();
      }
    });
    // render list
    const renderEmployees = () => {
      empNameList.innerHTML = "";
      employees.forEach((element) => {
        const newNode = document.createElement("span");
        newNode.classList.add("employee__names--item");

        if (Number(selectedEmployeeId) === element.id) {
          newNode.classList.add("selected");
          selectedEmployeeObj = element;
        }
        newNode.setAttribute("id", element.id);
        newNode.innerHTML = `${element.firstName} ${element.lastName} <i class="employee-delete">❌</i>`;

        empNameList.append(newNode);
      });
    };

    //render single emp info
    const renderEmpInfo = () => {
      empInfo.innerHTML = "";
      if (selectedEmployeeId === -1) {
        return;
      }
      empInfo.innerHTML = `<div>
      <div>${selectedEmployeeObj.firstName} ${selectedEmployeeObj.lastName}</div>
      <div>${selectedEmployeeObj.email}</div>
      <div>${selectedEmployeeObj.phone}</div></div>`;
    };

    renderEmployees();

    if (selectedEmployeeObj) {
      renderEmpInfo();
    }
  } catch (error) {
    console.log(error);
  }
})();
