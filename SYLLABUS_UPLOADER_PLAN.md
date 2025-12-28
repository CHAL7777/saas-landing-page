# Syllabus Uploader Implementation Plan

## Current State Analysis
- **SyllabusUploader.tsx**: Beautiful UI with mock data, no real functionality
- **API Route**: Stub implementation with commented out PDF parsing code
- **Dashboard System**: Well-established with hooks for tasks, events, stats
- **Missing Dependencies**: No PDF parsing libraries installed

## Implementation Plan

### Phase 1: Backend Infrastructure
1. **Install Dependencies**
   - Add `pdf-parse` for PDF text extraction
   - Add `openai` or similar LLM client for intelligent parsing
   - Add proper error handling libraries

2. **Update API Route (`/api/parse-syllabus`)**
   - Implement actual PDF text extraction
   - Add LLM integration for intelligent data extraction
   - Return structured data matching dashboard types

### Phase 2: Frontend Integration
3. **Connect SyllabusUploader to API**
   - Replace mock data with actual API calls
   - Add proper error handling and loading states
   - Implement real file upload functionality

4. **Data Integration**
   - Convert extracted syllabus data to dashboard tasks
   - Create events for important dates
   - Integrate with existing useTasks and useEvents hooks

### Phase 3: User Experience
5. **Enhanced Features**
   - Add progress indicators for file processing
   - Implement preview of extracted data before saving
   - Add options to edit/confirm extracted information

### Phase 4: Testing & Polish
6. **Quality Assurance**
   - Test with various PDF formats
   - Ensure proper error handling
   - Verify integration with dashboard system

## Technical Architecture

### API Response Format
```typescript
interface ParsedSyllabusData {
  course: {
    name: string;
    instructor: string;
    credits: number;
  };
  events: Event[]; // Extracted dates and deadlines
  tasks: Task[]; // Generated tasks from syllabus
  grading: {
    components: { name: string; weight: string }[];
  };
}
```

### Data Flow
1. User uploads PDF → SyllabusUploader
2. PDF sent to API → parse-syllabus route
3. PDF text extracted → LLM for intelligent parsing
4. Structured data returned → Frontend displays preview
5. User confirms → Data integrated into dashboard

## Next Steps
1. Install required dependencies
2. Implement backend PDF parsing
3. Connect frontend to backend
4. Test with real syllabi
5. Deploy and iterate

## Estimated Time
- Backend: 2-3 hours
- Frontend Integration: 1-2 hours  
- Testing & Polish: 1 hour
- **Total: 4-6 hours**
