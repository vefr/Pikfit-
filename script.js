document.addEventListener("DOMContentLoaded", () => {
    const outfitForm = document.getElementById("outfitForm");
    const outfitImageContainer = document.getElementById("outfitImage");

    outfitForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Clear previous results
        outfitImageContainer.innerHTML = '';

        // Display loading indicator
        displayMessage("Generating outfit suggestions...", "loading");

        try {
            const userInputs = gatherUserInputs();
            validateInputs(userInputs);

            const outfitVariations = await generateOutfitVariations(userInputs);
            displayOutfits(outfitVariations);
        } catch (error) {
            displayMessage(error.message, "error");
        }
    });
});

// Gather and validate user inputs
function gatherUserInputs() {
    return {
        weather: document.getElementById("weather").value.trim(),
        timeOfDay: document.getElementById("timeOfDay").value.trim(),
        hairColor: document.getElementById("hairColor").value,
        userImage: document.getElementById("userImage").files[0]
    };
}

// Validate user inputs
function validateInputs(inputs) {
    if (!inputs.weather || !inputs.timeOfDay || !inputs.hairColor || !inputs.userImage) {
        throw new Error("All fields are required. Please complete the form.");
    }

    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validImageTypes.includes(inputs.userImage.type)) {
        throw new Error("Invalid image format. Please upload a JPEG, PNG, WEBP, or GIF image.");
    }
}

// Simulate generating outfit variations (can be replaced with API integration)
async function generateOutfitVariations(inputs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const baseOutfits = [
                "Casual Outfit: T-shirt + Jeans + Sneakers",
                "Smart Outfit: Button-down Shirt + Chinos + Loafers",
                "Formal Outfit: Suit + Tie + Dress Shoes"
            ];

            const variations = baseOutfits.map(outfit =>
                `${outfit} - Ideal for ${inputs.timeOfDay} in ${inputs.weather} weather with hair color ${inputs.hairColor}.`
            );
            resolve(variations);
        }, 1000); // Simulated processing delay
    });
}

// Display outfit suggestions with image preview
function displayOutfits(outfitVariations) {
    const outfitImageContainer = document.getElementById("outfitImage");
    outfitImageContainer.innerHTML = '';

    // Create and display image preview
    const imagePreview = document.createElement("img");
    imagePreview.src = URL.createObjectURL(document.getElementById("userImage").files[0]);
    imagePreview.alt = "User Image Preview";
    imagePreview.style.width = "150px";
    imagePreview.style.borderRadius = "10px";
    imagePreview.style.marginBottom = "15px";
    outfitImageContainer.appendChild(imagePreview);

    // Create and display outfit variations
    outfitVariations.forEach(variation => {
        const outfitElement = document.createElement("p");
        outfitElement.textContent = variation;
        outfitElement.style.padding = "10px";
        outfitElement.style.marginBottom = "10px";
        outfitElement.style.border = "1px solid #e0e0e0";
        outfitElement.style.borderRadius = "8px";
        outfitElement.style.backgroundColor = "#f9f9f9";
        outfitImageContainer.appendChild(outfitElement);
    });

    displayMessage("Outfit suggestions generated successfully!", "success");
}

// Display messages (success, error, loading)
function displayMessage(message, type) {
    const outfitImageContainer = document.getElementById("outfitImage");
    const messageElement = document.createElement("p");
    messageElement.textContent = message;

    // Apply styles based on message type
    switch (type) {
        case "loading":
            messageElement.style.color = "#4ecdc4";
            break;
        case "error":
            messageElement.style.color = "#ff4e4e";
            break;
        case "success":
            messageElement.style.color = "#5d5fef";
            break;
        default:
            messageElement.style.color = "#333";
    }

    messageElement.style.marginBottom = "15px";
    messageElement.style.fontWeight = "600";
    outfitImageContainer.appendChild(messageElement);
}