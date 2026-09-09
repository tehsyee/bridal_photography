export const PACKAGE_SELECT_EVENT = 'booking:select-package';

export function requestPackage(packageName: string) {
  window.dispatchEvent(new CustomEvent<string>(PACKAGE_SELECT_EVENT, { detail: packageName }));
}
