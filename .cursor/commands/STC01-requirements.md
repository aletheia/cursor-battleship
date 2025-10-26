# STC01: Requirements Gathering Command

## Purpose

Use the Spec-Then-Code methodology to create comprehensive Product Requirements Documents (PRDs) with complete clarity and no ambiguity. This command ensures all requirements are thoroughly understood before any design or implementation begins.

## Output Location

All requirements documents will be created in: `specs/requirements/`

## Command Workflow

### Phase 1: Initial Requirements Discovery

Start by understanding the high-level problem:

```text
@mcp_mosofsky_spec-then-code gather requirements for:

**Problem Statement**: [USER'S INITIAL REQUEST]

Please analyze and identify:
1. Core business problem being solved
2. Target users and their needs
3. Success metrics
4. Constraints and limitations
5. Regulatory/compliance requirements
```

### Phase 2: Requirement Clarification

For EVERY uncertain or ambiguous requirement, ask the user to clarify:

```text
CLARIFICATION NEEDED:

Before proceeding with the PRD, I need clarification on the following:

1. **[Requirement Area]**:
   - Current Understanding: [What I understand]
   - Ambiguity: [What's unclear]
   - Questions:
     a) [Specific question 1]
     b) [Specific question 2]
   - Options: [Present 2-3 options if applicable]

2. **[Next Requirement Area]**:
   [Continue pattern...]

Please provide answers to proceed with complete requirements.
```

### Phase 3: Functional Requirements Documentation

Document all functional requirements with complete detail:

```text
## Functional Requirements

### FR-001: [Feature Name]
**Description**: [Detailed description]
**User Story**: As a [user], I want [capability] so that [benefit]
**Acceptance Criteria**:
- [ ] [Specific, testable criterion]
- [ ] [Another criterion]
**Priority**: [Must Have | Should Have | Could Have | Nice to Have]
**Dependencies**: [List any dependencies]
**Open Questions**: [Any remaining clarifications needed]

### FR-002: [Next Feature]
[Continue pattern...]
```

### Phase 4: Non-Functional Requirements

Define performance, security, and quality requirements:

```text
## Non-Functional Requirements

### Performance Requirements
- **Response Time**: [Specific metrics, e.g., <200ms for API calls]
- **Throughput**: [Requests per second]
- **Concurrent Users**: [Number supported]
- **Data Volume**: [Expected data sizes]

### Security Requirements
- **Authentication**: [Method and requirements]
- **Authorization**: [Access control model]
- **Data Protection**: [Encryption standards]
- **Compliance**: [GDPR, HIPAA, etc.]

### Reliability Requirements
- **Availability**: [Uptime percentage]
- **Recovery Time**: [RTO/RPO metrics]
- **Data Integrity**: [Validation rules]

### Scalability Requirements
- **User Growth**: [Expected growth rate]
- **Data Growth**: [Storage projections]
- **Geographic Distribution**: [Regional requirements]
```

### Phase 5: Edge Cases and Error Scenarios

Document all edge cases and error conditions:

```text
## Edge Cases and Error Handling

### Edge Case EC-001: [Scenario Name]
**Condition**: [When this occurs]
**Expected Behavior**: [How system should respond]
**User Experience**: [What user sees/experiences]
**Recovery**: [How to recover from this state]

### Error Scenario ES-001: [Error Type]
**Trigger**: [What causes this error]
**Error Message**: [Exact message to display]
**Logging**: [What to log]
**Resolution**: [How users can resolve]
```

### Phase 6: Validation and Completeness Check

Ensure all requirements are complete and unambiguous:

```text
## Requirements Validation Checklist

### Completeness
- [ ] All user stories have acceptance criteria
- [ ] All features have priority assignments
- [ ] All edge cases are documented
- [ ] All error scenarios are covered
- [ ] Dependencies are identified

### Clarity
- [ ] No ambiguous terms (e.g., "fast", "user-friendly")
- [ ] All technical terms are defined
- [ ] Metrics are specific and measurable
- [ ] Requirements are testable

### Traceability
- [ ] Each requirement has a unique ID
- [ ] Dependencies are mapped
- [ ] Success metrics are defined
- [ ] Verification method is specified
```

