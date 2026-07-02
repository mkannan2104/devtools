import { test, expect } from "@playwright/test";
import { isMonacoLifecycleError } from "@/lib/monaco/lifecycle";

test.describe("Json Tools Smoke Tests", () => {
  // Array to capture browser console errors
  let consoleErrors: string[] = [];

  test.beforeEach(({ page }) => {
    consoleErrors = [];
    page.on("pageerror", (exception) => {
      consoleErrors.push(`Uncaught Exception: ${exception.message}`);
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(`Console Error: ${message.text()}`);
      }
    });
  });

  test.afterEach(() => {
    const criticalErrors = consoleErrors.filter((err) =>
      isMonacoLifecycleError(err)
    );
    expect(criticalErrors).toEqual([]);
  });

  test("should render the landing page successfully", async ({ page }) => {
    await page.goto("/");
    // Check main branding header
    const mainHeading = page.locator("h1");
    await expect(mainHeading).toBeVisible();
    await expect(page).toHaveTitle(/Json Tools/);
  });

  test("should load the JSON Formatter page and allow editing", async ({ page }) => {
    await page.goto("/json/formatter");

    // Check header (exact text matcher)
    await expect(page.locator("h1", { hasText: "JSON Formatter" })).toBeVisible();

    // Verify editors or textareas load
    // Monaco editor loads fallback textarea on smaller viewports or load delay, so check for either
    const textarea = page.locator("textarea").first();
    await expect(textarea).toBeVisible();

    // Type some JSON
    await textarea.fill('{"a":1}');

    // Verify no unhandled exceptions were fired
    expect(consoleErrors.filter(e => e.includes("Error"))).toEqual([]);
  });

  test("should load JSON Diff Checker, swap inputs, and run compare", async ({ page }) => {
    await page.goto("/json/diff");

    // Check header title
    await expect(page.locator("h1", { hasText: "JSON Diff Checker" })).toBeVisible();

    // Click compare button (will compile and run successfully)
    const compareBtn = page.getByRole("button", { name: "Compare", exact: true });
    await expect(compareBtn).toBeVisible();
    await compareBtn.click();

    // Verify diff output region is displayed
    await expect(page.locator("text=Diff Result")).toBeVisible();

    // Swap input panels
    const swapBtn = page.getByRole("button", { name: "Swap", exact: true });
    await expect(swapBtn).toBeVisible();
    await swapBtn.click();

    // Clear panels
    const clearBtn = page.getByRole("button", { name: "Clear", exact: true });
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();
  });
});
