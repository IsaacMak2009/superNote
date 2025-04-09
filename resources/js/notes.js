// --- Get references to the elements ---
const collapsedBar = document.getElementById('collapsed-note-bar');
const expandedForm = document.getElementById('expanded-note-form');
const titleInput = document.getElementById('note-title-input');
const contentInput = document.getElementById('note-content-input');
const closeButton = document.getElementById('close-note-form');
const noteForm = document.getElementById('note-form');
const coverUpload = document.getElementById('cover-upload');

// --- Get references for Tag elements ---
const tagsContainer = document.getElementById('tags-container');
const tagInput = document.getElementById('tag-input');
const hiddenTagsInput = document.getElementById('hidden-tags-input');

// --- State for Tags ---
let tags = []; // Array to store the tags

// --- Helper Functions for Tags ---

// Function to update the hidden input field and re-render tags visually
function updateTagsDisplayAndHiddenInput() {
    if (!tagsContainer || !tagInput || !hiddenTagsInput) return; // Safety check

    // Clear existing tags visually
    tagsContainer.querySelectorAll('.tag-item').forEach(tagEl => tagEl.remove());

    // Add tags back to the container
    tags.forEach(tag => {
        const tagElement = createTagElement(tag);
        tagsContainer.insertBefore(tagElement, tagInput); // Insert before the input field
    });

    // Update the hidden input value
    hiddenTagsInput.value = tags.join(','); // Store as comma-separated string

    // Optional: Adjust container height if needed (usually handled by flex-wrap)
}

// Function to create a visual tag element
function createTagElement(tag) {
    const tagElement = document.createElement('span');
    // Apply Tailwind classes for the tag appearance
    tagElement.classList.add(
        'tag-item', // Keep a generic class for easy selection if needed
        'inline-block',
        'bg-blue-100',
        'text-blue-800',
        'text-xs',
        'font-medium',
        'mr-1',
        'px-2.5',
        'py-0.5',
        'rounded-full'
        // `gap-2` on the parent container handles spacing between tags
    );
    tagElement.textContent = tag;

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('type', 'button');
    // Apply Tailwind classes for the remove button
    removeBtn.classList.add(
        'ml-2', // margin left to space from text
        'p-0', // no padding
        'border-none', // no border
        'bg-transparent', // no background
        'text-gray-600', // button color
        'hover:text-black', // hover color
        'font-bold', // font weight for the 'x'
        'text-base', // font size for the 'x'
        'leading-none', // ensure line height doesn't add extra space
        'cursor-pointer'
    );
    removeBtn.innerHTML = '&times;'; // 'x' symbol

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tags = tags.filter(t => t !== tag);
        updateTagsDisplayAndHiddenInput();
    });

    tagElement.appendChild(removeBtn);
    return tagElement;
}


// --- Event Listeners ---

// Cover Photo Upload
if (coverUpload) {
    coverUpload.addEventListener('change', (event) => {
        const coverPhotoContainer = document.getElementById('cover-upload-container');
        coverPhotoContainer.innerHTML = ''; // Clear any existing photo

        const coverPhoto = document.createElement('img');
        coverPhoto.classList.add('h-full', 'object-cover', 'rounded', 'filter', 'hover:grayscale', 'transition', 'duration-300', 'ease-in-out');
        
        coverPhoto.addEventListener('click', () => {
            coverPhotoContainer.innerHTML = '';
            coverPhotoContainer.classList.add('hidden');
        });

        coverPhotoContainer.classList.remove('hidden');
        coverPhotoContainer.appendChild(coverPhoto);

        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            coverPhoto.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    });
}

