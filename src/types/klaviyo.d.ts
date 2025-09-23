declare global {
  interface Window {
    klaviyo?: {
      push: (data: unknown[]) => Promise<unknown> | void;
    };
    _klOnsite?: unknown[];
  }
}

export {};
