# STC02: Design & Architecture Command

## Purpose

Use the Spec-Then-Code methodology to create comprehensive architecture designs and UX specifications based on approved requirements. This command ensures all design decisions are made with user input on ambiguities and technology choices.

## Output Locations

- Architecture documents: `specs/design/architecture/`
- UX specifications: `specs/design/ux/`

## Prerequisites

- Completed PRD from `/STC01-requirements` in `specs/requirements/`
- Clear understanding of functional and non-functional requirements

## Command Workflow

### Phase 1: Architecture Analysis

Analyze requirements and propose initial architecture:

```text
@mcp_mosofsky_spec-then-code create architecture design for:

**Requirements Document**: specs/requirements/[feature-name]-prd.md

Please analyze and propose:
1. System architecture pattern (monolithic, microservices, serverless)
2. Data architecture (database choices, data flow)
3. Integration architecture (APIs, events, messaging)
4. Security architecture (authentication, authorization, encryption)
5. Infrastructure architecture (cloud, on-premise, hybrid)
```

### Phase 2: Technology Stack Decisions

Present technology choices for user decision:

```text
🏗️ ARCHITECTURE DECISIONS NEEDED:

Based on the requirements, I need your input on:

## 1. Database Technology
**Requirement**: [What the requirement needs]
**Options**:
- **Option A: PostgreSQL**
  - Pros: ACID compliance, complex queries, proven reliability
  - Cons: Vertical scaling limits, requires management
  - Use when: Strong consistency needed

- **Option B: MongoDB**
  - Pros: Flexible schema, horizontal scaling, JSON native
  - Cons: Eventual consistency, complex transactions
  - Use when: Rapid iteration, varied data structures

- **Option C: DynamoDB**
  - Pros: Serverless, auto-scaling, managed service
  - Cons: Limited query patterns, vendor lock-in
  - Use when: Predictable access patterns

**Your choice**: [Awaiting decision]

## 2. API Architecture
[Continue pattern for each major decision...]

## 3. Caching Strategy
[Continue pattern...]
```

### Phase 3: Detailed Architecture Documentation

Create comprehensive architecture specification:

````text
# Architecture Design Document: [Feature Name]

## Document Information
- **Version**: 1.0.0
- **Date**: [Current Date]
- **Based on PRD**: [Link to requirements]
- **Decision Log**: [Link to decisions]

## Architecture Overview

### System Architecture
[High-level architecture diagram and description]

### Key Design Principles
- **Principle 1**: [e.g., Microservices for scalability]
- **Principle 2**: [e.g., Event-driven for loose coupling]
- **Principle 3**: [e.g., API-first for integration]

## Component Architecture

### Component 1: [Name]
**Purpose**: [What it does]
**Technology**: [Chosen technology]
**Interfaces**:
- Input: [Data/API specifications]
- Output: [Data/API specifications]
**Dependencies**: [Other components]
**Scaling Strategy**: [How it scales]

### Component 2: [Name]
[Continue pattern...]

## Data Architecture

### Data Models
```typescript
interface User {
  id: string;
  email: string;
  // ... complete data model
}
````

### Database Design

- **Primary Database**: [Choice and reasoning]
- **Read Replicas**: [Strategy]
- **Partitioning**: [Strategy if applicable]
- **Backup Strategy**: [Approach]

### Data Flow

1. User input → [Component A]
2. [Component A] → processes → [Database]
3. [Database] → [Component B]
4. [Component B] → response → User

## API Architecture

### External APIs

```yaml
/api/v1/users:
  GET: List users
  POST: Create user
/api/v1/users/{id}:
  GET: Get user details
  PUT: Update user
  DELETE: Delete user
```

### Internal APIs

[Service-to-service communication]

### Event Architecture

```yaml
Events:
  user.created:
    Producer: UserService
    Consumers: [EmailService, AnalyticsService]
    Payload: { userId, timestamp, metadata }
```

## Security Architecture

### Authentication

- **Method**: [JWT, OAuth, SAML]
- **Token Storage**: [Strategy]
- **Session Management**: [Approach]

### Authorization

- **Model**: [RBAC, ABAC, etc.]
- **Permission Structure**: [Details]
- **API Security**: [Rate limiting, API keys]

### Data Security

- **Encryption at Rest**: [Method]
- **Encryption in Transit**: [TLS configuration]
- **Secrets Management**: [Vault, KMS, etc.]

## Infrastructure Architecture

### Deployment Architecture

- **Environment Strategy**: [Dev, Staging, Prod]
- **Container Strategy**: [Docker, Kubernetes]
- **CI/CD Pipeline**: [Tools and flow]

### Scaling Architecture

- **Horizontal Scaling**: [Auto-scaling rules]
- **Load Balancing**: [Strategy]
- **CDN Strategy**: [If applicable]

### Monitoring Architecture

- **Metrics**: [What to monitor]
- **Logging**: [Centralized logging strategy]
- **Alerting**: [Alert conditions and channels]

### Phase 4: UX Design Specifications (if applicable)

Create detailed UX specifications:

````text
# UX Design Specification: [Feature Name]

## Design System

### Components Used
- **Buttons**: [Primary, Secondary, Tertiary]
- **Forms**: [Input types, validation states]
- **Navigation**: [Menu structure, breadcrumbs]
- **Feedback**: [Toasts, modals, inline messages]

## Page Layouts

### Page: [Page Name]
**URL**: /path/to/page
**Purpose**: [What this page does]

**Layout Structure**:

```text

