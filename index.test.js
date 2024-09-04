import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('html-0 CSS dosyası sayfaya eklenmiş', () => {
    const cssLinkTag = dom.window.document.head.querySelector(
      'link[href*="index.css"]'
    );
    expect(cssLinkTag).toBeInTheDocument();
  });

  it("html-1 gallery-section class'ına sahip bir bölüm(section) eklenmiş", () => {
    const element = container.querySelector('section.gallery-section');
    expect(element).toBeInTheDocument();
  });

  it('html-2 gallery section içinde 10 tane image  var', () => {
    const elements = container.querySelectorAll('section.gallery-section img');
    expect(elements.length).toBe(10);
  });

  it("html-3 gallery-section'daki tüm image'lara picsum sitesinden doğru ölçülerde resim linkleri eklenmiş", () => {
    const elements = container.querySelectorAll('section.gallery-section img');
    let result = elements.length === 10;
    for (let i = 0; i < elements.length; i++) {
      result =
        result && elements[i].src.includes('https://picsum.photos/200/600');
    }

    expect(result).toBe(true);
  });

  it('html-4 gallery-section içinde sadece 10 tane resim var.', () => {
    const elements = container.querySelectorAll('section.gallery-section>img');
    const children = container.querySelector(
      'section.gallery-section'
    ).children;
    expect(elements.length === 10 && elements.length === children.length).toBe(
      true
    );
  });

  it('css-1  .gallery-section için display özelliği flex ayarlanmış', () => {
    expect(isPropertySetInCss(css, '.gallery-section', 'display', 'flex')).toBe(
      true
    );
  });

  it('css-2  .gallery-section için satıra sığmayan resimlerin aşağıda kayması(wrap) flex özeliği ile ayarlanmış', () => {
    expect(
      isPropertySetInCss(css, '.gallery-section', 'flex-wrap', 'wrap')
    ).toBe(true);
  });

  it('css-3  .gallery-section için resimlerin arasında eşit mesafe olacak şekilde satıra yayılması için flex özelliği ayarlanmış.', () => {
    expect(
      isPropertySetInCss(
        css,
        '.gallery-section',
        'justify-content',
        'space-between'
      )
    ).toBe(true);
  });

  it('css-4  .gallery-section için sadece satır aralığı 30px olarak flex özelliği ile ayarlanmış', () => {
    const opt1 = isPropertySetInCss(css, '.gallery-section', 'row-gap', '30px');
    const opt2 = isPropertySetInCss(css, '.gallery-section', 'gap', '30px 0');
    expect(opt1 || opt2).toBe(true);
  });

  it('css-5  .gallery-section içindeki resimlerin bir satırda 5 tane olması için gerekli genişlik ayarı %18 ayarlanmış.', () => {
    expect(isPropertySetInCss(css, '.gallery-sectionimg', 'width', '18%')).toBe(
      true
    );
  });
});
