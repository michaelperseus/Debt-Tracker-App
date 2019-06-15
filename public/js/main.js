const submitDebtForm = document.getElementById("newDebtForm");
const searchDebtForm = document.getElementById("searchDebtForm");


submitDebtForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = submitDebtForm.querySelector("#debtName").value;
    const startingBalance = submitDebtForm.querySelector("#startingBalance").value;
    const minimumPayment = submitDebtForm.querySelector("#minimumPayment").value;
    const dueDate = submitDebtForm.querySelector("#dueDate").value;
    const autopay = submitDebtForm.querySelector("#autopayOn").checked;

    var request = new XMLHttpRequest();
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

searchDebtForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = searchDebtForm.querySelector("#searchDebtName").value;
    console.log(name);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.status == 200) {
            document.getElementById("remaining").innerHTML = this.response;
            console.log(this.response);
       }
    };
    request.open("GET", `/seeDebt/${name}`, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

})

