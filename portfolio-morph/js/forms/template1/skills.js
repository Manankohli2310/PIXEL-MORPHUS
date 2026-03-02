// /js/forms/template1/skills.js

import { createFileInput, createPreviewButton } from '../utils.js';

// --- HELPER FUNCTIONS (Specific to this module) ---

const skillIconMap = {
        'html': { class: 'fab fa-html5', name: 'HTML5' },
    'css': { class: 'fab fa-css3-alt', name: 'CSS3' },
    'javascript': { class: 'fab fa-js-square', name: 'JavaScript' },
    'react': { class: 'fab fa-react', name: 'React' },
    'node': { class: 'fab fa-node-js', name: 'Node.js' },
    'python': { class: 'fab fa-python', name: 'Python' },
    'java': { class: 'fab fa-java', name: 'Java' },
    'git': { class: 'fab fa-git-alt', name: 'Git' },
    'github': { class: 'fab fa-github', name: 'GitHub' },
    'docker': { class: 'fab fa-docker', name: 'Docker' },
    'figma': { class: 'fab fa-figma', name: 'Figma' },
    'sql': { class: 'fas fa-database', name: 'Database' },
    'js': 'javascript',
    'scss': 'css',
  // =========================
  // CORE TECHNOLOGIES
  // =========================

  'typescript': { class: 'fas fa-code', name: 'TypeScript' },
  'bootstrap': { class: 'fas fa-layer-group', name: 'Bootstrap' },
  'tailwind': { class: 'fas fa-wind', name: 'Tailwind CSS' },
  'redux': { class: 'fas fa-sync', name: 'Redux' },
  'nextjs': { class: 'fas fa-forward', name: 'Next.js' },
  'api': { class: 'fas fa-plug', name: 'API Integration' },
  'testing': { class: 'fas fa-vial', name: 'Testing' },
  'debugging': { class: 'fas fa-bug', name: 'Debugging' },
  'deployment': { class: 'fas fa-rocket', name: 'Deployment' },
  'cloud': { class: 'fas fa-cloud', name: 'Cloud Computing' },
  'aws': { class: 'fas fa-cloud', name: 'AWS' },
  'firebase': { class: 'fas fa-fire', name: 'Firebase' },
  'linux': { class: 'fas fa-terminal', name: 'Linux' },
  'security': { class: 'fas fa-shield-halved', name: 'Cyber Security' },
  'encryption': { class: 'fas fa-lock', name: 'Encryption' },
  'performance': { class: 'fas fa-gauge-high', name: 'Performance Optimization' },

  // =========================
  // MEDICAL INDUSTRY
  // =========================
  'medical': { class: 'fas fa-stethoscope', name: 'Medical Services' },
  'hospital': { class: 'fas fa-hospital', name: 'Hospital Management' },
  'pharmacy': { class: 'fas fa-pills', name: 'Pharmacy' },
  'surgery': { class: 'fas fa-user-doctor', name: 'Surgery' },
  'diagnostics': { class: 'fas fa-microscope', name: 'Diagnostics' },
  'lab': { class: 'fas fa-flask', name: 'Laboratory' },
  'heartbeat': { class: 'fas fa-heart-pulse', name: 'Cardiology' },
  'ambulance': { class: 'fas fa-ambulance', name: 'Emergency Care' },
  'vaccine': { class: 'fas fa-syringe', name: 'Vaccination' },
  'brain': { class: 'fas fa-brain', name: 'Neurology' },
  'dental': { class: 'fas fa-tooth', name: 'Dental Care' },
  'xray': { class: 'fas fa-x-ray', name: 'Radiology' },
  'wheelchair': { class: 'fas fa-wheelchair', name: 'Rehabilitation' },
  'clinic': { class: 'fas fa-house-medical', name: 'Clinic' },
  'health_app': { class: 'fas fa-mobile-screen', name: 'Health App' },

  // =========================
  // FINANCE INDUSTRY
  // =========================
  'bank': { class: 'fas fa-building-columns', name: 'Banking' },
  'credit_card': { class: 'fas fa-credit-card', name: 'Card Payments' },
  'loan': { class: 'fas fa-hand-holding-dollar', name: 'Loans' },
  'investment': { class: 'fas fa-chart-line', name: 'Investments' },
  'analytics': { class: 'fas fa-chart-pie', name: 'Financial Analytics' },
  'budget': { class: 'fas fa-wallet', name: 'Budgeting' },
  'crypto': { class: 'fas fa-coins', name: 'Cryptocurrency' },
  'tax': { class: 'fas fa-file-invoice-dollar', name: 'Tax Management' },
  'insurance': { class: 'fas fa-shield', name: 'Insurance' },
  'trading': { class: 'fas fa-arrow-trend-up', name: 'Stock Trading' },
  'invoice': { class: 'fas fa-receipt', name: 'Invoicing' },
  'payment_gateway': { class: 'fas fa-money-check-dollar', name: 'Payment Gateway' },

  // =========================
  // AUTOMOBILE INDUSTRY
  // =========================
  'car': { class: 'fas fa-car', name: 'Automobile' },
  'repair': { class: 'fas fa-screwdriver-wrench', name: 'Vehicle Repair' },
  'engine': { class: 'fas fa-cogs', name: 'Engine Systems' },
  'battery': { class: 'fas fa-car-battery', name: 'Battery' },
  'electric_vehicle': { class: 'fas fa-charging-station', name: 'Electric Vehicle' },
  'garage': { class: 'fas fa-warehouse', name: 'Garage' },
  'fuel': { class: 'fas fa-gas-pump', name: 'Fuel Systems' },
  'speed': { class: 'fas fa-tachometer-alt', name: 'Performance Tuning' },
  'gps': { class: 'fas fa-map-location-dot', name: 'Vehicle Tracking' },

  // =========================
  // E-COMMERCE
  // =========================
  'shopping': { class: 'fas fa-cart-shopping', name: 'Online Shopping' },
  'orders': { class: 'fas fa-box-open', name: 'Order Management' },
  'delivery': { class: 'fas fa-truck', name: 'Delivery' },
  'support': { class: 'fas fa-headset', name: 'Customer Support' },
  'discount': { class: 'fas fa-tags', name: 'Discounts' },
  'returns': { class: 'fas fa-rotate-left', name: 'Returns' },
  'review': { class: 'fas fa-star', name: 'Reviews' },

  // =========================
  // EDUCATION
  // =========================
  'education': { class: 'fas fa-graduation-cap', name: 'Education' },
  'course': { class: 'fas fa-book-open', name: 'Courses' },
  'exam': { class: 'fas fa-file-pen', name: 'Examination' },
  'certificate': { class: 'fas fa-certificate', name: 'Certification' },
  'library': { class: 'fas fa-book', name: 'Library' },
  'elearning': { class: 'fas fa-laptop', name: 'E-Learning' },
  'teacher': { class: 'fas fa-chalkboard-user', name: 'Teaching' },

  // =========================
  // REAL ESTATE
  // =========================
  'real_estate': { class: 'fas fa-house', name: 'Real Estate' },
  'construction': { class: 'fas fa-hard-hat', name: 'Construction' },
  'architecture': { class: 'fas fa-drafting-compass', name: 'Architecture' },
  'property': { class: 'fas fa-key', name: 'Property Sales' },
  'rent': { class: 'fas fa-building', name: 'Rental Services' },

  // =========================
  // CREATIVE & MEDIA
  // =========================
  'design': { class: 'fas fa-pen-ruler', name: 'Graphic Design' },
  'video': { class: 'fas fa-video', name: 'Video Production' },
  'camera': { class: 'fas fa-camera', name: 'Photography' },
  'branding': { class: 'fas fa-palette', name: 'Branding' },
  'marketing': { class: 'fas fa-bullhorn', name: 'Marketing' },
  'seo': { class: 'fas fa-magnifying-glass-chart', name: 'SEO' },

  // =========================
  // AUTO-DETECT ALIASES
  // =========================
  'js': 'javascript',
  'scss': 'css',
  'ts': 'typescript',
  'db': 'sql',
  'backend': 'node',
  'frontend': 'react',
  'med': 'medical',
  'fin': 'bank',
  'auto': 'car',
  'edu': 'education'
};
const categoryIcons = { 'Tech': 'fas fa-laptop-code', 'Design': 'fas fa-palette', 'Business': 'fas fa-briefcase', 'Science': 'fas fa-flask', 'Medical': 'fas fa-briefcase-medical', 'Tools': 'fas fa-tools' };

