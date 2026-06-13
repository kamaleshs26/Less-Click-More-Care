/* ============================================================
   LESS CLICKS, MORE CARE™ — Frontend Application
   Clean JS with API calls to Flask backend
   ============================================================ */

// =================== STATE ===================
const state = {
  screen: 'login',
  user: null,
  activeNav: 'ai-assistant',
  showModal: false,
  modalContent: null,
  query: '',
  selectedModel: 'Claude 3.5 Sonnet',
  isProcessing: false,
  messages: [],
  pipelineSteps: [
    { name: 'Data Ingestion', detail: 'Waiting for input...', time: '-' },
    { name: 'PHI Detection', detail: 'Pending', time: '-' },
    { name: 'Anonymization', detail: 'Pending', time: '-' },
    { name: 'Policy Validation', detail: 'Pending', time: '-' },
    { name: 'Model Execution', detail: 'Pending', time: '-' },
    { name: 'Audit Logging', detail: 'Pending', time: '-' },
  ],
  sessionId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
  models: [],
  auditLog: [],
  stats: {},
};

// =================== DATA ===================

const ROLES = [
  { id: 'physician', name: 'Physician', abbr: 'MD' },
  { id: 'nurse', name: 'Nurse Practitioner', abbr: 'NP' },
  { id: 'resident', name: 'Resident', abbr: 'RES' },
  { id: 'cmo', name: 'Chief Medical Officer', abbr: 'CMO' },
  { id: 'privacy', name: 'Privacy Officer', abbr: 'PO' },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Command Center', roles: ['cmo'] },
  { id: 'ai-assistant', label: 'AI Assistant', roles: ['physician', 'nurse', 'resident'] },
  { id: 'phi-guardian', label: 'PHI Guardian', roles: ['physician', 'nurse', 'resident'] },
  { id: 'audit', label: 'Audit Log', roles: ['privacy'] },
  { id: 'governance', label: 'Governance', roles: ['privacy'] },
  { id: 'models', label: 'Model Registry', roles: ['cmo', 'privacy'] },
];

