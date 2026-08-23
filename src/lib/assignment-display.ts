export function getCareerModuleNumber(input: { id?: string; num?: string | number }): string | null {
  if (input.num !== undefined && input.num !== null && String(input.num).trim() !== '') {
    return String(input.num).trim();
  }

  const match = input.id?.match(/^career-module(\d+)/i);
  return match ? match[1] : null;
}

export function isCareerModuleAssignment(input: { id?: string; type?: string }): boolean {
  const rawType = (input.type || '').toLowerCase().trim();

  return rawType === 'career' || rawType === 'career module' || Boolean(input.id?.startsWith('career-module'));
}

export function getCareerModuleDisplayTitle(input: {
  id?: string;
  num?: string | number;
  title: string;
  type?: string;
}): string {
  if (!isCareerModuleAssignment(input)) {
    return input.title;
  }

  if (/^Career Module \d+\s*:/i.test(input.title)) {
    return input.title;
  }

  const moduleNum = getCareerModuleNumber(input);
  if (!moduleNum) {
    return input.title;
  }

  return `Career Module ${moduleNum}: ${input.title}`;
}
