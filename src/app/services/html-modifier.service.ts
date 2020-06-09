import { Inject, Injectable, Injector, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';

export type LinkRelAttrOptions = 'preload' | 'prefetch' | 'icon' | 'stylesheet'; // there are more options
export type LinkAsAttrOptions = 'script' | 'style' | 'font' | 'image';

export enum LinkAsAttr {
  script = 'script',
  style = 'style',
  font = 'font',
  image = 'image',
}

export enum LinkRelAttr {
  preload = 'preload',
  prefetch = 'prefetch',
  icon = 'icon',
  stylesheet = 'stylesheet',
}

@Injectable({
  providedIn: 'root',
})
export class HtmlModifierService {
  constructor(
    protected injector: Injector,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document
  ) {}

  public addPageTitle(title) {
    this.title.setTitle(title);
  }

  public addMetaTags(metaTags) {
    this.meta.addTags(metaTags);
  }

  public addMetaTag(name, content) {
    this.meta.addTags([
      {
        name: name,
        content: content,
      },
    ]);
  }

  public setJs(
    renderer2: Renderer2,
    src: string,
    appendScript: boolean = true,
    onloadCallback: any = null
  ) {
    let s = renderer2.createElement('script');
    s.type = `text/javascript`;
    s.src = src;

    if (onloadCallback) {
      s.onload = onloadCallback;
    }

    if (appendScript) renderer2.appendChild(this.document.body, s);
    else
      renderer2.insertBefore(
        this.document.body,
        s,
        this.document.body.firstElementChild
      );
  }

  public setJsInline(
    renderer2: Renderer2,
    variableName: string,
    variableValue: any
  ) {
    let s = renderer2.createElement('script');
    s.type = `text/javascript`;
    renderer2.appendChild(this.document.body, s);

    s.appendChild(
      this.document.createTextNode(
        'var ' + variableName + '=' + JSON.stringify(variableValue)
      )
    );
  }

  public setLinkTag(
    renderer2: Renderer2,
    rel: LinkRelAttrOptions,
    href: string,
    as: LinkAsAttrOptions,
    type: string = null,
    crossorigin: boolean = false
  ) {
    let s = renderer2.createElement('link');
    s.rel = rel;
    s.href = href;
    if (as) s.setAttribute('as', as);
    if (type) s.type = type;
    if (crossorigin || ~type.indexOf('font'))
      s.setAttribute('crossorigin', 'anonymous');
    renderer2.appendChild(this.document.head, s);
  }
}