function predictIcons(skillName) {
    if (!skillName) return [{ class: 'fas fa-code', name: 'Generic' }];
    const lowerCaseSkill = skillName.toLowerCase();
    const matches = new Set();
    for (const keyword in skillIconMap) {
        let iconData = skillIconMap[keyword];
        if (typeof iconData === 'string') { iconData = skillIconMap[iconData]; }
        if (lowerCaseSkill.includes(keyword)) { matches.add(iconData); }
    }
    if (matches.size === 0) { matches.add({ class: 'fas fa-code', name: 'Generic' }); }
    return Array.from(matches).slice(0, 5);
}

// --- LOCAL REBUILD FUNCTION ---

function rebuildSkillsContent(contentElement, data) {
    // Find or create the main list container
    let skillListContainer = contentElement.querySelector('.skill-list');
    if (!skillListContainer) {
        skillListContainer = document.createElement('div');
        skillListContainer.className = 'skill-list';
        // Insert it after the 'Enable Icons' toggle
        const toggle = contentElement.querySelector('.section-controls');
        if (toggle) {
            toggle.after(skillListContainer);
        } else {
            contentElement.prepend(skillListContainer);
        }
    } else {
        skillListContainer.innerHTML = ''; // Clear only the list
    }

    // --- Build each skill item ---
    data.skills.list.forEach(skill => {
        const skillFormItem = document.createElement('div');
        skillFormItem.className = 'skill-item-form';

        const iconPreview = document.createElement('div');
        iconPreview.className = 'predicted-icon';
        const finalIcon = data.skills.globalIconOverride || skill.iconClass || predictIcons(skill.name)[0]?.class || 'fas fa-code';
        iconPreview.innerHTML = finalIcon.startsWith('data:image') ? `<img src="${finalIcon}">` : `<i class="${finalIcon}"></i>`;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = skill.name;
        input.placeholder = 'e.g., React';
        input.oninput = (e) => {
            window.isFormDirty = true;
            skill.name = e.target.value;
            if (!data.skills.globalIconOverride) {
                skill.iconClass = predictIcons(skill.name)[0]?.class;
                const updatedIcon = skill.iconClass;
                iconPreview.innerHTML = updatedIcon.startsWith('data:image') ? `<img src="${updatedIcon}">` : `<i class="${updatedIcon}"></i>`;
            }
            window.sendFullUpdate();
        };

        const manageBtn = document.createElement('button');
        manageBtn.className = 'manage-icon-btn';
        manageBtn.title = 'Manage Icon';
        manageBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg><span>Manage</span>`;

        manageBtn.onclick = (event) => {
            event.stopPropagation();
            // Pass the local rebuild function as the callback
            toggleIconDialog(skill, skillFormItem, data, () => rebuildSkillsContent(contentElement, data));
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-item-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.title = 'Delete Skill';
        deleteBtn.onclick = () => {
            window.isFormDirty = true;
            data.skills.list = data.skills.list.filter(s => s.id !== skill.id);
            window.sendFullUpdate();
            rebuildSkillsContent(contentElement, data); // Local rebuild
        };

        skillFormItem.appendChild(iconPreview);
        skillFormItem.appendChild(input);
        skillFormItem.appendChild(manageBtn);
        skillFormItem.appendChild(deleteBtn);
        skillListContainer.appendChild(skillFormItem);

        // Hide/show icon-related elements based on the master toggle
        iconPreview.style.display = data.skills.iconsEnabled ? '' : 'none';
        manageBtn.style.display = data.skills.iconsEnabled ? '' : 'none';
    });

    // --- Rebuild the "Add Skill" button ---
    let addBtn = contentElement.querySelector('.add-skill-btn');
    if (addBtn) addBtn.remove();

    if (data.skills.list.length < 15) {
        addBtn = document.createElement('button');
        addBtn.className = 'add-item-btn add-skill-btn';
        addBtn.textContent = '+ Add Skill';
        addBtn.onclick = () => {
            window.isFormDirty = true;
            const newIcon = data.skills.globalIconOverride || predictIcons('')[0]?.class || 'fas fa-code';
            data.skills.list.push({ id: Date.now(), name: '', iconClass: newIcon });
            window.sendFullUpdate();
            rebuildSkillsContent(contentElement, data); // Local rebuild
        };
        skillListContainer.after(addBtn);
    }
}


function toggleIconDialog(skill, parentElement, data, rebuildCallback) {
    const existingDialog = document.querySelector('.icon-dialog');
    if (existingDialog) existingDialog.remove();

    const dialog = document.createElement('div');
    dialog.className = 'icon-dialog';
    const currentIcon = data.skills.globalIconOverride || skill.iconClass;

    dialog.innerHTML = `<div class="icon-dialog-nav"><button data-tab="suggestions" class="active">Suggestions & Library</button><button data-tab="custom">Custom Upload</button></div><div id="tab-suggestions" class="icon-dialog-tab-content active"><p class="panel-label">Suggestions for "${skill.name || 'New Skill'}"</p><div class="icon-suggestion-grid"></div><div class="icon-library"><p class="panel-label">Or, set a universal icon for all skills</p><div class="category-grid"></div></div></div><div id="tab-custom" class="icon-dialog-tab-content"></div>`;
    parentElement.appendChild(dialog);

    const suggestionGrid = dialog.querySelector('.icon-suggestion-grid');
    predictIcons(skill.name).forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'icon-suggestion-item';
        if (currentIcon === suggestion.class && !data.skills.globalIconOverride) item.classList.add('selected');
        item.innerHTML = `<i class="${suggestion.class}"></i><span>${suggestion.name}</span>`;
        item.onclick = () => {
            window.isFormDirty = true;
            data.skills.globalIconOverride = null;
            skill.iconClass = suggestion.class;
            window.sendFullUpdate();
            rebuildCallback();
            dialog.remove();
        };
        suggestionGrid.appendChild(item);
    });

    const categoryGrid = dialog.querySelector('.category-grid');
    for (const category in categoryIcons) {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.innerHTML = `<i class="${categoryIcons[category]}"></i> ${category}`;
        btn.onclick = () => {
            window.isFormDirty = true;
            data.skills.globalIconOverride = categoryIcons[category];
            window.sendFullUpdate();
            rebuildCallback();
            dialog.remove();
        };
        categoryGrid.appendChild(btn);
    }

    const customTab = dialog.querySelector('#tab-custom');
    const onFileUpload = (fileUrl) => {
        const findSkillIndex = data.skills.list.findIndex(s => s.id === skill.id);
        if (findSkillIndex !== -1) {
            window.isFormDirty = true;
            data.skills.list[findSkillIndex].iconClass = fileUrl;
            data.skills.globalIconOverride = null;
            window.sendFullUpdate();
            rebuildCallback();
            dialog.remove();
        }
    };
    customTab.appendChild(createFileInput(`Upload Image (will be resized to 20x20)`, onFileUpload, 'image/*', { resizeTo: 20 }));

    dialog.querySelectorAll('.icon-dialog-nav button').forEach(button => {
        button.addEventListener('click', () => {
            dialog.querySelectorAll('.icon-dialog-nav button').forEach(btn => btn.classList.remove('active'));
            dialog.querySelectorAll('.icon-dialog-tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            dialog.querySelector(`#tab-${button.dataset.tab}`).classList.add('active');
        });
    });

    setTimeout(() => dialog.classList.add('visible'), 10);
}


