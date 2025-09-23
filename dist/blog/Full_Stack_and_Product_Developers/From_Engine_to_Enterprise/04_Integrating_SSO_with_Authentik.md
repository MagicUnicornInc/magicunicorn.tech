# Blog Post: Building Enterprise-Grade Authentication: JWT with Role-Based Access Control

**Series:** From Engine to Enterprise: Building Meeting Ops

---

## The Authentication Challenge for Enterprise Appliances

When building an on-premise appliance like **Meeting Ops**, authentication becomes uniquely challenging. You can't rely on cloud identity providers when your appliance might be air-gapped. You need something that works out of the box, yet is sophisticated enough for enterprise requirements.

Our solution: a robust JWT-based authentication system with fine-grained role-based access control (RBAC) that runs entirely on the appliance. No external dependencies, no cloud requirements—just secure, enterprise-grade authentication that works anywhere.

## The Five-Tier Role System: Granular Control Without Complexity

We designed a five-tier role hierarchy that balances simplicity with granular control:

1. **Viewer:** Read-only access to transcripts and recordings
2. **User:** Can create and manage their own recordings
3. **Manager:** Can manage team recordings and access analytics
4. **Admin:** Full access to all features except system configuration
5. **Superuser:** Complete system control including user management

This hierarchy maps perfectly to typical enterprise structures while remaining intuitive. Here's how we implemented it:

### The JWT Architecture

Our JWT tokens contain minimal claims:
```json
{
  "sub": "user@company.com",
  "role": "manager",
  "exp": 1234567890
}
```

The backend validates these tokens on every request, checking both signature and expiration. Role permissions are enforced at the API endpoint level using FastAPI dependencies.

### Password Security Done Right

- **Bcrypt hashing** with automatic salt generation
- **Password complexity requirements** (configurable per deployment)
- **Account lockout protection** after failed attempts
- **Secure password reset** via time-limited tokens
- **API key support** for automation and integrations

## The Implementation Details That Matter

### Backend Security (FastAPI + Python)

```python
# Role-based dependency injection
@app.get("/api/admin/settings")
async def get_admin_settings(
    current_user: User = Depends(require_role("admin"))
):
    # Only admins and superusers reach this code
    return settings
```

Every endpoint declares its required role. The dependency injection system handles validation, making authorization bugs nearly impossible.

### Frontend Integration (React + TypeScript)

The frontend maintains authentication state using React Context:

```typescript
const AuthContext = createContext<{
  user: User | null;
  login: (credentials) => Promise<void>;
  logout: () => void;
}>({});
```

Role-based UI rendering is declarative:

```typescript
{user.role === 'admin' && <AdminPanel />}
{['manager', 'admin', 'superuser'].includes(user.role) && <Analytics />}
```

## Production-Ready Features

### Automatic Admin Creation

On first boot, Meeting Ops automatically creates an admin account with credentials shown in the console. This ensures immediate access while maintaining security:

```bash
./start-meeting-ops-https.sh
# Output: Admin user created - username: admin, password: [secure-random]
```

### HTTPS with Custom Certificates

We generate self-signed certificates under "Magic Unicorn Inc." for HTTPS:

```bash
./generate-magic-unicorn-cert.sh
# Creates CA and server certificates valid for 10 years
```

Users can download and trust the CA certificate from `http://YOUR_IP:8888`.

## Conclusion: The Right Authentication for the Right Use Case

For **Meeting Ops**, a self-contained JWT system was the right choice. It provides:

- **Zero external dependencies:** Works in air-gapped environments
- **Enterprise-grade security:** Bcrypt, rate limiting, audit logging
- **Granular access control:** Five-tier role system covers all use cases
- **Simple deployment:** No additional services to configure
- **API automation support:** API keys for CI/CD and integrations

The lesson? Choose authentication architecture based on your deployment model. For cloud SaaS, SSO integration might be essential. For on-premise appliances, a robust self-contained system is often the better choice.

By building our own JWT-based RBAC system, we maintained complete control over the user experience while delivering enterprise-grade security—all without requiring a single external service.