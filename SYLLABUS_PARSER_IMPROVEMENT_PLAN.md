# Syllabus Parser Import and Functionality Improvement Plan

## Current State Analysis
- Current file uses dynamic imports for Tesseract
- Uses HuggingFace instead of OpenAI
- Has fallback implementations for mammoth (DOCX/PPTX) that don't actually use the library
- Missing proper static imports as specified

## Information Gathered
1. **Current Implementation Issues:**
   - Dynamic import for Tesseract: `const Tesseract = await import('tesseract.js');`
   - Uses HuggingFace API instead of OpenAI
   - DOCX/PPTX extraction uses generic fallbacks, not mammoth
   - No static imports for the three libraries mentioned

2. **Required Imports to Implement:**
   ```typescript
   import OpenAI from 'openai';
   import Tesseract from 'tesseract.js';
   import mammoth from 'mammoth';
   ```

3. **Dependencies Needed:**
   - `openai` package
   - `tesseract.js` package (already referenced)
   - `mammoth` package (for DOCX extraction)
   - `pdf-parse` package (already in use)

## Plan: Comprehensive Import and Functionality Update

### Step 1: Add Required Dependencies
- Add `openai` to package.json
- Ensure `mammoth` is available
- Verify `tesseract.js` is properly configured

### Step 2: Replace Dynamic Imports with Static Imports
- Convert Tesseract from dynamic import to static import
- Add OpenAI static import
- Add mammoth static import

### Step 3: Update OCR Implementation
- Replace dynamic Tesseract usage with static import
- Improve error handling and performance

### Step 4: Implement OpenAI Integration
- Replace HuggingFace with OpenAI for better syllabus parsing
- Update API calls and response handling
- Maintain fallback to rule-based parsing

### Step 5: Implement Proper DOCX/PPTX Extraction
- Use mammoth for DOCX file extraction
- Implement proper PPTX extraction (may need additional library)
- Improve text extraction quality

### Step 6: Update Environment Configuration
- Add OpenAI API key requirements
- Update documentation for new dependencies

## Dependent Files to be Edited
1. `/home/chaldev/Desktop/saas/saas-landing-page/package.json` - Add dependencies
2. `/home/chaldev/Desktop/saas/saas-landing-page/app/api/parse-syllabus/route.ts` - Main implementation update
3. Environment configuration files if needed

## Follow-up Steps
1. Install new dependencies
2. Test with various file formats (PDF, DOCX, PPTX, images)
3. Verify OpenAI integration works properly
4. Ensure error handling is robust
5. Update API documentation

## Expected Benefits
- Better text extraction quality with mammoth for DOCX
- More reliable OCR with static Tesseract import
- Improved AI parsing with OpenAI integration
- Better code maintainability with static imports
- Enhanced error handling and performance
