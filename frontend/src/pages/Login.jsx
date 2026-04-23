import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/authSlice";
import { loginAPI } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [successFailed, setSuccessFailed] = useState(false);
   const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginAPI(form);

      dispatch(setAuth(res.data));
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      alert("Login failed");
    }
  };
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0d0f;
    --ink-muted: #6b6b7a;
    --ink-faint: #b0b0be;
    --surface: #f7f6f2;
    --card: #ffffff;
    --accent: #2d5be3;
    --accent-light: #eef1fd;
    --accent-dark: #1a3db5;
    --error: #e03434;
    --success: #18a06b;
    --border: #e4e3de;
  }

  body { background: var(--surface); font-family: 'Outfit', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes panelSlide {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%  { transform: translateY(-12px) rotate(1deg); }
    66%  { transform: translateY(-6px) rotate(-1deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .auth-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    animation: fadeIn 0.4s ease;
  }

  @media (max-width: 860px) {
    .auth-root { grid-template-columns: 1fr; }
    .auth-panel { display: none !important; }
  }

  /* LEFT DECORATIVE PANEL */
  .auth-panel {
    position: relative;
    background: var(--ink);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 52px;
    overflow: hidden;
    min-height: 100vh;
  }

  .panel-bg-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
  }

  .panel-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .panel-brand {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel-brand-mark {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--accent), #6b8ff0);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: #fff;
    font-family: 'Cormorant Garamond', serif;
    letter-spacing: -0.5px;
  }

  .panel-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 700;
    color: #fff; letter-spacing: 0.01em;
  }

  .panel-center {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }

  .panel-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 52px;
    font-weight: 600;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .panel-heading em {
    font-style: italic;
    background: linear-gradient(90deg, #6b8ff0, #a78bfa, #6b8ff0);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .panel-sub {
    color: #8888a0;
    font-size: 15px;
    line-height: 1.7;
    max-width: 320px;
    font-weight: 400;
  }

  .panel-features {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .panel-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #a0a0b8;
    font-size: 13.5px;
    font-weight: 400;
  }

  .panel-feature-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
    box-shadow: 0 0 8px var(--accent);
  }

  .panel-testimonial {
    position: relative;
    z-index: 2;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 24px;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(8px);
  }

  .panel-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 17px;
    color: rgba(255,255,255,0.75);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .panel-author {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2d5be3, #a78bfa);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #fff;
  }

  .panel-author-name {
    font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85);
  }

  .panel-author-role {
    font-size: 11px; color: #666688;
  }

  /* FLOATING SHAPES */
  .shape {
    position: absolute;
    border-radius: 50%;
    animation: float linear infinite;
  }

  /* RIGHT FORM AREA */
  .auth-form-area {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
    background: var(--card);
    min-height: 100vh;
    overflow-y: auto;
  }

  .auth-form-wrap {
    width: 100%;
    max-width: 420px;
    animation: panelSlide 0.35s cubic-bezier(.22,1,.36,1) both;
  }

  .form-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    padding: 5px 12px;
    background: var(--accent-light);
    border-radius: 100px;
  }

  .form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .form-subtitle {
    font-size: 14px;
    color: var(--ink-muted);
    margin-bottom: 36px;
    font-weight: 400;
    line-height: 1.6;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 8px;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }

  .input-wrap {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ink-faint);
    font-size: 15px;
    pointer-events: none;
    transition: color 0.2s;
    width: 16px; height: 16px;
    display: flex; align-items: center; justify-content: center;
  }

  .field input {
    width: 100%;
    padding: 11px 14px 11px 40px;
    border: 1.5px solid var(--border);
    border-radius: 11px;
    font-size: 14px;
    font-family: 'Outfit', sans-serif;
    color: var(--ink);
    background: var(--surface);
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .field input:focus {
    border-color: var(--accent);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(45,91,227,0.1);
  }

  .field input.error {
    border-color: var(--error);
  }

  .field input.error:focus {
    box-shadow: 0 0 0 4px rgba(224,52,52,0.1);
  }

  .field input:focus ~ .input-icon,
  .input-wrap:focus-within .input-icon {
    color: var(--accent);
  }

  .field-error {
    font-size: 11.5px;
    color: var(--error);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .strength-bar {
    margin-top: 6px;
    display: flex;
    gap: 4px;
  }

  .strength-seg {
    height: 3px;
    flex: 1;
    border-radius: 10px;
    background: var(--border);
    transition: background 0.3s;
  }

  .form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 28px;
  }

  .checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-wrap input[type=checkbox] { display: none; }

  .custom-checkbox {
    width: 18px; height: 18px;
    border: 1.5px solid var(--border);
    border-radius: 5px;
    background: var(--surface);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .custom-checkbox.checked {
    background: var(--accent);
    border-color: var(--accent);
  }

  .checkbox-label {
    font-size: 13px;
    color: var(--ink-muted);
  }

  .forgot-link {
    font-size: 13px;
    color: var(--accent);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    border: none; background: none;
    font-family: 'Outfit', sans-serif;
  }

  .forgot-link:hover { text-decoration: underline; }

  .submit-btn {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 11px;
    background: linear-gradient(135deg, var(--accent), #1a3db5);
    color: #fff;
    font-size: 14.5px;
    font-weight: 700;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(45,91,227,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: 0.02em;
  }

  .submit-btn:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(45,91,227,0.4);
  }

  .submit-btn:active:not(:disabled) { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .spinner {
    width: 16px; height: 16px;
    border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0;
    color: var(--ink-faint);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .social-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 28px;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    background: #fff;
    color: var(--ink);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.15s;
    font-family: 'Outfit', sans-serif;
  }

  .social-btn:hover {
    border-color: #bbb;
    background: var(--surface);
    transform: translateY(-1px);
  }

  .switch-text {
    text-align: center;
    font-size: 13.5px;
    color: var(--ink-muted);
    margin-top: 24px;
  }

  .switch-link {
    color: var(--accent);
    font-weight: 700;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    text-decoration: none;
  }

  .switch-link:hover { text-decoration: underline; }

  .terms-text {
    font-size: 12px;
    color: var(--ink-faint);
    line-height: 1.6;
    margin-top: 14px;
    text-align: center;
  }

  .terms-text a {
    color: var(--ink-muted);
    text-decoration: underline;
    cursor: pointer;
  }

  .success-banner {
    background: #f0fdf7;
    border: 1.5px solid #a7f3d0;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--success);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    animation: fadeUp 0.3s ease;
  }
  .success-banner-failed {
    background: #fef2f2;
    border: 1.5px solid #fecaca;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px;
    color: var(--error);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    animation: fadeUp 0.3s ease;
  }

  .pass-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ink-faint);
    font-size: 13px;
    padding: 2px;
    transition: color 0.2s;
    font-family: 'Outfit', sans-serif;
  }

  .pass-toggle:hover { color: var(--ink-muted); }
`;

const EyeIcon = ({ open }) => open
  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>;

const MailIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>;
const LockIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const UserIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const PhoneIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
const CheckIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>;
const GoogleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>;
const GithubIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;

function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthColors = ["#e8e3de","#ef4444","#f59e0b","#22c55e","#2d5be3"];
const strengthLabels = ["","Weak","Fair","Good","Strong"];

function LoginForm({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
     try {
      const res = await loginAPI(form);
      dispatch(setAuth(res.data));
      setSuccess(true);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      setSuccessFailed(true);
    }finally{
      setLoading(false);
    // setSuccess(true);
    }    
    
  };

  return (
    <div className="auth-form-wrap">
      <div className="form-eyebrow">◆ Welcome back</div>
      <h1 className="form-title">Sign in to<br />your account</h1>
      <p className="form-subtitle">Enter your credentials to access the dashboard.</p>

      {success && (
        <div className="success-banner">
          <span>✓</span> Login successful! Redirecting…
        </div>
      )}

      {successFailed && (
        <div className="success-banner-failed">
          <span>✗</span> Login failed! Please enter correct details…
        </div>
      )}

      <div className="social-row">
        <button className="social-btn"><GoogleIcon /> Google</button>
        <button className="social-btn"><GithubIcon /> GitHub</button>
      </div>

      <div className="divider">or continue with email</div>

      <div className="field-group">
        <div className="field">
          <label>Email address</label>
          <div className="input-wrap">
            <span className="input-icon"><MailIcon /></span>
            <input
              type="email" placeholder="you@example.com"
              className={errors.email ? "error" : ""}
              value={form.email}
              onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
            />
          </div>
          {errors.email && <span className="field-error">⚠ {errors.email}</span>}
        </div>

        <div className="field">
          <label>Password</label>
          <div className="input-wrap">
            <span className="input-icon"><LockIcon /></span>
            <input
              type={showPw ? "text" : "password"} placeholder="••••••••"
              className={errors.password ? "error" : ""}
              value={form.password}
              onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(er => ({ ...er, password: "" })); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            <button className="pass-toggle" onClick={() => setShowPw(v => !v)}>
              <EyeIcon open={showPw} />
            </button>
          </div>
          {errors.password && <span className="field-error">⚠ {errors.password}</span>}
        </div>
      </div>

      <div className="form-options">
        <label className="checkbox-wrap" onClick={() => setRemember(v => !v)}>
          <input type="checkbox" />
          <span className={`custom-checkbox ${remember ? "checked" : ""}`}>
            {remember && <CheckIcon />}
          </span>
          <span className="checkbox-label">Remember me</span>
        </label>
        <button className="forgot-link">Forgot password?</button>
      </div>

      <button className="submit-btn" disabled={loading || success} onClick={handleSubmit}>
        {loading ? <><span className="spinner" /> Signing in…</> : success ? "✓ Signed In" : "Sign In →"}
      </button>

      <p className="switch-text">
        Don't have an account?{" "}
        <button className="switch-link" onClick={onSwitch}>Create one free</button>
      </p>
    </div>
  );
}

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const strength = getStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 8) e.password = "Min 8 characters";
    if (!form.confirm) e.confirm = "Required";
    else if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    if (!agree) e.agree = "You must agree to continue";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  };

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: "" }));
  };

  return (
    <div className="auth-form-wrap">
      <div className="form-eyebrow">✦ New account</div>
      <h1 className="form-title">Create your<br />account</h1>
      <p className="form-subtitle">Join thousands of teams managing their products.</p>

      {success && (
        <div className="success-banner">
          <span>✓</span> Account created! Check your email to verify.
        </div>
      )}

      <div className="field-group">
        <div className="field-row">
          <div className="field">
            <label>First name</label>
            <div className="input-wrap">
              <span className="input-icon"><UserIcon /></span>
              <input type="text" placeholder="John" className={errors.firstName ? "error" : ""} value={form.firstName} onChange={set("firstName")} />
            </div>
            {errors.firstName && <span className="field-error">⚠ {errors.firstName}</span>}
          </div>
          <div className="field">
            <label>Last name</label>
            <div className="input-wrap">
              <span className="input-icon"><UserIcon /></span>
              <input type="text" placeholder="Doe" className={errors.lastName ? "error" : ""} value={form.lastName} onChange={set("lastName")} />
            </div>
            {errors.lastName && <span className="field-error">⚠ {errors.lastName}</span>}
          </div>
        </div>

        <div className="field">
          <label>Email address</label>
          <div className="input-wrap">
            <span className="input-icon"><MailIcon /></span>
            <input type="email" placeholder="you@example.com" className={errors.email ? "error" : ""} value={form.email} onChange={set("email")} />
          </div>
          {errors.email && <span className="field-error">⚠ {errors.email}</span>}
        </div>

        <div className="field">
          <label>Phone <span style={{ color: "#b0b0be", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <div className="input-wrap">
            <span className="input-icon"><PhoneIcon /></span>
            <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
          </div>
        </div>

        <div className="field">
          <label>Password</label>
          <div className="input-wrap">
            <span className="input-icon"><LockIcon /></span>
            <input type={showPw ? "text" : "password"} placeholder="Min 8 characters" className={errors.password ? "error" : ""} value={form.password} onChange={set("password")} />
            <button className="pass-toggle" onClick={() => setShowPw(v => !v)}><EyeIcon open={showPw} /></button>
          </div>
          {form.password && (
            <>
              <div className="strength-bar">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="strength-seg" style={{ background: strength >= i ? strengthColors[strength] : "" }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: strengthColors[strength], fontWeight: 600, marginTop: 2 }}>
                {strengthLabels[strength]}
              </span>
            </>
          )}
          {errors.password && <span className="field-error">⚠ {errors.password}</span>}
        </div>

        <div className="field">
          <label>Confirm password</label>
          <div className="input-wrap">
            <span className="input-icon"><LockIcon /></span>
            <input type={showCf ? "text" : "password"} placeholder="Repeat password" className={errors.confirm ? "error" : ""} value={form.confirm} onChange={set("confirm")} />
            <button className="pass-toggle" onClick={() => setShowCf(v => !v)}><EyeIcon open={showCf} /></button>
          </div>
          {errors.confirm && <span className="field-error">⚠ {errors.confirm}</span>}
        </div>
      </div>

      <div style={{ margin: "18px 0 24px" }}>
        <label className="checkbox-wrap" onClick={() => { setAgree(v => !v); setErrors(er => ({ ...er, agree: "" })); }} style={{ alignItems: "flex-start" }}>
          <input type="checkbox" />
          <span className={`custom-checkbox ${agree ? "checked" : ""}`} style={{ marginTop: 1 }}>
            {agree && <CheckIcon />}
          </span>
          <span className="checkbox-label">
            I agree to the <a style={{ color: "var(--accent)", cursor: "pointer" }}>Terms of Service</a> and <a style={{ color: "var(--accent)", cursor: "pointer" }}>Privacy Policy</a>
          </span>
        </label>
        {errors.agree && <span className="field-error" style={{ marginLeft: 26 }}>⚠ {errors.agree}</span>}
      </div>

      <button className="submit-btn" disabled={loading || success} onClick={handleSubmit}>
        {loading ? <><span className="spinner" /> Creating account…</> : success ? "✓ Account Created" : "Create Account →"}
      </button>

      <p className="switch-text">
        Already have an account?{" "}
        <button className="switch-link" onClick={onSwitch}>Sign in instead</button>
      </p>
    </div>
  );
}

function DecorativePanel({ mode }) {
  return (
    <div className="auth-panel">
      <div className="panel-grid" />
      <div className="panel-bg-circle" style={{ width: 500, height: 500, background: "#2d5be3", top: -100, left: -150 }} />
      <div className="panel-bg-circle" style={{ width: 300, height: 300, background: "#a78bfa", bottom: 50, right: -80 }} />

      {/* Floating shapes */}
      <div className="shape" style={{ width: 8, height: 8, background: "rgba(107,143,240,0.5)", top: "20%", left: "10%", animationDuration: "6s" }} />
      <div className="shape" style={{ width: 5, height: 5, background: "rgba(167,139,250,0.4)", top: "35%", right: "15%", animationDuration: "8s", animationDelay: "1s" }} />
      <div className="shape" style={{ width: 10, height: 10, background: "rgba(45,91,227,0.4)", bottom: "30%", left: "20%", animationDuration: "7s", animationDelay: "2s" }} />

      <div className="panel-brand">
        <div className="panel-brand-mark">A</div>
        <span className="panel-brand-name">AdminPanel</span>
      </div>

      <div className="panel-center">
        <div>
          <h2 className="panel-heading">
            {mode === "login" ? <>Manage your<br /><em>products</em><br />effortlessly</> : <>Start your<br /><em>journey</em><br />with us</>}
          </h2>
          <p className="panel-sub" style={{ marginTop: 16 }}>
            {mode === "login"
              ? "Access your complete product management suite — track inventory, update listings, and monitor performance in real-time."
              : "Create your free account and get instant access to powerful product management tools built for modern teams."}
          </p>
        </div>

        <div className="panel-features">
          {(mode === "login"
            ? ["Full product CRUD operations", "Real-time inventory tracking", "Advanced analytics & stats", "Role-based access control"]
            : ["Free forever for small teams", "Unlimited product listings", "Secure & encrypted data", "24/7 customer support"]
          ).map(f => (
            <div className="panel-feature" key={f}>
              <div className="panel-feature-dot" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="panel-testimonial">
        <p className="panel-quote">"This dashboard completely transformed how we manage our product catalogue — it's fast, beautiful, and incredibly intuitive."</p>
        <div className="panel-author">
          <div className="panel-avatar">DB</div>
          <div>
            <div className="panel-author-name">Dharmendra B.</div>
            <div className="panel-author-role">Head of E-commerce, dbShop</div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <>
    <style>{STYLES}</style>
      <div className="auth-root">
        <DecorativePanel mode={mode} />
        <div className="auth-form-area" key={mode}>
          {mode === "login"
            ? <LoginForm onSwitch={() => setMode("register")} />
            : <RegisterForm onSwitch={() => setMode("login")} />
          }
        </div>
      </div>
    </>
  );
};

export default Login;