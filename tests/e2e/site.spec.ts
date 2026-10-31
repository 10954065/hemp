import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/cultivation",
  "/applications",
  "/pharmaceutical-supply",
  "/regulation",
  "/governance",
  "/opportunity",
  "/insights",
  "/insights/ghana-cannabis-licensing-framework-explained",
  "/insights/industrial-hemp-and-the-thc-threshold",
  "/insights/how-the-hemp-plant-is-used",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/credits",
];

test.describe("routes", () => {
  for (const route of routes) {
    test(`${route} renders with one h1, a title and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/HempWealth Ghana/);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test("unknown routes show the branded 404 page", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page could not be found");
    await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
  });

  test("unknown article slugs return 404", async ({ page }) => {
    const response = await page.goto("/insights/not-an-article");
    expect(response?.status()).toBe(404);
  });
});

test.describe("navigation", () => {
  test("desktop navigation marks the current page", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation is hidden on mobile");
    await page.goto("/");
    const mainNav = page.getByRole("navigation", { name: "Main" });
    await mainNav.getByRole("link", { name: "Regulation" }).click();
    await expect(page).toHaveURL(/\/regulation$/);
    await expect(mainNav.getByRole("link", { name: "Regulation" })).toHaveAttribute("aria-current", "page");
  });

  test("mobile menu opens as a modal, closes with Escape and restores focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu is only shown on small screens");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    await expect(dialog).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("mobile menu links navigate and close the menu", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu is only shown on small screens");
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Governance" }).click();
    await expect(page).toHaveURL(/\/governance$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("skip link is reachable from the keyboard", async ({ page, isMobile }) => {
    test.skip(isMobile, "Keyboard test runs on desktop");
    await page.goto("/about");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });
});

test.describe("enquiry form", () => {
  test("preselects the enquiry type from the query string", async ({ page }) => {
    await page.goto("/contact?type=investor");
    await expect(page.getByRole("radio", { name: /Investor enquiry/ })).toBeChecked();
    await expect(page.getByLabel(/Which best describes you/)).toBeVisible();
  });

  test("an empty submission shows an error summary and marks fields invalid", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText("Please correct the highlighted fields.")).toBeVisible();
    await expect(page.getByLabel(/Full name/)).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel(/Work email/)).toHaveAttribute("aria-invalid", "true");
  });

  test("an invalid email address is rejected", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/Work email/).fill("not-an-email");
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText(/valid email address/).first()).toBeVisible();
  });

  test("never shows success when email delivery is not configured", async ({ page }) => {
    test.skip(Boolean(process.env.RESEND_API_KEY), "Only meaningful without delivery credentials");
    await page.goto("/contact");
    await page.getByLabel(/Full name/).fill("QA Test");
    await page.getByLabel(/Work email/).fill("qa@example.com");
    await page.getByLabel(/^Country/).fill("Ghana");
    await page.getByLabel(/Your enquiry/).fill("Automated end-to-end test of the enquiry form error path.");
    await page.getByRole("checkbox").check();
    // The server rejects submissions made faster than a person could complete the form.
    await page.waitForTimeout(3_200);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByText(/could not send your enquiry/)).toBeVisible();
    await expect(page.getByText("Enquiry received")).toHaveCount(0);
  });
});

test.describe("API and SEO", () => {
  test("the enquiry endpoint refuses cross-origin requests", async ({ request }) => {
    const response = await request.post("/api/enquiry", {
      headers: { Origin: "https://attacker.example", "Content-Type": "application/json" },
      data: { category: "general" },
    });
    expect(response.status()).toBe(403);
  });

  test("robots.txt and sitemap.xml are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("/pharmaceutical-supply");
  });

  test("pages carry unique meta descriptions", async ({ page }) => {
    const descriptions = new Set<string>();
    for (const route of ["/", "/about", "/regulation", "/opportunity"]) {
      await page.goto(route);
      const content = await page.locator('meta[name="description"]').getAttribute("content");
      expect(content).toBeTruthy();
      descriptions.add(content ?? "");
    }
    expect(descriptions.size).toBe(4);
  });
});
