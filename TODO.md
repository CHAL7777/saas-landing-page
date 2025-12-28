# Ethiopian Phone Number Support Implementation Plan

## Information Gathered:
- ContactForm component exists at `components/ContactForm.tsx`
- Currently has fields: name, email, university, message
- Uses react-hook-form for validation
- No phone number field currently exists
- Need to support Ethiopian phone number formats: local (09XXXXXXXX) and international (+251XXXXXXXXX)

## Plan:
### Step 1: Create Phone Number Utility Functions
- Create utility functions for Ethiopian phone number validation and formatting
- Support both local format (09XXXXXXXX) and international format (+251XXXXXXXXX)
- Add validation for Ethiopian phone number patterns

### Step 2: Update ContactForm Component
- Add phone number field to the form
- Implement country-specific validation for Ethiopian numbers
- Add proper labeling and placeholder text
- Include validation error handling

### Step 3: Enhance Form Type Definitions
- Update FormData type to include phone field
- Add proper TypeScript types for Ethiopian phone validation

### Step 4: Add Visual Improvements
- Ensure phone input field matches existing design system
- Add appropriate icons and styling
- Implement real-time formatting for better UX

## Files to be Edited:
1. `components/ContactForm.tsx` - Add phone number field and validation
2. `utils/phoneUtils.ts` - Create utility functions (new file)
3. Update form submission logic to include phone number

## Followup Steps:
- Test phone number validation with various formats
- Ensure responsive design works on mobile devices
- Verify form submission includes phone number data
