// Resource: https://angularindepth.com/posts/1383/responsive-angular

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMedia]',
  standalone: true,
})
export class MediaDirective {
  @Input() set appMedia(query: string) {
    if (this.removeListener) {
      this.removeListener();
    }
    this.setListener(query);
  }
  private hasView = false;
  private removeListener!: () => void;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly template: TemplateRef<any>,
  ) {}

  private setListener(query: string) {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches && !this.hasView) {
        this.hasView = true;
        this.viewContainer.createEmbeddedView(this.template);
      } else if (!event.matches && this.hasView) {
        this.hasView = false;
        this.viewContainer.clear();
      }
    };
    listener(mediaQueryList);
    mediaQueryList.addEventListener('change', listener);
    this.removeListener = () =>
      mediaQueryList.removeEventListener('change', listener);
  }
}
