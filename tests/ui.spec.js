import { test, expect } from "@playwright/test";

test("home page", async ({ page }) => {
  await page.goto("/");

  expect(await page.title()).toBe("JWT Pizza");
  await expect(
    page.getByText("The web's best pizza", { exact: true })
  ).toBeVisible();
  await expect(page.getByText("Pizza is an absolute delight")).toBeVisible();
  await expect(page.getByText("Pizza has come a long way")).toBeVisible();
  await expect(page.getByText("Pizza is not just a food; it'")).toBeVisible();
  await expect(page.getByText("Pizza is a universal language")).toBeVisible();
});

test("about page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "About" }).click();
  await expect(page.getByText("The secret sauce")).toBeVisible();
  await expect(page.getByText("At JWT Pizza, our amazing")).toBeVisible();
  await expect(page.getByText("Our talented employees at JWT")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Our employees" })
  ).toBeVisible();
  await expect(page.getByText("JWT Pizza is home to a team")).toBeVisible();
  await expect(page.getByText("At JWT Pizza, our employees")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^James$/ })
      .getByRole("img")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Maria$/ })
      .getByRole("img")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Anna$/ })
      .getByRole("img")
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Brian$/ })
      .getByRole("img")
  ).toBeVisible();
  await expect(page.getByRole("main").getByRole("img").first()).toBeVisible();
});

test("history page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "History" }).click();
  await expect(page.getByText("Mama Rucci, my my")).toBeVisible();
  await expect(page.getByRole("main").getByRole("img")).toBeVisible();
  await expect(page.getByText("It all started in Mama Ricci'")).toBeVisible();
});

test("franchise page", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByText("So you want a piece of the")).toBeVisible();
  await expect(page.getByText("Now is the time to get in on")).toBeVisible();
  await expect(
    page.getByText(
      "Owning a franchise with JWT Pizza can be highly profitable. With our proven"
    )
  ).toBeVisible();
  await expect(page.getByText("In addition to financial")).toBeVisible();
  await expect(page.getByText("But it's not just about the")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Unleash Your Potential" })
  ).toBeVisible();
  await expect(page.getByText("Are you ready to embark on a")).toBeVisible();
  await expect(page.getByText("Call now800-555-")).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          /^If you are already a franchisee, pleaseloginusing your franchise account$/,
      })
      .nth(2)
  ).toBeVisible();
});
