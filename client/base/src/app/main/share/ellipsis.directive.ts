import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
})
export class EllipsisDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const originalText = element.textContent.trim(); // Use textContent for multiline text
    const truncatedText = this.truncateText(originalText, 120);

    if (truncatedText !== originalText) {
      this.renderer.setAttribute(element, 'title', originalText);
      element.textContent = truncatedText; // Use textContent to preserve multiline structure
    }
  }

  private truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
