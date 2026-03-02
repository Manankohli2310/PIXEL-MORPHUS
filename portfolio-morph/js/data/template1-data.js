// /js/data/template1-data.js

// This file defines the default data structure for Template 1.
window.portfolioData = {
    template: 'template1',
    theme: 'light',
    navigation: { 
        logoText: null 
    },
    hero: { 
        name: null, 
        subtitle: null, 
        resumeUrl: 'your-resume.pdf', 
        profileImageUrl: 'profile.jpg' 
    },
    about: { 
        description: null, 
        enabled: true 
    },
    skills: { 
        list: [], 
        enabled: true, 
        iconsEnabled: true, 
        globalIconOverride: null 
    },
    experience: { 
        list: [], 
        enabled: true 
    },
    projects: { 
        list: [], 
        enabled: true, 
        imagesEnabled: true 
    },
    contact: {
        enabled: true,
        intro: null, 
        email: null, 
        phone: null, 
        location: null,
        socialsEnabled: true, 
        social: [], 
        buttonText: null, 
        isPopulated: false
    },
    footer: { 
        enabled: true, 
        year: null, 
        name: null, 
        customText: null 
    },
};