const GOVERNANCE_POLICIES = [
  { dept: 'Emergency Medicine', status: 'Active', level: 'High', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-15', nextReview: '2024-08-15', queries: 1847, violations: 0 },
  { dept: 'Cardiology', status: 'Active', level: 'High', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-10', nextReview: '2024-08-10', queries: 923, violations: 1 },
  { dept: 'Oncology', status: 'Review', level: 'Critical', models: ['Claude 3.5 Sonnet'], lastReview: '2024-04-01', nextReview: '2024-07-01', queries: 412, violations: 0 },
];

// =================== RENDER ===================

function render() {
  const app = document.getElementById('app');
  if (state.screen === 'login') {
    app.innerHTML = renderLogin();
  } else {
    app.innerHTML = renderApp();
  }
  attachEventListeners();
  animateBars();
}

// =================== LOGIN ===================

function renderLogin() {
  return `
  <div class="login-screen">
    <div class="login-card">
      <div class="login-header">
        <div class="login-title">Less Clicks, More Care\u2122</div>
        <div class="login-sub">Clinical AI Governance Platform</div>
      </div>
      <div class="login-body">
        <div class="form-group mb-lg">
          <label class="form-label">Sign in as</label>
          <div class="role-list" id="role-list">
            ${ROLES.map(r => `
              <div class="role-list-item" data-role="${r.id}" id="role-${r.id}">
                <div class="role-list-abbr">${r.abbr}</div>
                <div class="role-list-info">
                  <div class="role-list-name">${r.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <button class="btn btn-primary w-full btn-lg" id="login-btn">
          Sign In via SSO
        </button>
        <div class="login-footer">
          <div class="login-compliance">
            Canadian Data Residency \u2022 PHIPA Compliant \u2022 SOC 2 Type II
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== APP SHELL ===================

function renderApp() {
  return `
  <div class="app-layout">
    ${renderSidebar()}
    <div class="main-content">
      ${renderTopBar()}
      <div class="page-content animate-fade-in">
        ${renderPage()}
      </div>
    </div>
  </div>
  `;
}

function renderSidebar() {
  const role = ROLES.find(r => r.id === state.user?.id) || ROLES[0];
  const userNavs = NAV_ITEMS.filter(item => item.roles.includes(role.id));

  return `
  <div class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-name">Less Clicks, More Care\u2122</div>
      <div class="brand-tagline">Governance Platform</div>
    </div>

    <nav class="sidebar-nav">
      ${userNavs.map(item => `
        <div class="nav-item ${state.activeNav === item.id ? 'active' : ''}" data-nav="${item.id}">
          <span>${item.label}</span>
        </div>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-info">
          <div class="user-name">Demo User</div>
          <div class="user-role">${role.name}</div>
        </div>
        <div class="sidebar-footer-item" id="logout-btn" style="color:var(--text-muted); font-size:12px; margin-left:auto; cursor:pointer;">Sign Out</div>
      </div>
    </div>
  </div>
  `;
}

function renderTopBar() {
  const pageNames = {
    dashboard: 'Command Center',
    'ai-assistant': 'AI Interaction Area',
    'phi-guardian': 'PHI Guardian Feedback',
    audit: 'Audit Log',
    governance: 'Governance Policies',
    models: 'Model Registry',
  };
  return `
  <div class="top-bar">
    <div>
      <div class="top-bar-title">${pageNames[state.activeNav] || 'Dashboard'}</div>
      <div class="top-bar-subtitle">Toronto General Hospital</div>
    </div>
    <div class="top-bar-actions">
      <span class="compliance-badge">PHIPA Validated</span>
      <span class="compliance-badge">Data Residency: CA</span>
    </div>
  </div>
  `;
}

function renderPage() {
  switch (state.activeNav) {
    case 'dashboard': return renderDashboard();
    case 'ai-assistant': return renderAIAssistant();
    case 'phi-guardian': return renderPHIGuardian();
    case 'audit': return renderAuditLog();
    case 'governance': return renderGovernance();
    case 'models': return renderModels();
    default: return renderDashboard();
  }
}

// =================== DASHBOARD (CMO) ===================

function renderDashboard() {
  const s = state.stats;
  return `
  <div>
    <div class="stats-grid">
      <div class="stat-card animate-slide-up">
        <div class="stat-label">Total Queries</div>
        <div class="stat-value">${s.total_queries || 0}</div>
        <div class="stat-change up">Live from audit ledger</div>
      </div>
      <div class="stat-card animate-slide-up delay-100">
        <div class="stat-label">Avg Response Time</div>
        <div class="stat-value">${s.avg_response_time || '1.2s'}</div>
        <div class="stat-change">Target met</div>
      </div>
      <div class="stat-card animate-slide-up delay-200">
        <div class="stat-label">PHI Auto-Redactions</div>
        <div class="stat-value">${s.phi_redactions || 0}</div>
        <div class="stat-change up">Across all depts</div>
      </div>
      <div class="stat-card animate-slide-up delay-300">
        <div class="stat-label">Queries Blocked</div>
        <div class="stat-value">${s.queries_blocked || 0}</div>
        <div class="stat-change down">Policy violations</div>
      </div>
    </div>

    <div class="grid-2 mb-lg">
      <div class="card animate-slide-up delay-100">
        <div class="card-header">
          <div class="card-title">Query Distribution by Department</div>
        </div>
        <div class="card-body">
          <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
            ${[
              { dept: 'Emergency Medicine', count: 847, total: 2847 },
              { dept: 'Internal Medicine', count: 612, total: 2847 },
              { dept: 'Cardiology', count: 423, total: 2847 },
              { dept: 'Radiology', count: 389, total: 2847 },
            ].map(d => `
              <div>
                <div class="flex justify-between mb-xs" style="font-size:12px;">
                  <span style="font-weight:500;">${d.dept}</span>
                  <span style="color:var(--text-muted);">${d.count.toLocaleString()} queries</span>
                </div>
                <div class="progress-bar-wrapper">
                  <div class="progress-bar-fill primary" style="width:${Math.round(d.count/d.total*100)}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card animate-slide-up delay-200">
        <div class="card-header"><div class="card-title">High-Level Policy Alerts</div></div>
        <div class="card-body">
          <div class="risk-alert high mb-sm">
            <div class="risk-alert-body">
              <div class="risk-alert-title">Policy Threshold Exceeded</div>
              <div class="risk-alert-desc">Radiology department recorded multiple formatting warnings.</div>
            </div>
          </div>
          <div class="risk-alert medium">
            <div class="risk-alert-body">
              <div class="risk-alert-title">Policy Review Due</div>
              <div class="risk-alert-desc">Oncology departmental compliance review is due next week.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== AI ASSISTANT ===================

function renderAIAssistant() {
  const models = state.models.length ? state.models : [{ name: 'Claude 3.5 Sonnet', status: 'Approved' }];
  const selectedModelInfo = models.find(m => m.name === state.selectedModel) || models[0];
  const isBlocked = selectedModelInfo.status === 'Blocked' || selectedModelInfo.status === 'Review';

  return `
  <div class="ai-screen">
    <div class="ai-chat-area">
      <div class="card" style="flex:1; display:flex; flex-direction:column;">
        <div class="card-header" style="flex-shrink:0;">
          <div>
            <div class="card-title">Clinical AI Interaction</div>
            <div class="card-subtitle">PHI is automatically detected and redacted prior to transmission.</div>
          </div>
          <div class="flex gap-sm items-center">
            <label class="form-label" style="margin:0;">Model:</label>
            <select class="form-control" id="model-select" style="width:220px; padding:6px; font-size:12px;" ${state.isProcessing ? 'disabled' : ''}>
              ${models.map(m => `
                <option value="${m.name}" ${m.name === state.selectedModel ? 'selected' : ''} ${m.status === 'Blocked' || m.status === 'Review' ? 'style="color:#999;"' : ''}>
                  ${m.name} (${m.status})
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        ${isBlocked ? `
        <div style="padding:12px 24px; background:#FFF5F5; border-bottom:1px solid #FED7D7; color:#9B2C2C; font-size:12px; font-weight:500;">
          WARNING: ${state.selectedModel} is currently ${selectedModelInfo.status.toUpperCase()} (${selectedModelInfo.use || 'Policy restriction'}). Queries cannot be sent.
        </div>` : ''}

        <div class="card-body" style="padding:0; flex:1; display:flex; flex-direction:column; min-height:0;">
          <div class="chat-messages" id="chat-messages">
            ${state.messages.map(m => renderMessage(m)).join('')}
            ${state.messages.length === 0 ? `
              <div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:14px; padding:40px; text-align:center;">
                <div>
                  <div style="font-size:24px; margin-bottom:12px; opacity:0.3;">&#9877;</div>
                  <div style="font-weight:500; margin-bottom:8px;">Ready for Clinical Input</div>
                  <div style="font-size:12px;">Paste clinical notes or ask a clinical question. All PHI is auto-detected and redacted before reaching the AI model.</div>
                </div>
              </div>
            ` : ''}
          </div>
          <div class="chat-input-area" style="flex-shrink:0;">
            <div style="display:flex; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
              <span style="font-size:11px; color:var(--text-muted); padding-top:4px;">Quick Scenarios:</span>
              <button class="btn btn-ghost scenario-btn" style="font-size:11px; padding:2px 8px;" data-scenario="Patient John Doe (DOB 1980-05-15) presenting with severe chest pain radiating to left arm. Vitals: BP 150/90, HR 110, RR 22, Temp 37.1, SpO2 96%. EKG shows ST elevation in leads II, III, aVF. Currently taking aspirin and lisinopril. What is the immediate management plan?">NSTEMI / ACS</button>
              <button class="btn btn-ghost scenario-btn" style="font-size:11px; padding:2px 8px;" data-scenario="Post-op day 1 for 65yo F following lap chole. Patient Mary Smith. Vitals: BP 130/80, HR 85, RR 16, Temp 37.8, SpO2 98%. Pain 4/10 on PCA. Incision sites clean and dry. Tolerating sips of clear fluids. Please generate a post-op assessment.">Post-Op Assessment</button>
              <button class="btn btn-ghost scenario-btn" style="font-size:11px; padding:2px 8px;" data-scenario="Generate a discharge plan for patient David Johnson (MRN 87654321), admitted for community-acquired pneumonia. Completed 5 days of IV ceftriaxone. Afebrile for 48 hours. Discharging home on oral azithromycin for 3 more days. Follow-up with PCP Dr. Clark in 1 week.">Discharge Planning</button>
            </div>
            <div class="chat-input-row">
              <textarea class="form-control" id="chat-input" placeholder="Enter clinical scenario or paste notes..." ${isBlocked || state.isProcessing ? 'disabled' : ''}>${state.query}</textarea>
              <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
                <button class="btn btn-primary" id="send-btn" ${isBlocked || state.isProcessing ? 'disabled' : ''}>
                  ${state.isProcessing ? 'Processing...' : 'Send to AI'}
                </button>
                <button class="btn btn-ghost" id="clear-btn">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ai-pipeline-panel">
      <div class="card" style="height:100%;">
        <div class="card-header">
          <div class="card-title">Live Pipeline Status</div>
        </div>
        <div class="card-body" style="padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-md);">
          ${state.pipelineSteps.map((s, i) => `
            <div class="pipeline-step" style="${s.active ? 'border-color:var(--brand-blue-mid); background:#EBF8FF;' : s.done ? 'border-color:#C6F6D5; background:#F0FFF4;' : s.blocked ? 'border-color:#FED7D7; background:#FFF5F5;' : ''}">
              <div class="pipeline-step-header">
                <div class="pipeline-step-name" style="${s.done ? 'color:var(--brand-green-light);' : s.active ? 'color:var(--brand-blue-mid);' : s.blocked ? 'color:#E53E3E;' : ''}">${i+1}. ${s.name}</div>
                <div class="pipeline-step-time">${s.time}</div>
              </div>
              <div class="pipeline-step-detail">${s.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderMessage(m) {
  const isBlocked = m.blocked;
  const bubbleStyle = isBlocked ? 'border-left:3px solid #E53E3E; background:#FFF5F5;' : '';
  const labelColor = isBlocked ? 'color:#E53E3E;' : '';

  // Format text: convert \n to <br>, **bold**, *italic*
  let formatted = escapeHtml(m.text)
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\|(.+?)\|/g, '<code>$1</code>');

  // Render markdown-style tables
  if (m.text.includes('|---')) {
    formatted = renderSimpleTable(m.text);
  }

  // Render checklist
  formatted = formatted.replace(/- \[ \]/g, '<span style="opacity:0.4;">\u2610</span>')
                       .replace(/- \[x\]/g, '<span style="color:var(--brand-green-light);">\u2611</span>');

  return `
  <div class="message ${m.role}">
    <div class="message-meta-top" style="${labelColor}">
      ${m.role === 'assistant' ? `System Response (${m.model || state.selectedModel})` : 'User Query'}
      <span style="font-weight:normal; color:var(--text-muted); margin-left:8px;">${m.time}</span>
    </div>
    <div class="message-bubble" style="${bubbleStyle}">
      ${m.phi_count > 0 ? `<div class="phi-banner">
        System Action: ${m.phi_count} PHI entit${m.phi_count === 1 ? 'y' : 'ies'} automatically detected and redacted prior to transmission.
        ${m.phi_categories ? `<br><small>Categories: ${m.phi_categories.join(', ')}</small>` : ''}
      </div>` : ''}
      ${formatted}
    </div>
    ${m.audit ? `
    <div style="font-size:10px; color:var(--text-muted); margin-top:4px; font-family:'JetBrains Mono',monospace;">
      Audit: ${m.audit.id} | Chain: ${m.audit.chain_hash}
    </div>` : ''}
  </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderSimpleTable(text) {
  const lines = text.split('\n');
  let html = '';
  let inTable = false;

  for (const line of lines) {
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (line.includes('---')) continue; // Skip separator
      const cells = line.split('|').filter(c => c.trim());
      if (!inTable) {
        html += '<table class="data-table" style="margin:8px 0;"><thead><tr>';
        cells.forEach(c => html += `<th>${c.trim()}</th>`);
        html += '</tr></thead><tbody>';
        inTable = true;
      } else {
        html += '<tr>';
        cells.forEach(c => html += `<td>${c.trim()}</td>`);
        html += '</tr>';
      }
    } else {
      if (inTable) {
        html += '</tbody></table>';
        inTable = false;
      }
      let formatted = escapeHtml(line)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
      html += formatted + '<br>';
    }
  }
  if (inTable) html += '</tbody></table>';
  return html;
}

// =================== PHI GUARDIAN ===================

function renderPHIGuardian() {
  const lastPhi = state.messages.filter(m => m.phi_count > 0);
  return `
  <div>
    <div class="card mb-lg">
      <div class="card-header">
        <div>
          <div class="card-title">Your Personal PHI Redaction Feedback</div>
          <div class="card-subtitle">Review how your recent queries were anonymized.</div>
        </div>
      </div>
      <div class="card-body">
        ${lastPhi.length > 0 ? `
          <div style="display:flex; flex-direction:column; gap:var(--space-md);">
            ${lastPhi.slice(-5).reverse().map(m => `
              <div style="border:1px solid var(--border); border-radius:8px; padding:16px;">
                <div style="font-weight:600; font-size:13px; margin-bottom:8px;">Query at ${m.time}</div>
                <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap; margin-bottom:8px;">
                  ${(m.phi_categories || []).map(c => `<span class="compliance-badge" style="background:#FFF5F5; color:#E53E3E;">${c}</span>`).join('')}
                </div>
                <div style="font-size:12px; color:var(--text-muted);">${m.phi_count} PHI entit${m.phi_count === 1 ? 'y' : 'ies'} detected and redacted</div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="text-align:center; padding:40px; color:var(--text-muted);">
            <div style="font-size:14px; font-weight:500;">No PHI Detections Yet</div>
            <div style="font-size:12px; margin-top:4px;">Send a query with patient identifiers to see how the PHI Guardian works.</div>
          </div>
        `}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">PHI Categories Monitored</div>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead><tr><th>Category</th><th>Examples</th><th>Confidence</th></tr></thead>
          <tbody>
            <tr><td>Patient Name</td><td>John Smith, Mr. Doe</td><td><span class="compliance-badge">High</span></td></tr>
            <tr><td>Date of Birth</td><td>DOB: 1982-04-05</td><td><span class="compliance-badge">High</span></td></tr>
            <tr><td>MRN</td><td>MRN: 12345678</td><td><span class="compliance-badge">High</span></td></tr>
            <tr><td>OHIP Number</td><td>OHIP: 1234-567-890</td><td><span class="compliance-badge">High</span></td></tr>
            <tr><td>Phone Number</td><td>(416) 555-0123</td><td><span class="compliance-badge">Medium</span></td></tr>
            <tr><td>Email</td><td>patient@email.com</td><td><span class="compliance-badge">High</span></td></tr>
            <tr><td>Street Address</td><td>123 Queen St</td><td><span class="compliance-badge">Medium</span></td></tr>
            <tr><td>Postal Code</td><td>M5V 2T6</td><td><span class="compliance-badge">Medium</span></td></tr>
            <tr><td>Age Identifier</td><td>67 year old</td><td><span class="compliance-badge">Medium</span></td></tr>
            <tr><td>Room/Bed</td><td>Room 321B</td><td><span class="compliance-badge">Medium</span></td></tr>
            <tr><td>SSN/SIN</td><td>123-45-6789</td><td><span class="compliance-badge">High</span></td></tr>
            <tr><td>IP Address</td><td>192.168.1.1</td><td><span class="compliance-badge">Medium</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== AUDIT LOG ===================

function renderAuditLog() {
  return `
  <div>
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Immutable Audit Ledger</div>
          <div class="card-subtitle">SHA-256 hash-chained. Each record cryptographically linked to the previous entry.</div>
        </div>
        <button class="btn btn-ghost" id="refresh-audit-btn">Refresh</button>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Time</th>
              <th>Role</th>
              <th>Model</th>
              <th>PHI</th>
              <th>Security</th>
              <th>Status</th>
              <th>Chain Hash</th>
            </tr>
          </thead>
          <tbody>
            ${state.auditLog.length > 0 ? state.auditLog.map(a => `
              <tr>
                <td style="font-family:'JetBrains Mono',monospace; font-size:11px;">${a.id}</td>
                <td style="font-size:11px;">${new Date(a.timestamp).toLocaleTimeString()}</td>
                <td>${a.user_role}</td>
                <td style="font-size:11px;">${a.model}</td>
                <td>${a.phi_detected > 0 ? `<span style="color:#E53E3E; font-weight:600;">${a.phi_detected} found</span>` : '<span style="color:var(--brand-green-light);">None</span>'}</td>
                <td><span class="compliance-badge" style="${a.security_verdict === 'BLOCKED' ? 'background:#FFF5F5; color:#E53E3E;' : a.security_verdict === 'FLAGGED' ? 'background:#FFFAF0; color:#C05621;' : ''}">${a.security_verdict}</span></td>
                <td><span class="compliance-badge" style="${a.status === 'Blocked' ? 'background:#FFF5F5; color:#E53E3E;' : ''}">${a.status}</span></td>
                <td style="font-family:'JetBrains Mono',monospace; font-size:10px; max-width:120px; overflow:hidden; text-overflow:ellipsis;">${a.chain_hash ? a.chain_hash.substring(0,16) + '...' : '-'}</td>
              </tr>
            `).join('') : `
              <tr><td colspan="8" style="text-align:center; padding:40px; color:var(--text-muted);">No audit records yet. Send a query to begin logging.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== GOVERNANCE ===================

function renderGovernance() {
  return `
  <div>
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Departmental Governance Policies</div>
          <div class="card-subtitle">Active AI usage policies by clinical department.</div>
        </div>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Status</th>
              <th>Risk Level</th>
              <th>Approved Models</th>
              <th>Last Review</th>
              <th>Next Review</th>
              <th>Queries</th>
              <th>Violations</th>
            </tr>
          </thead>
          <tbody>
            ${GOVERNANCE_POLICIES.map(p => `
              <tr>
                <td style="font-weight:500;">${p.dept}</td>
                <td><span class="compliance-badge" style="${p.status === 'Review' ? 'background:#FFFAF0; color:#C05621;' : ''}">${p.status}</span></td>
                <td>${p.level}</td>
                <td style="font-size:11px;">${p.models.join(', ')}</td>
                <td style="font-size:11px;">${p.lastReview}</td>
                <td style="font-size:11px;">${p.nextReview}</td>
                <td>${p.queries.toLocaleString()}</td>
                <td>${p.violations === 0 ? '<span style="color:var(--brand-green-light);">0</span>' : `<span style="color:#E53E3E; font-weight:600;">${p.violations}</span>`}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== MODEL REGISTRY ===================

function renderModels() {
  const models = state.models.length ? state.models : [];
  return `
  <div>
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">AI Model Registry</div>
          <div class="card-subtitle">Models must pass PHIPA compliance and Canadian data residency checks before clinical use.</div>
        </div>
        <button class="btn btn-ghost" id="refresh-models-btn">Refresh</button>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Provider</th>
              <th>Version</th>
              <th>Status</th>
              <th>Use Case</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            ${models.map(m => `
              <tr>
                <td style="font-weight:500;">${m.name}</td>
                <td>${m.provider}</td>
                <td style="font-family:'JetBrains Mono',monospace; font-size:11px;">${m.version}</td>
                <td><span class="compliance-badge" style="${m.status === 'Blocked' ? 'background:#FFF5F5; color:#E53E3E;' : m.status === 'Review' ? 'background:#FFFAF0; color:#C05621;' : ''}">${m.status}</span></td>
                <td style="font-size:12px;">${m.use}</td>
                <td><span class="compliance-badge" style="${m.risk === 'High' ? 'background:#FFF5F5; color:#E53E3E;' : m.risk === 'Unknown' ? 'background:#FFFAF0; color:#C05621;' : ''}">${m.risk}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== EVENT LISTENERS ===================

function attachEventListeners() {
  if (state.screen === 'login') {
    document.querySelectorAll('.role-list-item').forEach(el => {
      el.addEventListener('click', (e) => {
        document.querySelectorAll('.role-list-item').forEach(r => r.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        state.user = ROLES.find(r => r.id === e.currentTarget.dataset.role);
      });
    });

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        if (!state.user) state.user = ROLES[0];
        if (['physician', 'nurse', 'resident'].includes(state.user.id)) {
          state.activeNav = 'ai-assistant';
        } else if (state.user.id === 'cmo') {
          state.activeNav = 'dashboard';
        } else if (state.user.id === 'privacy') {
          state.activeNav = 'audit';
        }
        state.screen = 'app';
        state.sessionId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
        fetchModels();
        fetchStats();
        render();
      });
    }
  } else {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', (e) => {
        const nav = e.currentTarget.dataset.nav;
        state.activeNav = nav;
        if (nav === 'audit') fetchAudit();
        if (nav === 'dashboard') fetchStats();
        if (nav === 'models') fetchModels();
        render();
      });
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.screen = 'login';
        state.user = null;
        state.messages = [];
        resetPipeline();
        render();
      });
    }

    const modelSelect = document.getElementById('model-select');
    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) state.query = chatInput.value;
        state.selectedModel = e.target.value;
        render();
      });
    }

    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.addEventListener('input', (e) => { state.query = e.target.value; });
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);

    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearChat);

    document.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = e.currentTarget.dataset.scenario;
          state.query = chatInput.value;
        }
      });
    });

    const refreshAuditBtn = document.getElementById('refresh-audit-btn');
    if (refreshAuditBtn) refreshAuditBtn.addEventListener('click', () => { fetchAudit(); });

    const refreshModelsBtn = document.getElementById('refresh-models-btn');
    if (refreshModelsBtn) refreshModelsBtn.addEventListener('click', () => { fetchModels(); });
  }
}

// =================== API CALLS ===================

async function fetchModels() {
  try {
    const res = await fetch('/api/models');
    state.models = await res.json();
  } catch (e) {
    console.error('Failed to fetch models:', e);
  }
}

async function fetchAudit() {
  try {
    const res = await fetch('/api/audit');
    state.auditLog = await res.json();
    render();
  } catch (e) {
    console.error('Failed to fetch audit:', e);
  }
}

async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    state.stats = await res.json();
  } catch (e) {
    console.error('Failed to fetch stats:', e);
  }
}

// =================== SEND MESSAGE ===================

function resetPipeline() {
  state.pipelineSteps = [
    { name: 'Data Ingestion', detail: 'Waiting for input...', time: '-' },
    { name: 'PHI Detection', detail: 'Pending', time: '-' },
    { name: 'Anonymization', detail: 'Pending', time: '-' },
    { name: 'Policy Validation', detail: 'Pending', time: '-' },
    { name: 'Model Execution', detail: 'Pending', time: '-' },
    { name: 'Audit Logging', detail: 'Pending', time: '-' },
  ];
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim() || state.isProcessing) return;

  const text = input.value;
  state.query = '';
  state.isProcessing = true;

  const userMsg = {
    role: 'user',
    text: text,
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
  };
  state.messages.push(userMsg);
  resetPipeline();
  render();

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Step 1: Ingestion
  state.pipelineSteps[0] = { name: 'Data Ingestion', detail: 'Captured from browser payload', time: '12ms', done: true };
  render(); await sleep(150);

  // Step 2: PHI Detection
  state.pipelineSteps[1] = { name: 'PHI Detection', detail: 'Running NER model...', time: '...', active: true };
  render(); await sleep(200);

  // Step 3: Anonymization
  state.pipelineSteps[2] = { name: 'Anonymization', detail: 'Processing...', time: '...', active: true };
  render(); await sleep(150);

  // Step 4: Policy Validation
  state.pipelineSteps[3] = { name: 'Policy Validation', detail: 'Checking guardrails...', time: '...', active: true };
  render(); await sleep(150);

  // Step 5: Model Execution — the real API call happens here
  state.pipelineSteps[4] = { name: 'Model Execution', detail: `Streaming to ${state.selectedModel}...`, time: '...', active: true };
  render();

  try {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        model: state.selectedModel,
        session_id: state.sessionId,
        user_role: state.user?.id || 'physician',
      }),
    });

    const data = await res.json();

    // Update pipeline with real results
    const phiCount = data.phi?.count || 0;
    state.pipelineSteps[1] = { name: 'PHI Detection', detail: phiCount > 0 ? `${phiCount} PHI entit${phiCount === 1 ? 'y' : 'ies'} detected` : 'No PHI found', time: '45ms', done: true };

    if (phiCount > 0) {
      state.pipelineSteps[2] = { name: 'Anonymization', detail: 'Payload pseudonymized', time: '18ms', done: true };
      // Also mark the user message with PHI info
      userMsg.phi_count = phiCount;
      userMsg.phi_categories = data.phi?.findings?.map(f => f.label) || [];
    } else {
      state.pipelineSteps[2] = { name: 'Anonymization', detail: 'Skipped (clean)', time: '0ms', done: true };
    }

    if (data.blocked) {
      state.pipelineSteps[3] = { name: 'Policy Validation', detail: 'BLOCKED: Security Guardrail', time: '12ms', done: true, blocked: true };
      state.pipelineSteps[4] = { name: 'Model Execution', detail: 'Skipped (Policy Violation)', time: '0ms', done: true, blocked: true };
      state.pipelineSteps[5] = { name: 'Audit Logging', detail: 'Violation logged', time: '21ms', done: true };
    } else {
      state.pipelineSteps[3] = { name: 'Policy Validation', detail: 'Approved for transmission', time: '5ms', done: true };
      state.pipelineSteps[4] = { name: 'Model Execution', detail: 'Response complete', time: '1.2s', done: true };
      state.pipelineSteps[5] = { name: 'Audit Logging', detail: 'Record hashed and stored', time: '21ms', done: true };
    }

    // Add assistant response
    state.messages.push({
      role: 'assistant',
      text: data.reply,
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      model: data.model,
      blocked: data.blocked,
      audit: data.audit,
    });

  } catch (error) {
    console.error('API error:', error);
    state.pipelineSteps[4] = { name: 'Model Execution', detail: 'Error: ' + error.message, time: '-', blocked: true };
    state.messages.push({
      role: 'assistant',
      text: 'Connection error. Please ensure the backend server is running.',
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      model: 'System',
      blocked: true,
    });
  }

  state.isProcessing = false;
  render();

  setTimeout(() => {
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 50);
}

function clearChat() {
  state.query = '';
  state.messages = [];
  state.sessionId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
  resetPipeline();
  render();
}

// =================== UTILS ===================

function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      bar.getBoundingClientRect();
      bar.style.width = w;
    });
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 50);
}

// Init
window.onload = render;
