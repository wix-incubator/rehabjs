RehabJs
========

[![Build Status](https://travis-ci.com/wix-incubator/rehabjs.svg?token=ECstxpHzEZeQwCfcirJ4&branch=master)](https://travis-ci.com/wix-incubator/rehabjs)
[![NPM Version](https://img.shields.io/npm/v/rehabjs.svg?style=flat)](https://www.npmjs.com/package/rehabjs)

[![Twitter](https://img.shields.io/twitter/follow/rehab_js?label=RehabJs%20Twitter&style=flat)](https://twitter.com/intent/follow?screen_name=rehab_js)

Integration framework for any React based application that helps you write meaningful tests.

<img src="https://i.imgur.com/zhqepP5.png">

Our focus is to give a developer a top to bottom approach for testing where he can start his tests from UI actions invocation and take a snapshot of any meaningful interaction that he is interested in (Network, BI, Navigation etc.).

## About

In order to write a good and fast growing application you have to cover  your code with meaningful tests that will help your team run fast but still give you an understanding of what is broken

One of the sweetest spots of the testing pyramid are Integration tests that are much faster than e2e and are easier to support than unit tests, also they are very informative on what is broken in your code and what are usecasess that are affected. 

Rehab is an easy to use Integration testing Framework that applies following approaches:

* **Use case driven:** all rehab tests describe user actions that can be performed over components that are shown on a screen.
* **Top to bottom:** every action should trigger all code that has been written by your team from click callback or react hook to any action performed or state changed.
* **Snapshots validation:** a developer should have an easy way of recording snapshots of any part of the system that he is interested in. Whether it is a network call, Navigation or state changes.
* **Extendable:** developer should have an easy mechanism to add additional actions to testDriver that can be performed during tests.

Usage
-----

See [with-react-native](/examples/with-react-native/src/screens/Home/it.test.js)
Work in progress [with-react](/examples/with-react/README.md)
