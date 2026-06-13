import codecs

js_content = """/* ============================================================
   LESS CLICKS, MORE CARE™ — Main Application
   Minimal Professional Redesign with RBAC & Dynamic AI Portal
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
  messages: [
    {
      role: 'user',
      text: 'Patient with chest pain, elevated troponin 2.4 ng/mL, ST changes in V3-V5. What are the next steps in management?',
      time: '08:41:22',
      phi: false,
    },
    {
      role: 'assistant',
      text: 'Based on the clinical parameters provided, this indicates a high-probability NSTEMI/ACS. Recommended standard steps:\\n\\n1. Activate cath lab (PCI within 90 min if hemodynamically unstable)\\n2. Antiplatelet therapy: Aspirin 325mg + P2Y12 inhibitor\\n3. Anticoagulation: Unfractionated heparin or Enoxaparin\\n4. Monitoring: Continuous cardiac monitoring, serial troponins\\n5. Cardiology consult\\n\\nNote: This is clinical decision support only. Physician judgment is required.',
      time: '08:41:24',
      phi: false,
    }
  ],
  pipelineSteps: [
    { name: 'Data Ingestion', detail: 'Waiting for input...', time: '-' },
    { name: 'PHI Detection', detail: 'Pending', time: '-' },
    { name: 'Anonymization', detail: 'Pending', time: '-' },
    { name: 'Policy Validation', detail: 'Pending', time: '-' },
    { name: 'Model Execution', detail: 'Pending', time: '-' },
    { name: 'Audit Logging', detail: 'Pending', time: '-' },
  ],
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

const AUDIT_DATA = [
  { id: 'AUD-2024-8841', user: 'Dr. Patel', role: 'Physician', action: 'AI Query — Differential diagnosis', phi: 'Redacted', status: 'Approved', risk: 'Low', time: '08:42:17', tokens: 312, model: 'Claude 3.5 Sonnet' },
  { id: 'AUD-2024-8840', user: 'NP Chen', role: 'Nurse Practitioner', action: 'AI Query — Drug interaction check', phi: 'None', status: 'Approved', risk: 'Low', time: '08:39:02', tokens: 188, model: 'Claude 3.5 Sonnet' },
  { id: 'AUD-2024-8839', user: 'Dr. Nguyen', role: 'Resident', action: 'AI Query — Included raw DOB and MRN', phi: 'Blocked', status: 'Blocked', risk: 'Critical', time: '08:31:55', tokens: 0, model: 'N/A' },
  { id: 'AUD-2024-8838', user: 'Dr. Abramowitz', role: 'Physician', action: 'AI Query — Post-op care protocol', phi: 'Flagged', status: 'Flagged', risk: 'Medium', time: '08:28:11', tokens: 445, model: 'Claude 3.5 Sonnet' },
  { id: 'AUD-2024-8837', user: 'Admin Ramos', role: 'Admin', action: 'Model policy update — Trauma ICU', phi: 'N/A', status: 'Approved', risk: 'Low', time: '08:15:00', tokens: 0, model: 'System' },
];

const GOVERNANCE_POLICIES = [
  { dept: 'Emergency Medicine', status: 'Active', level: 'High', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-15', nextReview: '2024-08-15', queries: 1847, violations: 0 },
  { dept: 'Cardiology', status: 'Active', level: 'High', models: ['Claude 3.5 Sonnet'], lastReview: '2024-05-10', nextReview: '2024-08-10', queries: 923, violations: 1 },
  { dept: 'Oncology', status: 'Review', level: 'Critical', models: ['Claude 3.5 Sonnet'], lastReview: '2024-04-01', nextReview: '2024-07-01', queries: 412, violations: 0 },
];

const MODEL_REGISTRY = [
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', version: '3.5-20241022', status: 'Approved', use: 'Clinical Q&A, Documentation', risk: 'Low' },
  { name: 'Claude 3 Opus', provider: 'Anthropic', version: '3-opus-20240229', status: 'Approved', use: 'Complex Diagnostic Support', risk: 'Medium' },
  { name: 'GPT-4o (Canada Region)', provider: 'OpenAI', version: '2024-05-13', status: 'Approved', use: 'General Clinical Queries', risk: 'Low' },
  { name: 'GPT-4 (Global)', provider: 'OpenAI', version: 'gpt-4', status: 'Blocked', use: 'Data residency non-compliant', risk: 'High' },
  { name: 'Gemini 1.5 Pro', provider: 'Google', version: '1.5-pro', status: 'Review', use: 'Under PHIPA review', risk: 'Unknown' },
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
        <div class="login-title">Less Clicks, More Care™</div>
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
            Canadian Data Residency • PHIPA Compliant • SOC 2 Type II
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
      <div class="page-content fade-in">
        ${renderPage()}
      </div>
    </div>
    ${state.showModal ? renderModal() : ''}
  </div>
  `;
}

function renderSidebar() {
  const role = ROLES.find(r => r.id === state.user?.id) || ROLES[0];
  const userNavs = NAV_ITEMS.filter(item => item.roles.includes(role.id));
  
  return `
  <div class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-name">Less Clicks, More Care™</div>
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

// =================== DASHBOARD (CMO Only) ===================

function renderDashboard() {
  return `
  <div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Queries Today</div>
        <div class="stat-value">2,847</div>
        <div class="stat-change up">12% vs yesterday</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg Response Time</div>
        <div class="stat-value">1.2s</div>
        <div class="stat-change">Target met</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">PHI Auto-Redactions</div>
        <div class="stat-value">87</div>
        <div class="stat-change up">Across all depts</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Queries Blocked</div>
        <div class="stat-value">14</div>
        <div class="stat-change down">Policy violations</div>
      </div>
    </div>

    <div class="grid-2 mb-lg">
      <div class="card">
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
      
      <div class="card">
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
  const selectedModelInfo = MODEL_REGISTRY.find(m => m.name === state.selectedModel) || MODEL_REGISTRY[0];
  const isBlocked = selectedModelInfo.status === 'Blocked';
  
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
            <select class="form-control" id="model-select" style="width:200px; padding:6px; font-size:12px;" ${state.isProcessing ? 'disabled' : ''}>
              ${MODEL_REGISTRY.map(m => `
                <option value="${m.name}" ${m.name === state.selectedModel ? 'selected' : ''}>
                  ${m.name} (${m.status})
                </option>
              `).join('')}
            </select>
          </div>
        </div>
        
        ${isBlocked ? `
        <div style="padding:12px 24px; background:#FFF5F5; border-bottom:1px solid #FED7D7; color:#9B2C2C; font-size:12px; font-weight:500;">
          WARNING: ${state.selectedModel} is currently BLOCKED due to policy (${selectedModelInfo.use}). Queries cannot be sent.
        </div>` : ''}

        <div class="card-body" style="padding:0; flex:1; display:flex; flex-direction:column; min-height:0;">
          <div class="chat-messages" id="chat-messages">
            ${state.messages.map(m => renderMessage(m)).join('')}
          </div>
          <div class="chat-input-area" style="flex-shrink:0;">
            <div class="chat-input-row">
              <textarea class="form-control" id="chat-input" placeholder="Enter clinical scenario or paste notes..." ${isBlocked || state.isProcessing ? 'disabled' : ''}>${state.query}</textarea>
              <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
                <button class="btn btn-primary" id="send-btn" onclick="sendMessage()" ${isBlocked || state.isProcessing ? 'disabled' : ''}>
                  ${state.isProcessing ? 'Processing...' : 'Send to AI'}
                </button>
                <button class="btn btn-ghost" onclick="clearChat()">Clear</button>
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
            <div class="pipeline-step" style="${s.active ? 'border-color:var(--brand-blue-mid); background:#EBF8FF;' : s.done ? 'border-color:#C6F6D5; background:#F0FFF4;' : ''}">
              <div class="pipeline-step-header">
                <div class="pipeline-step-name" style="${s.done ? 'color:var(--brand-green-light);' : s.active ? 'color:var(--brand-blue-mid);' : ''}">${i+1}. ${s.name}</div>
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
  return `
  <div class="message ${m.role}">
    <div class="message-meta-top">
      ${m.role === 'assistant' ? `System Response (${m.model || state.selectedModel})` : `User Query`}
      <span style="font-weight:normal; color:var(--text-muted); margin-left:8px;">${m.time}</span>
    </div>
    <div class="message-bubble">
      ${m.phi ? `<div class="phi-banner">
        System Action: PHI automatically detected and redacted prior to transmission.
      </div>` : ''}
      ${m.text.replace(/\\n/g, '<br>')}
    </div>
  </div>
  `;
}

// =================== PHI GUARDIAN ===================

function renderPHIGuardian() {
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
        <div class="grid-2">
          <div>
            <div class="form-group">
              <label class="form-label">Recent Query Input</label>
              <div class="phi-detection-box" style="background: white;">
                Patient John Smith (DOB: 1972-09-18, MRN: 8834921) was admitted with a troponin of 3.2 ng/mL. He lives at 142 Bloor St West, Toronto.
              </div>
            </div>
          </div>
          <div>
            <label class="form-label">Redacted Payload (Sent to AI)</label>
            <div class="phi-detection-box" id="phi-redacted-box">
              Patient <span class="phi-redacted">[NAME]</span> (DOB: <span class="phi-redacted">[DATE]</span>, MRN: <span class="phi-redacted">[ID]</span>) was admitted with a troponin of 3.2 ng/mL. He lives at <span class="phi-redacted">[LOCATION]</span>, Toronto.
            </div>
            <div class="mt-md">
              <div class="text-sm font-medium mb-xs">Detected Entities:</div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <span class="badge badge-blocked">Name (1)</span>
                <span class="badge badge-blocked">MRN (1)</span>
                <span class="badge badge-flagged">DOB (1)</span>
                <span class="badge badge-flagged">Address (1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// =================== AUDIT LOG (Privacy Only) ===================

function renderAuditLog() {
  return `
  <div>
    <div class="card mb-lg">
      <div class="card-header">
        <div>
          <div class="card-title">Global Audit Dashboard</div>
          <div class="card-subtitle">Immutable log of all platform interactions</div>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-outline btn-sm">Export CSV</button>
        </div>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Timestamp</th>
              <th>User / Role</th>
              <th>Action / Query Type</th>
              <th>PHI Status</th>
              <th>Status</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            ${AUDIT_DATA.map(a => `
              <tr>
                <td><span class="font-mono">${a.id}</span></td>
                <td><span class="font-mono">${a.time}</span></td>
                <td><strong>${a.user}</strong><br><span style="font-size:11px; color:var(--text-muted);">${a.role}</span></td>
                <td>${a.action}</td>
                <td><span class="badge ${a.phi === 'Redacted' ? 'badge-flagged' : a.phi === 'Blocked' ? 'badge-blocked' : 'badge-approved'}">${a.phi}</span></td>
                <td><span class="badge badge-${a.status.toLowerCase()}">${a.status}</span></td>
                <td>${a.model}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== GOVERNANCE (Privacy Only) ===================

function renderGovernance() {
  return `
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Departmental Governance Policies</div>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Status</th>
              <th>Risk Tier</th>
              <th>Approved Models</th>
              <th>Next Review</th>
            </tr>
          </thead>
          <tbody>
            ${GOVERNANCE_POLICIES.map(p => `
              <tr>
                <td><strong>${p.dept}</strong></td>
                <td><span class="badge badge-${p.status === 'Active' ? 'approved' : 'flagged'}">${p.status}</span></td>
                <td>${p.level}</td>
                <td>${p.models.join(', ')}</td>
                <td class="font-mono">${p.nextReview}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== MODELS ===================

function renderModels() {
  return `
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">Model Registry</div>
      </div>
      <div class="card-body" style="padding:0;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Provider</th>
              <th>Version</th>
              <th>Approval Status</th>
              <th>Permitted Use Case</th>
              <th>Compliance</th>
            </tr>
          </thead>
          <tbody>
            ${MODEL_REGISTRY.map(m => `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.provider}</td>
                <td class="font-mono">${m.version}</td>
                <td><span class="badge badge-${m.status === 'Approved' ? 'approved' : m.status === 'Blocked' ? 'blocked' : 'flagged'}">${m.status}</span></td>
                <td>${m.use}</td>
                <td>${m.risk === 'High' ? '<span class="text-danger">Non-compliant</span>' : 'Compliant (CA)'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// =================== MODALS & UTILS ===================

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
        if (!state.user) {
          state.user = ROLES[0]; // Default physician
        }
        
        // Determine default route based on role
        if (['physician', 'nurse', 'resident'].includes(state.user.id)) {
          state.activeNav = 'ai-assistant';
        } else if (state.user.id === 'cmo') {
          state.activeNav = 'dashboard';
        } else if (state.user.id === 'privacy') {
          state.activeNav = 'audit';
        }
        
        state.screen = 'app';
        render();
      });
    }
  } else {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', (e) => {
        state.activeNav = e.currentTarget.dataset.nav;
        render();
      });
    });
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.screen = 'login';
        state.user = null;
        render();
      });
    }

    const modelSelect = document.getElementById('model-select');
    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        // Save current chat input before re-rendering
        const input = document.getElementById('chat-input');
        if (input) state.query = input.value;
        
        state.selectedModel = e.target.value;
        render();
      });
    }
    
    // Auto-save textarea value to state so it's not lost on re-renders
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.addEventListener('input', (e) => {
        state.query = e.target.value;
      });
    }
  }
}

function navigate(navId) {
  state.activeNav = navId;
  render();
}

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
  
  const phiRegex = /\\b(?:19|20)\\d{2}[-/]\\d{2}[-/]\\d{2}\\b|\\b\\d{3}-\\d{3}-\\d{4}\\b|\\b\\d{7,10}\\b|\\b(?:John|Jane|Smith|Sarah)\\b/i;
  const hasPHI = text.includes('DOB') || text.includes('MRN') || text.includes('OHIP') || phiRegex.test(text);
  const userMsg = { role: 'user', text: text, time: new Date().toLocaleTimeString('en-US',{hour12:false}), phi: hasPHI };
  
  state.messages.push(userMsg);
  render(); // Update UI to show processing state and user message

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Step 1: Ingestion
  state.pipelineSteps[0] = { name: 'Data Ingestion', detail: 'Captured from browser payload', time: '12ms', done: true };
  render(); await sleep(200);

  // Step 2: PHI Detection
  state.pipelineSteps[1] = { name: 'PHI Detection', detail: 'Running NER Model...', time: '...', active: true };
  render(); await sleep(300);
  state.pipelineSteps[1] = { name: 'PHI Detection', detail: hasPHI ? 'PHI entities detected' : 'No PHI found', time: '45ms', done: true };
  render(); await sleep(200);

  // Step 3: Anonymization
  if (hasPHI) {
    state.pipelineSteps[2] = { name: 'Anonymization', detail: 'Redacting identified entities...', time: '...', active: true };
    render(); await sleep(200);
    state.pipelineSteps[2] = { name: 'Anonymization', detail: 'Payload pseudonymized', time: '18ms', done: true };
  } else {
    state.pipelineSteps[2] = { name: 'Anonymization', detail: 'Skipped (clean)', time: '0ms', done: true };
  }
  render(); await sleep(200);

  // Security Guardrails (Prompt Injection / Jailbreak protection)
  const isJailbreak = text.toLowerCase().match(/(trick|reveal|override|ignore previous|patient name|identity|bypass|forget)/);
  
  // Step 4: Policy
  state.pipelineSteps[3] = { name: 'Policy Validation', detail: 'Checking departmental rules...', time: '...', active: true };
  render(); await sleep(200);
  
  if (isJailbreak) {
    state.pipelineSteps[3] = { name: 'Policy Validation', detail: 'BLOCKED: Security Guardrail Triggered', time: '12ms', done: true };
    render(); await sleep(200);
    
    // Skip model execution if blocked
    state.pipelineSteps[4] = { name: 'Model Execution', detail: 'Skipped (Policy Violation)', time: '0ms', done: true };
    
    // Audit Logging
    state.pipelineSteps[5] = { name: 'Audit Logging', detail: 'Violation logged to immutable ledger', time: '21ms', done: true };
    
    const reply = "🛑 **Security Guardrail Triggered:** Potential prompt injection or policy bypass detected. I am securely containerized and cannot reveal patient identifiers, override redaction policies, or ignore previous instructions. All PHI is permanently stripped before reaching the AI context.";
    state.messages.push({ role: 'assistant', text: reply, time: new Date().toLocaleTimeString('en-US',{hour12:false}), phi: false, model: 'System Policy Engine' });
    state.isProcessing = false;
    render();
    setTimeout(() => { const md = document.getElementById('chat-messages'); if(md) md.scrollTop = md.scrollHeight; }, 50);
    return;
  }
  
  state.pipelineSteps[3] = { name: 'Policy Validation', detail: 'Approved for transmission', time: '5ms', done: true };
  render(); await sleep(200);

  // Step 5: Model
  state.pipelineSteps[4] = { name: 'Model Execution', detail: `Streaming to ${state.selectedModel}...`, time: '...', active: true };
  render(); await sleep(800);
  state.pipelineSteps[4] = { name: 'Model Execution', detail: 'Response complete', time: '1.2s', done: true };
  render(); await sleep(100);

  // Step 6: Audit
  state.pipelineSteps[5] = { name: 'Audit Logging', detail: 'Saving to immutable ledger...', time: '...', active: true };
  render(); await sleep(200);
  state.pipelineSteps[5] = { name: 'Audit Logging', detail: 'Record hashed and stored', time: '21ms', done: true };
  
  // Finalize
  let reply = "This is a simulated AI response based on the clinical notes provided. Due to policy rules, all specific identifiable information has been processed locally and discarded.";
  const lowerText = text.toLowerCase();
  
  // Build a string of the entire conversation history to simulate memory
  const fullHistory = state.messages.map(m => m.text).join('\\n').toLowerCase();
  
  if (lowerText.includes('troponin') || lowerText.includes('st changes')) {
    reply = "Elevated troponin suggests myocardial injury. Recommended steps:\\n1. Activate cath lab (PCI within 90 min)\\n2. Antiplatelet therapy: Aspirin 325mg\\n3. Continuous cardiac monitoring\\n4. Cardiology consult";
  } else if (lowerText.includes('handover') || lowerText.includes('summary')) {
    reply = "**Nursing Shift Handover Summary:**\\n\\n**Neuro:** Alert and oriented x3.\\n**Cardio:** Vitals stable (BP 128/82, HR 78). Pain decreased to 3/10 post-medication. Pending cardiology consult.\\n**Resp:** SpO2 97% on room air.\\n**Mobility:** Ambulating independently to washroom. Zero falls or safety incidents reported.\\n\\n*Plan for next shift:* Monitor pain levels and follow up on pending cardiology consultation.";
  } else if (lowerText.includes('drug') || lowerText.includes('interaction')) {
    reply = "⚠️ **Drug Interaction Warning:**\\n\\nConcomitant use of Warfarin and Aspirin increases bleeding risk. Ensure close monitoring of INR. Consider alternatives or gastroprotection (PPI) if dual therapy is required.";
  } else if (lowerText.includes('protocol') || lowerText.includes('discharge')) {
    reply = "**Discharge Protocol:**\\n\\n1. Medication reconciliation complete.\\n2. Follow-up appointment scheduled with PCP within 7 days.\\n3. Patient educated on signs/symptoms requiring ED return.\\n4. Prescriptions sent to preferred pharmacy.";
  } else if (lowerText.includes('spo2') || lowerText.includes('oxygen')) {
    if (fullHistory.includes('97%') || fullHistory.includes('97 %')) {
      reply = "Based on the shift notes provided earlier, the patient's SpO2 level is 97% on room air. They are currently stable from a respiratory standpoint.";
    } else {
      reply = "I don't see any SpO2 levels mentioned in the current clinical context. Could you provide the latest vitals?";
    }
  } else if (lowerText.includes('rephrase') || lowerText.includes('rewrite')) {
    reply = "Certainly. Here is a rephrased version of the clinical notes:\\n\\nThe patient is a middle-aged adult admitted with chest pain and dyspnea. Currently, hemodynamics are stable (BP 128/82, pulse 78) and oxygenation is adequate on room air. The patient experienced significant pain relief following analgesia (down from 7/10 to 3/10). They are independently mobile without any safety concerns. Awaiting cardiology input.";
  }
  
  state.messages.push({ role: 'assistant', text: reply, time: new Date().toLocaleTimeString('en-US',{hour12:false}), phi: false, model: state.selectedModel });
  state.isProcessing = false;
  
  render();
  
  // Auto scroll to bottom
  setTimeout(() => {
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 50);
}

function clearChat() {
  state.query = '';
  state.messages = [];
  resetPipeline();
  render();
}

function animateBars() {
  setTimeout(() => {
    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0%';
      bar.getBoundingClientRect(); // force reflow
      bar.style.width = w;
    });
    const messagesDiv = document.getElementById('chat-messages');
    if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 50);
}

// Init
window.onload = render;
"""

with codecs.open('app_clean.js', 'w', 'utf-8') as f:
    f.write(js_content)

print("Created RBAC enabled app_clean.js")
