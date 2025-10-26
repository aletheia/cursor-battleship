# STC03: Planning & User Stories Command

## Purpose

Use the Spec-Then-Code methodology to create detailed user stories and implementation plans based on approved requirements and architecture. This command transforms specifications into actionable, prioritized development tasks.

## Output Location

User stories and planning documents: `specs/planning/`

## Prerequisites

- Completed PRD from `/STC01-requirements` in `specs/requirements/`
- Approved architecture from `/STC02-design` in `specs/design/architecture/`
- UX specifications (if applicable) from `specs/design/ux/`

## Command Workflow

### Phase 1: Story Generation from Requirements

Generate user stories for each requirement:

```text
@mcp_mosofsky_spec-then-code create user stories from:

**Requirements**: specs/requirements/[feature-name]-prd.md
**Architecture**: specs/design/architecture/[feature-name]-architecture.md
**UX Design**: specs/design/ux/[feature-name]-ux.md (if available)

For each functional requirement, create:
1. User story with acceptance criteria
2. Technical implementation tasks
3. Test scenarios
4. Dependencies and blockers
```

### Phase 2: Story Structure & Format

Create stories following this structure:

````markdown
# User Story: [Story Title]

## Story Information

- **ID**: US-[FEATURE]-[NUMBER]
- **Epic**: [Parent Epic]
- **Priority**: [Critical | High | Medium | Low]
- **Points**: [Story points: 1, 2, 3, 5, 8, 13]
- **Sprint**: [Target sprint]

## Story Statement

As a [user type]
I want [capability]
So that [business value]

## Acceptance Criteria

### Functional Criteria

- [ ] Given [context], When [action], Then [outcome]
- [ ] Given [context], When [action], Then [outcome]
- [ ] The system shall [specific behavior]

### Technical Criteria

- [ ] API endpoint returns within 200ms
- [ ] Data is encrypted using AES-256
- [ ] Audit log captures all actions

### UX Criteria (if applicable)

- [ ] Matches design mockup at [link]
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessibility: WCAG 2.1 AA compliant

## Technical Implementation

### Architecture Components

From architecture document:

- **Component**: [Component name from architecture]
- **Service**: [Service to modify/create]
- **Database**: [Tables/collections affected]
- **API**: [Endpoints to implement]

### Implementation Tasks

1. [ ] Create database migration for [schema]
2. [ ] Implement [Service] class with methods
3. [ ] Create API endpoint at [path]
4. [ ] Add validation for [inputs]
5. [ ] Implement error handling
6. [ ] Write unit tests
7. [ ] Write integration tests
8. [ ] Update documentation

### Technical Specifications

```typescript
// Interface definitions
interface UserInput {
  // From architecture data models
}

// API Contract
POST /api/v1/[resource]
Request: { ... }
Response: { ... }
```
````

## Test Scenarios

### Unit Tests

- Test [Component].[method] with valid input
- Test [Component].[method] with invalid input
- Test error handling for [scenario]

### Integration Tests

- Test API endpoint with valid request
- Test API endpoint with invalid request
- Test database transaction rollback
- Test service integration

### E2E Tests

- User completes [flow] successfully
- User encounters and recovers from [error]
- System handles [edge case]

## Dependencies

### Blocked By

- [ ] US-[ID]: [Dependency description]
- [ ] Architecture decision: [What needs deciding]

### Blocks

- [ ] US-[ID]: [What this blocks]

### External Dependencies

- [ ] Third-party API availability
- [ ] Library version: [specific version]

### Phase 3: Epic Planning

Organize stories into epics:

