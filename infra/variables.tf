variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Unique S3 bucket name for Terraform state or storage"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID for ECS cluster"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs for ECS service"
  type        = list(string)
}