// --- MAIN BUILD FUNCTION (Builds the static shell ONCE) ---

function buildTemplate1SkillsForm(formContainer, data, previewDoc) {
    if (!data.skills.enabled) return;

    const skillsSection = document.createElement('div');
    skillsSection.className = 'form-section';
    skillsSection.dataset.sectionKey = 'skills';

    const header = document.createElement('div');
    header.className = 'form-section-header';
    header.innerHTML = `<h4>Skills</h4><div class="header-controls"><button class="delete-section-btn" title="Remove Skills Section">&times;</button><div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div>`;

    const content = document.createElement('div');
    content.className = 'form-section-content';

    // --- Build static elements that don't need to be redrawn ---
    const masterToggleWrapper = document.createElement('div');
    masterToggleWrapper.className = 'section-controls';
    masterToggleWrapper.innerHTML = `<label for="enable-icons-toggle">Enable Icons</label><input type="checkbox" id="enable-icons-toggle">`;
    const enableToggle = masterToggleWrapper.querySelector('#enable-icons-toggle');
    enableToggle.checked = data.skills.iconsEnabled;
    enableToggle.onchange = (e) => {
        window.isFormDirty = true;
        data.skills.iconsEnabled = e.target.checked;
        window.sendFullUpdate();
        rebuildSkillsContent(content, data); // Local rebuild on toggle change
    };
    content.appendChild(masterToggleWrapper);

    // Scrape default skills from iframe on first load only
    if (data.skills.list.length === 0 && previewDoc.readyState === 'complete') {
        const scrapedSkills = Array.from(previewDoc.querySelectorAll('.skills-grid .skill-item')).map((item, index) => ({
            id: Date.now() + index,
            name: item.textContent.trim(),
            iconClass: predictIcons(item.textContent.trim())[0]?.class
        }));
        if (scrapedSkills.length > 0) {
            data.skills.list = scrapedSkills;
        }
    }

    // Perform the first render of the dynamic content
    rebuildSkillsContent(content, data);

    // Add the preview button at the end
    content.appendChild(createPreviewButton('skills'));

    skillsSection.appendChild(header);
    skillsSection.appendChild(content);
    formContainer.appendChild(skillsSection);
}

export default buildTemplate1SkillsForm;