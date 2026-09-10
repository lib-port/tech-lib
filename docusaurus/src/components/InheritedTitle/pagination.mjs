function normalizePath(pathname) {
  return pathname.replace(/\/$/, '').toLowerCase();
}

export function getInheritedPaginationTitle(pagination, pathname, isNext) {
  // Metadata and browser paths can differ by case or one trailing slash.
  const currentPath = normalizePath(pathname);
  const source = Object.keys(pagination).find(key => normalizePath(key) === currentPath);
  return source === undefined ? undefined : pagination[source][isNext ? 'next' : 'previous'];
}