// Form Submission
if (noteForm) {
    noteForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default page reload

        // The hiddenTagsInput is already updated and part of the form
        const formData = new FormData(noteForm);

        // Log the data (including title, content, and tags)
        console.log("Form Data to be Submitted:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        console.log('Form submission logic would run here (e.g., fetch request).');

        // --- Example: Clear form after successful "submission" ---
        // In a real app, you'd do this in the 'success' part of your fetch/AJAX call
        // setTimeout(() => { // Simulate async operation
        //     noteForm.reset(); // Resets title, content, but NOT hidden input reliably across browsers
        //     titleInput.value = ''; // Explicit clear
        //     contentInput.value = ''; // Explicit clear
        //     tags = []; // Clear tags array
        //     updateTagsDisplayAndHiddenInput(); // Clear tags visually and hidden input
        //     // Optionally collapse the form again
        //     closeButton.click(); // Simulate click on close button
        // }, 500);
        // --- End Example ---
    });
}

// 1. Click on collapsed bar to expand
if (collapsedBar) {
    collapsedBar.addEventListener('click', () => {
        collapsedBar.classList.remove('opacity-100', 'scale-100'); // Added remove base state
        collapsedBar.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            collapsedBar.classList.add('hidden');

            if (expandedForm) {
                expandedForm.classList.remove('hidden');
                // Ensure initial state for animation is set *before* adding final state classes
                expandedForm.classList.add('opacity-0', 'scale-95');

                requestAnimationFrame(() => { // Use rAF for smoother transition start
                    requestAnimationFrame(() => {
                        expandedForm.classList.remove('opacity-0', 'scale-95');
                        expandedForm.classList.add('opacity-100', 'scale-100');
                    });
                });


                if (titleInput) {
                    // Focus the title input slightly after animation starts
                    setTimeout(() => titleInput.focus(), 50); // Reduced delay
                }
            }
        }, 150); // Corresponds to transition duration-150
    });
}

// 2. Click on 'Close' button to collapse
if (closeButton) {
    closeButton.addEventListener('click', () => {
        if (expandedForm) {
            expandedForm.classList.remove('opacity-100', 'scale-100');
            expandedForm.classList.add('opacity-0', 'scale-95');

            setTimeout(() => {
                expandedForm.classList.add('hidden');

                // Clear fields and tags when closing
                if (titleInput) titleInput.value = '';
                if (contentInput) contentInput.value = '';
                tags = []; // Clear the tags array
                updateTagsDisplayAndHiddenInput(); // Update the display (clears visual tags and hidden input)

                if (collapsedBar) {
                    // Ensure initial state for animation is set *before* adding final state classes
                    collapsedBar.classList.remove('hidden'); // Make sure it's not hidden first
                    collapsedBar.classList.add('opacity-0', 'scale-95'); // Set animation start state

                    requestAnimationFrame(() => { // Use rAF for smoother transition start
                        requestAnimationFrame(() => {
                            collapsedBar.classList.remove('opacity-0', 'scale-95');
                            collapsedBar.classList.add('opacity-100', 'scale-100');
                        });
                    });
                }
            }, 300); // Match transition duration-300
        }
    });
}

// --- Event Listeners for Tags ---

// 3. Handle input in the tag field
if (tagInput) {
    tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission on Enter

            const newTag = tagInput.value.trim().toLowerCase(); // Standardize to lowercase

            // Add tag if it's not empty and not already included
            if (newTag && !tags.includes(newTag)) {
                tags.push(newTag);
                updateTagsDisplayAndHiddenInput(); // Update display and hidden input
            }
            tagInput.value = ''; // Clear the input field
        } else if (e.key === 'Backspace' && tagInput.value === '' && tags.length > 0) {
            // Optional: Remove last tag on backspace if input is empty
            e.preventDefault();
            tags.pop(); // Remove the last tag from the array
            updateTagsDisplayAndHiddenInput(); // Update display and hidden input
        }
    });
}

// 4. Optional: Focus the tag input when clicking the container area
if (tagsContainer) {
    tagsContainer.addEventListener('click', () => {
        if (tagInput) {
            tagInput.focus();
        }
    });
}

// --- Initial state setup (optional) ---
// Call once on load in case there are pre-filled tags (e.g., editing a note)
// For a new note, this just ensures the hidden input is initially empty if tags array is empty.
updateTagsDisplayAndHiddenInput();