// /js/forms/template1/experience.js

import { createInputField, createPreviewButton } from '../utils.js';

// Helper function to rebuild only the dynamic content of the experience section
function rebuildExperienceContent(contentElement, data) {
    // Find existing dynamic elements or create them if they don't exist
    let listContainer = contentElement.querySelector('.experience-list');
    if (!listContainer) {
        listContainer = document.createElement('div');
        listContainer.className = 'experience-list';
        contentElement.prepend(listContainer); // Prepend to add it at the top
    } else {
        listContainer.innerHTML = ''; // Clear only the list if it already exists
    }

    // --- Build the list of experience items ---
    data.experience.list.forEach((expItem, index) => {
        const itemForm = document.createElement('div');
        itemForm.className = 'experience-item-form';

        const deleteItemBtn = document.createElement('button');
        deleteItemBtn.className = 'delete-experience-item-btn';
        deleteItemBtn.innerHTML = '&times;';
        deleteItemBtn.title = 'Delete Experience Item';
        deleteItemBtn.onclick = () => {
            window.isFormDirty = true;
            data.experience.list.splice(index, 1);
            window.sendFullUpdate();
            rebuildExperienceContent(contentElement, data); // Re-render this section
        };
        itemForm.appendChild(deleteItemBtn);

        itemForm.appendChild(createInputField('Job Title', `experience.list.${index}.title`, expItem.title));
        itemForm.appendChild(createInputField('Company Name', `experience.list.${index}.company`, expItem.company));

        const dateRangeGroup = document.createElement('div');
        dateRangeGroup.className = 'date-range-group';
        
        dateRangeGroup.appendChild(createInputField('Start Year', `experience.list.${index}.startYear`, expItem.startYear));
        
        const endYearInputGroup = createInputField('End Year', `experience.list.${index}.endYear`, expItem.endYear);
        const endYearInput = endYearInputGroup.querySelector('input');
        
        const presentGroup = document.createElement('div');
        presentGroup.className = 'present-checkbox-group';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `present-check-${expItem.id}`;
        checkbox.checked = expItem.isPresent;
        if (checkbox.checked) endYearInput.disabled = true;

        checkbox.onchange = (e) => {
            window.isFormDirty = true;
            expItem.isPresent = e.target.checked;
            endYearInput.disabled = e.target.checked;
            if(e.target.checked) {
                endYearInput.value = '';
                expItem.endYear = '';
            }
            window.sendFullUpdate();
        };

        const presentLabel = document.createElement('label');
        presentLabel.htmlFor = `present-check-${expItem.id}`;
        presentLabel.textContent = 'Present';
        
        presentGroup.appendChild(checkbox);
        presentGroup.appendChild(presentLabel);

        dateRangeGroup.appendChild(endYearInputGroup);
        dateRangeGroup.appendChild(presentGroup);
        itemForm.appendChild(dateRangeGroup);

        const pointsGroup = document.createElement('div');
        pointsGroup.className = 'form-group';
        pointsGroup.innerHTML = '<label>Achievements / Responsibilities</label>';
        
        const pointList = document.createElement('div');
        pointList.className = 'point-list';

        expItem.points.forEach((point, pointIndex) => {
            const pointItemForm = document.createElement('div');
            pointItemForm.className = 'point-item-form';

            const pointInput = document.createElement('input');
            pointInput.type = 'text';
            pointInput.value = point;
            pointInput.oninput = (e) => {
                window.isFormDirty = true;
                expItem.points[pointIndex] = e.target.value;
                window.sendFullUpdate();
            };

            const deletePointBtn = document.createElement('button');
            deletePointBtn.className = 'delete-item-btn';
            deletePointBtn.innerHTML = '&times;';
            deletePointBtn.title = 'Delete Point';
            deletePointBtn.onclick = () => {
                window.isFormDirty = true;
                expItem.points.splice(pointIndex, 1);
                window.sendFullUpdate();
                rebuildExperienceContent(contentElement, data); // Re-render this section
            };

            pointItemForm.appendChild(pointInput);
            pointItemForm.appendChild(deletePointBtn);
            pointList.appendChild(pointItemForm);
        });

        pointsGroup.appendChild(pointList);

        if (expItem.points.length < 5) { // Limit points per experience
            const addPointBtn = document.createElement('button');
            addPointBtn.className = 'add-item-btn';
            addPointBtn.textContent = '+ Add Achievement';
            addPointBtn.onclick = () => {
                window.isFormDirty = true;
                expItem.points.push('');
                window.sendFullUpdate();
                rebuildExperienceContent(contentElement, data); // Re-render this section
            };
            pointsGroup.appendChild(addPointBtn);
        }

        itemForm.appendChild(pointsGroup);
        listContainer.appendChild(itemForm);
    });
    
    // --- Fix for the Add Experience button ---
    let addExperienceBtn = contentElement.querySelector('.add-experience-btn');
    if (addExperienceBtn) {
        addExperienceBtn.remove();
    }

    if (data.experience.list.length < 10) {
        addExperienceBtn = document.createElement('button');
        addExperienceBtn.className = 'add-item-btn add-experience-btn'; // Add a specific class
        addExperienceBtn.textContent = '+ Add Experience';
        addExperienceBtn.onclick = () => {
            window.isFormDirty = true;
            data.experience.list.push({
                id: Date.now(), title: '', company: '', startYear: '', endYear: '', isPresent: false, points: ['']
            });
            window.sendFullUpdate();
            rebuildExperienceContent(contentElement, data); // Re-render this section
        };
        listContainer.after(addExperienceBtn);
    }
}

// The main function that builds the section structure ONCE.
function buildTemplate1ExperienceForm(formContainer, data, previewDoc) {
    if (!data.experience.enabled) return;

    const section = document.createElement('div');
    section.className = 'form-section';
    section.dataset.sectionKey = 'experience';

    const header = document.createElement('div');
    header.className = 'form-section-header';
    header.innerHTML = `
        <h4>Work Experience</h4>
        <div class="header-controls">
            <button class="delete-section-btn" title="Remove Experience Section">&times;</button>
            <div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
        </div>
    `;

    const content = document.createElement('div');
    content.className = 'form-section-content';

    // Scrape default experience from iframe on first load only
    if (data.experience.list.length === 0 && previewDoc.readyState === 'complete') {
        const scrapedExperience = Array.from(previewDoc.querySelectorAll('.timeline .timeline-item')).map((item, index) => {
            const companyElement = item.querySelector('.company');
            const dateText = companyElement ? companyElement.textContent.split('|')[1]?.trim() || '' : '';
            const [startYear, endYear] = dateText.split(' - ');
            return {
                id: Date.now() + index,
                title: item.querySelector('h3')?.textContent || '',
                company: companyElement ? companyElement.textContent.split('|')[0]?.trim() || '' : '',
                startYear: startYear || '',
                endYear: endYear === 'Present' ? '' : endYear || '',
                isPresent: endYear === 'Present',
                points: Array.from(item.querySelectorAll('ul li')).map(li => li.textContent)
            };
        });
        if (scrapedExperience.length > 0) {
            data.experience.list = scrapedExperience;
        }
    }
    
    // Build the dynamic content for the first time
    rebuildExperienceContent(content, data);
    
    // Add preview button at the very end to ensure it's at the bottom
    content.appendChild(createPreviewButton('experience'));
    
    section.appendChild(header);
    section.appendChild(content);
    formContainer.appendChild(section);
}

export default buildTemplate1ExperienceForm;