// /js/forms/template1/about.js

// Step 1: Import the necessary helper functions from utils.js
import { createInputField, createPreviewButton } from '../utils.js';

// The main function remains the same, but it will now be the default export.
function buildTemplate1AboutForm(formContainer, data, previewDoc) {
    if (!data.about.enabled) return;

    const aboutSection = document.createElement('div');
    aboutSection.className = 'form-section';
    aboutSection.dataset.sectionKey = 'about';

    const header = document.createElement('div');
    header.className = 'form-section-header';
    header.innerHTML = `
        <h4>About</h4>
        <div class="header-controls">
            <button class="delete-section-btn" title="Remove About Section">&times;</button>
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

    const content = document.createElement('div');
    content.className = 'form-section-content';

    // Scrape the default text from the live preview iframe.
    const defaultAbout = previewDoc.querySelector('#about1 p')?.textContent || '';

    // Initialize the data object if this is the first run.
    if (data.about.description === null) {
        data.about.description = defaultAbout;
    }

    // Now, create the input field using the reliable data object.
    content.appendChild(
        createInputField('About Me Paragraph', 'about.description', data.about.description, 'textarea', { wordLimit: 200, minHeight: 160 })
    );
    
    // The "Preview" button targets the <hr> tag with id="about" to scroll to.
    content.appendChild(createPreviewButton('about'));
    
    aboutSection.appendChild(header);
    aboutSection.appendChild(content);
    formContainer.appendChild(aboutSection);
}

// Step 2: Add the export default line at the end of the file.
export default buildTemplate1AboutForm;