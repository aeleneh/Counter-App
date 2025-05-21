let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let totalEl = document.getElementById("total-el")
let count = 0
let totalCount = 0 // Track the running total

function increment() {
    count += 1
    countEl.textContent = count
}

function save() {
    // Don't save if count is 0
    if (count === 0) return;
    
    let countStr = count + " - "
    saveEl.textContent += countStr
    
    // Add the current count to the running total
    totalCount += count
    
    // Update the total display
    updateTotalDisplay()
    
    // Reset the current count
    countEl.textContent = 0
    count = 0
}

// Function to update the total display
function updateTotalDisplay() {
    totalEl.textContent = "Total: " + totalCount
}

// Function to calculate the sum from the saved entries
function calculateTotal() {
    // Get the saved entries text
    let entriesText = saveEl.textContent.replace("Previous entries: ", "");
    
    // If there's no data yet, return 0
    if (!entriesText) return 0;
    
    // Extract all numbers from the string (assuming format "1 - 2 - 3 - " etc.)
    let numbers = entriesText.split('-').map(item => item.trim()).filter(item => item !== "");
    
    // Convert to numbers and sum them
    let sum = numbers.reduce((total, num) => total + parseInt(num || 0), 0);
    
    return sum;
}

// Function to display the total (verifies our running total is correct)
function showTotal() {
    let calculatedSum = calculateTotal();
    
    // Check if our running total matches the calculated sum from entries
    if (calculatedSum !== totalCount) {
        console.log("Note: Calculated sum (" + calculatedSum + ") differs from running total (" + totalCount + ")");
        // Update to the calculated value if there's a discrepancy
        totalCount = calculatedSum;
        updateTotalDisplay();
    }
    
    // Visual feedback that the total was calculated
    totalEl.style.fontSize = "3rem";
    setTimeout(() => {
        totalEl.style.fontSize = "2.5rem";
    }, 200);
}