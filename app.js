/* ============================================================
   LESS CLICKS, MORE CARE™ — Main Application
   ============================================================ */

// =================== STATE ===================
const state = {
  screen: 'login',
  user: null,
  activeNav: 'dashboard',
  showModal: false,
  modalContent: null,
  query: '',
  messages: [],
  pipelineSteps: [],
  activeTab: 0,
};

// =================== DATA ===================

const ROLES = [
  { id: 'physician', emoji: '👨‍⚕️', name: 'Physician', dept: 'Internal Medicine', color: '#0055A5' },
  { id: 'nurse', emoji: '👩‍⚕️', name: 'Nurse Practitioner', dept: 'Emergency', color: '#00856A' },
  { id: 'resident', emoji: '🩺', name: 'Resident', dept: 'Cardiology', color: '#1A78C2' },
  { id: 'cmo', emoji: '🏥', name: 'Chief Medical Officer', dept: 'Administration', color: '#8B0000' },
];

const NAV_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'Command Center', badge: null },
  { id: 'ai-assistant', icon: '🤖', label: 'AI Assistant', badge: null },
  { id: 'phi-guardian', icon: '🔒', label: 'PHI Guardian', badge: '3', badgeClass: '' },
  { id: 'audit', icon: '📋', label: 'Audit Log', badge: null },
  { id: 'governance', icon: '⚖️', label: 'Governance', badge: '2', badgeClass: 'amber' },
  { id: 'models', icon: '🧠', label: 'Model Registry', badge: null },
  { id: 'architecture', icon: '🏗️', label: 'Architecture', badge: null },
];

const AUDIT_DATA = [
  { id: 'AUD-2024-8841', user: 'Dr. Patel', role: 'Physician', action: 'AI Query — Differential diagnosis', phi: 'DETECTED & REDACTED', status: 'approved', risk: 'low', time: '08:42:17', tokens: 312, model: 'Claude 3.5 Sonnet' },
  { id: 'AUD-2024-8840', user: 'NP Chen', role: 'Nurse Practitioner', action: 'AI Query — Drug interaction check', phi: 'None detected', status: 'approved', risk: 'low', time: '08:39:02', tokens: 188, model: 'Claude 3.5 Sonnet' },
  { id: 'AUD-2024-8839', user: 'Dr. Nguyen', role: 'Resident', action: 'AI Query — Included raw DOB and MRN', phi: 'BLOCKED', status: 'blocked', risk: 'critical', time: '08:31:55', tokens: 0, model: 'N/A — Blocked' },
  { id: 'AUD-2024-8838', user: 'Dr. Abramowitz', role: 'Physician', action: 'AI Query — Post-op care protocol', phi: 'Flagged for review', status: 'flagged', risk: 'medium', time: '08:28:11', tokens: 445, model: 'Claude 3.5 Sonnet' },
  { id: 'AUD-2024-8837', user: 'Admin Ramos', role: 'Admin', action: 'Model policy update — Trauma ICU', phi: 'N/A', status: 'approved', risk: 'low', time: '08:15:00', tokens: 0, model: 'System' },
  { id: 'AUD-2024-8836', user: 'Dr. Kim', role: 'Physician', action: 'AI Query — Lab result interpretation', phi: 'None detected', status: 'approved', risk: 'low', time: '07:58:44', tokens: 229, model: 'Claude 3.5 Sonnet' },
];

