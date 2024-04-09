const formData = document.getElementById("taxForm");

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  // Retrieve values from input fields
  const annualIncome =
    parseFloat(document.getElementById("annualIncome").value) || 0;
  const extraIncome =
    parseFloat(document.getElementById("extraIncome").value) || 0;
  const age = document.getElementById("ageGroup").value || 0;
  const deductions =
    parseFloat(document.getElementById("applicableDeductions").value) || 0;

  if (annualIncome == 0) {
    return 0;
  }
  const tax = calculateTax(age, annualIncome, extraIncome, deductions);
  /**
   * Show the modal after tax calculation.
   */
  document.getElementById("myModal").style.display = "flex";
  const result = document.getElementById("result");
  result.innerText = formatIndianNumber(tax);
});

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
});

function calculateTax(age, annualIncome, extraIncome, deductions) {
  console.log(age, annualIncome, extraIncome, deductions);
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

/**
 * validateInput for inputs validation...
 */
function validateInput() {
  const annualIncome = document.getElementById("annualIncome");
  annualIncome.addEventListener("input", (e) => {
    const annualIncome = e.target.value;
    console.log("annualIncome e ", annualIncome);
  });
}

/**
 *  formatIndianNumber
 */
function formatIndianNumber(tax) {
  const suffixes = ["", "Lakh", "Crore"];
  let i = 0;

  while (tax >= 100000) {
    // Adjusted the condition to consider lakh as the next unit
    tax /= 100000; // Dividing by 100000 for each lakh
    i++;
  }

  if (i > 0) {
    return `${tax.toFixed(1)} ${suffixes[i]}`;
  } else {
    return `${tax.toFixed(2)} ${suffixes[i]}`;
  }
}