## PRD Template Structure

Create the PRD in `specs/requirements/[feature-name]-prd.md`:

```markdown
# Product Requirements Document: [Feature Name]

## Document Information

- **Version**: 1.0.0
- **Date**: [Current Date]
- **Author**: [Your Name]
- **Status**: [Draft | Review | Approved]
- **Stakeholders**: [List stakeholders]

## Executive Summary

[2-3 paragraph overview]

## Problem Statement

[Detailed problem description]

## Goals and Objectives

- **Primary Goal**: [Main objective]
- **Success Metrics**: [How to measure success]
- **Non-Goals**: [What this does NOT solve]

## User Personas

[Define target users and their needs]

## Functional Requirements

[Detailed functional requirements]

## Non-Functional Requirements

[Performance, security, reliability, etc.]

## User Journey

[Step-by-step user flow]

## Edge Cases and Error Handling

[All edge cases and error scenarios]

## Dependencies and Constraints

[Technical and business constraints]

## Risks and Mitigations

[Identified risks and mitigation strategies]

## Open Questions

[Any remaining questions requiring answers]

## Appendices

[Supporting documents, mockups, references]
```

## Clarification Templates

### For Ambiguous Features

```text
❓ CLARIFICATION NEEDED: [Feature Name]

I need to understand this feature better:

**Current Understanding**:
[What you understand so far]

**Specific Questions**:
1. When you say "[ambiguous term]", do you mean:
   - Option A: [Interpretation 1]
   - Option B: [Interpretation 2]
   - Other: Please specify

2. For [specific aspect], should the system:
   - Option A: [Behavior 1]
   - Option B: [Behavior 2]
   - Let me know your preference

**Impact on Requirements**:
- If Option A: [Implications]
- If Option B: [Implications]
```

### For Missing Information

```text
❓ MISSING INFORMATION: [Requirement Area]

To complete the requirements, I need:

1. **[Information Type]**:
   - Why needed: [Explanation]
   - Example: [What this might look like]
   - Please provide: [Specific request]

2. **[Next Information Type]**:
   [Continue pattern...]
```

## Integration with Project

After requirements are complete:

```text
@fetch_rules specs-and-user-stories

Create requirement document following project standards:
- Use proper versioning
- Include all required sections
- Follow naming conventions
- Update requirements index
```

## Quality Gates

Before marking requirements complete:

- [ ] All ambiguities resolved with user
- [ ] Every requirement is testable
- [ ] Success criteria are measurable
- [ ] Edge cases are documented
- [ ] User has approved clarifications
- [ ] Document is reviewed and signed off

## Common Clarification Areas

Always clarify these aspects:

1. **Performance**: Specific response times, not "fast"
2. **Scale**: Exact user numbers, not "many users"
3. **Security**: Specific compliance needs (GDPR, HIPAA)
4. **Integration**: Which systems and APIs
5. **Data**: Retention policies, privacy requirements
6. **Availability**: Specific uptime requirements
7. **User Access**: Role definitions and permissions
8. **Workflow**: Approval processes and stages
9. **Notifications**: When, how, and to whom
10. **Reporting**: What metrics and frequency

## Example Usage

```bash
/STC01-requirements create PRD for multi-tenant SaaS authentication system
```

This will:

1. Gather initial requirements
2. Ask for clarification on all ambiguities
3. Document functional requirements
4. Define non-functional requirements
5. Identify edge cases
6. Create complete PRD in `specs/requirements/`

## Next Steps

Once requirements are complete and approved:

- Use `/STC02-design` to create architecture based on these requirements
- Use `/STC03-planning` to create user stories from requirements
