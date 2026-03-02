// This script runs inside the template1 iframe

// --- PART 1: ORIGINAL TEMPLATE FUNCTIONALITY ---

document.addEventListener('DOMContentLoaded', function () {
    // Fade-in on Scroll Animation
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target.querySelector('.container');
                if (container) {
                    container.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Mobile Menu Close
function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu && !hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});


// --- PART 2: PORTFOLIO BUILDER COMMUNICATION LOGIC ---

// --- UTILITY FUNCTIONS ---
function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element && text != null) element.textContent = text;
}

function setLink(selector, url) {
    const element = document.querySelector(selector);
    if (element && url != null) element.href = url;
}

function setImage(selector, url) {
    const element = document.querySelector(selector);
    if (element && url != null) element.src = url;
}

// Helper to toggle the visibility of a whole section AND its preceding <hr> tag
function setSectionVisibility(sectionId, isEnabled) {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
        sectionElement.style.display = isEnabled ? '' : 'none';
        // The corresponding <hr> tag has the ID of the section without the '1'
        const hrId = sectionId.replace('1', '');
        const hrElement = document.getElementById(hrId);
        if (hrElement && hrElement.tagName === 'HR') {
            hrElement.style.display = isEnabled ? '' : 'none';
        }
    }
}

document.body.addEventListener('click', () => {
    // Send a simple message to the parent window.
    parent.postMessage({ type: 'iframeClick' }, '*');
});
// --- MAIN UPDATE FUNCTION (CORRECTED SELECTORS) ---
function updatePage(data) {
    if (data.navigation && data.navigation.hasOwnProperty('logoText')) {
        const newTitle = data.navigation.logoText || 'Portfolio';
        document.title = `${newTitle} | Portfolio`;
        setText('.logo', data.navigation.logoText);
    }
    // Hero Section (not removable)
    if (data.hero) {
        setText('.hero-text h1', data.hero.name);
        setText('.hero-text .subtitle', data.hero.subtitle);
        setLink('.hero-buttons .btn-secondary', data.hero.resumeUrl);
        setImage('.hero-image img', data.hero.profileImageUrl);
    }

    // About Section
    if (data.about) {
        setSectionVisibility('about1', data.about.enabled);
        if (data.about.enabled) {
            setText('#about1 p', data.about.description);
        }
    }
    
    // Skills Section
     if (data.skills) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) skillsSection.style.display = data.skills.enabled ? '' : 'none';
        
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid && data.skills.enabled) {
            skillsGrid.innerHTML = '';
            data.skills.list.forEach(skill => {
                if (skill.name) {
                    const skillElement = document.createElement('div');
                    skillElement.className = 'skill-item';
                    const finalIcon = data.skills.globalIconOverride || skill.iconClass;
                    if (data.skills.iconsEnabled && finalIcon) {
                        let iconElement;
                        if (finalIcon.startsWith('data:image')) {
                            iconElement = document.createElement('img');
                            iconElement.src = finalIcon;
                            iconElement.className = 'custom-skill-icon';
                        } else {
                            iconElement = document.createElement('i');
                            iconElement.className = finalIcon;
                        }
                        skillElement.appendChild(iconElement);
                    }
                    const textNode = document.createTextNode(` ${skill.name}`);
                    skillElement.appendChild(textNode);
                    skillsGrid.appendChild(skillElement);
                }
            });
        }
    }

    // Experience Section
    if (data.experience) {
        setSectionVisibility('experience1', data.experience.enabled);
        const timeline = document.querySelector('#experience1 .timeline');
        if (timeline && data.experience.enabled) {
            timeline.innerHTML = '';
            data.experience.list.forEach(item => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                const pointsHTML = item.points.map(point => `<li>${point}</li>`).join('');
                timelineItem.innerHTML = `<div class="timeline-dot"></div><div class="timeline-content"><h3>${item.title || ''}</h3><p class="company">${item.company || ''} | ${item.startYear || ''} - ${item.isPresent ? 'Present' : item.endYear || ''}</p><ul>${pointsHTML}</ul></div>`;
                timeline.appendChild(timelineItem);
            });
        }
    }

    // Projects Section
    if (data.projects) {
        setSectionVisibility('projects1', data.projects.enabled);
        const projectsGrid = document.querySelector('#projects1 .projects-grid');
        if (projectsGrid && data.projects.enabled) {
            projectsGrid.innerHTML = '';
            data.projects.list.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                let imageHTML = '';
                if (data.projects.imagesEnabled && project.imageUrl) {
                    imageHTML = `<img src="${project.imageUrl}" alt="${project.title || 'Project'} Screenshot">`;
                }
                projectCard.innerHTML = `${imageHTML}<h3>${project.title || ''}</h3><p>${project.description || ''}</p><div class="project-links"><a href="${project.link || '#'}" target="_blank">View</a></div>`;
                projectsGrid.appendChild(projectCard);
            });
        }
    }

    // Contact Section
    if (data.contact) {
        setSectionVisibility('contact1', data.contact.enabled);
        if (data.contact.enabled) {
            setText('#contact1 .container > p', data.contact.intro);
            const emailLink = document.querySelector('#contact1 .contact-info a[href^="mailto:"]');
            if (emailLink) { emailLink.href = `mailto:${data.contact.email}`; emailLink.textContent = data.contact.email; }
            const phoneLink = document.querySelector('#contact1 .contact-info a[href^="tel:"]');
            if (phoneLink) { phoneLink.href = `tel:${data.contact.phone}`; phoneLink.textContent = data.contact.phone; }
            const locationP = document.querySelector('#contact1 .contact-info p:last-of-type');
            if (locationP) locationP.innerHTML = `<i class="fas fa-map-marker-alt"></i> Location: ${data.contact.location}`;
            const socialLinksContainer = document.querySelector('#contact1 .social-links');
            if (socialLinksContainer) {
                socialLinksContainer.style.display = data.contact.socialsEnabled ? '' : 'none';
                if (data.contact.socialsEnabled && data.contact.social) {
                    socialLinksContainer.querySelectorAll('a').forEach(link => link.remove());
                    data.contact.social.forEach(social => {
                        if (social.url) {
                            const link = document.createElement('a');
                            link.href = social.url;
                            link.target = '_blank';
                            link.innerHTML = `<i class="fab fa-${social.type}"></i>`;
                            socialLinksContainer.appendChild(link);
                        }
                    });
                }
            }
            
            // --- THIS IS THE DEFINITIVE FIX ---
            // Create a specific selector string for the button.
             const buttonSelector = '#contact1 .btn-primary';
            const sayHelloBtn = document.querySelector(buttonSelector);
            if (sayHelloBtn) {
                // The || 'Say Hello' provides a fallback if the user's text is empty.
                const buttonText = data.contact.buttonText || 'Say Hello';
                setText(buttonSelector, buttonText);
                setLink(buttonSelector, `mailto:${data.contact.email}`);
            }
            // --- END OF FIX ---
        }
    }

    if (data.footer) {
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            // Step 1: Control the visibility of the entire footer section
            footerElement.style.display = data.footer.enabled ? '' : 'none';

            // Step 2: If it's enabled, update its content
            if (data.footer.enabled) {
                const year = data.footer.year || new Date().getFullYear();
                const name = data.footer.name || 'Your Name';
                const copyrightText = data.footer.customText || `© ${year} ${name}. All Rights Reserved.`;
                setText('#footer p', copyrightText);
            }
        }
    }
}

// --- THEME & MESSAGE LISTENER ---
function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
}

window.addEventListener('message', (event) => {
    const message = event.data;
    if (!message) return;

    switch (message.type) {
        case 'themeChange':
            applyTheme(message.theme);
            break;
        
        case 'fullUpdate':
            if (message.data) {
                updatePage(message.data);
            }
            break;
        
        case 'scrollToSection':
            if (message.sectionId) {
                const targetElement = document.getElementById(message.sectionId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            break;
    }
});