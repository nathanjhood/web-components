import type Url = require('node:url');
import url = require('node:url');

const getPublicUrlOrPath = (options: {
  isEnvDevelopment: true | false;
  homepage?: string;
  envPublicUrl?: string | undefined;
}): string => {
  //
  const stubDomain: string = 'https://nathanjhood.dev';
  //

  const isEnvDevelopment: boolean = options.isEnvDevelopment;
  let envPublicUrl: string | undefined = options.envPublicUrl;
  let homepage: string | undefined = options.homepage;

  //
  if (envPublicUrl) {
    // ensure last slash exists
    envPublicUrl = envPublicUrl.endsWith('/')
      ? envPublicUrl
      : envPublicUrl + '/';

    // validate if `envPublicUrl` is a URL or path like
    // `stubDomain` is ignored if `envPublicUrl` contains a domain
    const validPublicUrl: Url.URL = new url.URL(envPublicUrl, stubDomain);

    return isEnvDevelopment
      ? envPublicUrl.startsWith('.')
        ? '/'
        : validPublicUrl.pathname
      : // Some apps do not use client-side routing with pushState.
        // For these, "homepage" can be set to "." to enable relative asset paths.
        envPublicUrl;
  }
  //

  //
  if (homepage) {
    // strip last slash if exists
    homepage = homepage.endsWith('/') ? homepage : homepage + '/';

    // validate if `homepage` is a URL or path like and use just pathname
    const validHomepagePathname: string = new url.URL(homepage, stubDomain)
      .pathname;

    //
    const result = isEnvDevelopment
      ? homepage.startsWith('.')
        ? '/'
        : validHomepagePathname
      : // Some apps do not use client-side routing with pushState.
        // For these, "homepage" can be set to "." to enable relative asset paths.
        homepage.startsWith('.')
        ? homepage
        : validHomepagePathname;

    return result satisfies string;
  }

  return '/';
};

export = getPublicUrlOrPath;
