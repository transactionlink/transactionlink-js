# Transactionlink Widget
We are TransactionLink.
Our aim is to transform the way FinTech operates. We make it smooth and easy to use, while staying on top of the highest regulatory and security standards.

## Introduction
This package is a frontend for your [Transactionlink Flow](https://docs.transactionlink.io/docs/workflows). To use this package first you have to have a valid account in [Transactionlink](https://www.transactionlink.io/). In [Transactionlink Dashboard](https://dashboard.transactionlink.io/) you will find a guide how to authorize your widget instance.


## Getting started
### 1. Instalation
**NPM**:
```BASH
npm install transactionlink-js
```
**YARN**:
```BASH
yarn add transactionlink-js
```

### 2. Initialization
```js
import mountWidget from "transactionlink-js"
const widget = await mountWidget("YOUR_JWT", options)
```

### 3. Opening the widget
```js
widget.open()
```
