// /js/forms/template1/contact.js

import { createInputField, createPreviewButton } from '../utils.js';

// Helper function to rebuild only the dynamic social links part of the form
function rebuildSocialLinks(socialSectionElement, data) {
    // --- Rebuild the toggle ---
    let masterToggleWrapper = socialSectionElement.querySelector('.section-controls');
    if (!masterToggleWrapper) {
        masterToggleWrapper = document.createElement('div');
        masterToggleWrapper.className = 'section-controls';
        socialSectionElement.appendChild(masterToggleWrapper);
    }
    masterToggleWrapper.innerHTML = `<label for="enable-social-links-toggle">Enable Social Links Section</label><input type="checkbox" id="enable-social-links-toggle">`;
    const enableToggle = masterToggleWrapper.querySelector('#enable-social-links-toggle');
    enableToggle.checked = data.contact.socialsEnabled;
    enableToggle.onchange = (e) => {
        window.isFormDirty = true;
        data.contact.socialsEnabled = e.target.checked;
        window.sendFullUpdate();
        rebuildSocialLinks(socialSectionElement, data); // Local rebuild
    };

    // --- Rebuild the list of links ---
    let socialListContainer = socialSectionElement.querySelector('.point-list');
    if (socialListContainer) socialListContainer.remove();

    if (data.contact.socialsEnabled) {
        socialListContainer = document.createElement('div');
        socialListContainer.className = 'point-list';

        data.contact.social.forEach((link, index) => {
            const linkItemForm = document.createElement('div');
            linkItemForm.className = 'social-link-item';

            const select = document.createElement('select');
            select.className = 'social-type-select';
            ['linkedin', 'github', 'twitter', 'instagram', 'youtube', 'facebook'].forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                if (type === link.type) option.selected = true;
                select.appendChild(option);
            });
            select.onchange = (e) => {
                window.isFormDirty = true;
                link.type = e.target.value;
                window.sendFullUpdate();
            };

            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.placeholder = 'https://...';
            urlInput.value = link.url;
            urlInput.oninput = (e) => {
                window.isFormDirty = true;
                link.url = e.target.value;
                window.sendFullUpdate();
            };
            
            const deleteLinkBtn = document.createElement('button');
            deleteLinkBtn.className = 'delete-item-btn';
            deleteLinkBtn.innerHTML = '&times;';
            deleteLinkBtn.title = 'Delete Link';
            deleteLinkBtn.onclick = () => {
                window.isFormDirty = true;
                data.contact.social.splice(index, 1);
                window.sendFullUpdate();
                rebuildSocialLinks(socialSectionElement, data); // Local rebuild
            };

            linkItemForm.appendChild(select);
            linkItemForm.appendChild(urlInput);
            linkItemForm.appendChild(deleteLinkBtn);
            socialListContainer.appendChild(linkItemForm);
        });
        
        masterToggleWrapper.after(socialListContainer);
    }

    // --- Rebuild the "Add Link" button ---
    let addLinkBtn = socialSectionElement.querySelector('.add-social-btn');
    if (addLinkBtn) addLinkBtn.remove();
    
    if (data.contact.socialsEnabled && data.contact.social.length < 5) {
        addLinkBtn = document.createElement('button');
        addLinkBtn.className = 'add-item-btn add-social-btn';
        addLinkBtn.textContent = '+ Add Social Link';
        addLinkBtn.onclick = () => {
            window.isFormDirty = true;
            data.contact.social.push({ id: Date.now(), type: 'linkedin', url: '' });
            window.sendFullUpdate();
            rebuildSocialLinks(socialSectionElement, data); // Local rebuild
        };
        // Append to the end of the social section container
        socialSectionElement.appendChild(addLinkBtn);
    }
}


// The main function that builds the section structure ONCE.
function buildTemplate1ContactForm(formContainer, data, previewDoc) {
    if (!data.contact.enabled) return;

    const section = document.createElement('div');
    section.className = 'form-section';
    section.dataset.sectionKey = 'contact';

    const header = document.createElement('div');
    header.className = 'form-section-header';
    header.innerHTML = `
        <h4>Get In Touch</h4>
        <div class="header-controls">
            <button class="delete-section-btn" title="Remove Contact Section">&times;</button>
            <div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
        </div>
    `;

    const content = document.createElement('div');
    content.className = 'form-section-content';

    // Scrape default contact info from iframe on first load only
    if (!data.contact.isPopulated && previewDoc.readyState === 'complete') {
        const contactContainer = previewDoc.querySelector('#contact1 .container');
        if (contactContainer) {
            data.contact.intro = contactContainer.querySelector('p:not(.contact-info p)')?.textContent.trim() || '';
            data.contact.email = contactContainer.querySelector('.contact-info a[href^="mailto:"]')?.textContent || '';
            data.contact.phone = contactContainer.querySelector('.contact-info a[href^="tel:"]')?.textContent || '';
            data.contact.location = (contactContainer.querySelector('.contact-info p:last-of-type')?.textContent.replace('Location:', '') || '').trim();
            data.contact.social = [
                { id: Date.now() + 1, type: 'linkedin', url: contactContainer.querySelector('.social-links a[href*="linkedin"]')?.href || '' },
                { id: Date.now() + 2, type: 'github', url: contactContainer.querySelector('.social-links a[href*="github"]')?.href || '' },
                { id: Date.now() + 3, type: 'twitter', url: contactContainer.querySelector('.social-links a[href*="twitter"]')?.href || '' }
            ];
            data.contact.buttonText = contactContainer.querySelector('.btn-primary')?.textContent || 'Say Hello';
            data.contact.isPopulated = true;
        }
    }
    
    // --- Build Static Fields ---
    content.appendChild(createInputField('Intro Paragraph', 'contact.intro', data.contact.intro, 'textarea', { wordLimit: 30 }));
    content.appendChild(createInputField('Email Address', 'contact.email', data.contact.email));
    content.appendChild(createInputField('Phone Number', 'contact.phone', data.contact.phone));
    content.appendChild(createInputField('Location', 'contact.location', data.contact.location));
    
    // --- Build the Social Links Section Shell ---
    const socialSection = document.createElement('div');
    socialSection.className = 'form-group';
    socialSection.innerHTML = '<h5 style="margin-bottom: 15px; font-weight: 600;">Social Links</h5>';
    content.appendChild(socialSection);

    // Perform the first render of the dynamic social links content
    rebuildSocialLinks(socialSection, data);

    // --- Build other Static Fields ---
    const buttonGroup = createInputField('Button Text', 'contact.buttonText', data.contact.buttonText);
    const guidance = document.createElement('p');
    guidance.className = 'input-guidance';
    guidance.textContent = 'This button will link to your entered email address.';
    buttonGroup.appendChild(guidance);
    content.appendChild(buttonGroup);

    content.appendChild(createPreviewButton('contact'));
    
    section.appendChild(header);
    section.appendChild(content);
    formContainer.appendChild(section);
}

export default buildTemplate1ContactForm;