+------------------+
|     Header       |
+----+-------------+
|Side|   Content   |
|bar |             |
+----+-------------+
|     Footer       |
+------------------+

````

**Components**:

1. Header: [Specifications]
2. Sidebar: [Specifications]
3. Content Area: [Specifications]

**State Management**:

- Loading: [How to show loading]
- Error: [Error display]
- Empty: [Empty state design]
- Success: [Success feedback]

**Responsive Behavior**:

- Desktop (>1200px): [Layout]
- Tablet (768-1200px): [Adjustments]
- Mobile (<768px): [Mobile layout]

## User Flows

### Flow: [Flow Name]

1. User lands on [Page A]
2. User clicks [Action]
3. System shows [Response]
4. User enters [Data]
5. System validates and [Next Step]

**Error Paths**:

- If validation fails: [What happens]
- If network error: [What happens]

## Interaction Patterns

### Form Validation

- **Inline**: Validate on blur
- **Submit**: Validate all on submit
- **Error Display**: Below field, red text
- **Success Display**: Green checkmark

### Loading States

- **Initial Load**: Skeleton screens
- **Action Loading**: Disabled button + spinner
- **Background Loading**: Progress bar

### Navigation

- **Primary**: Top navigation bar
- **Secondary**: Sidebar for section navigation
- **Breadcrumbs**: Show hierarchy

### Phase 5: Dependency Mapping

Map all system dependencies:

````text
## Dependency Analysis

### External Dependencies
| Dependency | Version | Purpose | Risk Level | Mitigation |
|------------|---------|---------|------------|------------|
| AWS S3 | - | File storage | Medium | Multi-region backup |
| Stripe API | v2023 | Payments | High | Fallback processor |
| SendGrid | v3 | Email | Low | Queue + retry |

### Internal Dependencies

```mermaid
graph TD
    A[Frontend] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[User Service]
    D --> E[Database]
    C --> E
    D --> F[Cache]
````

### Version Requirements

- Node.js: >=18.0.0
- PostgreSQL: >=14.0
- Redis: >=7.0

### Phase 6: Architecture Decision Records (ADRs)

Document all major decisions:

```text
# ADR-001: [Decision Title]

## Status
Accepted

## Context
[Why this decision was needed]

## Decision
[What was decided]

## Consequences
**Positive**:
- [Benefit 1]
- [Benefit 2]

**Negative**:
- [Tradeoff 1]
- [Tradeoff 2]

**Mitigation**:
- [How to handle negatives]
```

## Architecture Ambiguity Resolution

Always get user input on:

```text
❓ ARCHITECTURE DECISION REQUIRED:

## [Decision Area]

**Context**: [Why this matters]

**Options Analysis**:

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Cost | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Complexity | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Scalability | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Time to Market | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation**: [Your recommendation and why]

**Your Decision**: [Awaiting input]
```

## Technology Decision Areas

Always clarify these choices:

1. **Programming Languages**: Backend, frontend, scripts
2. **Frameworks**: Web, API, testing frameworks
3. **Databases**: SQL vs NoSQL, specific vendors
4. **Message Queues**: RabbitMQ, Kafka, SQS, etc.
5. **Caching**: Redis, Memcached, CDN strategy
6. **Search**: Elasticsearch, Algolia, database FTS
7. **File Storage**: S3, local, CDN approach
8. **Authentication**: Build vs buy (Auth0, Cognito)
9. **Monitoring**: DataDog, New Relic, CloudWatch
10. **Deployment**: Kubernetes, ECS, Lambda, traditional

## Quality Gates

Before architecture is approved:

- [ ] All technology choices made and documented
- [ ] All ambiguities resolved with user
- [ ] Scaling strategy defined
- [ ] Security review completed
- [ ] Cost analysis performed
- [ ] Dependency risks assessed
- [ ] ADRs documented for major decisions
- [ ] Architecture diagrams created
- [ ] UX specifications complete (if applicable)

## Integration with Project

```text
@fetch_rules project
@fetch_rules typescript
@fetch_rules security

Ensure architecture aligns with:
- Project conventions
- Security requirements
- TypeScript standards
- Performance benchmarks from PRD
```

## Example Usage

```bash
/STC02-design create architecture for authentication system based on auth-prd.md
```

This will:

1. Analyze requirements from PRD
2. Propose architecture options
3. Get user decisions on ambiguities
4. Document complete architecture
5. Create UX specifications if needed
6. Map all dependencies
7. Document decisions in ADRs

## Next Steps

Once architecture is approved:

- Use `/STC03-planning` to create user stories based on architecture
- Stories will reference specific architecture components
- Implementation will follow the documented design
