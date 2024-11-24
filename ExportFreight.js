/// Handle Information Table
const infoForm = document.getElementById("infoForm");
const infoTableBody = document.querySelector("#infoTable tbody");

infoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const importer = document.getElementById("Importer").value;
    const address = document.getElementById("Address").value;
    const stuffingPermission = document.getElementById("StuffingPermission").value;
    const description = document.getElementById("Description").value;

    const newRow = `<tr>
        <td>${importer}</td>
        <td>${address}</td>
        <td>${stuffingPermission}</td>
        <td>${description}</td>
        <td><button class="btn delete">Delete</button></td>
    </tr>`;
    infoTableBody.innerHTML += newRow;
    infoForm.reset();
});

document.getElementById("infoTable").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
    }
});

// File Upload Handling
const fileInputContainer = document.getElementById("fileInputContainer");
const addFileButton = document.getElementById("addFileButton");
const fileList = document.getElementById("fileList");

function handleFileUpload(fileInput, viewButton) {
    let uploadedFileURL = "";

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const fileName = document.createElement("p");
            fileName.textContent = `Uploaded File: ${file.name}`;
            fileList.appendChild(fileName);

            uploadedFileURL = URL.createObjectURL(file);
            viewButton.style.display = "inline-block";
        }
    });

    viewButton.addEventListener("click", function () {
        if (uploadedFileURL) {
            window.open(uploadedFileURL, '_blank');
        } else {
            alert("Please select a file to view.");
        }
    });
}

const initialFileInput = fileInputContainer.querySelector(".fileInput");
const initialViewButton = fileInputContainer.querySelector(".viewButton");
handleFileUpload(initialFileInput, initialViewButton);

addFileButton.addEventListener("click", function () {
    const newWrapper = document.createElement("div");
    newWrapper.classList.add("file-input-wrapper");
    newWrapper.innerHTML = `
        <input type="file" class="fileInput" name="file" accept=".pdf" required>
        <button class="btn viewButton" type="button" style="display: none;">View PDF</button>
    `;
    fileInputContainer.appendChild(newWrapper);

    const newFileInput = newWrapper.querySelector(".fileInput");
    const newViewButton = newWrapper.querySelector(".viewButton");
    handleFileUpload(newFileInput, newViewButton);
});
    document.getElementById("calculateButton").addEventListener("click", function () {
    // Input values
    const principal = parseFloat(document.getElementById("principal").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const licenseExpense = parseFloat(document.getElementById("licenseExpense").value);
    const numYears = parseInt(document.getElementById("numYears").value);
    const bankCharge = parseFloat(document.getElementById("bankCharge").value);
    const insuranceAmount = parseFloat(document.getElementById("insuranceAmount").value);
    const warehouseRent = parseFloat(document.getElementById("warehouseRent").value);

    // Validation
    if (
        isNaN(principal) ||
        isNaN(interestRate) ||
        isNaN(licenseExpense) ||
        isNaN(numYears) ||
        isNaN(bankCharge) ||
        isNaN(insuranceAmount) ||
        isNaN(warehouseRent)
    ) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    if (numYears <= 0) {
        alert("Number of years must be greater than zero.");
        return;
    }

    // Calculations
    const interestAmount = (principal * interestRate) / 100; // Interest per annum
    const amortizedLicense = licenseExpense / numYears; // License expense per year
    const totalCharges =
        amortizedLicense + bankCharge + insuranceAmount + warehouseRent; // Total charges
    const totalAmount = interestAmount + totalCharges; // Total amount including interest
    const difference = interestAmount - totalCharges; // Difference between interest and total charges

    // Display results
    document.getElementById("interestAmount").textContent = interestAmount.toFixed(2);
    document.getElementById("amortizedLicense").textContent = amortizedLicense.toFixed(2);
    document.getElementById("totalCharges").textContent = totalCharges.toFixed(2);
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
    document.getElementById("difference").textContent = difference.toFixed(2);
});
