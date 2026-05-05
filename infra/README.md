Terraform infra for S3 (Phase 2)

Prereqs:
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` configured in your environment or via `aws configure`.
- Terraform >= 1.0 installed.

Quick start:

```bash
cd infra
terraform init
terraform validate
terraform plan -var="bucket_name=your-unique-bucket-name-$(date +%s)" -out=tfplan
terraform apply "tfplan"
```

Requirements enforced by this configuration:
- Unique bucket name (pass via `-var bucket_name=...`)
- Versioning enabled
- Server-side encryption (AES256)
- Public access blocked (all public ACLs/policies blocked)
