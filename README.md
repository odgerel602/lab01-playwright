# Lab01 — UI автомат тест (Playwright)

F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест (2026)

Тестлэсэн сайт: <https://www.saucedemo.com>

## Юу хийсэн бэ

- Node.js + TypeScript дээр Playwright төсөл үүсгэж тохируулсан (`playwright.config.ts`).
- `tests/mytest.spec.ts` файлд 4 тест бичсэн:

| # | Тест | Шалгасан зүйл |
|---|------|---------------|
| 1 | Амжилттай нэвтрэх | `toHaveURL(/inventory/)`, "Products" гарчиг `toBeVisible` / `toHaveText`, 6 бараа `toHaveCount` |
| 2 | Амжилтгүй нэвтрэх (буруу нууц үг) | Алдааны мессежийн текст `toHaveText`, нэвтрэх хуудсандаа үлдсэн |
| 3 | Нэвтэрсний дараа бараа сагслах | Сагсны badge = 1, сагсанд бараа байгаа, дараа нь устгаж цэвэрлэсэн |
| 4 | `locked_out_user` нэвтэрч чадахгүй | "locked out" алдааны мессеж |

- Нэвтэрсэн тест бүр **Logout** үйлдлээр төгсдөг (`logout()` helper).
- Тест бүр Playwright-ийн шинэ browser context дээр ажилладаг тул **хоорондоо хамааралгүй** (test isolation) — `fullyParallel: true` тохиргоогоор зэрэг ажиллаж чадаж байгаа нь үүнийг баталдаг.
- Trace, video бүх тест дээр асаалттай; HTML report нь [`playwright-report/`](playwright-report/) хавтаст хадгалагдсан.

### Locator-ын сонголт — яагаад XPath биш вэ?

`getByRole`, `getByPlaceholder`, `getByText`, `getByTestId`-г ашигласан. Эдгээр нь хэрэглэгчийн
харж буй зүйл (товчны нэр, placeholder, текст) эсвэл тест зориулалтын тогтвортой атрибут
(`data-test`)-аар элемент олдог. XPath (`//div[2]/form/input[1]`) нь DOM-ын бүтцээс
хамаардаг тул дизайн бага зэрэг өөрчлөгдөхөд эвдэрдэг, уншихад хэцүү, мөн хандалтын
(accessibility) талаар юу ч шалгадаггүй. Жишээ нь `getByRole('button', { name: 'Logout' })`
ашигласнаар Logout элемент нь accessibility tree-д `button` болж харагддагийг олж мэдсэн
(эхэндээ `link` гэж бичээд тест унасан, trace/error-context-оос шалтгааныг олсон).

## Ажиллуулах

```bash
npm install
npx playwright install chromium
npx playwright test            # бүх тест
npx playwright show-report     # HTML тайлан
npx playwright test --trace on # trace-тэй
npx playwright show-trace test-results/<test-folder>/trace.zip
npx playwright codegen https://www.saucedemo.com
```

## Trace viewer — санаатай унагасан тест

Амжилттай нэвтрэх тестийн assertion-ыг санаатайгаар буруу болгож
(`toHaveText('Products')` → `toHaveText('Productz')`) `--trace on`-оор ажиллуулсан:

```
Error: expect(locator).toHaveText(expected) failed
Locator:  getByTestId('title')
Expected: "Productz"
Received: "Products"
  13 × locator resolved to <span class="title" data-test="title">Products</span>
     - unexpected value "Products"
```

Playwright 5 секундийн турш 13 удаа дахин шалгаад (auto-retry) унасан. Trace viewer дээр
алдаа гарсан алхам улаанаар тэмдэглэгдэж, тухайн агшны DOM snapshot дээр гарчиг "Products"
байгааг харж болно — өөрөөр хэлбэл алдаа сайтад биш, тестэд байгааг шууд тогтоох боломжтой.

- Trace файл: [docs/failed-test-trace.zip](docs/failed-test-trace.zip) — `npx playwright show-trace docs/failed-test-trace.zip`
  эсвэл <https://trace.playwright.dev> дээр чирж оруулж үзнэ.
- Унасан агшны скриншот: [docs/failed-test-screenshot.png](docs/failed-test-screenshot.png)

Шалгасны дараа assertion-ыг буцааж зассан тул үндсэн тестүүд бүгд амжилттай ажилладаг.

## Playwright ба Selenium — өөрийн ажиглалт

1. Playwright-ийн **auto-wait** нь хамгийн мэдэгдэхүйц ялгаа байлаа — нэг ч `sleep` эсвэл explicit wait бичээгүй ч тест тогтвортой ажилласан; Selenium-д `WebDriverWait` гараар бичих шаардлагатай.
2. Суулгалт маш энгийн: `npx playwright install` нэг командаар хөтчийг татдаг, Selenium шиг ChromeDriver-ийн хувилбар тааруулах асуудал гараагүй.
3. `expect(...).toHaveText()` гэх мэт web-first assertion-ууд өөрсдөө дахин оролддог тул assertion бичихэд хялбар.
4. **Trace viewer** алдааг мөшгихөд маш хэрэгтэй байсан: Logout тест унахад алхам бүрийн DOM snapshot болон accessibility tree-г харж шалтгааныг шууд олсон.
5. `getByRole` зэрэг locator-ууд нь тестийг хэрэглэгчийн өнцгөөс бичихэд хүргэдэг; Selenium-д ихэвчлэн CSS/XPath ашигладаг.
6. Тест бүр шинэ browser context-д ажилладаг тул isolation болон зэрэгцээ ажиллагаа анхнаасаа бий; Selenium-д үүнийг тусад нь (жишээ нь Selenium Grid) зохион байгуулах хэрэгтэй.
7. Codegen нь хурдан эхлэхэд тустай ч гаргасан код нь заримдаа хэт урт, давхардсан алхамтай тул гараар цэгцлэх шаардлагатай.
8. Сул тал: Selenium илүү олон жил хэрэглэгдсэн тул community, хуучин системүүдтэй нийцэл, бодит төхөөрөмж (Appium) дэмжлэг илүү өргөн.
