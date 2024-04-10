const formData = document.getElementById("taxForm");

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  // Retrieve values from input fields
  const annualIncome =
    parseFloat(document.getElementById("annualIncome").value) || 0;
  const extraIncome =
    parseFloat(document.getElementById("extraIncome").value) || 0;
  const age = document.getElementById("ageGroup").selectedOptions[0].value || 0;
  const deductions =
    parseFloat(document.getElementById("applicableDeductions").value) || 0;

  // Hide all error messages initially
  const errorMessages = document.querySelectorAll(".errorMsg");
  errorMessages.forEach((errorMsg) => {
    errorMsg.style.visibility = "hidden";
  });

  // Validate inputs
  let hasError = false;
  if (!annualIncome) {
    displayErrorMessage("annualIncome");
    hasError = true;
  }
  if (!extraIncome) {
    displayErrorMessage("extraIncome");
    hasError = true;
  }
  if (!age) {
    displayErrorMessage("ageGroup");
    hasError = true;
  }
  if (!deductions) {
    displayErrorMessage("applicableDeductions");
    console.log("deductions ", deductions);
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const tax = calculateTax(age, annualIncome, extraIncome, deductions);
  document.getElementById("myModal").style.display = "flex";
  const result = document.getElementById("result");
  const incomeAfterTax = annualIncome + extraIncome - deductions - tax;
  const resultText = `<p class="heading">Your Overall Income will be</p> ${formatIndianNumber(
    incomeAfterTax
  )} <p class='description'>after tax deduction.</p>`;
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = resultText;
});

// Function to display error message
function displayErrorMessage(elementId, visibility) {
  const errorMsg = document.querySelector(`#${elementId} ~ .errorMsg`);
  errorMsg.style.visibility = visibility || "visible";
}

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  const modal = document.getElementById("myModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Close modal when clicking close button
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
  window.location.reload();
});

function calculateTax(age, annualIncome, extraIncome, deductions) {
  const overallIncome = annualIncome + extraIncome - deductions;

  if (overallIncome <= 800000) {
    return 0; // No tax
  } else {
    let taxableAmount = overallIncome - 800000;

    // Applying tax rates based on age
    if (age < 40) {
      return taxableAmount * 0.3; // 30% tax rate
    } else if (age >= 40 && age < 60) {
      return taxableAmount * 0.4; // 40% tax rate
    } else {
      return taxableAmount * 0.1; // 10% tax rate
    }
  }
}

function formatIndianNumber(tax) {
  const suffixes = ["", "Lakh", "Crore"];
  let i = 0;

  while (tax >= 100000) {
    tax /= 100000; // Dividing by 100000 for each lakh
    i++;
  }

  if (i > 0) {
    return `${tax.toFixed(1)} ${suffixes[i]}`;
  } else {
    return `${tax.toFixed(2)} ${suffixes[i]}`;
  }
}

/**
 * validateInput for inputs validation...
 */
function validateInput(elementId) {
  var input = document.getElementById(elementId).value.trim(); // Trim whitespace

  if (input === "") {
    console.log("Input is empty");
    return; // Exit the function if input is empty
  }

  // Check if input matches a valid number format
  var isValidNumber = /^-?\d*\.?\d+(?:e[+-]?\d+)?$/.test(input);

  if (!isValidNumber) {
    displayErrorMessage(elementId);
    hasError = true;
  } else {
    displayErrorMessage(elementId, "hidden");
  }
}
