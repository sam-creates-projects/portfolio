// ==========================================================================
// Sampathkumar N — Academic Portfolio & Patent Interactivity Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  let portfolioData = null;

  // Initialize application by fetching JSON dataset
  fetchData();

  async function fetchData() {
    try {
      const response = await fetch('projects_data.json?v=' + Date.now());
      portfolioData = await response.json();
      
      populateProfile(portfolioData.profile);
      populateResearchTags(portfolioData.researchInterests);
      renderPatents(portfolioData.patents);
      renderAcademicTimeline(portfolioData.academicTimeline);
      renderProjects(portfolioData.projects);
      renderSkills(portfolioData.skills);

      setupEventListeners();
      setupPhotoUpload();
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }

  // Populate Profile Information
  function populateProfile(profile) {
    if (!profile) return;
    if (document.getElementById('profile-name')) document.getElementById('profile-name').textContent = profile.name;
    if (document.getElementById('profile-title')) document.getElementById('profile-title').textContent = profile.title;
    if (document.getElementById('profile-bio')) document.getElementById('profile-bio').textContent = profile.bio;
    if (document.getElementById('profile-gpa')) document.getElementById('profile-gpa').textContent = profile.gpa;
    if (document.getElementById('target-degree')) document.getElementById('target-degree').textContent = profile.targetDegree;

    if (profile.github && document.getElementById('github-link')) document.getElementById('github-link').href = profile.github;
    if (profile.linkedin && document.getElementById('linkedin-link')) document.getElementById('linkedin-link').href = profile.linkedin;
    if (profile.email && document.getElementById('email-link')) document.getElementById('email-link').href = `mailto:${profile.email}`;
  }

  // Populate Research Interest Tags
  function populateResearchTags(interests) {
    const container = document.getElementById('research-tags');
    if (!container || !interests) return;

    const iconMap = {
      'Computer Vision': 'fa-eye',
      'Natural Language': 'fa-comments',
      'Deep Learning': 'fa-brain',
      'Reinforcement Learning': 'fa-robot',
      'Geospatial': 'fa-earth-americas',
      'Machine Learning Systems': 'fa-network-wired'
    };

    container.innerHTML = interests.map(item => {
      let icon = 'fa-brain';
      for (const [key, val] of Object.entries(iconMap)) {
        if (item.includes(key)) { icon = val; break; }
      }
      return `<span class="chip-tag"><i class="fa-solid ${icon}"></i> ${item}</span>`;
    }).join('');
  }

  // Render 3 Filed Patents Grid
  function renderPatents(patents) {
    const container = document.getElementById('patents-grid');
    if (!container || !patents) return;

    container.innerHTML = patents.map(patent => `
      <div class="patent-card">
        <div class="patent-card-header">
          <span class="patent-status-badge"><i class="fa-solid fa-certificate"></i> ${patent.status}</span>
          <h3>${patent.title}</h3>
        </div>

        <p class="patent-inventors"><i class="fa-solid fa-users"></i> <strong>Inventors:</strong> ${patent.coInventors}</p>
        <p class="patent-description">${patent.description}</p>

        <div class="patent-tags">
          ${patent.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="patent-card-footer">
          <a href="${patent.githubUrl}" target="_blank" class="btn btn-sm btn-primary">
            <i class="fa-brands fa-github"></i> View Patent Documentation Repo
          </a>
        </div>
      </div>
    `).join('');
  }

  // Render Academic Timeline (Semesters 1-7 & Schooling)
  function renderAcademicTimeline(timeline) {
    const container = document.getElementById('academic-timeline');
    if (!container || !timeline) return;

    container.innerHTML = timeline.map(item => {
      // Determine grade pill badge class
      let badgeClass = 'badge-a-grade';
      if (item.grade.includes('O Grade') || item.grade.includes('99')) {
        badgeClass = 'badge-o-grade';
      } else if (item.grade.includes('A+')) {
        badgeClass = 'badge-aplus-grade';
      }

      return `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header-flex">
              <span class="timeline-year"><i class="fa-solid fa-calendar-days"></i> ${item.period}</span>
              <span class="grade-pill ${badgeClass}">${item.grade}</span>
            </div>
            <h3>${item.title}</h3>
            <div class="timeline-org"><i class="fa-solid fa-building-columns"></i> ${item.institution}</div>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Projects Grid
  function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container || !projects) return;

    container.innerHTML = projects.map(proj => `
      <div class="project-card">
        ${proj.featured ? '<span class="project-badge-featured"><i class="fa-solid fa-star"></i> Featured Research</span>' : ''}
        
        <div>
          <div class="project-card-header">
            <h3>${proj.title}</h3>
            <p>${proj.shortDescription}</p>
          </div>

          <div class="project-tags">
            ${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          ${proj.impact ? `
            <div class="project-impact-box">
              <i class="fa-solid fa-chart-line"></i> ${proj.impact}
            </div>
          ` : ''}
        </div>

        <div class="project-card-footer">
          <div class="project-links">
            ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="btn btn-sm btn-outline"><i class="fa-brands fa-github"></i> Repository</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Technical Skills Pills
  function renderSkills(skills) {
    if (!skills) return;

    const renderPills = (targetId, items) => {
      const el = document.getElementById(targetId);
      if (el && items) {
        el.innerHTML = items.map(s => `<span class="skill-pill">${s}</span>`).join('');
      }
    };

    renderPills('languages-list', skills.languages);
    renderPills('frameworks-list', skills.frameworks);
    renderPills('tools-list', skills.tools);
  }

  // Photo Upload & Persistence Engine
  function setupPhotoUpload() {
    const photoInput = document.getElementById('photo-upload-input');
    const photoImg = document.getElementById('profile-photo-img');
    const placeholder = document.getElementById('avatar-placeholder');

    if (!photoInput || !photoImg || !placeholder) return;

    // Force profile.jpg as default photo
    localStorage.removeItem('sampath_profile_photo');
    photoImg.src = 'profile.jpg?v=' + Date.now();
    photoImg.style.display = 'block';
    placeholder.style.display = 'none';

    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          photoImg.src = dataUrl;
          photoImg.style.display = 'block';
          placeholder.style.display = 'none';
          localStorage.setItem('sampath_profile_photo', dataUrl);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Setup Global Event Listeners
  function setupEventListeners() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      });
    }

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
      });
    }
  }
});