```text
# Epic: [Epic Name]

## Epic Information
- **ID**: EP-[FEATURE]-[NUMBER]
- **Theme**: [Product theme]
- **Duration**: [Estimated sprints]
- **Team**: [Assigned team]

## Epic Goal
[2-3 sentences describing the epic's purpose and value]

## Success Metrics
- **KPI 1**: [Measurable outcome]
- **KPI 2**: [Measurable outcome]
- **KPI 3**: [Measurable outcome]

## User Stories

### Phase 1: Foundation (Sprint X)
Priority: Critical - Must complete first

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-001 | Set up database schema | 3 | None |
| US-002 | Create base services | 5 | US-001 |
| US-003 | Implement authentication | 8 | US-002 |

### Phase 2: Core Features (Sprint X+1)
Priority: High - Core functionality

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-004 | CRUD operations | 5 | US-003 |
| US-005 | Search functionality | 8 | US-004 |

### Phase 3: Enhancements (Sprint X+2)
Priority: Medium - Nice to have

| Story ID | Title | Points | Dependencies |
|----------|-------|--------|--------------|
| US-006 | Advanced filters | 3 | US-005 |
| US-007 | Export functionality | 5 | US-004 |

## Risk Analysis
- **Risk 1**: [Description] - Mitigation: [Strategy]
- **Risk 2**: [Description] - Mitigation: [Strategy]
```

### Phase 4: Sprint Planning

Create sprint plans with story allocation:

```text
# Sprint Plan: Sprint [Number]

## Sprint Information
- **Start Date**: [Date]
- **End Date**: [Date]
- **Team Capacity**: [Total points]
- **Sprint Goal**: [One sentence goal]

## Committed Stories

### High Priority (Must Complete)
Total Points: [X]

| Story | Points | Assignee | Notes |
|-------|--------|----------|-------|
| US-001: [Title] | 5 | Developer A | Backend focus |
| US-002: [Title] | 3 | Developer B | Frontend focus |

### Medium Priority (Should Complete)
Total Points: [Y]

| Story | Points | Assignee | Notes |
|-------|--------|----------|-------|
| US-003: [Title] | 8 | Developer A & B | Pair programming |

### Stretch Goals (Could Complete)
Total Points: [Z]

| Story | Points | Assignee | Notes |
|-------|--------|----------|-------|
| US-004: [Title] | 3 | Developer C | If time permits |

## Sprint Risks
- **Blocker**: [Potential blocker and mitigation]
- **Dependency**: [External dependency status]

## Definition of Done
- [ ] Code reviewed by peer
- [ ] Unit tests passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] QA sign-off received
```

### Phase 5: Implementation Roadmap

Create overall implementation roadmap:

````text
# Implementation Roadmap: [Feature Name]

## Timeline Overview

```mermaid
gantt
    title Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Database Setup    :2024-01-01, 3d
    Base Services     :3d
    Authentication    :5d
    section Phase 2
    CRUD Operations   :5d
    Search Feature    :5d
    section Phase 3
    Advanced Features :8d
    Testing & QA      :5d
````

## Milestone Schedule

### Milestone 1: Foundation Complete

**Target Date**: [Date]
**Deliverables**:

- Database schema implemented
- Base services operational
- Authentication working
  **Success Criteria**:
- All foundation stories complete
- Integration tests passing
- Security review passed

### Milestone 2: MVP Ready

**Target Date**: [Date]
**Deliverables**:

- Core features implemented
- Basic UI complete
- API documented
  **Success Criteria**:
- User can complete main workflow
- Performance benchmarks met
- No critical bugs

### Milestone 3: Production Ready

**Target Date**: [Date]
**Deliverables**:

- All features complete
- Full test coverage
- Documentation complete
  **Success Criteria**:
- All acceptance criteria met
- Performance tested at scale
- Security audit passed

## Resource Allocation

### Team Assignment

| Phase   | Backend | Frontend | QA  | DevOps |
| ------- | ------- | -------- | --- | ------ |
| Phase 1 | 2 devs  | 1 dev    | 0.5 | 0.5    |
| Phase 2 | 1 dev   | 2 devs   | 1   | 0.5    |
| Phase 3 | 0.5 dev | 1 dev    | 2   | 1      |

### Skill Requirements

- **Backend**: [Required skills]
- **Frontend**: [Required skills]
- **Testing**: [Required skills]
- **DevOps**: [Required skills]

### Phase 6: Test Planning

Create comprehensive test plan:

```text
# Test Plan: [Feature Name]

## Test Strategy

### Testing Levels
1. **Unit Testing**
   - Coverage target: 80%
   - Tools: [Jest, Mocha, etc.]
   - Responsibility: Developers

