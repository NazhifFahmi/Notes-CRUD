import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable card layout for Auth pages so that Login & Register look identical
 * and match the aesthetic of the Notes section.
 */
export default function AuthCard({ title, children, footer }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </div>
    </div>
  );
}