import React, { lazy, type ComponentProps, type ComponentType } from 'react';

type AnyComponent = ComponentType<any>;

export type PreloadableComponent<T extends AnyComponent> = ComponentType<ComponentProps<T>> & {
  preload: () => Promise<unknown>;
};

/**
 * React.lazy plus a preload() that lets the first render skip Suspense.
 *
 * Plain React.lazy suspends on its first render even when the chunk has already
 * downloaded, which would replace a pre-rendered page with the loading placeholder
 * for a moment. Once preload() has resolved, this renders the loaded component
 * directly instead.
 */
export function lazyWithPreload<T extends AnyComponent>(
  loader: () => Promise<{ default: T }>
): PreloadableComponent<T> {
  let Loaded: T | null = null;
  let pending: Promise<{ default: T }> | null = null;

  const load = () => {
    if (!pending) {
      pending = loader().then(
        (module) => {
          Loaded = module.default;
          return module;
        },
        (error) => {
          // Let a later visit retry a chunk that failed to download.
          pending = null;
          throw error;
        }
      );
    }

    return pending;
  };

  const LazyComponent = lazy(load) as unknown as AnyComponent;

  const Preloadable = (props: ComponentProps<T>) => {
    const Component: AnyComponent = Loaded ?? LazyComponent;
    return <Component {...props} />;
  };

  return Object.assign(Preloadable, { preload: load });
}