2. **Integration Testing**
   - API contract testing
   - Service integration testing
   - Database integration testing

3. **System Testing**
   - End-to-end workflows
   - Performance testing
   - Security testing

4. **Acceptance Testing**
   - User acceptance criteria
   - Business requirement validation

### Test Scenarios by Story

#### US-001: [Story Title]
**Test Cases**:
| ID | Scenario | Input | Expected Output | Priority |
|----|----------|-------|-----------------|----------|
| TC-001 | Happy path | Valid data | Success response | High |
| TC-002 | Invalid input | Bad data | Error message | High |
| TC-003 | Edge case | Boundary values | Handled gracefully | Medium |

#### US-002: [Story Title]
[Continue pattern...]

## Performance Test Plan

### Load Testing
- **Tool**: [JMeter, K6, etc.]
- **Scenarios**:
  - Normal load: 100 concurrent users
  - Peak load: 1000 concurrent users
  - Stress test: Find breaking point

### Benchmarks
- API response time: <200ms (p95)
- Page load time: <2 seconds
- Database queries: <50ms

## Security Test Plan

### Security Testing
- [ ] OWASP Top 10 vulnerabilities
- [ ] Authentication bypass attempts
- [ ] SQL injection testing
- [ ] XSS vulnerability testing
- [ ] API rate limiting verification
```

## Story Prioritization Framework

Use MoSCoW method for prioritization:

```text
## Priority Matrix

### Must Have (Critical)
These stories block everything else:
- US-001: [Critical foundation story]
- US-002: [Security requirement]

### Should Have (High)
Core functionality for MVP:
- US-003: [Core feature]
- US-004: [Important UX element]

### Could Have (Medium)
Enhance user experience:
- US-005: [Nice feature]
- US-006: [Optimization]

### Won't Have (Low)
Future consideration:
- US-007: [Future enhancement]
- US-008: [Nice to have someday]
```

## Dependency Resolution

Identify and resolve dependencies:

```text
## Dependency Analysis

### Technical Dependencies

graph TD
    US001[Database Schema] --> US002[Base Services]
    US002 --> US003[Authentication]
    US003 --> US004[User Management]
    US002 --> US005[API Gateway]
    US005 --> US006[External API]

### Resolution Strategy

1. Implement in dependency order
2. Mock external dependencies for parallel work
3. Use feature flags for gradual rollout
```

## Quality Gates

Before planning is approved:

- [ ] All requirements have corresponding stories
- [ ] All stories have clear acceptance criteria
- [ ] Technical tasks are identified
- [ ] Dependencies are mapped and resolved
- [ ] Test scenarios are defined
- [ ] Sprint capacity is realistic
- [ ] Risks are identified and mitigated
- [ ] Resource allocation is confirmed

## Integration Commands

After planning is complete:

```text
# Begin implementation with test-first approach
@mcp_mosofsky_spec-then-code implement story US-001

# This will:
1. Reference the story definition
2. Create failing tests first
3. Guide implementation to pass tests
4. Verify acceptance criteria
5. Update story status
```

## Example Usage

```bash
/STC03-planning create stories from auth-prd.md and auth-architecture.md
```

This will:

1. Parse requirements and architecture
2. Generate user stories with acceptance criteria
3. Create technical implementation tasks
4. Organize into epics and sprints
5. Create test scenarios
6. Build implementation roadmap
7. Identify dependencies
8. Produce complete planning documents

## Next Steps

Once planning is complete:

1. Review and approve stories with stakeholders
2. Assign stories to sprints
3. Begin implementation using test-first approach
4. Track progress against roadmap
5. Adjust planning based on velocity

## Tracking and Updates

Maintain story status in `specs/planning/story-tracker.md`:

```markdown
| Story ID | Title | Status      | Sprint | Assignee | Notes             |
| -------- | ----- | ----------- | ------ | -------- | ----------------- |
| US-001   | Setup | In Progress | 1      | Dev A    | 50% complete      |
| US-002   | Auth  | Not Started | 1      | Dev B    | Blocked by US-001 |
```
