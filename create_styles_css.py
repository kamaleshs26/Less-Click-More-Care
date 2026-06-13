import codecs

css_content = """/* ============================================================
   LESS CLICKS, MORE CARE™ — Minimal Professional Redesign
   ============================================================ */

:root {
  /* Brand Colors - Muted & Professional */
  --brand-blue: #1A365D;
  --brand-blue-mid: #2B6CB0;
  --brand-blue-light: #4299E1;
  
  --brand-teal: #285E61;
  --brand-teal-light: #319795;
  
  --brand-red: #9B2C2C;
  --brand-red-light: #C53030;
  
  --brand-amber: #975A16;
  --brand-amber-light: #B7791F;
  
  --brand-green: #22543D;
  --brand-green-light: #2F855A;

  /* Neutrals */
  --bg-page: #F7FAFC;
  --bg-card: #FFFFFF;
  --bg-sidebar: #1A202C;
  --bg-header: #FFFFFF;
  
  --border: #E2E8F0;
  --border-light: #EDF2F7;
  
  --text-primary: #1A202C;
  --text-secondary: #4A5568;
  --text-muted: #A0AEC0;
  --text-inverse: #FFFFFF;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Typography */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Shadows - Flat & subtle */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02);

  /* Radius - Less rounded */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;

  /* Transitions */
  --transition: 0.15s ease-in-out;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-page);
  -webkit-font-smoothing: antialiased;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ============================================================
   LAYOUT
   ============================================================ */

.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-xl);
}

/* ============================================================
   SIDEBAR
   ============================================================ */

.sidebar {
  width: 240px;
  min-width: 240px;
  background: var(--bg-sidebar);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1px solid #2D3748;
}

.sidebar-brand {
  padding: var(--space-lg);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.brand-name {
  color: #FFFFFF;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.2px;
}

.brand-tagline {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  flex: 1;
  padding: var(--space-md) 0;
}

.nav-section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #718096;
  padding: var(--space-md) var(--space-lg) var(--space-xs);
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--space-lg);
  color: #A0AEC0;
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition);
  border-left: 2px solid transparent;
}

.nav-item:hover {
  color: #FFFFFF;
  background: rgba(255,255,255,0.02);
}

.nav-item.active {
  color: #FFFFFF;
  border-left-color: var(--brand-blue-light);
  background: rgba(255,255,255,0.05);
}

.nav-badge {
  background: #2D3748;
  color: #E2E8F0;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.nav-badge.amber { background: #744210; color: #FEEBC8; }

.sidebar-footer {
  padding: var(--space-md) var(--space-lg);
  border-top: 1px solid rgba(255,255,255,0.05);
}

.sidebar-user {
  display: flex;
  align-items: center;
}

.user-info .user-name {
  color: #E2E8F0;
  font-size: 12px;
  font-weight: 600;
}

.user-info .user-role {
  font-size: 11px;
  color: #718096;
}

/* ============================================================
   TOP BAR
   ============================================================ */

.top-bar {
  background: var(--bg-header);
  border-bottom: 1px solid var(--border);
  padding: 0 var(--space-xl);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.top-bar-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.top-bar-subtitle {
  font-size: 12px;
  color: var(--text-muted);
}

.compliance-badge {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background: var(--bg-page);
  margin-left: 8px;
}

/* ============================================================
   CARDS & STATS
   ============================================================ */

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.card-header {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.card-body {
  padding: var(--space-lg);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
}

.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-xs);
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-change {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
}

.stat-change.up { color: var(--brand-green-light); }
.stat-change.down { color: var(--brand-red-light); }

/* ============================================================
   BUTTONS
   ============================================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all var(--transition);
}

.btn-primary {
  background: var(--brand-blue-mid);
  color: white;
}

.btn-primary:hover {
  background: var(--brand-blue);
}

.btn-outline {
  background: transparent;
  border-color: var(--border);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: var(--bg-page);
  border-color: #CBD5E0;
}

.btn-ghost {
  background: transparent;
  color: var(--brand-blue-mid);
}

.btn-ghost:hover {
  background: var(--bg-page);
}

.btn-sm {
  padding: 4px 10px;
  font-size: 12px;
}

.btn-lg {
  padding: 12px 24px;
  font-size: 14px;
}

.w-full { width: 100%; }

/* ============================================================
   BADGES & ALERTS
   ============================================================ */

.badge {
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-approved, .badge-active { background: #F0FFF4; color: #22543D; border: 1px solid #C6F6D5; }
.badge-blocked, .badge-critical { background: #FFF5F5; color: #9B2C2C; border: 1px solid #FED7D7; }
.badge-flagged, .badge-review { background: #FFFAF0; color: #975A16; border: 1px solid #FEEBC8; }

.alert {
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 12px;
  background: #EBF8FF;
  border: 1px solid #BEE3F8;
  color: #2A4365;
}

.risk-alert {
  padding: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FAFAFA;
}

.risk-alert.critical { border-left: 4px solid var(--brand-red); }
.risk-alert.high { border-left: 4px solid var(--brand-amber); }
.risk-alert.medium { border-left: 4px solid var(--brand-blue-light); }

.risk-alert-title { font-weight: 600; font-size: 13px; color: var(--text-primary); }
.risk-alert-desc { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }

/* ============================================================
   TABLES
   ============================================================ */

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  background: #F7FAFC;
  border-bottom: 1px solid var(--border);
}

.data-table td {
  padding: 12px 16px;
  font-size: 13px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
}

.data-table tr:hover td {
  background: #F7FAFC;
}

/* ============================================================
   FORMS
   ============================================================ */

.form-group { margin-bottom: 16px; }

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 13px;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--brand-blue-mid);
}

/* ============================================================
   PROGRESS BAR
   ============================================================ */

.progress-bar-wrapper {
  background: var(--border-light);
  border-radius: var(--radius-sm);
  height: 4px;
}

.progress-bar-fill {
  height: 100%;
  border-radius: var(--radius-sm);
  background: var(--text-muted);
}
.progress-bar-fill.primary { background: var(--brand-blue-mid); }

/* ============================================================
   SPECIFIC SCREENS
   ============================================================ */

/* Login */
.login-screen {
  min-height: 100vh;
  background: #EDF2F7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 440px;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.login-header {
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--border-light);
  text-align: center;
}

.login-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--brand-blue);
  letter-spacing: -0.5px;
}

.login-sub {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.login-body {
  padding: 32px;
}

.role-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.role-list-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.role-list-item:hover {
  background: #F7FAFC;
  border-color: #CBD5E0;
}

.role-list-item.selected {
  border-color: var(--brand-blue-mid);
  background: #EBF8FF;
}

.role-list-abbr {
  font-size: 12px;
  font-weight: 600;
  color: var(--brand-blue-mid);
  background: #EBF8FF;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}
.role-list-item.selected .role-list-abbr {
  background: var(--brand-blue-mid);
  color: white;
}

.role-list-info {
  display: flex;
  flex-direction: column;
}

.role-list-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.role-list-dept {
  font-size: 11px;
  color: var(--text-muted);
}

.login-footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-light);
  text-align: center;
}

.login-compliance {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Chat & AI */
.ai-screen {
  display: flex;
  gap: var(--space-lg);
  height: calc(100vh - 120px);
}

.ai-chat-area {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.ai-pipeline-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.chat-messages {
  flex: 1;
  padding: var(--space-lg);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  background: #F7FAFC;
}

.message {
  max-width: 85%;
}
.message.user { align-self: flex-end; }

.message-meta-top {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.message.user .message-meta-top { text-align: right; }

.message-bubble {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
  line-height: 1.5;
  box-shadow: var(--shadow-sm);
}

.message.user .message-bubble {
  background: var(--brand-blue-mid);
  color: white;
  border-bottom-right-radius: 0;
}

.message.assistant .message-bubble {
  background: white;
  border: 1px solid var(--border);
  color: var(--text-primary);
  border-bottom-left-radius: 0;
}

.phi-banner {
  font-size: 11px;
  background: #FEF5E7;
  color: #975A16;
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
  border: 1px solid #FEEBC8;
  font-weight: 500;
}

.chat-input-area {
  padding: var(--space-md);
  background: white;
  border-top: 1px solid var(--border);
}

.chat-input-row {
  display: flex;
  gap: var(--space-md);
}

.chat-input-row textarea {
  min-height: 80px;
}

.pipeline-step {
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: #F7FAFC;
}

.pipeline-step-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.pipeline-step-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
}

.pipeline-step-time {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
}

.pipeline-step-detail {
  font-size: 11px;
  color: var(--text-secondary);
}

/* PHI Redaction test area */
.phi-detection-box {
  padding: 12px;
  background: #F7FAFC;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
}

.phi-redacted {
  background: #2D3748;
  color: white;
  padding: 0 4px;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 600;
}

/* Grid Utilities */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); }
.grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-lg); }

/* Spacing Utilities */
.mb-xs { margin-bottom: 4px; }
.mb-sm { margin-bottom: 8px; }
.mb-md { margin-bottom: 16px; }
.mb-lg { margin-bottom: 24px; }
.mt-xs { margin-top: 4px; }
.mt-sm { margin-top: 8px; }
.mt-md { margin-top: 16px; }

.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.gap-sm { gap: 8px; }

.font-mono { font-family: var(--font-mono); font-size: 12px; }
.text-danger { color: var(--brand-red); font-weight: 600; }
"""

with codecs.open('styles.css', 'w', 'utf-8') as f:
    f.write(css_content)

print("Created minimal styles.css")
