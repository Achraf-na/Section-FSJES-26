export interface StudentResult {
  id: string;
  familyName: string;
  firstName: string;
  section?: string;
  percent?: number;
}

export interface College {
  id: string;
  label: string;
}

export interface SectionRange {
  section: string;
  from: string;
  to: string;
}

export interface SemesterDistribution {
  semester: string;
  ranges: SectionRange[];
}
