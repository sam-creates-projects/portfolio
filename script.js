// ==========================================================================
// Portfolio Interactivity & Data Rendering Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  let portfolioData = null;

  // Initialize application by fetching JSON dataset
  fetchData();

  async function fetchData() {
    try {
      const response = await fetch('projects_data.json');
      portfolioData = await response.json();
      
      populateProfile(portfolioData.profile);
      populateResearchTags(portfolioData.researchInterests);
      renderProjects(portfolioData.projects);
      renderAchievements(portfolioData.achievements);
      renderSkills(portfolioData.skills);

      setupEventListeners();
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }

  // Populate Profile Information
  function populateProfile(profile) {
    if (!profile) return;
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-title').textContent = profile.title;
    document.getElementById('profile-bio').textContent = profile.bio;
    document.getElementById('profile-gpa').textContent = profile.gpa;
    document.getElementById('profile-gre').textContent = profile.gre;
    document.getElementById('target-degree').textContent = profile.targetDegree;

    if (profile.github) document.getElementById('github-link').href = profile.github;
    if (profile.linkedin) document.getElementById('linkedin-link').href = profile.linkedin;
    if (profile.scholar) document.getElementById('scholar-link').href = profile.scholar;
    if (profile.email) document.getElementById('email-link').href = `mailto:${profile.email}`;
  }

  // Populate Research Interest Tags
  function populateResearchTags(interests) {
    const container = document.getElementById('research-tags');
    if (!container || !interests) return;
    container.innerHTML = interests.map(item => `
      <span class="chip-tag"><i class="fa-solid fa-microscope"></i> ${item}</span>
    `).join('');
  }

  // Render Projects Grid
  function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container || !projects) return;

    document.getElementById('project-count-stat').textContent = `${projects.length}+`;

    if (projects.length === 0) {
      container.innerHTML = `<p class="no-results">No projects match the criteria.</p>`;
      return;
    }

    container.innerHTML = projects.map(proj => `
      <div class="project-card" data-category="${proj.category}" data-id="${proj.id}">
        ${proj.featured ? '<span class="project-badge-featured"><i class="fa-solid fa-star"></i> Featured</span>' : ''}
        
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
            ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank"><i class="fa-brands fa-github"></i> Code</a>` : ''}
            ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : ''}
            <a href="#" class="view-details-btn" data-id="${proj.id}"><i class="fa-solid fa-circle-info"></i> Details</a>
          </div>

          <div class="github-stats">
            <span><i class="fa-regular fa-star"></i> ${proj.stars || 0}</span>
            <span><i class="fa-solid fa-code-fork"></i> ${proj.forks || 0}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach event listeners for details modal
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  // Render Achievements Timeline
  function renderAchievements(achievements) {
    const container = document.getElementById('achievements-timeline');
    if (!container || !achievements) return;

    container.innerHTML = achievements.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-year">${item.year}</span>
          <h3>${item.title}</h3>
          <div class="timeline-org">${item.organization}</div>
          <p>${item.description}</p>
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

  // Modal Functionality
  function openProjectModal(id) {
    if (!portfolioData) return;
    const proj = portfolioData.projects.find(p => p.id === id);
    if (!proj) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="section-badge">${proj.category.toUpperCase()}</span>
        <h2 style="font-size: 1.8rem; margin: 10px 0;">${proj.title}</h2>
      </div>

      <div style="margin-bottom: 20px; font-size: 1rem; color: var(--text-muted); line-height: 1.6;">
        ${proj.fullDescription}
      </div>

      <div class="project-tags" style="margin-bottom: 24px;">
        ${proj.tags.map(t => `<span class="tech-tag" style="font-size: 0.85rem; padding: 4px 10px;">${t}</span>`).join('')}
      </div>

      ${proj.impact ? `
        <div class="project-impact-box" style="margin-bottom: 24px; font-size: 0.95rem; padding: 12px 16px;">
          <i class="fa-solid fa-bullseye"></i> <strong>Quantifiable Outcome:</strong> ${proj.impact}
        </div>
      ` : ''}

      <div style="display: flex; gap: 16px; margin-top: 30px;">
        ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> Repository</a>` : ''}
        ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank" class="btn btn-secondary"><i class="fa-solid fa-external-link"></i> Live Demo</a>` : ''}
      </div>
    `;

    document.getElementById('project-modal').classList.add('active');
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Modal Close
    document.getElementById('modal-close').addEventListener('click', () => {
      document.getElementById('project-modal').classList.remove('active');
    });

    document.getElementById('project-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('project-modal')) {
        document.getElementById('project-modal').classList.remove('active');
      }
    });

    // Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        filterProjects(category, document.getElementById('project-search').value);
      });
    });

    // Search Bar Input
    const searchInput = document.getElementById('project-search');
    searchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
      filterProjects(activeFilter, e.target.value);
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // Filter Projects Logic
  function filterProjects(category, query) {
    if (!portfolioData) return;

    let filtered = portfolioData.projects;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (query.trim() !== '') {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    renderProjects(filtered);
  }
});
