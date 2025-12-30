# AI/OpenAI Removal Implementation Plan

## Overview
Remove all AI and OpenAI dependencies from the SaaS application to resolve compatibility issues and reduce external dependencies.

## Current AI Integration Analysis
- **Location**: `/app/api/parse-syllabus/route.ts`
- **Purpose**: AI-powered syllabus parsing using OpenAI GPT models
- **Dependencies**: 
  - `openai` npm package
  - `OPENAI_API_KEY` environment variable
- **Fallback**: Rule-based parser already exists but is not the primary method

## Implementation Steps

### 1. Remove OpenAI Dependency
- [ ] Remove `"openai": "^4.104.0"` from `package.json`
- [ ] Run `npm uninstall openai` to clean up

### 2. Update API Route
- [ ] Remove OpenAI import and initialization
- [ ] Remove `callLLMToParseSyllabus` function
- [ ] Make rule-based parser the primary and only parsing method
- [ ] Update error handling and logging
- [ ] Clean up AI-related comments and documentation

### 3. Environment Cleanup
- [ ] Remove `OPENAI_API_KEY` from `.env.local` if present
- [ ] Update any configuration files that reference OpenAI

### 4. Code Cleanup
- [ ] Remove AI-related type definitions that are no longer needed
- [ ] Update function names and comments to reflect rule-based parsing
- [ ] Ensure all file processing still works (PDF, DOCX, PPTX, images)

### 5. Testing & Validation
- [ ] Test syllabus parsing with various file types
- [ ] Verify rule-based parser extracts course information correctly
- [ ] Ensure no remaining OpenAI references in codebase

## Expected Outcome
- Complete removal of AI dependencies
- Rule-based syllabus parsing as the only method
- Improved reliability and reduced external dependencies
- Faster parsing without API calls

## Files to Modify
1. `package.json` - Remove OpenAI dependency
2. `app/api/parse-syllabus/route.ts` - Remove AI integration
3. `.env.local` - Remove OpenAI API key (if present)
4. Any related documentation files
