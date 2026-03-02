// /js/forms/template1/projects.js

import { createInputField, createFileInput, createPreviewButton } from '../utils.js';

// Helper function to rebuild only the dynamic content of the projects section
function rebuildProjectsContent(contentElement, data) {
    // Find or create the main list container
    let projectListContainer = contentElement.querySelector('.project-list');
    if (!projectListContainer) {
        projectListContainer = document.createElement('div');
        projectListContainer.className = 'project-list';
        // Insert it after the 'Enable Images' toggle
        const toggle = contentElement.querySelector('.section-controls');
        toggle.after(projectListContainer);
    } else {
        projectListContainer.innerHTML = ''; // Clear only the list
    }

    // --- Build each project item form ---
    data.projects.list.forEach((projectItem, index) => {
        const itemForm = document.createElement('div');
        itemForm.className = 'project-item-form';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-project-item-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Delete Project';
        deleteBtn.onclick = () => {
            window.isFormDirty = true;
            data.projects.list.splice(index, 1);
            window.sendFullUpdate();
            rebuildProjectsContent(contentElement, data); // Local rebuild
        };
        itemForm.appendChild(deleteBtn);

        itemForm.appendChild(createInputField('Project Title', `projects.list.${index}.title`, projectItem.title, 'text', { wordLimit: 5 }));
        itemForm.appendChild(createInputField('Description', `projects.list.${index}.description`, projectItem.description, 'textarea', { wordLimit: 20 }));
        itemForm.appendChild(createInputField('Project URL', `projects.list.${index}.link`, projectItem.link));
        
        if (data.projects.imagesEnabled) {
            const imageInputGroup = createFileInput(`Image`, (fileUrl) => {
                projectItem.imageUrl = fileUrl;
                window.sendFullUpdate();
            }, 'image/*');
            
            const guidance = document.createElement('p');
            guidance.className = 'input-guidance';
            guidance.textContent = 'A landscape image is recommended for the best view.';
            imageInputGroup.appendChild(guidance);
            
            itemForm.appendChild(imageInputGroup);
        }

        projectListContainer.appendChild(itemForm);
    });
    
    // --- Rebuild the "Add Project" button ---
    let addBtn = contentElement.querySelector('.add-project-btn');
    if (addBtn) addBtn.remove();

    if (data.projects.list.length < 10) {
        addBtn = document.createElement('button');
        addBtn.className = 'add-item-btn add-project-btn';
        addBtn.textContent = '+ Add Project';
        addBtn.onclick = () => {
            window.isFormDirty = true;
            data.projects.list.push({
                id: Date.now(), title: '', description: '', imageUrl: '', link: ''
            });
            window.sendFullUpdate();
            rebuildProjectsContent(contentElement, data); // Local rebuild
        };
        projectListContainer.after(addBtn);
    }
}

// --- MAIN BUILD FUNCTION (Builds the static shell ONCE) ---

function buildTemplate1ProjectsForm(formContainer, data, previewDoc) {
    if (!data.projects.enabled) return;

    const section = document.createElement('div');
    section.className = 'form-section';
    section.dataset.sectionKey = 'projects';

    const header = document.createElement('div');
    header.className = 'form-section-header';
    header.innerHTML = `
        <h4>Projects</h4>
        <div class="header-controls">
            <button class="delete-section-btn" title="Remove Projects Section">&times;</button>
            <div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
        </div>
    `;

    const content = document.createElement('div');
    content.className = 'form-section-content';

    // --- Build static elements ---
    const masterToggleWrapper = document.createElement('div');
    masterToggleWrapper.className = 'section-controls';
    masterToggleWrapper.innerHTML = `<label for="enable-project-images-toggle">Enable Project Images</label><input type="checkbox" id="enable-project-images-toggle">`;
    const enableToggle = masterToggleWrapper.querySelector('#enable-project-images-toggle');
    enableToggle.checked = data.projects.imagesEnabled;
    enableToggle.onchange = (e) => {
        window.isFormDirty = true;
        data.projects.imagesEnabled = e.target.checked;
        window.sendFullUpdate();
        rebuildProjectsContent(content, data); // Local rebuild
    };
    content.appendChild(masterToggleWrapper);
    
    // Scrape default projects from iframe on first load only
    if (data.projects.list.length === 0 && previewDoc.readyState === 'complete') {
        const scrapedProjects = Array.from(previewDoc.querySelectorAll('.projects-grid .project-card')).map((item, index) => ({
            id: Date.now() + index,
            title: item.querySelector('h3')?.textContent || '',
            description: item.querySelector('p')?.textContent || '',
            imageUrl: item.querySelector('img')?.getAttribute('src') || '',
            link: item.querySelector('.project-links a')?.getAttribute('href') || ''
        }));
        if (scrapedProjects.length > 0) {
            data.projects.list = scrapedProjects;
        }
    }
    
    // Perform the first render of the dynamic content
    rebuildProjectsContent(content, data);

    // Add the preview button at the very end
    content.appendChild(createPreviewButton('projects'));

    section.appendChild(header);
    section.appendChild(content);
    formContainer.appendChild(section);
}

export default buildTemplate1ProjectsForm;