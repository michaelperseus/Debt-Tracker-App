//Creates the variables for the forms
const submitDebtForm = document.getElementById("newDebtForm");
const searchDebtForm = document.getElementById("searchDebtForm");

//Creates the Debt
submitDebtForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = submitDebtForm.querySelector("#debtName").value;
    const startingBalance = submitDebtForm.querySelector("#startingBalance").value;
    const minimumPayment = submitDebtForm.querySelector("#minimumPayment").value;
    const dueDate = submitDebtForm.querySelector("#dueDate").value;
    const autopay = submitDebtForm.querySelector("#autopayOn").checked;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.status == 201) {
            document.getElementById("created").innerHTML = this.response;
       }
    };
    request.open("POST", "/newDebt", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        name,
        startingBalance,
        minimumPayment,
        dueDate,
        autopay
    }));

})

//Returns the requested debt's remaining balance
searchDebtForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = searchDebtForm.querySelector("#searchDebtName").value;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.status == 200 || this.status == 404) {
            document.getElementById("remaining").innerHTML = this.response;
       }
    };
    request.open("GET", `/seeDebt/${name}`, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

})

