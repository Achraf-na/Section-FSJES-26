import { SECTION_DISTRIBUTIONS } from '../constants';
import type { StudentResult } from '../types';

/**
 * Searches for a student's section based on their last name and semester.
 * The search uses alphabetical ranges extracted from official distribution PDFs.
 */
export const searchStudents = async (
  collegeId: string, 
  familyName: string, 
  semester: string
): Promise<StudentResult[]> => {
  console.log(`Searching in ${collegeId} (${semester}) for "${familyName}"`);
  
  return new Promise((resolve) => {
    // Simulate a small network delay
    setTimeout(() => {
      if (!familyName.trim() || !semester) {
        resolve([]);
        return;
      }

      const inputName = familyName.trim().toUpperCase();
      
      // Find the distribution for the selected semester
      const distribution = SECTION_DISTRIBUTIONS.find(d => d.semester === semester);
      
      if (!distribution) {
        resolve([]);
        return;
      }

      /**
       * Special range check that respects the university rule: 
       * "Spaces (detached letters) always come before letters without spaces (attached letters)".
       * Standard JS string comparison (Unicode/ASCII) already treats Space (32) as less than A-Z (65-90).
       */
      const foundRange = distribution.ranges.find(range => {
        const from = range.from.trim().toUpperCase();
        const to = range.to.trim().toUpperCase();
        
        return inputName >= from && inputName <= to;
      });

      if (foundRange) {
        resolve([{
          id: Date.now().toString(),
          familyName: inputName,
          firstName: "", // We only have last name ranges
          section: foundRange.section,
        }]);
      } else {
        resolve([]);
      }
    }, 600);
  });
};
