// /js/forms/template1/footer.js

// Step 1: Import the necessary helper functions from utils.js
import { createInputField, createPreviewButton } from '../utils.js';

// The main function, which will be the default export.
function buildTemplate1FooterForm(formContainer, data, previewDoc) {
    if (!data.footer.enabled) return;
    
    // On the very first run, if 'year' and 'name' haven't been set, scrape them from the template.
    if (data.footer.year === null && data.footer.name === null && previewDoc.readyState === 'complete') {
        const footerP = previewDoc.querySelector('.footer p');
        if (footerP) {
            const fullText = footerP.textContent.trim(); // e.g., "© 2023 John Doe. All Rights Reserved."
            // Use regex to find the year and the name.
            const match = fullText.match(/©\s*(\d{4})\s*([^.]+)\./);
            if (match) {
                data.footer.year = match[1] || new Date().getFullYear().toString();
                data.footer.name = match[2] || 'Your Name';
            } else {
                // Provide a safe fallback if the default text doesn't match the pattern.
                data.footer.year = new Date().getFullYear().toString();
                data.footer.name = 'Your Name';
            }
        }
    }
    
    // Create the main accordion container
    const section = document.createElement('div');
    section.className = 'form-section';
    section.dataset.sectionKey = 'footer';

    const header = document.createElement('div');
    header.className = 'form-section-header';
    header.innerHTML = `
        <h4>Footer Section</h4>
        <div class="header-controls" style="display: flex; align-items: center;">
            <button class="delete-section-btn" title="Remove Footer Section">&times;</button>
            <div class="arrow">
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2.75"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     width="20" height="20">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
    `;

    // Create the collapsible content area
    const content = document.createElement('div');
    content.className = 'form-section-content';
    
    // Build and append the standard form fields using the helper function from utils.js
    content.appendChild(createInputField('Copyright Year', 'footer.year', data.footer.year));
    content.appendChild(createInputField('Copyright Name', 'footer.name', data.footer.name));
    
    // Add a separator for clarity
    content.appendChild(document.createElement('hr'));

    // Build the "Custom Text" override field with a 10-word limit
    const customTextOptions = { wordLimit: 10, minHeight: 80 };
    content.appendChild(
        createInputField('Custom Override Text (replaces the above)', 'footer.customText', data.footer.customText, 'textarea', customTextOptions)
    );
    content.appendChild(createPreviewButton('footer'));
    
    // Assemble the final section
    section.appendChild(header);
    section.appendChild(content);
    formContainer.appendChild(section);
}

// Step 2: Add the export default line at the end.
export default buildTemplate1FooterForm;