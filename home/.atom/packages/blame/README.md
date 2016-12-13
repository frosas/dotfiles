# blame package

[![Build Status](https://img.shields.io/travis/josa42/atom-blame.svg?style=flat-square)](https://travis-ci.org/josa42/atom-blame)
[![Plugin installs!](https://img.shields.io/apm/dm/blame.svg?style=flat-square)](https://atom.io/packages/blame)
[![Package version!](https://img.shields.io/apm/v/blame.svg?style=flat-square)](https://atom.io/packages/blame)
[![Dependencies!](https://img.shields.io/david/josa42/atom-blame.svg?style=flat-square)](https://david-dm.org/josa42/atom-blame)

Show git blame as a gutter.

![](https://raw.githubusercontent.com/josa42/atom-blame/master/screenshot.png)

## Customize Gutter colors

You can customize the gutter colors by adding the following lines to your
stylesheet (`~/.atom/styles.less`).

```CSS
atom-text-editor .blame-gutter {
  .hash   { color: white; }
  .date   { color: white; }
  .author { color: white; }
}
```

## Custom repository browser

To use a custom repository browser (like [gitweb](http://git-scm.com/docs/gitweb)), set an URL template in the git config file:

```
git config --local --add atom-blame.browser-url "http://example.com/gitweb/?p=my_repo.git;a=commit;h={hash}"
```

`{hash}` will be replaced with the actual hash of selected commit.

Todo:
* Handle Folding right
