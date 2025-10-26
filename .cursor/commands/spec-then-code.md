# Spec-Then-Code Master Command

## Overview

The Spec-Then-Code methodology is now divided into three specialized commands for better organization and clarity. Each command focuses on a specific phase of the development process.

## The Three STC Commands

### 1. STC01-requirements

**Purpose**: Gather and document comprehensive requirements

```bash
/STC01-requirements [feature description]
```

- Creates Product Requirements Documents (PRDs)
- Clarifies ALL ambiguities with the user
- Documents functional and non-functional requirements
- Identifies edge cases and error scenarios
- **Output**: `specs/requirements/[feature]-prd.md`

### 2. STC02-design

**Purpose**: Create architecture and UX design specifications

```bash
/STC02-design [feature] based on [requirements file]
```

- Designs system architecture
- Makes technology stack decisions
- Creates UX specifications (if applicable)
- Documents Architecture Decision Records (ADRs)
- **Output**:
  - `specs/design/architecture/[feature]-architecture.md`
  - `specs/design/ux/[feature]-ux.md` (if applicable)

### 3. STC03-planning

**Purpose**: Create user stories and implementation plans

```bash
/STC03-planning [feature] from [requirements] and [architecture]
```

- Generates user stories with acceptance criteria
- Creates sprint plans and roadmaps
- Defines test scenarios
- Maps dependencies
- **Output**: `specs/planning/[feature]-stories.md`

## Quick Start Workflow

For a complete Spec-Then-Code implementation:

```bash
# Step 1: Gather Requirements
/STC01-requirements create authentication system with JWT and RBAC

# Step 2: Design Architecture
/STC02-design create architecture for authentication based on auth-prd.md

# Step 3: Plan Implementation
/STC03-planning create stories from auth-prd.md and auth-architecture.md
```

## When to Use Spec-Then-Code

### Use for High-Stakes Development

✅ **Ideal for:**

- Mission-critical features (payments, auth, data integrity)
- Complex algorithms or business logic
- System integrations with external services
- Compliance requirements (GDPR, HIPAA, PCI)
- Production bug fixes with high risk
- Multi-team or long-term projects

### Skip for Simple Tasks

❌ **Not needed for:**

- UI/CSS tweaks
- Simple CRUD operations
- Prototypes or demos
- Documentation updates
- Low-risk experiments

## Decision Framework

```text
┌─────────────────────────┐
│   Assess Complexity     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   High Complexity?      │───No──→ Use Vibe Coding
└────────┬────────────────┘
         │Yes
         ▼
┌─────────────────────────┐
│   High Risk/Impact?     │───No──→ Use Regular Planning
└────────┬────────────────┘
         │Yes
         ▼
┌─────────────────────────┐
│  Use Spec-Then-Code     │
│  STC01 → STC02 → STC03  │
└─────────────────────────┘
```

## Directory Structure

The commands will create this structure:

```text
specs/
├── requirements/
│   ├── auth-prd.md
│   ├── payments-prd.md
│   └── search-prd.md
├── design/
│   ├── architecture/
│   │   ├── auth-architecture.md
│   │   ├── payments-architecture.md
│   │   └── search-architecture.md
│   └── ux/
│       ├── auth-ux.md
│       └── payments-ux.md
└── planning/
    ├── auth-stories.md
    ├── payments-stories.md
    ├── search-stories.md
    └── story-tracker.md
```

## Integration with MCP Server

All three commands use the GitMCP Spec-Then-Code server:

```text
@mcp_mosofsky_spec-then-code [command]
```

The MCP server provides:

- Structured specification templates
- Test-first development guidance
- Recursive planning capabilities
- Verification checklists

## Key Principles

### 1. Requirements First (STC01)

- Never start without clear requirements
- Resolve ALL ambiguities upfront
- Document edge cases explicitly
- Get user sign-off before proceeding

### 2. Design Before Code (STC02)

- Architecture decisions are explicit
- Technology choices are documented
- Trade-offs are acknowledged
- UX is specified in detail

### 3. Plan Before Implementation (STC03)

- Stories have clear acceptance criteria
- Dependencies are identified
- Tests are defined before coding
- Roadmap guides development

### 4. Test-First Development

- Write tests that initially fail
- Implement minimum code to pass
- Refactor with confidence
- Maintain >80% coverage

### 5. Continuous Verification

- Check against requirements
- Validate architecture decisions
- Verify acceptance criteria
- Measure against benchmarks

## Quick Commands

### For Bug Fixes

```bash
# Quick bug fix workflow
/STC01-requirements document bug: [description]
/STC02-design minimal architecture for bugfix
/STC03-planning create hotfix story
```

### For New Features

```bash
# Feature development workflow
/STC01-requirements new feature: [description]
/STC02-design full architecture with UX
/STC03-planning create epic with stories
```

### For Refactoring

```bash
# Refactoring workflow
/STC01-requirements refactor: [current problems]
/STC02-design new architecture maintaining compatibility
/STC03-planning create migration plan
```

## Context Management

For large projects exceeding AI context:

1. **Use Persistent Specs**: All outputs are saved as files
2. **Reference Specific Sections**: Point to exact parts of specs
3. **Maintain Progress Tracking**: Update story-tracker.md
4. **Session Continuity**: Start new sessions with "Continue from [spec]"

## Quality Gates

Each phase has quality gates:

### STC01 Requirements Gates

- [ ] All ambiguities resolved
- [ ] Requirements are testable
- [ ] Edge cases documented
- [ ] User approval received

### STC02 Design Gates

- [ ] Architecture decisions documented
- [ ] Technology stack chosen
- [ ] Dependencies identified
- [ ] Security reviewed

### STC03 Planning Gates

- [ ] All requirements have stories
- [ ] Acceptance criteria defined
- [ ] Dependencies mapped
- [ ] Test scenarios created

## Advanced Usage

### Parallel Development

For large teams, run phases in parallel:

```bash
# Team A: Backend requirements
/STC01-requirements backend API for [feature]

# Team B: Frontend requirements
/STC01-requirements frontend UI for [feature]

# Later: Merge architectures
/STC02-design integrated system from backend-prd.md and frontend-prd.md
```

### Incremental Refinement

Iterate on specifications:

```bash
# Initial pass
/STC01-requirements MVP for [feature]

# After feedback
/STC01-requirements enhance [feature] with [new requirements]

# Update architecture
/STC02-design update architecture for new requirements
```

## Integration with Project Rules

These commands work with your existing rules:

```text
@fetch_rules typescript      # For code standards
@fetch_rules project        # For conventions
@fetch_rules security       # For security requirements
@fetch_rules specs-and-user-stories  # For documentation format
```

## Troubleshooting

### Common Issues

**Problem**: Requirements too vague
**Solution**: STC01 will prompt for clarification automatically

**Problem**: Architecture decisions unclear
**Solution**: STC02 presents options with pros/cons for user choice

**Problem**: Stories too large
**Solution**: STC03 automatically breaks down large stories

**Problem**: Dependencies blocking progress
**Solution**: Planning identifies dependencies upfront for resolution

## References

- Methodology: <https://github.com/mosofsky/spec-then-code>
- MCP Server: <https://gitmcp.io/mosofsky/spec-then-code>
- TDD Principles: Robert C. Martin's Clean Code
- Architecture Decisions: <https://adr.github.io>

## Next Actions

1. Start with `/STC01-requirements` for your next feature
2. Follow the workflow through all three phases
3. Use the generated specs for implementation
4. Track progress in story-tracker.md
5. Iterate based on learnings
