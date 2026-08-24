export function getJobIdFromPathname(pathname: string): string | undefined {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] !== 'jobs' || !segments[1] || segments[1] === 'create') {
    return undefined;
  }

  return segments[1];
}

export function buildJobSwitchPath(pathname: string, nextJobId: string) {
  const currentJobId = getJobIdFromPathname(pathname);

  if (!currentJobId) {
    return `/jobs/${nextJobId}/dashboard`;
  }

  const suffix = pathname.slice(`/jobs/${currentJobId}`.length);

  if (suffix === '' || suffix === '/edit') {
    return `/jobs/${nextJobId}`;
  }

  if (suffix.startsWith('/dashboard')) {
    return `/jobs/${nextJobId}/dashboard`;
  }

  if (suffix.startsWith('/upload')) {
    return `/jobs/${nextJobId}/upload`;
  }

  if (suffix.startsWith('/candidates')) {
    return `/jobs/${nextJobId}/candidates`;
  }

  return `/jobs/${nextJobId}/dashboard`;
}

export function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
