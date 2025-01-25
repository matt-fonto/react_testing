export function getDataTestId(selector: string, identifier?: string): string {
  return identifier
    ? `[data-testid="${selector}${identifier}"]`
    : `[data-testid="${selector}"]`;
}
