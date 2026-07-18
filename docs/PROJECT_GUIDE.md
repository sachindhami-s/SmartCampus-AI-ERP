# SmartCampus AI ERP - Development Guide

This document defines the development workflow, coding standards, learning style, project rules, and roadmap for the SmartCampus AI ERP project.

Its purpose is to ensure that every future development session follows the same structure, coding style, and teaching approach.

---

# Development Philosophy

The SmartCampus AI ERP project will be developed following real-world software engineering practices.

The primary goals are:

- Build a production-quality MERN Stack application.
- Learn every concept instead of copying code.
- Write clean, readable, and maintainable code.
- Complete one feature before starting the next.
- Test every feature before moving forward.
- Keep the project modular and scalable.

The project should prioritize understanding over speed.

---

# Learning Style

This project is being developed as a learning project.

Every feature should be taught step by step.

The development process should follow these principles:

- Explain the objective before writing any code.
- Modify one file at a time whenever possible.
- Explain why each line of code is written.
- Never skip intermediate steps.
- Wait for confirmation before moving to the next step.
- Test every feature after implementation.
- Fix errors before starting a new feature.
- Prefer understanding over memorization.

The goal is to learn backend and full-stack development while building a real-world ERP system.

---

# Coding Standards

## General Rules

- Write clean and readable code.
- Use meaningful variable names.
- Use meaningful function names.
- Keep functions focused on a single responsibility.
- Maintain consistent indentation and formatting.
- Remove unused code before finalizing a feature.

---

## Project Structure

Follow the existing folder structure.

Controllers

- Business Logic

Models

- Database Schema

Routes

- API Endpoints

Middleware

- Authentication
- Authorization
- Validation

Config

- Database Connection
- Environment Configuration

Utils

- Helper Functions

---

## Security Rules

- Never store passwords as plain text.
- Always hash passwords using bcrypt.
- Store secrets inside the .env file.
- Protect sensitive routes using JWT Authentication.
- Apply Role-Based Authorization where required.

---

## API Rules

Every API should include:

- Input Validation
- Error Handling
- Proper HTTP Status Codes
- JSON Response
- Success Message

---

# Development Workflow

Every feature in this project must follow the same workflow.

## Step 1
Understand the feature and its objective.

## Step 2
Design the database model (if required).

## Step 3
Create or update the required folders and files.

## Step 4
Implement the backend logic.

## Step 5
Create or update API routes.

## Step 6
Add validation.

## Step 7
Add authentication or authorization if required.

## Step 8
Test every API using Thunder Client.

## Step 9
Fix all errors before moving forward.

## Step 10
Update project documentation after completing the feature.



# Documentation Update Rules

After every completed feature, update:

PROJECT_CONTEXT.md

- Completed Features
- API Documentation
- Database Changes
- Current Project Status
- Next Development Task

PROJECT_GUIDE.md

- Only update if the development workflow, coding standards, or project process changes.

Do not use PROJECT_GUIDE.md as a progress log.