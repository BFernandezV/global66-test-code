import { test, expect } from '@playwright/test'

test.describe('Welcome Flow', () => {
  test('should allow to user to press getStarted button and redirect to home', async ({ page }) => {
    await page.goto('/welcome')

    await expect(page).toHaveTitle('Welcome to Pokédex')

    const getStartedButton = page.getByRole('button', { name: 'Get Started' })
    await expect(getStartedButton).toBeVisible()

    await getStartedButton.click()

    await expect(page).toHaveURL('/home')
  })
})