const GOVERNANCE_POLICIES = [
  { dept: 'Emergency Medicine', status: 'active', level: 'HIGH', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-15', nextReview: '2024-08-15', queries: 1847, violations: 0 },
  { dept: 'Cardiology', status: 'active', level: 'HIGH', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-10', nextReview: '2024-08-10', queries: 923, violations: 1 },
  { dept: 'Oncology', status: 'review', level: 'CRITICAL', models: ['Claude 3.5 Sonnet'], lastReview: '2024-04-01', nextReview: '2024-07-01', queries: 412, violations: 0 },
  { dept: 'Pediatrics', status: 'active', level: 'HIGH', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-20', nextReview: '2024-08-20', queries: 634, violations: 0 },
  { dept: 'Radiology', status: 'active', level: 'MEDIUM', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-12', nextReview: '2024-08-12', queries: 1102, violations: 2 },
];

const MODEL_REGISTRY = [
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', version: '3.5-20241022', status: 'approved', use: 'Clinical Q&A, Documentation', risk: 'LOW', approved: '2024-03-01', reviewer: 'Dr. Park (CMO)', queries: 14820 },
  { name: 'Claude 3 Opus', provider: 'Anthropic', version: '3-opus-20240229', status: 'approved', use: 'Complex Diagnostic Support', risk: 'MEDIUM', approved: '2024-02-15', reviewer: 'Dr. Park (CMO)', queries: 3211 },
  { name: 'GPT-4o', provider: 'OpenAI', version: '2024-05-13', status: 'blocked', use: 'NOT APPROVED — Data residency', risk: 'HIGH', approved: 'N/A', reviewer: 'N/A', queries: 0 },
  { name: 'Gemini 1.5 Pro', provider: 'Google', version: '1.5-pro', status: 'review', use: 'Under PHIPA review', risk: 'UNKNOWN', approved: 'Pending', reviewer: 'IT Security', queries: 0 },
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
        <div class="login-logo">🏥</div>
        <div class="login-title">Less Clicks, More Care™</div>
        <div class="login-sub">Clinical AI Governance Platform</div>
        <div style="margin-top:12px; font-size:11px; opacity:0.6; display:flex; align-items:center; justify-content:center; gap:6px;">
          <span>🍁</span> PHIPA-Compliant &nbsp;•&nbsp; 🔒 On-Premise Encryption &nbsp;•&nbsp; 🇨🇦 Canadian Hospitals
        </div>
      </div>
      <div class="login-body">
        <div class="mb-md" style="font-size:13px; font-weight:600; color:var(--text-secondary);">Select your clinical role to sign in:</div>
        <div class="role-grid" id="role-grid">
          ${ROLES.map(r => `
            <div class="role-card" data-role="${r.id}" id="role-${r.id}">
              <div class="role-emoji">${r.emoji}</div>
              <div class="role-name">${r.name}</div>
              <div class="role-dept">${r.dept}</div>
            </div>
          `).join('')}
        </div>
        <div class="form-group">
          <label class="form-label">Hospital</label>
          <select class="form-control" id="hospital-select">
            <option>Mount Sinai Hospital — Toronto, ON</option>
            <option>Toronto General — UHN</option>
            <option>SickKids — Toronto</option>
            <option>Ottawa General Hospital</option>
            <option>Vancouver General Hospital</option>
          </select>
        </div>
        <button class="btn btn-primary w-full btn-lg" id="login-btn" style="margin-top:var(--space-md);">
          🔐 Sign In with Hospital SSO
        </button>
        <div class="login-phipa-note">
          <span>🛡️</span> Protected under PHIPA s.10.1 — All interactions logged and audited
        </div>
        <div style="margin-top:12px; text-align:center;">
          <div style="height:6px; background:var(--border-light); border-radius:10px; overflow:hidden;">
            <div style="height:100%; width:100%; background: linear-gradient(90deg, var(--brand-teal), var(--brand-blue-mid)); border-radius:10px;"></div>
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">SOC 2 Type II · ISO 27001 · PIPEDA Compliant</div>
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
      <div class="page-content fade-in">
        ${renderPage()}
      </div>
    </div>
    ${state.showModal ? renderModal() : ''}
  </div>
  `;
}

function renderSidebar() {
  const role = ROLES.find(r => r.id === state.user?.role) || ROLES[0];
  return `
  <div class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <div class="brand-logo-icon">🏥</div>
        <div>
          <div class="brand-name">Less Clicks, More Care™</div>
          <div class="brand-tagline">Clinical AI Governance</div>
        </div>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="user-avatar" style="background:${role.color};">${role.emoji}</div>
      <div class="user-info">
        <div class="user-name">${state.user?.name || 'Dr. Kamal Patel'}</div>
        <div class="user-role">${role.name} · ${role.dept}</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-section-label">Clinical</div>
      ${NAV_ITEMS.slice(0,2).map(item => renderNavItem(item)).join('')}
      <div class="nav-section-label">Privacy & Compliance</div>
      ${NAV_ITEMS.slice(2,4).map(item => renderNavItem(item)).join('')}
      <div class="nav-section-label">Administration</div>
      ${NAV_ITEMS.slice(4).map(item => renderNavItem(item)).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-footer-item">⚙️ <span>Settings</span></div>
      <div class="sidebar-footer-item" id="logout-btn">🚪 <span>Sign Out</span></div>
      <div style="margin-top:8px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.1); font-size:10px; color:rgba(255,255,255,0.3);">v1.0.2-beta · 🍁 PHIPA Compliant</div>
    </div>
  </div>
  `;
}

function renderNavItem(item) {
  const isActive = state.activeNav === item.id;
  return `
  <div class="nav-item ${isActive ? 'active' : ''}" data-nav="${item.id}">
    <span class="nav-icon">${item.icon}</span>
    <span>${item.label}</span>
    ${item.badge ? `<span class="nav-badge ${item.badgeClass || ''}">${item.badge}</span>` : ''}
  </div>
  `;
}

function renderTopBar() {
  const pageNames = {
    dashboard: 'Command Center',
    'ai-assistant': 'AI Clinical Assistant',
    'phi-guardian': 'PHI Guardian',
    audit: 'Audit Log',
    governance: 'Governance & Policy',
    models: 'Model Registry',
    architecture: 'System Architecture',
  };
  return `
  <div class="top-bar">
    <div>
      <div class="top-bar-title">${pageNames[state.activeNav] || 'Dashboard'}</div>
      <div class="top-bar-subtitle">Mount Sinai Hospital · Toronto, ON</div>
    </div>
    <div class="top-bar-actions">
      <div class="hospital-selector">
        <div class="status-indicator"></div>
        <span>Mount Sinai</span>
        <span>▾</span>
      </div>
      <button class="notification-btn">
        🔔
        <div class="notification-dot"></div>
      </button>
      <button class="btn btn-ghost btn-sm">❓ Help</button>
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
    case 'architecture': return renderArchitecture();
    default: return renderDashboard();
  }
}

// =================== DASHBOARD ===================

function renderDashboard() {
  return `
  <div>
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon">🤖</div>
        <div class="stat-label">AI Queries Today</div>
        <div class="stat-value blue">2,847</div>
        <div class="stat-change up">↑ 12% vs yesterday</div>
      </div>
      <div class="stat-card teal">
        <div class="stat-icon">⏱️</div>
        <div class="stat-label">Avg Response Time</div>
        <div class="stat-value teal">1.2s</div>
        <div class="stat-change down">↑ 0.1s vs target</div>
      </div>
      <div class="stat-card red">
        <div class="stat-icon">🚫</div>
        <div class="stat-label">PHI Violations Blocked</div>
        <div class="stat-value red">14</div>
        <div class="stat-change up">↓ 3 vs last week</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon">✅</div>
        <div class="stat-label">PHIPA Compliance Rate</div>
        <div class="stat-value green">99.5%</div>
        <div class="stat-change up">↑ 0.2% this month</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon">⚠️</div>
        <div class="stat-label">Flagged for Review</div>
        <div class="stat-value amber">5</div>
        <div class="stat-change">3 pending approval</div>
      </div>
    </div>

    <div class="grid-2-1 mb-lg">
      <div>
        <div class="card mb-lg">
          <div class="card-header">
            <div>
              <div class="card-title">⚠️ Active Risk Alerts</div>
              <div class="card-subtitle">Requires immediate attention</div>
            </div>
            <button class="btn btn-ghost btn-sm">View all</button>
          </div>
          <div class="card-body" style="padding: var(--space-md);">
            <div class="risk-alert critical">
              <div class="risk-alert-icon">🚨</div>
              <div class="risk-alert-body">
                <div class="risk-alert-title">CRITICAL: PHI in AI Query — Blocked</div>
                <div class="risk-alert-desc">Dr. Nguyen included raw DOB + MRN in prompt. Query blocked at gateway. <strong>AUD-2024-8839</strong></div>
              </div>
              <button class="btn btn-danger btn-sm" onclick="showAuditDetail('AUD-2024-8839')">Review</button>
            </div>
            <div class="risk-alert high">
              <div class="risk-alert-icon">🔴</div>
              <div class="risk-alert-body">
                <div class="risk-alert-title">HIGH: Radiology — 2 Policy Violations This Week</div>
                <div class="risk-alert-desc">Policy thresholds exceeded. Department head review required.</div>
              </div>
              <button class="btn btn-ghost btn-sm">Escalate</button>
            </div>
            <div class="risk-alert medium">
              <div class="risk-alert-icon">🟡</div>
              <div class="risk-alert-body">
                <div class="risk-alert-title">MEDIUM: Oncology Policy — Review Overdue 41 days</div>
                <div class="risk-alert-desc">Annual PHIPA compliance review was due 2024-07-01.</div>
              </div>
              <button class="btn btn-outline btn-sm">Schedule</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">📈 Queries by Department (Today)</div>
              <div class="card-subtitle">AI assistant usage distribution</div>
            </div>
          </div>
          <div class="card-body">
            <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
              ${[
                { dept: 'Emergency Medicine', count: 847, total: 2847, color: 'red' },
                { dept: 'Internal Medicine', count: 612, total: 2847, color: 'blue' },
                { dept: 'Cardiology', count: 423, total: 2847, color: 'amber' },
                { dept: 'Radiology', count: 389, total: 2847, color: 'teal' },
                { dept: 'Oncology', count: 276, total: 2847, color: 'green' },
                { dept: 'Pediatrics', count: 300, total: 2847, color: 'blue' },
              ].map(d => `
                <div>
                  <div class="flex justify-between mb-xs" style="font-size:12px;">
                    <span style="font-weight:600;">${d.dept}</span>
                    <span style="color:var(--text-muted);">${d.count.toLocaleString()} queries</span>
                  </div>
                  <div class="progress-bar-wrapper">
                    <div class="progress-bar-fill ${d.color}" style="width:${Math.round(d.count/d.total*100)}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="card mb-md">
          <div class="card-header">
            <div class="card-title">📅 Today's Stats</div>
          </div>
          <div class="card-body" style="padding:var(--space-md);">
            ${[
              { icon: '🤖', label: 'AI Queries', value: '2,847', color: 'var(--brand-blue-light)' },
              { icon: '🔒', label: 'PHI Detected', value: '87', color: 'var(--brand-amber)' },
              { icon: '🚫', label: 'Queries Blocked', value: '14', color: 'var(--brand-red)' },
              { icon: '✅', label: 'Successfully Processed', value: '2,833', color: 'var(--brand-green)' },
              { icon: '👥', label: 'Active Users', value: '124', color: 'var(--brand-blue-mid)' },
              { icon: '💾', label: 'Tokens Used', value: '1.2M', color: 'var(--text-muted)' },
            ].map(s => `
              <div class="flex justify-between items-center" style="padding:var(--space-sm) 0; border-bottom:1px solid var(--border-light);">
                <div class="flex items-center gap-sm" style="font-size:13px;">
                  <span>${s.icon}</span>
                  <span style="color:var(--text-secondary);">${s.label}</span>
                </div>
                <span style="font-weight:700; color:${s.color};">${s.value}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card mb-md">
          <div class="card-header"><div class="card-title">🏆 Projected ROI</div></div>
          <div class="card-body" style="padding:var(--space-md);">
            <div class="roi-card mb-sm">
              <div class="roi-value">$2.1M</div>
              <div class="roi-label">Annual Physician Time Saved</div>
            </div>
            <div style="font-size:11px; color:var(--text-muted); text-align:center; margin-top:var(--space-sm);">
              Based on 3 hrs/physician/month × 14,000+ queries @ $350/hr avg rate
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><div class="card-title">🩺 Quick Actions</div></div>
          <div class="card-body" style="padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-sm);">
            <button class="btn btn-primary w-full" onclick="navigate('ai-assistant')">🤖 Ask AI Assistant</button>
            <button class="btn btn-outline w-full" onclick="navigate('phi-guardian')">🔒 PHI Detection Test</button>
            <button class="btn btn-ghost w-full" onclick="navigate('audit')">📋 View Audit Log</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== AI ASSISTANT ===================

function renderAIAssistant() {
  const exampleMessages = [
    {
      role: 'user',
      text: 'Patient with chest pain, elevated troponin 2.4 ng/mL, ST changes in V3-V5. What are the next steps in management?',
      time: '08:41:22',
      phi: false,
    },
    {
      role: 'assistant',
      text: `Based on the clinical picture — elevated troponin and ST changes — this is <strong>high-probability NSTEMI/ACS</strong>. Recommended immediate steps:\n\n1. <strong>Activate cath lab</strong> — PCI within 90 min if hemodynamically unstable\n2. <strong>Antiplatelet therapy:</strong> Aspirin 325mg + P2Y12 inhibitor (Ticagrelor 180mg loading dose)\n3. <strong>Anticoagulation:</strong> Unfractionated heparin or Enoxaparin\n4. <strong>Monitoring:</strong> Continuous cardiac monitoring, serial troponins q4h\n5. <strong>Cardiology consult</strong> — urgent\n\n⚠️ <em>This is clinical decision support only. Physician judgment required.</em>`,
      time: '08:41:24',
      phi: false,
    },
    {
      role: 'user',
      text: 'The patient DOB: 1965-03-14, MRN: 4829301 is currently on warfarin for AFib. How does this change management?',
      time: '08:43:11',
      phi: true,
    },
    {
      role: 'assistant',
      text: `🛡️ <strong>PHI Detected & Stripped</strong> — Date of birth and MRN were removed from your query before processing. Your clinical question was answered without patient identifiers.\n\n<hr style="border-color:var(--border-light);margin:8px 0;">\n\n<strong>Warfarin + ACS Management:</strong>\n\nWith active anticoagulation (Warfarin), the anticoagulation strategy requires careful consideration:\n\n1. Check <strong>INR immediately</strong> — if supratherapeutic, this increases bleeding risk\n2. If PCI required: Consider <strong>radial approach</strong> to minimize access-site bleeding\n3. <strong>Bridging therapy</strong> decisions based on current INR value\n4. <strong>TRIPLE THERAPY WARNING</strong>: Warfarin + ASA + P2Y12 = very high bleeding risk — minimize duration\n5. Discuss <strong>DOAC switch</strong> post-ACS (e.g., Apixaban preferred in AF + ACS)\n\n⚠️ Clinical decision support only.`,
      time: '08:43:13',
      phi: false,
    },
  ];

  return `
  <div class="ai-screen">
    <div class="ai-chat-area">
      <div class="card" style="flex:1;">
        <div class="card-header">
          <div>
            <div class="card-title">🤖 Clinical AI Assistant</div>
            <div class="card-subtitle">PHI auto-detection active · Responses logged to audit trail</div>
          </div>
          <div class="flex gap-sm items-center">
            <span class="badge badge-approved">✅ PHIPA Compliant</span>
            <span class="badge badge-medium">Claude 3.5 Sonnet</span>
          </div>
        </div>
        <div class="card-body" style="padding:0; display:flex; flex-direction:column; gap:0;">
          <div class="chat-messages" id="chat-messages">
            ${exampleMessages.map(m => renderMessage(m)).join('')}
          </div>
          <div class="chat-input-area">
            <div class="chat-input-row">
              <textarea class="chat-textarea" id="chat-input" placeholder="Ask a clinical question... (PHI will be automatically detected and stripped before transmission)">${state.query}</textarea>
              <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
                <button class="btn btn-primary" id="send-btn" onclick="sendMessage()">▶ Send</button>
                <button class="btn btn-ghost" onclick="clearChat()">🗑 Clear</button>
              </div>
            </div>
            <div class="chat-actions">
              <button class="btn btn-ghost btn-sm" onclick="insertTemplate('differential')">📋 Differential Dx</button>
              <button class="btn btn-ghost btn-sm" onclick="insertTemplate('drug')">💊 Drug Check</button>
              <button class="btn btn-ghost btn-sm" onclick="insertTemplate('protocol')">📖 Protocol Lookup</button>
              <button class="btn btn-ghost btn-sm" onclick="insertTemplate('discharge')">🏠 Discharge Summary</button>
            </div>
            <div class="alert alert-warning mt-sm" style="padding:var(--space-sm) var(--space-md); font-size:11px;">
              ⚠️ <strong>Do not include patient names, MRN, DOB, or OHIP numbers.</strong> The PHI Guardian will detect and block them — but it's best practice to de-identify queries before submission.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ai-pipeline-panel">
      <div class="card">
        <div class="card-header">
          <div class="card-title">🔄 Privacy Pipeline</div>
          <div class="card-subtitle">Real-time query processing</div>
        </div>
        <div class="card-body" style="padding:var(--space-md); display:flex; flex-direction:column; gap:var(--space-sm);">
          ${[
            { name: '1. Query Received', status: 'done', detail: 'Query captured at gateway', time: '0ms' },
            { name: '2. PHI Detection', status: 'done', detail: 'NLP scan: DOB, MRN detected', time: '18ms' },
            { name: '3. PHI Redaction', status: 'done', detail: 'Identifiers stripped, pseudonymized', time: '22ms' },
            { name: '4. Policy Check', status: 'done', detail: 'Dept policy: APPROVED', time: '5ms' },
            { name: '5. AI Routing', status: 'done', detail: 'Sent to Claude 3.5 Sonnet', time: '1.2s' },
            { name: '6. Response Filter', status: 'done', detail: 'Output scanned for re-identification risk', time: '31ms' },
            { name: '7. Audit Logged', status: 'done', detail: 'AUD-2024-8841 created', time: '3ms' },
          ].map(s => `
            <div class="pipeline-step ${s.status}">
              <div class="pipeline-step-header">
                <div class="pipeline-step-name" style="color:${s.status === 'done' ? 'var(--brand-teal)' : s.status === 'active' ? 'var(--brand-amber)' : 'var(--brand-red)'};">
                  ${s.status === 'done' ? '✅' : s.status === 'active' ? '⏳' : '❌'} ${s.name}
                </div>
                <div class="pipeline-step-time">${s.time}</div>
              </div>
              <div class="pipeline-step-detail">${s.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">📊 Session Stats</div></div>
        <div class="card-body" style="padding:var(--space-md);">
          ${[
            { label: 'Queries this session', value: '4' },
            { label: 'PHI detections', value: '1' },
            { label: 'Tokens used', value: '1,284' },
            { label: 'Avg response time', value: '1.3s' },
            { label: 'Session duration', value: '14m 22s' },
          ].map(s => `
            <div class="flex justify-between items-center" style="padding:5px 0; border-bottom:1px solid var(--border-light); font-size:12px;">
              <span style="color:var(--text-muted);">${s.label}</span>
              <span style="font-weight:700;">${s.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
}

function renderMessage(m) {
  return `
  <div class="message ${m.role}" style="animation: fadeIn 0.3s ease;">
    <div class="message-bubble">
      ${m.phi ? `<div class="alert alert-warning mb-sm" style="font-size:11px; padding:4px 8px;">
        🛡️ <strong>PHI Detected</strong> — Identifiers stripped before processing
      </div>` : ''}
      ${m.text.replace(/\n/g, '<br>')}
    </div>
    <div class="message-meta">
      ${m.role === 'assistant' ? `🤖 Claude 3.5 Sonnet · ` : `👨‍⚕️ `}
      ${m.time}
      ${m.role === 'assistant' ? ` · <span style="color:var(--brand-teal);">✅ Logged</span>` : ''}
    </div>
  </div>
  `;
}

// =================== PHI GUARDIAN ===================

function renderPHIGuardian() {
  return `
  <div>
    <div class="stats-grid mb-lg">
      <div class="stat-card red">
        <div class="stat-icon">🔒</div>
        <div class="stat-label">PHI Detections Today</div>
        <div class="stat-value red">87</div>
        <div class="stat-change">Across 14 departments</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon">✂️</div>
        <div class="stat-label">Successfully Redacted</div>
        <div class="stat-value green">73</div>
        <div class="stat-change up">83.9% redaction rate</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon">🚫</div>
        <div class="stat-label">Queries Blocked</div>
        <div class="stat-value amber">14</div>
        <div class="stat-change">Too complex to redact</div>
      </div>
      <div class="stat-card blue">
        <div class="stat-icon">⚡</div>
        <div class="stat-label">Avg Detection Time</div>
        <div class="stat-value blue">18ms</div>
        <div class="stat-change up">Sub-25ms target</div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div class="card mb-lg">
          <div class="card-header">
            <div>
              <div class="card-title">🔬 PHI Detection Demo</div>
              <div class="card-subtitle">Test the live PHI detection engine</div>
            </div>
            <span class="badge badge-approved">Live Engine</span>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Sample Clinical Query</label>
              <textarea class="form-control" id="phi-test-input" rows="5" placeholder="Type a clinical query...">The patient John Smith (DOB: 1972-09-18, MRN: 8834921, OHIP: 3321-456-789-AB) was admitted yesterday with a troponin of 3.2 ng/mL. He lives at 142 Bloor St West, Toronto. His wife Sarah called the ward.</textarea>
            </div>
            <button class="btn btn-primary" onclick="runPHIDetection()">🔍 Run PHI Detection</button>
          </div>
          <div class="card-body" style="border-top:1px solid var(--border-light);" id="phi-result-area">
            <div style="font-size:12px; font-weight:700; color:var(--text-secondary); margin-bottom:var(--space-sm);">
              Detection Results:
            </div>
            <div class="phi-detection-box" id="phi-result-box">
              The patient <span class="phi-tag critical">NAME: John Smith</span> (DOB: <span class="phi-tag high">DATE: 1972-09-18</span>, MRN: <span class="phi-tag critical">MRN: 8834921</span>, OHIP: <span class="phi-tag critical">OHIP: 3321-456-789-AB</span>) was admitted yesterday with a troponin of 3.2 ng/mL. He lives at <span class="phi-tag high">ADDRESS: 142 Bloor St West</span>, Toronto. His wife <span class="phi-tag high">NAME: Sarah</span> called the ward.
            </div>
            <div style="margin-top:var(--space-md); font-size:12px; font-weight:700; color:var(--text-secondary);">
              Redacted Version:
            </div>
            <div class="phi-detection-box" id="phi-redacted-box" style="margin-top:var(--space-sm);">
              The patient <span class="phi-redacted">[NAME REDACTED]</span> (DOB: <span class="phi-redacted">[DATE REDACTED]</span>, MRN: <span class="phi-redacted">[MRN REDACTED]</span>, OHIP: <span class="phi-redacted">[OHIP REDACTED]</span>) was admitted yesterday with a troponin of 3.2 ng/mL. He lives at <span class="phi-redacted">[ADDRESS REDACTED]</span>, Toronto. His wife <span class="phi-redacted">[NAME REDACTED]</span> called the ward.
            </div>
            <div style="margin-top:var(--space-md); display:flex; gap:var(--space-sm); flex-wrap:wrap;">
              <span class="badge badge-blocked">🚨 CRITICAL: OHIP, MRN, Full Name</span>
              <span class="badge badge-flagged">⚠️ HIGH: DOB, Address</span>
              <span class="badge badge-medium">ℹ️ Action: REDACT then transmit</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">📋 PHI Entity Types Detected</div>
          </div>
          <div class="card-body">
            ${[
              { type: 'Patient Name', count: 34, icon: '👤', severity: 'critical' },
              { type: 'MRN / Patient ID', count: 28, icon: '🆔', severity: 'critical' },
              { type: 'OHIP / Insurance #', count: 11, icon: '🏥', severity: 'critical' },
              { type: 'Date of Birth', count: 42, icon: '📅', severity: 'high' },
              { type: 'Address / Location', count: 19, icon: '📍', severity: 'high' },
              { type: 'Phone Number', count: 7, icon: '📞', severity: 'high' },
              { type: 'Physician Name', count: 23, icon: '👨‍⚕️', severity: 'medium' },
            ].map(p => `
              <div class="flex justify-between items-center" style="padding:var(--space-sm) 0; border-bottom:1px solid var(--border-light);">
                <div class="flex items-center gap-sm" style="font-size:13px;">
                  <span>${p.icon}</span>
                  <span>${p.type}</span>
                </div>
                <div class="flex items-center gap-sm">
                  <span class="badge badge-${p.severity === 'critical' ? 'blocked' : p.severity === 'high' ? 'flagged' : 'medium'}">${p.severity.toUpperCase()}</span>
                  <span style="font-weight:700; min-width:24px; text-align:right;">${p.count}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="card mb-lg">
          <div class="card-header">
            <div class="card-title">🗓 PHI Events — Last 7 Days</div>
          </div>
          <div class="card-body">
            <div class="heat-map">
              ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `
                <div class="heat-cell h${Math.floor(Math.random() * 4 + 1)}" title="${d}: ${Math.floor(Math.random()*20+5)} PHI events">
                  <div>${d}</div>
                  <div>${Math.floor(Math.random()*20+5)}</div>
                </div>
              `).join('')}
              <div class="heat-cell h3" title="Morning: 28 events"><div>AM</div><div>28</div></div>
              <div class="heat-cell h4" title="Midday: 34 events"><div>Noon</div><div>34</div></div>
              <div class="heat-cell h5" title="Afternoon: 42 events"><div>PM</div><div>42</div></div>
              <div class="heat-cell h2" title="Evening: 15 events"><div>Eve</div><div>15</div></div>
            </div>
            <div style="margin-top:var(--space-md); display:flex; gap:var(--space-sm); font-size:10px; color:var(--text-muted); flex-wrap:wrap; align-items:center;">
              <span>Low risk</span>
              <div class="heat-cell h0" style="height:16px;width:24px;font-size:0;"></div>
              <div class="heat-cell h2" style="height:16px;width:24px;font-size:0;"></div>
              <div class="heat-cell h3" style="height:16px;width:24px;font-size:0;"></div>
              <div class="heat-cell h5" style="height:16px;width:24px;font-size:0;"></div>
              <span>Critical</span>
            </div>
          </div>
        </div>

        <div class="card mb-lg">
          <div class="card-header"><div class="card-title">🛡 PHIPA Compliance Checklist</div></div>
          <div class="card-body">
            ${[
              { check: 'pass', text: 'PHI detection engine active (NER model v3.2)' },
              { check: 'pass', text: 'All queries pseudonymized before AI transmission' },
              { check: 'pass', text: 'Audit trail records all PHI events' },
              { check: 'pass', text: 'Data residency: Canadian servers only' },
              { check: 'pass', text: 'Encryption at rest (AES-256) and in transit (TLS 1.3)' },
              { check: 'pass', text: 'Access controls by role and department' },
              { check: 'warn', text: 'Annual consent review — due in 14 days' },
              { check: 'fail', text: 'Oncology policy re-validation overdue (41 days)' },
            ].map(c => `
              <div class="compliance-item">
                <div class="compliance-check ${c.check}">
                  ${c.check === 'pass' ? '✓' : c.check === 'fail' ? '✕' : '!'}
                </div>
                <div class="compliance-text">${c.text}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><div class="card-title">⚡ Top PHI Offenders (This Week)</div></div>
          <div class="card-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>PHI Events</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  { user: 'Dr. Nguyen', count: 4, status: 'blocked' },
                  { user: 'Dr. Park', count: 3, status: 'flagged' },
                  { user: 'NP Williams', count: 2, status: 'flagged' },
                  { user: 'Dr. Santos', count: 1, status: 'approved' },
                ].map(o => `
                  <tr>
                    <td><strong>${o.user}</strong></td>
                    <td><span class="badge badge-${o.status === 'blocked' ? 'blocked' : o.status === 'flagged' ? 'flagged' : 'approved'}">${o.count}</span></td>
                    <td><span class="badge badge-${o.status}">${o.status.toUpperCase()}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== AUDIT LOG ===================

function renderAuditLog() {
  return `
  <div>
    <div class="card mb-lg">
      <div class="card-header">
        <div>
          <div class="card-title">📋 Immutable Audit Log</div>
          <div class="card-subtitle">All AI interactions — tamper-proof, PHIPA-compliant, cryptographically signed</div>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-ghost btn-sm">📥 Export CSV</button>
          <button class="btn btn-ghost btn-sm">📄 Export PDF</button>
          <button class="btn btn-primary btn-sm">🔍 Search</button>
        </div>
      </div>
      <div class="card-body" style="padding:0;">
        <div style="padding:var(--space-md); display:flex; gap:var(--space-sm); flex-wrap:wrap; background:var(--bg-page); border-bottom:1px solid var(--border);">
          <select class="form-control" style="width:auto; padding:6px 12px; font-size:12px;">
            <option>All Statuses</option>
            <option>Approved</option>
            <option>Blocked</option>
            <option>Flagged</option>
          </select>
          <select class="form-control" style="width:auto; padding:6px 12px; font-size:12px;">
            <option>All Departments</option>
            <option>Emergency</option>
            <option>Cardiology</option>
            <option>Oncology</option>
          </select>
          <select class="form-control" style="width:auto; padding:6px 12px; font-size:12px;">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Time</th>
                <th>User / Role</th>
                <th>Action</th>
                <th>PHI</th>
                <th>Model</th>
                <th>Tokens</th>
                <th>Status</th>
                <th>Risk</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${AUDIT_DATA.map(a => `
                <tr>
                  <td><span class="font-mono" style="font-size:11px; color:var(--text-muted);">${a.id}</span></td>
                  <td><span class="font-mono" style="font-size:11px;">${a.time}</span></td>
                  <td>
                    <div style="font-weight:600; font-size:12px;">${a.user}</div>
                    <div style="font-size:11px; color:var(--text-muted);">${a.role}</div>
                  </td>
                  <td style="font-size:12px; max-width:200px;">${a.action}</td>
                  <td>
                    <span class="badge ${a.phi === 'DETECTED & REDACTED' ? 'badge-flagged' : a.phi === 'BLOCKED' ? 'badge-blocked' : 'badge-approved'}" style="font-size:10px;">
                      ${a.phi === 'DETECTED & REDACTED' ? '⚠️' : a.phi === 'BLOCKED' ? '🚫' : a.phi === 'None detected' ? '✅' : 'ℹ️'}
                      ${a.phi}
                    </span>
                  </td>
                  <td style="font-size:11px; color:var(--text-muted);">${a.model}</td>
                  <td style="font-size:12px; font-family:var(--font-mono);">${a.tokens}</td>
                  <td><span class="badge badge-${a.status}">${a.status.toUpperCase()}</span></td>
                  <td>
                    <span class="badge ${a.risk === 'critical' ? 'badge-critical' : a.risk === 'medium' ? 'badge-flagged' : 'badge-approved'}">${a.risk.toUpperCase()}</span>
                  </td>
                  <td>
                    <button class="btn btn-ghost btn-sm" onclick="showAuditDetail('${a.id}')">View</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">🔗 Blockchain Verification</div></div>
        <div class="card-body">
          <div class="audit-entry approved">
            <div class="audit-entry-header">
              <div class="audit-entry-id">AUD-2024-8841</div>
              <span class="badge badge-approved">✅ VERIFIED</span>
            </div>
            Hash: sha256:a3f8e2c1d4b7902f5e...<br>
            Prev: sha256:b2d9f1e5a6c8310d4f...<br>
            Timestamp: 2024-06-10T08:42:17.443Z<br>
            Node: LCMC-SINAI-AUDIT-01<br>
            Signature: VALID ✓
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">📊 Today's Audit Summary</div></div>
        <div class="card-body">
          <div class="bar-chart" id="audit-bar-chart">
            ${[
              { label: 'Approved', height: 80, color: 'var(--brand-teal)' },
              { label: 'Flagged', height: 35, color: 'var(--brand-amber)' },
              { label: 'Blocked', height: 20, color: 'var(--brand-red)' },
            ].map(b => `
              <div class="bar-col">
                <div class="bar" data-target="${b.height}" style="height:0; background:${b.color};"></div>
                <div class="bar-label">${b.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== GOVERNANCE ===================

function renderGovernance() {
  return `
  <div>
    <div class="flex justify-between items-center mb-lg">
      <div>
        <div style="font-size:18px; font-weight:800; color:var(--text-primary);">Department Governance Policies</div>
        <div style="font-size:13px; color:var(--text-muted);">PHIPA-aligned AI usage policies per clinical department</div>
      </div>
      <button class="btn btn-primary" onclick="showNewPolicyModal()">+ New Policy</button>
    </div>

    <div class="card mb-lg">
      <div style="overflow-x:auto;">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${GOVERNANCE_POLICIES.map(p => `
              <tr>
                <td><strong>${p.dept}</strong></td>
                <td>
                  <span class="badge badge-${p.status === 'active' ? 'approved' : 'flagged'}">
                    ${p.status === 'active' ? '✅ Active' : '⚠️ Under Review'}
                  </span>
                </td>
                <td>
                  <span class="badge ${p.level === 'CRITICAL' ? 'badge-critical' : p.level === 'HIGH' ? 'badge-blocked' : 'badge-medium'}">
                    ${p.level}
                  </span>
                </td>
                <td style="font-size:12px;">${p.models.join(', ')}</td>
                <td style="font-size:12px; font-family:var(--font-mono);">${p.lastReview}</td>
                <td style="font-size:12px; font-family:var(--font-mono); color:${p.dept === 'Oncology' ? 'var(--brand-red)' : 'inherit'};">
                  ${p.nextReview}${p.dept === 'Oncology' ? ' ⚠️' : ''}
                </td>
                <td style="font-size:12px; font-family:var(--font-mono);">${p.queries.toLocaleString()}</td>
                <td>
                  <span style="font-weight:700; color:${p.violations > 0 ? 'var(--brand-red)' : 'var(--brand-green)'};">
                    ${p.violations}
                  </span>
                </td>
                <td>
                  <button class="btn btn-outline btn-sm">Edit</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <div class="card-title">⚖️ PHIPA Obligations Tracker</div>
        </div>
        <div class="card-body">
          ${[
            { obligation: 'Consent Management', status: 'pass', detail: 'Implicit consent via EMR login' },
            { obligation: 'Privacy Officer Oversight', status: 'pass', detail: 'Dr. L. Park — designated DPO' },
            { obligation: 'Data Minimization', status: 'pass', detail: 'PHI stripped before AI transmission' },
            { obligation: 'Right to Access', status: 'pass', detail: 'Audit log available on request' },
            { obligation: 'Breach Notification', status: 'pass', detail: 'Policy: notify within 72 hrs' },
            { obligation: 'Annual Training', status: 'warn', detail: '3 staff training overdue' },
            { obligation: 'Third-party Assessment', status: 'fail', detail: 'Anthropic data processing agreement — needs re-signing' },
          ].map(o => `
            <div class="compliance-item">
              <div class="compliance-check ${o.status}">${o.status === 'pass' ? '✓' : o.status === 'fail' ? '✕' : '!'}</div>
              <div>
                <div style="font-weight:600; font-size:13px;">${o.obligation}</div>
                <div style="font-size:11px; color:var(--text-muted);">${o.detail}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><div class="card-title">📝 Policy Change Log</div></div>
        <div class="card-body" style="display:flex; flex-direction:column; gap:var(--space-sm);">
          ${[
            { date: '2024-06-10', action: 'Emergency Medicine policy updated — added sepsis protocol template', user: 'Admin Ramos', type: 'approved' },
            { date: '2024-06-08', action: 'Radiology model access restricted — investigation pending', user: 'Dr. Park (CMO)', type: 'blocked' },
            { date: '2024-06-05', action: 'New department added: Oncology AI governance framework', user: 'IT Security', type: 'flagged' },
            { date: '2024-05-30', action: 'Claude 3 Opus approved for complex diagnostic support', user: 'Dr. Park (CMO)', type: 'approved' },
          ].map(l => `
            <div class="audit-entry ${l.type}" style="font-size:12px;">
              <div class="audit-entry-header">
                <span style="font-weight:600;">${l.date}</span>
                <span class="badge badge-${l.type}">${l.type.toUpperCase()}</span>
              </div>
              <div>${l.action}</div>
              <div style="color:var(--text-muted); margin-top:4px;">By: ${l.user}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== MODEL REGISTRY ===================

function renderModels() {
  return `
  <div>
    <div class="flex justify-between items-center mb-lg">
      <div>
        <div style="font-size:18px; font-weight:800;">Clinical AI Model Registry</div>
        <div style="font-size:13px; color:var(--text-muted);">Approved, blocked, and under-review AI models — PHIPA validated</div>
      </div>
      <button class="btn btn-primary">+ Submit Model for Review</button>
    </div>

    <div class="stats-grid mb-lg">
      <div class="stat-card green">
        <div class="stat-value green">2</div>
        <div class="stat-label">Approved Models</div>
      </div>
      <div class="stat-card red">
        <div class="stat-value red">1</div>
        <div class="stat-label">Blocked Models</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-value amber">1</div>
        <div class="stat-label">Under PHIPA Review</div>
      </div>
      <div class="stat-card blue">
        <div class="stat-value blue">18K</div>
        <div class="stat-label">Approved Queries (MTD)</div>
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:var(--space-md);">
      ${MODEL_REGISTRY.map(m => `
        <div class="card ${m.status === 'blocked' ? 'border-danger' : ''}">
          <div class="card-body">
            <div class="flex justify-between items-center mb-sm">
              <div>
                <div style="font-size:16px; font-weight:800; display:flex; align-items:center; gap:var(--space-sm);">
                  🧠 ${m.name}
                  <span class="badge badge-${m.status === 'approved' ? 'approved' : m.status === 'blocked' ? 'blocked' : 'flagged'}">
                    ${m.status.toUpperCase()}
                  </span>
                </div>
                <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
                  ${m.provider} · Version: ${m.version}
                </div>
              </div>
              <div class="flex gap-sm">
                ${m.status !== 'blocked' ? `<button class="btn btn-outline btn-sm">📋 View Eval Report</button>` : ''}
                ${m.status === 'blocked' ? `<span class="badge badge-blocked">🚫 DO NOT USE — Data Residency Risk</span>` : ''}
              </div>
            </div>
            <div class="grid-3" style="gap:var(--space-sm); margin-top:var(--space-md);">
              <div>
                <div style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Approved Use</div>
                <div style="font-size:13px;">${m.use}</div>
              </div>
              <div>
                <div style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">PHIPA Risk Level</div>
                <div><span class="badge ${m.risk === 'LOW' ? 'badge-approved' : m.risk === 'HIGH' ? 'badge-blocked' : m.risk === 'MEDIUM' ? 'badge-flagged' : 'badge-medium'}">${m.risk}</span></div>
              </div>
              <div>
                <div style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Approved By</div>
                <div style="font-size:13px;">${m.reviewer}</div>
              </div>
              <div>
                <div style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Approval Date</div>
                <div style="font-size:13px; font-family:var(--font-mono);">${m.approved}</div>
              </div>
              <div>
                <div style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;">Total Queries</div>
                <div style="font-size:13px; font-weight:700;">${m.queries.toLocaleString()}</div>
              </div>
            </div>
            ${m.status === 'blocked' ? `
              <div class="alert alert-danger mt-md">
                🚫 <strong>BLOCKED:</strong> GPT-4o processes data on US servers. Canadian data residency requirements under PHIPA cannot be met. <strong>All queries to this model are blocked at the gateway.</strong>
              </div>
            ` : ''}
            ${m.status === 'review' ? `
              <div class="alert alert-warning mt-md">
                ⏳ <strong>UNDER REVIEW:</strong> IT Security is conducting a PHIPA compliance review. Expected completion: 2024-07-15. Do not use in clinical settings.
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  `;
}

// =================== ARCHITECTURE ===================

function renderArchitecture() {
  return `
  <div>
    <div class="grid-2 mb-lg">
      <div class="card">
        <div class="card-header">
          <div class="card-title">🏗️ Privacy-First System Architecture</div>
          <div class="card-subtitle">Data flow with PHIPA compliance layers</div>
        </div>
        <div class="card-body">
          <div class="arch-diagram">
            <div class="arch-node emr">🏥 EMR / Epic / Cerner<br><small>Clinical User Query</small></div>
            <div class="arch-arrow">↓</div>
            <div class="arch-node lcmc">🔐 LCMC API Gateway<br><small>OAuth + Role Verification</small></div>
            <div class="arch-arrow">↓</div>
            <div class="arch-node phi">🔬 PHI Detection Engine<br><small>Presidio NER + Custom OHIP Models</small></div>
            <div class="arch-arrow">↓</div>
            <div class="arch-node gov">⚖️ Governance Layer<br><small>Department Policy Check + Model Routing</small></div>
            <div class="arch-arrow">↓</div>
            <div class="arch-node ai">🧠 Anthropic Claude API<br><small>Claude 3.5 Sonnet (Canadian Region)</small></div>
            <div class="arch-arrow">↓</div>
            <div class="arch-node audit">📋 Audit & Compliance<br><small>Immutable Log + Blockchain Hash</small></div>
            <div class="arch-arrow">↓</div>
            <div class="arch-node response">✅ De-identified Response<br><small>Returned to Clinician</small></div>
          </div>
        </div>
      </div>

      <div>
        <div class="card mb-md">
          <div class="card-header"><div class="card-title">🛡️ Security Stack</div></div>
          <div class="card-body">
            ${[
              { layer: 'Transport', tech: 'TLS 1.3 — All traffic encrypted', icon: '🔒', ok: true },
              { layer: 'At Rest', tech: 'AES-256 — Patient query storage', icon: '💾', ok: true },
              { layer: 'Auth', tech: 'OAuth 2.0 + Hospital SSO (SAML)', icon: '🔑', ok: true },
              { layer: 'PHI Scan', tech: 'Microsoft Presidio + Custom OHIP NER', icon: '🔍', ok: true },
              { layer: 'Audit', tech: 'SHA-256 chained audit log (immutable)', icon: '📋', ok: true },
              { layer: 'Data Residency', tech: '🇨🇦 Canadian servers — AWS ca-central-1', icon: '🍁', ok: true },
              { layer: 'Pen Testing', tech: 'Quarterly penetration testing — Last: Q1 2024', icon: '🧪', ok: true },
            ].map(s => `
              <div class="flex gap-sm items-center" style="padding:var(--space-sm) 0; border-bottom:1px solid var(--border-light); font-size:13px;">
                <span>${s.icon}</span>
                <span style="font-weight:600; min-width:80px; color:var(--text-muted);">${s.layer}</span>
                <span style="flex:1;">${s.tech}</span>
                <span style="color:${s.ok ? 'var(--brand-green)' : 'var(--brand-red)'};">${s.ok ? '✅' : '❌'}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card mb-md">
          <div class="card-header"><div class="card-title">🏗️ Infrastructure</div></div>
          <div class="card-body">
            ${[
              { name: 'LCMC API', status: 'operational', uptime: '99.97%', region: 'ca-central-1' },
              { name: 'PHI Engine', status: 'operational', uptime: '99.99%', region: 'ca-central-1' },
              { name: 'Audit DB', status: 'operational', uptime: '100%', region: 'ca-central-1' },
              { name: 'Anthropic API', status: 'operational', uptime: '99.94%', region: 'Anthropic CDN' },
            ].map(s => `
              <div class="flex justify-between items-center" style="padding:var(--space-sm) 0; border-bottom:1px solid var(--border-light);">
                <div>
                  <div style="font-weight:600; font-size:13px;">${s.name}</div>
                  <div style="font-size:11px; color:var(--text-muted);">${s.region}</div>
                </div>
                <div style="text-align:right;">
                  <div class="flex items-center gap-sm">
                    <div style="width:8px; height:8px; border-radius:50%; background:var(--brand-green-light);"></div>
                    <span style="font-size:12px; color:var(--brand-green); font-weight:600;">OPERATIONAL</span>
                  </div>
                  <div style="font-size:11px; color:var(--text-muted);">Uptime: ${s.uptime}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><div class="card-title">📈 Business Case</div></div>
          <div class="card-body">
            <div class="roi-card mb-md">
              <div class="roi-value">$2.1M</div>
              <div class="roi-label">Year 1 Projected ROI (Mount Sinai)</div>
            </div>
            ${[
              { item: 'Avg time saved per query', value: '8.5 min' },
              { item: 'Queries per physician per day', value: '14' },
              { item: 'Physicians on platform', value: '140' },
              { item: 'Annual hours saved', value: '34,720 hrs' },
              { item: 'Value at $60/hr avg billing', value: '$2.1M' },
              { item: 'Platform cost (annual)', value: '$285K' },
            ].map(b => `
              <div class="flex justify-between" style="font-size:12px; padding:4px 0; border-bottom:1px solid var(--border-light);">
                <span style="color:var(--text-muted);">${b.item}</span>
                <span style="font-weight:700;">${b.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== MODAL ===================

function renderModal() {
  if (!state.modalContent) return '';
  return `
  <div class="modal-overlay" onclick="closeModal(event)">
    <div class="modal" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div class="modal-title">${state.modalContent.title}</div>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body">${state.modalContent.body}</div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="closeModal()">Close</button>
        ${state.modalContent.action ? `<button class="btn btn-primary" onclick="${state.modalContent.action}">${state.modalContent.actionLabel}</button>` : ''}
      </div>
    </div>
  </div>
  `;
}

// =================== ACTIONS ===================

function navigate(page) {
  state.activeNav = page;
  render();
}

function logout() {
  state.screen = 'login';
  state.user = null;
  state.activeNav = 'dashboard';
  render();
}

function login(roleId) {
  const role = ROLES.find(r => r.id === roleId) || ROLES[0];
  const names = { physician: 'Dr. Kamal Patel', nurse: 'NP Sarah Chen', resident: 'Dr. James Nguyen', cmo: 'Dr. Laura Park' };
  state.user = { role: roleId, name: names[roleId] };
  state.screen = 'app';
  render();
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  state.query = input.value;
  state.activeNav = 'ai-assistant';
  render();
  const msgs = document.getElementById('chat-messages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function clearChat() {
  state.query = '';
  render();
}

function insertTemplate(type) {
  const templates = {
    differential: 'Patient presents with [symptoms]. Age [X], relevant PMH: [history]. What are the top differential diagnoses?',
    drug: 'Patient is on [drug A] and [drug B]. Are there any significant interactions I should be aware of?',
    protocol: 'What is the current protocol for [condition/procedure] at Mount Sinai?',
    discharge: 'Please help draft a discharge summary for a patient admitted with [diagnosis], treated with [treatment], discharged to [destination].',
  };
  const input = document.getElementById('chat-input');
  if (input && templates[type]) input.value = templates[type];
}

function runPHIDetection() {
  const input = document.getElementById('phi-test-input');
  if (!input) return;
  // Animate the detection
  const box = document.getElementById('phi-result-box');
  const redacted = document.getElementById('phi-redacted-box');
  if (box) box.style.opacity = '0';
  if (redacted) redacted.style.opacity = '0';
  setTimeout(() => {
    if (box) { box.style.opacity = '1'; box.style.transition = 'opacity 0.5s'; }
    if (redacted) { redacted.style.opacity = '1'; redacted.style.transition = 'opacity 0.5s'; }
  }, 500);
}

function showAuditDetail(id) {
  const audit = AUDIT_DATA.find(a => a.id === id);
  if (!audit) return;
  state.showModal = true;
  state.modalContent = {
    title: `📋 Audit Record: ${id}`,
    body: `
      <div class="audit-entry ${audit.status}" style="margin-bottom:var(--space-md);">
        <div class="audit-entry-header">
          <div class="audit-entry-id">${id}</div>
          <span class="badge badge-${audit.status}">${audit.status.toUpperCase()}</span>
        </div>
        Timestamp: 2024-06-10T08:${audit.time} UTC<br>
        User: ${audit.user} (${audit.role})<br>
        Action: ${audit.action}<br>
        PHI Status: ${audit.phi}<br>
        Model: ${audit.model}<br>
        Tokens: ${audit.tokens}<br>
        Risk: ${audit.risk.toUpperCase()}<br>
        Hash: sha256:a3f8e2c1d4b7902f5e8b1c3d9f6a2e7b...<br>
        Signature: VALID ✓<br>
        Hospital: Mount Sinai · ca-central-1
      </div>
      ${audit.status === 'blocked' ? `
        <div class="alert alert-danger">
          🚫 <strong>This query was blocked.</strong> Physician attempted to include raw PHI (DOB + MRN) in an AI query. Privacy officer has been notified. No data was transmitted to the AI model.
        </div>
      ` : ''}
      ${audit.status === 'flagged' ? `
        <div class="alert alert-warning">
          ⚠️ <strong>This query was flagged for review.</strong> PHI was detected and redacted before transmission. A supervisor has been notified for quality review.
        </div>
      ` : ''}
    `,
    action: 'escalateAudit()',
    actionLabel: '🚨 Escalate to Privacy Officer',
  };
  render();
}

function showNewPolicyModal() {
  state.showModal = true;
  state.modalContent = {
    title: '+ New Governance Policy',
    body: `
      <div class="form-group">
        <label class="form-label">Department</label>
        <select class="form-control"><option>Select department...</option>
          <option>Emergency Medicine</option><option>Cardiology</option>
          <option>Psychiatry</option><option>Surgery</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Risk Level</label>
        <select class="form-control"><option>HIGH</option><option>MEDIUM</option><option>CRITICAL</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">Approved Models</label>
        <select class="form-control"><option>Claude 3.5 Sonnet</option><option>Claude 3 Opus</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">Policy Notes</label>
        <textarea class="form-control" rows="4" placeholder="Describe allowed use cases, restrictions, and review schedule..."></textarea>
      </div>
    `,
    action: 'closeModal()',
    actionLabel: '✅ Create Policy',
  };
  render();
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget) return;
  state.showModal = false;
  state.modalContent = null;
  render();
}

function escalateAudit() {
  closeModal();
  alert('Privacy Officer notified. Escalation ID: ESC-2024-0042');
}

// =================== EVENT LISTENERS ===================

function attachEventListeners() {
  // Login screen
  const roles = document.querySelectorAll('.role-card');
  roles.forEach(card => {
    card.addEventListener('click', () => {
      roles.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const selected = document.querySelector('.role-card.selected');
      const roleId = selected ? selected.dataset.role : 'physician';
      login(roleId);
    });
  }

  // Nav items
  const navItems = document.querySelectorAll('[data-nav]');
  navItems.forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.nav));
  });

  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  // Stat card hover for audit detail
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  // Press Enter in chat (Ctrl+Enter)
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') sendMessage();
    });
  }
}

function animateBars() {
  const bars = document.querySelectorAll('.bar[data-target]');
  bars.forEach(bar => {
    const target = parseInt(bar.dataset.target);
    setTimeout(() => {
      bar.style.height = target + 'px';
    }, 100);
  });
}

// =================== INIT ===================

document.addEventListener('DOMContentLoaded', () => {
  render();
});
