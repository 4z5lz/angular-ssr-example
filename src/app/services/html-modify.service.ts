import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EnvironmentService } from './env.service';

export type LinkRelAttrOptions = 'preload' | 'prefetch' | 'icon' | 'stylesheet' | 'canonical';
export type LinkAsAttrOptions = 'script' | 'style' | 'font' | 'image';

export enum LinkAsAttr {
  script = 'script',
  style = 'style',
  font = 'font',
  image = 'image'
}

export enum LinkRelAttr {
  preload = 'preload',
  prefetch = 'prefetch',
  icon = 'icon',
  stylesheet = 'stylesheet',
  canonical = 'canonical'
}

@Injectable({
  providedIn: 'root',
})
export class HtmlModifyService {
  private renderer2: Renderer2;

  constructor(
    private meta: Meta,
    private title: Title,
    private env: EnvironmentService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer2 = rendererFactory.createRenderer(null, null);
  }

  public addPageTitle(title) {
    this.title.setTitle(title);
  }

  public addMetaTag(name, content) {
    this.meta.addTags([
      {
        name: name,
        content: content,
      },
    ]);
  }

  public setLinkTag(
    rel: LinkRelAttrOptions,
    href: string,
    as: LinkAsAttrOptions = null,
    type: string = null,
    crossorigin: boolean = false
  ) {
    let s = this.renderer2.createElement('link');
    s.rel = rel;
    s.href = href;
    if (as) s.setAttribute('as', as);
    if (type) s.type = type;
    if (crossorigin || (type && ~type.indexOf('font'))) {
      s.setAttribute('crossorigin', 'anonymous');
    }

    this.renderer2.appendChild(this.document.head, s);
  }

  /**
   * This method will patch base tage (<base href="/dev/">) just for demo deploy to AWS Labmda
   * 
   * @param renderer2 
   * @param isCompare 
   * @param baseHref 
   */
  public patchBaseHref() {
    this.renderer2.removeChild(this.document.head, this.renderer2.selectRootElement('base'));

    let s = this.renderer2.createElement('base');
    s.setAttribute('href', this.env.getBaseHref());

    this.renderer2.insertBefore(this.document.head, s, this.document.head.firstChild);
  }
}
