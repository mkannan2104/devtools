import "@testing-library/jest-dom";

// Mock ResizeObserver for JSDOM environments where it doesn't exist
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
