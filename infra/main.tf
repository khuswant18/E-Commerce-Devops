terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = var.region
}

data "aws_iam_role" "lab_role" {
  name = "LabRole"
}

# S3 bucket 
data "aws_s3_bucket" "bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = data.aws_s3_bucket.bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "sse" {
  bucket = data.aws_s3_bucket.bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "block" {
  bucket = data.aws_s3_bucket.bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_ecr_repository" "ecommerce" {
  name = "ecommerce-backend"
}

data "aws_ecs_cluster" "cluster" {
  cluster_name = "ecommerce-cluster"
}



data "aws_security_group" "ecs_sg" {
  name = "ecs-sg"
}

resource "aws_ecs_task_definition" "task" {
  family                   = "ecommerce-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.lab_role.arn
  task_role_arn            = data.aws_iam_role.lab_role.arn

  container_definitions = jsonencode([
    {
      name      = "ecommerce-backend"
      image     = "${data.aws_ecr_repository.ecommerce.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])

}
