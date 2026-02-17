# Production & Roadmap Guide

This document summarizes the requirements for deploying CouncilIA to production and the future roadmap.

## 🚀 Production Checklist

### Vercel Deployment
- [ ] Configure environment variables (Supabase, OpenRouter, Mistral, SiliconFlow, Stripe, GitHub, Upstash).
- [ ] Set up custom domain with HTTPS.
- [ ] Enable Vercel Analytics.

### Supabase Hardening
- [ ] Review RLS policies for all tables.
- [ ] Enable automated backups.
- [ ] Optimize database indexes.

### Security
- [ ] Configure CORS for production domain.
- [ ] Set up CSP headers.
- [ ] Integrate Sentry for error tracking.

### Monitoring
- [ ] Set up structured logging (JSON).
- [ ] Monitor AI costs and latencies via `ai_logs`.

## 📈 Roadmap 2026

### Q1: Product-Market Fit
- Launch on Product Hunt.
- Early Access Program (first 50 users).
- Integration with Linear/Jira.

### Q2-Q3: Scaling
- Enterprise features (SSO, RBAC).
- VS Code Extension.
- Case studies and community building.

### Q4: Series A / Expansion
- Public API for CI/CD integration.
- Plugin Marketplace.
- Fundraising Series A.
