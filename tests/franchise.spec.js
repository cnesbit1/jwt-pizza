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