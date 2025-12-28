# Migration Plan: OpenAI to HuggingFace + Timer/Pomodoro Enhancement

## Overview
This plan outlines the migration from OpenAI to Hugging Face Inference API and enhancement of the existing timer/pomodoro functionality.

## Current State Analysis
- ✅ OpenAI SDK is currently used in `/app/api/parse-syllabus/route.ts`
- ✅ Basic Pomodoro timer exists in `/app/dashboard/focus/page.tsx`
- ✅ Timer has 25min work / 5min break functionality
- ✅ UI is well-designed with Framer Motion animations

## Phase 1: HuggingFace Migration

### 1.1 Package Installation
- Remove `openai` package from dependencies
- Add `@huggingface/inference` package

### 1.2 Environment Variables
- Replace `OPENAI_API_KEY` with `HUGGINGFACE_API_KEY`
- Update documentation and .env examples

### 1.3 API Migration
- Update `/app/api/parse-syllabus/route.ts`
- Replace OpenAI chat completions with HuggingFace text generation
- Use appropriate model (e.g., `microsoft/DialoGPT-medium` or `google/flan-t5-base`)
- Maintain existing functionality and error handling

### 1.4 Documentation Updates
- Update README files
- Update SYLLABUS_UPLOADER_README.md
- Update test files and examples

## Phase 2: Timer/Pomodoro Enhancement

### 2.1 Timer Component Creation
- Create reusable `Timer` component in `/components/Timer.tsx`
- Support customizable work/break intervals
- Add sound notifications
- Add desktop notifications
- Include statistics tracking

### 2.2 Dashboard Integration
- Add timer widget to main dashboard
- Add quick access to focus mode
- Show today's focus sessions

### 2.3 Enhanced Focus Mode
- Improve existing `/app/dashboard/focus/page.tsx`
- Add task selection before starting timer
- Add break activity suggestions
- Add session statistics
- Add sound controls and preferences

### 2.4 Settings Integration
- Add timer preferences to settings
- Customizable work/break durations
- Sound preferences
- Notification settings

## Phase 3: Testing & Documentation

### 3.1 Testing
- Test HuggingFace API integration
- Test timer functionality across different scenarios
- Test notification permissions
- Test responsive design

### 3.2 Documentation
- Update user documentation
- Add API migration notes
- Add timer usage guide

## Success Criteria
- [ ] OpenAI completely replaced with HuggingFace
- [ ] Syllabus parsing functionality preserved
- [ ] Enhanced timer with customizable intervals
- [ ] Improved focus mode experience
- [ ] Dashboard integration complete
- [ ] Documentation updated
- [ ] All tests passing

## Estimated Timeline
- Phase 1: 2-3 hours
- Phase 2: 3-4 hours  
- Phase 3: 1-2 hours
- Total: 6-9 hours
