import { test, expect } from '@playwright/test';

test('recorrido de escritorio: imágenes, datos, galería y juego completo', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('EL MARNO OLVIDA.');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'test-results/escritorio-portada.png' });
  await page.getByRole('button', { name: 'Reducir movimiento' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await page.getByRole('button', { name: /Sur 62.044/ }).click();
  await expect(page.locator('#chart-detail')).toContainText('Los Ríos → Aysén');
  await page.getByRole('button', { name: 'Ampliar: Habitantes del litoral' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Ampliar: Habitantes del litoral' })).toBeFocused();
  await page.getByRole('button', { name: 'Comenzar el desafío' }).click();
  for (const [index, correct] of [1, 0, 2, 1, 0].entries()) {
    await page.locator('.answer-option').nth(correct).click();
    await expect(page.locator('.answer-feedback')).toContainText('Bien fundamentado.');
    await expect(page.locator('.answer-option').first()).toBeDisabled();
    await page
      .getByRole('button', { name: index === 4 ? 'Ver mi resultado' : 'Siguiente situación' })
      .click();
  }
  await expect(page.locator('.game-score')).toHaveText('5/ 5');
  await page.getByRole('button', { name: 'Volver a jugar' }).click();
  await page.locator('.answer-option').first().click();
  await expect(page.locator('.answer-feedback')).toContainText('Hay una mejor decisión.');
  const broken = await page
    .locator('img')
    .evaluateAll((images) =>
      images
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.src),
    );
  expect(broken).toEqual([]);
  expect(errors).toEqual([]);
});

for (const width of [360, 390, 768, 1440]) {
  test(`sin desborde y con contenido accesible a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const missingTargets = await page
      .locator('a[href^="#"]')
      .evaluateAll((anchors) =>
        anchors
          .map((a) => a.getAttribute('href')!.slice(1))
          .filter((id) => !document.getElementById(id)),
      );
    expect(missingTargets).toEqual([]);
    await page.locator('#historia').scrollIntoViewIfNeeded();
    await expect(
      page.getByRole('heading', { name: 'Treinta años más de protección.' }),
    ).toBeVisible();
    await page.locator('#juego').scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Comenzar el desafío' })).toBeVisible();
    if (width === 390) {
      await page.screenshot({ path: 'test-results/movil-juego.png' });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: 'test-results/movil-portada.png' });
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      await page
        .getByRole('navigation', { name: 'Navegación móvil' })
        .getByRole('link', { name: 'Historia' })
        .click();
      await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
      await expect(page).toHaveURL(/#historia$/);
    }
  });
}

test('video solo carga al solicitarlo, podcast y error de configuración', async ({ page }) => {
  await page.route('**/youtube-nocookie.com/**', (route) =>
    route.fulfill({
      body: '<html><body>Reproductor externo aislado para la prueba</body></html>',
      contentType: 'text/html',
    }),
  );
  await page.goto('/');
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Abrir podcast temporal/ })).toHaveAttribute(
    'href',
    /^https:\/\/notebook.google.com\//,
  );
  await page.getByRole('button', { name: 'Cargar video de YouTube' }).click();
  await expect(page.locator('iframe')).toHaveAttribute(
    'src',
    'https://www.youtube-nocookie.com/embed/jpkeAQG6kQw',
  );
  await page.route('**/config.json', (route) =>
    route.fulfill({ body: '{}', contentType: 'application/json' }),
  );
  await page.reload();
  await expect(page.getByRole('alert')).toContainText('No fue posible cargar');
  await expect(page.getByRole('button', { name: 'Cargar video de YouTube' })).toBeDisabled();
});

test('el recorrido horizontal se desmonta sin perder capítulos al reducir movimiento', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  await page.locator('#historia').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Reducir movimiento' }).click();
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('.timeline-track')).toHaveCSS('transform', 'none');
  await page.getByRole('button', { name: 'Activar animaciones' }).click();
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('activar movimiento explícitamente con preferencia del sistema reducida conserva toda la historia', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Activar animaciones' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
});
