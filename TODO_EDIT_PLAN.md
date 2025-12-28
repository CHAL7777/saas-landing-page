# Edit Plan: Remove Payment Service & Move Semester Overview

## Information Gathered:
1. **Current Home Page Structure** (`app/page.tsx`):
   - Contains Pricing component with "Invest in your future" heading
   - Contains DashboardPreview component with "Semester Overview"
   - Both components are imported and rendered

2. **Current Dashboard Structure** (`app/dashboard/page.tsx`):
   - Already has DashboardOverview component
   - Has tab-based navigation with overview section
   - Does not currently include semester overview

3. **Components Analysis**:
   - `components/Pricing.tsx` - Contains payment/pricing service with "Invest in your future" text
   - `components/DashboardPreview.tsx` - Contains comprehensive semester overview functionality

## Plan:

### ✅ Step 1: Remove Payment Service from Home Page
- **File**: `app/page.tsx`
- **Action**: Remove `Pricing` import and component rendering
- **Impact**: Completely removes the "Invest in your future" payment section

### ✅ Step 2: Remove Semester Overview from Home Page  
- **File**: `app/page.tsx`
- **Action**: Remove `DashboardPreview` import and component rendering
- **Impact**: Removes semester overview from landing page

### ✅ Step 3: Add Semester Overview to Dashboard
- **File**: `app/dashboard/page.tsx`
- **Action**: Import and integrate DashboardPreview component into the overview tab with useRealData={true}
- **Impact**: Moves semester overview functionality to dashboard

## Files to Edit:
1. `/home/aneman/Desktop/saas/saas-landing-page/app/page.tsx` - Remove Pricing and DashboardPreview
2. `/home/aneman/Desktop/saas/saas-landing-page/app/dashboard/page.tsx` - Add DashboardPreview to overview

## Expected Outcome:
- Home page becomes cleaner without payment/pricing distractions
- Semester overview moves to dashboard where users can interact with it
- Dashboard becomes more comprehensive with both overview and semester details

## Testing Required:
- Verify home page renders correctly without removed components
- Verify dashboard displays semester overview in overview tab
- Check for any import/export issues
